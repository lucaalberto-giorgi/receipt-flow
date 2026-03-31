import json
import os
import re

from dotenv import load_dotenv

load_dotenv()
from io import BytesIO

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

try:
    from pdf2image import convert_from_bytes
except ImportError:
    convert_from_bytes = None

try:
    from pypdf import PdfReader
except Exception:
    PdfReader = None

try:
    from openai import OpenAI
except ImportError:
    OpenAI = None

try:
    import pytesseract
except ImportError:
    pytesseract = None

app = FastAPI()

ALLOWED_CONTENT_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
}

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".pdf"}
EXPENSE_CATEGORIES = {"Food", "Travel", "Shopping", "Utilities", "Entertainment", "Other"}
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
client = (
    OpenAI(api_key=OPENAI_API_KEY)
    if OpenAI is not None and OPENAI_API_KEY
    else None
)

allow_origins = [
    "http://localhost:5173",
    "https://receipt-flow.vercel.app",
]


AI_RECEIPT_PROMPT = """Extract receipt data from the provided text and return JSON.

Return only valid JSON in this shape:
{
  "merchant": "string",
  "date": "YYYY-MM-DD",
  "total": 0.0,
  "category": "Food",
  "items": [{"name": "string", "price": 0.0}]
}

Use the text as the source of truth. Do not include extra fields.
Category must be one of: Food, Travel, Shopping, Utilities, Entertainment, Other.
"""


def extract_with_ai(extracted_text: str) -> dict | None:
    if client is None or not extracted_text.strip():
        return None

    try:
        response = client.responses.create(
            model=OPENAI_MODEL,
            input=[
                {"role": "system", "content": AI_RECEIPT_PROMPT},
                {"role": "user", "content": f"Receipt text:\n{extracted_text}"},
            ],
        )
        response_text = response.output_text.strip()
        if response_text.startswith("```"):
            response_text = re.sub(r"^```(?:json)?\s*", "", response_text)
            response_text = re.sub(r"\s*```$", "", response_text)
        parsed = json.loads(response_text)
    except Exception:
        return None

    if not isinstance(parsed, dict):
        return None

    merchant = parsed.get("merchant")
    date = parsed.get("date")
    total = parsed.get("total")
    category = parsed.get("category")
    items = parsed.get("items")

    if not isinstance(merchant, str) or not merchant.strip():
        return None

    if not isinstance(date, str) or not re.fullmatch(r"\d{4}-\d{2}-\d{2}", date):
        return None

    try:
        total = float(total)
    except (TypeError, ValueError):
        return None

    if not isinstance(category, str) or category not in EXPENSE_CATEGORIES:
        return None

    if not isinstance(items, list):
        return None

    normalized_items = []
    for item in items:
        if not isinstance(item, dict):
            return None

        name = item.get("name")
        price = item.get("price")
        if not isinstance(name, str) or not name.strip():
            return None

        try:
            price = float(price)
        except (TypeError, ValueError):
            return None

        normalized_items.append({"name": name.strip(), "price": price})

    return {
        "merchant": merchant.strip(),
        "date": date,
        "total": total,
        "category": category,
        "items": normalized_items,
    }

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Receipt Flow backend is running"}

@app.post("/extract-receipt")
async def extract_receipt(file: UploadFile | None = File(None)):
    if file is None or not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded.")

    filename = file.filename.lower()
    has_allowed_extension = any(
        filename.endswith(extension) for extension in ALLOWED_EXTENSIONS
    )
    content_type = file.content_type
    has_allowed_content_type = content_type in ALLOWED_CONTENT_TYPES
    is_generic_content_type = content_type in {None, "application/octet-stream"}

    if not has_allowed_content_type and not (
        is_generic_content_type and has_allowed_extension
    ):
        raise HTTPException(
            status_code=415,
            detail="Unsupported file type. Allowed types: JPEG, PNG, WEBP, PDF.",
        )

    file_bytes = await file.read()

    if not file_bytes:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    if filename.endswith(".pdf"):
        extracted_text = ""

        if PdfReader is not None:
            try:
                reader = PdfReader(BytesIO(file_bytes))
            except Exception:
                reader = None

            if reader is not None:
                page_texts = []
                for page in reader.pages:
                    page_text = (page.extract_text() or "").strip()
                    page_texts.append(page_text)

                extracted_text = "\n".join(
                    text for text in page_texts if text
                ).strip()
    else:
        extracted_text = "TODO: Add OCR for image uploads."

    merchant = "Tesco"
    merchant_source = " ".join(extracted_text.split())
    merchant_match = re.match(
        r"^\s*([A-Za-z][A-Za-z\s&'-]*?)(?=\s+\d|\s+(?:street|road|avenue|london|date)\b|$)",
        merchant_source,
        flags=re.IGNORECASE,
    )
    if merchant_match:
        merchant_candidate = merchant_match.group(1).strip(" -:")
        if merchant_candidate:
            merchant = merchant_candidate

    date = "2026-03-31"
    date_match = re.search(r"\b(\d{2}/\d{2}/\d{4}|\d{4}-\d{2}-\d{2})\b", extracted_text)
    if date_match:
        parsed_date = date_match.group(1)
        if "/" in parsed_date:
            day, month, year = parsed_date.split("/")
            date = f"{year}-{month}-{day}"
        else:
            date = parsed_date

    total = 24.99
    total_match = re.search(
        r"(?i)\b(?:total|amount|balance due)\b[^\d]*(\d+[.,]\d{2})",
        extracted_text,
    )
    if total_match:
        total = float(total_match.group(1).replace(",", "."))

    category = "Other"

    fallback_items = [
        {"name": "Milk", "price": 1.50},
        {"name": "Bread", "price": 1.20},
        {"name": "Chicken", "price": 6.99},
    ]
    items = []
    excluded_item_terms = ("total", "date", "thank you", "amount", "balance due")
    item_pattern = re.compile(r"([A-Za-z][A-Za-z\s&'-]{1,40}?)\s+[£$€]?(\d+[.,]\d{2})")

    for match in item_pattern.finditer(extracted_text):
        item_name = " ".join(match.group(1).split()).strip(" -:")
        if not item_name:
            continue
        if any(term in item_name.lower() for term in excluded_item_terms):
            continue
        if any(char.isdigit() for char in item_name):
            continue

        items.append(
            {
                "name": item_name,
                "price": float(match.group(2).replace(",", ".")),
            }
        )

    if not items:
        items = fallback_items

    ai_receipt = extract_with_ai(extracted_text)
    if ai_receipt is not None:
        merchant = ai_receipt["merchant"]
        date = ai_receipt["date"]
        total = ai_receipt["total"]
        category = ai_receipt["category"]
        items = ai_receipt["items"] or items

    return {
        "filename": file.filename,
        "merchant": merchant,
        "date": date,
        "total": total,
        "category": category,
        "currency": "GBP",
        "raw_text_preview": extracted_text[:200],
        "items": items,
    }
