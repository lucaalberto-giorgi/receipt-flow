from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

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
async def extract_receipt(file: UploadFile = File(...)):
    return {
        "filename": file.filename,
        "merchant": "Tesco",
        "date": "2026-03-31",
        "total": 24.99,
        "currency": "GBP",
        "items": [
            {"name": "Milk", "price": 1.50},
            {"name": "Bread", "price": 1.20},
            {"name": "Chicken", "price": 6.99}
        ]
    }
