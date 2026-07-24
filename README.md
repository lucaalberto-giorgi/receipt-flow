# Receipt Flow

Receipt Flow is an AI-assisted expense ledger for freelancers and small businesses.

Upload a receipt image or PDF, review the extracted entry, and post it to the ledger — or type an expense in by hand. A dashboard keeps running totals, review status, and category breakdowns up to date in real time.

**Live demo:** [receipt-flow-neon.vercel.app](https://receipt-flow-neon.vercel.app)

## Features

- AI receipt extraction (OpenAI) for images and PDFs — merchant, date, total, category, and line items
- Manual expense entry without requiring a file upload
- Sample ledger seeded on first visit, so the demo never opens empty
- Local persistence via localStorage — your uploads, edits, and voids survive a refresh
- Restore-sample-data and clear-all controls in Settings
- Searchable and filterable expense table with CSV export
- Real-time dashboard summaries and spending-by-category breakdown
- Dark mode ("after-hours ledger")

## Design

"Carbon Copy" — the app is paperwork, so the identity borrows from office forms, kept at product volume:

- Manila desk surface, white form sheets, hairline rules, zero rounded corners
- Every figure, date, and reference is typewritten (Courier Prime); UI text is Archivo in calm sentence case
- Status inks: ballpoint blue for Reviewed, stamp red for Pending and Void
- Paperwork metadata at whisper volume — form numbers (RF-01…), carbon-copy page tags (COPY 1 · ORIGINAL), a barcode, one rubber stamp for the demo mark
- Dark mode flips the form over to the carbon sheet itself

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS v4 — deployed on Vercel
- **Backend:** FastAPI, OpenAI, pypdf — deployed on Render

## How It Works

1. Upload a receipt (JPG, PNG, WEBP, or PDF). The backend extracts the text — pypdf for PDFs, the vision model for photos — and OpenAI turns it into a structured expense.
2. Review the prefilled form, adjust anything, and post it to the ledger.
3. Or skip the file entirely and enter the expense manually.

Saved expenses appear in the Expenses page and update the Dashboard automatically. The free-tier backend sleeps between visits; the app pings it on load to hide the cold start.

## Running Locally

```bash
# Frontend
npm install
npm run dev

# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Set `VITE_API_URL` in `.env` to point the frontend at the backend, and `OPENAI_API_KEY` in `backend/.env` for AI extraction.

## 📸 Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Upload Receipt
![Upload](screenshots/upload.png)

### Expenses & Analytics
![Expenses](screenshots/expenses.png)
