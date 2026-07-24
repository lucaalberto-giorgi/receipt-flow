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

The UI is built around a receipt/ledger identity rather than a generic dashboard template:

- Warm paper canvas with a printed-stock grain
- Fraunces for display type, IBM Plex Mono for every figure, date, and reference
- Perforated tear-line dividers and sawtooth receipt-stub stat cards
- Rubber-stamp status badges and a deep accounting-green accent

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
