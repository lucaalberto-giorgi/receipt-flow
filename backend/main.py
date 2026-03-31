from io import BytesIO

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

print("RUNNING UPDATED MAIN.PY")

try:
    from pdf2image import convert_from_bytes
except ImportError:
    convert_from_bytes = None

try:
    from pypdf import PdfReader
    print("PYPDF IMPORT OK")
except Exception as exc:
    PdfReader = None
    print({"pypdf_import_error": str(exc)})

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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Receipt Flow backend is running"}

@app.post("/extract-receipt")
async def extract_receipt(file: UploadFile | None = File(None)):
    print("ENTERED EXTRACT RECEIPT ENDPOINT")

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

    print(
        {
            "filename": file.filename,
            "content_type": content_type,
            "file_size_bytes": len(file_bytes),
        }
    )

    if filename.endswith(".pdf"):
        print("ENTERED PDF BLOCK")
        extracted_text = ""

        print({"PdfReader_is_none": PdfReader is None, "PdfReader": str(PdfReader)})
        if PdfReader is not None:
            print("ABOUT TO CREATE PDF READER")
            try:
                reader = PdfReader(BytesIO(file_bytes))
            except Exception as exc:
                print({"reader_error": str(exc)})
                reader = None

            if reader is not None:
                print({"pdf_page_count": len(reader.pages)})

                page_texts = []
                for index, page in enumerate(reader.pages, start=1):
                    page_text = (page.extract_text() or "").strip()

                    if page_text:
                        print({"page": index, "text": page_text})
                    else:
                        print({"page": index, "text": "[EMPTY PAGE TEXT]"})

                    page_texts.append(page_text)

                extracted_text = "\n".join(
                    text for text in page_texts if text
                ).strip()
    else:
        extracted_text = "TODO: Add OCR for image uploads."

    import re

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

    return {
        "filename": file.filename,
        "merchant": merchant,
        "date": date,
        "total": total,
        "currency": "GBP",
        "raw_text_preview": extracted_text[:200],
        "items": [
            {"name": "Milk", "price": 1.50},
            {"name": "Bread", "price": 1.20},
            {"name": "Chicken", "price": 6.99}
        ]
    }
