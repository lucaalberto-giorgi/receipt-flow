import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ExtractedExpenseForm from '../components/upload-receipt/ExtractedExpenseForm'
import ReceiptUploader from '../components/upload-receipt/ReceiptUploader'
import { useExpenses } from '../context/useExpenses'
import {
  FileTooLargeError,
  prepareReceiptFile,
} from '../utils/prepareReceiptFile'

// Same-origin in production (Vercel functions); VITE_API_URL points local
// dev at uvicorn on 8000.
const API_URL = import.meta.env.VITE_API_URL ?? ''

const EMPTY_FORM = {
  merchant: '',
  amount: '',
  date: '',
  category: '',
  notes: '',
}

const SLOW_EXTRACTION_HINT_DELAY_MS = 6000

function UploadReceipt() {
  const navigate = useNavigate()
  const { addExpense } = useExpenses()
  const inputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [showSlowExtractionHint, setShowSlowExtractionHint] = useState(false)
  const [formData, setFormData] = useState(EMPTY_FORM)

  useEffect(() => {
    if (!selectedFile || !selectedFile.type.startsWith('image/')) {
      setPreviewUrl('')
      return undefined
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreviewUrl(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  // Surface a note when extraction is taking noticeably long.
  useEffect(() => {
    if (!isUploading) {
      setShowSlowExtractionHint(false)
      return undefined
    }

    const timeoutId = setTimeout(
      () => setShowSlowExtractionHint(true),
      SLOW_EXTRACTION_HINT_DELAY_MS,
    )

    return () => clearTimeout(timeoutId)
  }, [isUploading])

  // A file is optional — expenses can also be entered manually.
  const canSaveExpense =
    formData.merchant.trim() &&
    formData.amount &&
    formData.date &&
    formData.category

  function resetUploadState() {
    setSelectedFile(null)
    setPreviewUrl('')
    setIsDragOver(false)
    setIsUploading(false)
    setUploadError('')
    setFormData(EMPTY_FORM)
  }

  function formatCurrencyAmount(amount) {
    const numericAmount = Number.parseFloat(amount)

    if (Number.isNaN(numericAmount)) {
      return '$0.00'
    }

    return `$${numericAmount.toFixed(2)}`
  }

  function createExpensePayload() {
    const fallbackId = `exp-${Date.now()}`
    const uniqueId = globalThis.crypto?.randomUUID?.() ?? fallbackId
    const referenceNumber = String(Date.now()).slice(-4)

    return {
      id: uniqueId,
      merchant: formData.merchant.trim(),
      date: formData.date,
      amount: formatCurrencyAmount(formData.amount),
      category: formData.category,
      notes: formData.notes.trim(),
      status: 'Pending',
      reference: `RCPT-${referenceNumber}`,
    }
  }

  async function requestExtraction(file) {
    setUploadError('')
    setIsUploading(true)

    let preparedFile
    try {
      preparedFile = await prepareReceiptFile(file)
    } catch (error) {
      setIsUploading(false)
      setUploadError(
        error instanceof FileTooLargeError
          ? error.message
          : 'Unable to read that file. Please try another one.',
      )
      return
    }

    setSelectedFile(preparedFile)

    const requestBody = new FormData()
    requestBody.append('file', preparedFile)

    try {
      const response = await fetch(`${API_URL}/api/extract-receipt`, {
        method: 'POST',
        body: requestBody,
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      const extractedReceipt = await response.json()

      setFormData((currentData) => ({
        ...currentData,
        merchant: extractedReceipt.merchant ?? '',
        amount:
          extractedReceipt.total != null ? String(extractedReceipt.total) : '',
        date: extractedReceipt.date ?? '',
        category: extractedReceipt.category ?? 'Other',
        notes:
          extractedReceipt.items?.map((item) => item.name).join(', ') ?? '',
      }))
    } catch {
      setUploadError('Unable to extract receipt right now. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  async function handleFileSelect(file) {
    if (!file || isUploading) {
      return
    }

    await requestExtraction(file)
  }

  function handleInputChange(event) {
    const { name, value } = event.target
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  function handleBrowseClick() {
    if (isUploading) {
      return
    }

    inputRef.current?.click()
  }

  function handleFileInputChange(event) {
    handleFileSelect(event.target.files?.[0] ?? null)
    event.target.value = ''
  }

  function handleDragOver(event) {
    event.preventDefault()

    if (isUploading) {
      return
    }

    setIsDragOver(true)
  }

  function handleDragLeave(event) {
    event.preventDefault()
    setIsDragOver(false)
  }

  function handleDrop(event) {
    event.preventDefault()
    setIsDragOver(false)

    if (isUploading) {
      return
    }

    handleFileSelect(event.dataTransfer.files?.[0] ?? null)
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!canSaveExpense) {
      return
    }

    addExpense(createExpensePayload())
    resetUploadState()
    navigate('/expenses')
  }

  return (
    <section className="min-w-0 space-y-6 sm:space-y-7">
      <div className="reveal flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-[28px]">
            Upload Receipt
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-ink-soft">
            Drop in a receipt for AI extraction, or type the entry in by hand —
            review the details before posting to the ledger.
          </p>
        </div>

        <div className="flex flex-col items-start gap-1 sm:items-end">
          <span className="copy-meta">Copy 2 · Intake</span>
          <span className="copy-meta">
            {isUploading
              ? 'Extracting receipt…'
              : selectedFile
                ? 'Receipt parsed'
                : 'Waiting for upload'}
          </span>
        </div>
      </div>

      {uploadError ? (
        <p className="figure text-xs font-bold text-red-ink">{uploadError}</p>
      ) : null}

      {showSlowExtractionHint && isUploading ? (
        <p className="figure text-xs font-bold text-red-ink">
          Still extracting — detailed receipts can take a few extra seconds.
        </p>
      ) : null}

      <div className="reveal reveal-1 grid min-w-0 gap-5 sm:gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)]">
        <ReceiptUploader
          inputRef={inputRef}
          isDragOver={isDragOver}
          onBrowseClick={handleBrowseClick}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onFileInputChange={handleFileInputChange}
          previewUrl={previewUrl}
          selectedFile={selectedFile}
          isUploading={isUploading}
        />

        <ExtractedExpenseForm
          canSave={Boolean(canSaveExpense)}
          formData={formData}
          hasFile={Boolean(selectedFile)}
          isUploading={isUploading}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  )
}

export default UploadReceipt
