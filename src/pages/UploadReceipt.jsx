import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ExtractedExpenseForm from '../components/upload-receipt/ExtractedExpenseForm'
import ReceiptUploader from '../components/upload-receipt/ReceiptUploader'
import { useExpenses } from '../context/ExpensesContext'

const API_URL = import.meta.env.VITE_API_URL
console.log(API_URL)

const EMPTY_FORM = {
  merchant: '',
  amount: '',
  date: '',
  category: '',
  notes: '',
}

function UploadReceipt() {
  const navigate = useNavigate()
  const { addExpense } = useExpenses()
  const inputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
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

  const canSaveExpense =
    Boolean(selectedFile) &&
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

  async function applyMockExtraction(file) {
    setSelectedFile(file)
    setUploadError('')
    setIsUploading(true)

    const requestBody = new FormData()
    requestBody.append('file', file)

    try {
      const response = await fetch(`${API_URL}/extract-receipt`, {
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
    if (!file) {
      return
    }

    await applyMockExtraction(file)
  }

  function handleInputChange(event) {
    const { name, value } = event.target
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  function handleBrowseClick() {
    inputRef.current?.click()
  }

  function handleFileInputChange(event) {
    handleFileSelect(event.target.files?.[0] ?? null)
    event.target.value = ''
  }

  function handleDragOver(event) {
    event.preventDefault()
    setIsDragOver(true)
  }

  function handleDragLeave(event) {
    event.preventDefault()
    setIsDragOver(false)
  }

  function handleDrop(event) {
    event.preventDefault()
    setIsDragOver(false)
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
    <section className="space-y-6">
      <div className="flex flex-col gap-3 border-b border-violet-100/80 pb-5 dark:border-slate-700 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-violet-500">
            Receipt Intake
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Upload Receipt
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Drop in a receipt and review the mocked extraction before saving it
            as an expense.
          </p>
        </div>

        <div className="rounded-2xl border border-violet-100 bg-violet-50/80 px-4 py-3 text-sm text-slate-600 shadow-[0_14px_28px_-24px_rgba(76,29,149,0.45)] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
          {isUploading
            ? 'Uploading receipt...'
            : selectedFile
              ? 'Receipt parsed'
              : 'Waiting for upload'}
        </div>
      </div>

      {uploadError ? (
        <p className="text-sm text-rose-600">{uploadError}</p>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)]">
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
        />

        <ExtractedExpenseForm
          canSave={Boolean(canSaveExpense)}
          formData={formData}
          hasFile={Boolean(selectedFile)}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  )
}

export default UploadReceipt
