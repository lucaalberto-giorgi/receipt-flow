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
  isUploading,
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
    <article className="card min-w-0 p-0">
      <div className="strip">
        <span>Source Document — Receipt File</span>
        <span className="font-mono text-[9px] font-bold tracking-[0.1em] opacity-70">
          RF-01
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-sm text-ink-soft">
            Upload a receipt image or PDF for extraction.
          </p>

          <button
            type="button"
            disabled={isUploading}
            onClick={onBrowseClick}
            className="btn btn-ghost"
          >
            {isUploading
              ? 'Extracting…'
              : selectedFile
                ? 'Replace file'
                : 'Choose file'}
          </button>
        </div>

        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`mt-5 overflow-hidden border-2 border-dashed p-3 transition sm:p-4 ${
            isDragOver
              ? 'border-accent bg-accent-tint'
              : 'border-ink bg-sunken/60 hover:bg-sunken'
          } ${isUploading ? 'pointer-events-none opacity-75' : ''}`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={onFileInputChange}
          />

          {!selectedFile && (
            <div className="flex min-h-[320px] flex-col items-center justify-center px-4 text-center sm:min-h-[440px] sm:px-6">
              <div className="flex h-14 w-14 items-center justify-center bg-ink text-card">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                >
                  <path d="M12 16V5" />
                  <path d="m7 10 5-5 5 5" />
                  <path d="M5 19h14" />
                </svg>
              </div>
              <h4 className="font-display mt-6 text-xl uppercase tracking-tight text-ink sm:text-2xl">
                Drop receipt here
              </h4>
              <p className="mt-3 max-w-sm text-sm leading-6 text-ink-soft">
                Drag and drop, or use the button above to browse for a file.
              </p>
              <p className="figure mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-ink-faint">
                Accepts: JPG · PNG · WEBP · PDF
              </p>
            </div>
          )}

          {selectedFile && isImagePreview && (
            <div className="space-y-3">
              <div className="overflow-hidden border-2 border-ink bg-card">
                <img
                  src={previewUrl}
                  alt="Receipt preview"
                  className="h-72 w-full object-cover object-top sm:h-[440px]"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-2 border-ink bg-card px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
                <span className="figure max-w-full break-all text-xs font-bold text-ink">
                  {selectedFile.name}
                </span>
                <span className="figure text-xs text-ink-soft">
                  {isUploading ? 'Extracting receipt…' : formatFileSize(selectedFile.size)}
                </span>
              </div>
            </div>
          )}

          {selectedFile && !isImagePreview && (
            <div className="flex min-h-[320px] items-center justify-center p-4 sm:min-h-[440px] sm:p-6">
              <div className="max-w-sm text-center">
                <div className="figure mx-auto flex h-16 w-16 items-center justify-center bg-ink text-sm font-bold tracking-[0.1em] text-card">
                  PDF
                </div>
                <h4 className="font-display mt-6 text-xl uppercase tracking-tight text-ink sm:text-2xl">
                  File ready for review
                </h4>
                <p className="figure mt-3 break-all text-sm leading-6 text-ink-soft">
                  {selectedFile.name}
                </p>
                <p className="figure mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-red-ink">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default ReceiptUploader
