const categories = [
  'Food',
  'Travel',
  'Shopping',
  'Utilities',
  'Entertainment',
  'Other',
]

function ExtractedExpenseForm({
  canSave,
  formData,
  hasFile,
  isUploading,
  onChange,
  onSubmit,
}) {
  return (
    <article className="card min-w-0 p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div>
          <p className="eyebrow">Extracted Entry</p>
          <h3 className="font-display mt-2 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            Expense Details
          </h3>
          <p className="mt-2 text-sm text-ink-soft">
            Review and adjust the details before posting to the ledger.
          </p>
        </div>

        <span
          className={`stamp ${hasFile ? 'text-accent' : 'text-ink-faint'}`}
        >
          {hasFile ? 'Prefilled' : 'Manual entry'}
        </span>
      </div>

      <form onSubmit={onSubmit} className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
        <label className="block">
          <span className="field-label">Merchant</span>
          <input
            type="text"
            name="merchant"
            disabled={isUploading}
            value={formData.merchant}
            onChange={onChange}
            placeholder="Merchant name"
            className="field"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          <label className="block">
            <span className="field-label">Amount</span>
            <input
              type="number"
              name="amount"
              disabled={isUploading}
              step="0.01"
              value={formData.amount}
              onChange={onChange}
              placeholder="0.00"
              className="field"
            />
          </label>

          <label className="block">
            <span className="field-label">Date</span>
            <input
              type="date"
              name="date"
              disabled={isUploading}
              value={formData.date}
              onChange={onChange}
              className="field"
            />
          </label>
        </div>

        <label className="block">
          <span className="field-label">Category</span>
          <select
            name="category"
            disabled={isUploading}
            value={formData.category}
            onChange={onChange}
            className="field"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="field-label">Notes</span>
          <textarea
            name="notes"
            disabled={isUploading}
            value={formData.notes}
            onChange={onChange}
            placeholder="Add any context for this expense"
            rows="5"
            className="field resize-none"
          />
        </label>

        <button
          type="submit"
          disabled={!canSave || isUploading}
          className="btn btn-primary w-full"
        >
          {isUploading ? 'Extracting receipt…' : 'Post to ledger'}
        </button>
      </form>
    </article>
  )
}

export default ExtractedExpenseForm
