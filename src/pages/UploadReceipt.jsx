import { useEffect, useRef, useState } from 'react'
import ExtractedExpenseForm from '../components/upload-receipt/ExtractedExpenseForm'
import ReceiptUploader from '../components/upload-receipt/ReceiptUploader'

const EMPTY_FORM = {
  merchant: '',
  amount: '',
  date: '',
  category: '',
  notes: '',
}

const SAMPLE_RECEIPT_DATA = {
  merchant: 'Northwind Coffee Roasters',
  amount: '24.80',
  date: '2026-03-29',
  category: 'Meals',
  notes: 'Mock extracted from uploaded receipt.',
}

function UploadReceipt() {
  const inputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [isDragOver, setIsDragOver] = useState(false)
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

  function applyMockExtraction(file) {
    setSelectedFile(file)
    setFormData({
      ...SAMPLE_RECEIPT_DATA,
      notes: `Mock extracted from ${file.name}.`,
    })
  }

  function handleFileSelect(file) {
    if (!file) {
      return
    }

    applyMockExtraction(file)
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
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 border-b border-violet-100/80 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-violet-500">
            Receipt Intake
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Upload Receipt
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Drop in a receipt and review the mocked extraction before saving it
            as an expense.
          </p>
        </div>

        <div className="rounded-2xl border border-violet-100 bg-violet-50/80 px-4 py-3 text-sm text-slate-600 shadow-[0_14px_28px_-24px_rgba(76,29,149,0.45)]">
          {selectedFile ? 'Mock extraction ready' : 'Waiting for upload'}
        </div>
      </div>

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
