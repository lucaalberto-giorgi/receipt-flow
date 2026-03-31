from io import BytesIO

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

try:
    from pypdf import PdfReader
except ImportError:
    PdfReader = None

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

    if filename.endswith(".pdf") or content_type == "application/pdf":
        extracted_text = ""

        if PdfReader is not None:
            try:
                reader = PdfReader(BytesIO(file_bytes))
                extracted_text = "\n".join(
                    page.extract_text() or "" for page in reader.pages
                ).strip()
            except Exception:
                extracted_text = ""
    else:
        extracted_text = "TODO: Add OCR for image uploads."

    return {
        "filename": file.filename,
        "merchant": "Tesco",
        "date": "2026-03-31",
        "total": 24.99,
        "currency": "GBP",
        "raw_text_preview": extracted_text[:200],
        "items": [
            {"name": "Milk", "price": 1.50},
            {"name": "Bread", "price": 1.20},
            {"name": "Chicken", "price": 6.99}
        ]
    }
