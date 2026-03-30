function formatFileSize(sizeInBytes) {
  if (!sizeInBytes) {
    return '0 KB'
  }

  if (sizeInBytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(sizeInBytes / 1024))} KB`
  }

  return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`
}

function ReceiptUploader({
  inputRef,
  isDragOver,
  onBrowseClick,
  onDragLeave,
  onDragOver,
  onDrop,
  onFileInputChange,
  previewUrl,
  selectedFile,
}) {
  const isImagePreview = Boolean(previewUrl)

  return (
    <article className="rounded-[28px] border border-violet-100/80 bg-white p-5 shadow-[0_24px_48px_-38px_rgba(15,23,42,0.35)] sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-violet-500">
            Left Panel
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            Receipt File
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Upload receipt image or PDF
          </p>
        </div>

        <button
          type="button"
          onClick={onBrowseClick}
          className="inline-flex items-center justify-center rounded-2xl border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700 transition hover:border-violet-300 hover:bg-violet-100"
        >
          {selectedFile ? 'Replace file' : 'Choose file'}
        </button>
      </div>

      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`mt-6 overflow-hidden rounded-[28px] border-2 border-dashed p-4 transition sm:p-5 ${
          isDragOver
            ? 'border-violet-400 bg-violet-50'
            : 'border-violet-200 bg-[linear-gradient(180deg,rgba(250,248,255,0.95),rgba(245,241,255,0.75))]'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*,application/pdf"
          className="hidden"
          onChange={onFileInputChange}
        />

        {!selectedFile && (
          <div className="flex min-h-[440px] flex-col items-center justify-center rounded-[24px] border border-white/80 bg-white/80 px-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-violet-600 text-lg font-semibold text-white shadow-[0_18px_32px_-20px_rgba(124,58,237,0.85)]">
              +
            </div>
            <h4 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">
              Drag and drop your receipt
            </h4>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
              Drop a JPG, PNG, or PDF here, or use the button above to browse
              for a file.
            </p>
          </div>
        )}

        {selectedFile && isImagePreview && (
          <div className="space-y-4">
            <div className="overflow-hidden rounded-[24px] border border-violet-100 bg-white shadow-[0_18px_40px_-30px_rgba(15,23,42,0.35)]">
              <img
                src={previewUrl}
                alt="Receipt preview"
                className="h-[440px] w-full object-cover object-top"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-violet-100 bg-white px-4 py-3 text-sm text-slate-600">
              <span className="font-medium text-slate-900">{selectedFile.name}</span>
              <span>{formatFileSize(selectedFile.size)}</span>
            </div>
          </div>
        )}

        {selectedFile && !isImagePreview && (
          <div className="flex min-h-[440px] items-center justify-center rounded-[24px] border border-violet-100 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.35)]">
            <div className="max-w-sm text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] bg-violet-600 text-base font-semibold text-white shadow-[0_20px_34px_-18px_rgba(124,58,237,0.8)]">
                PDF
              </div>
              <h4 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">
                File ready for review
              </h4>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                {selectedFile.name}
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.24em] text-violet-500">
                {formatFileSize(selectedFile.size)}
              </p>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

export default ReceiptUploader
