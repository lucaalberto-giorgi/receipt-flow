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
    <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_24px_48px_-38px_rgba(15,23,42,0.18)] dark:border-slate-700 dark:bg-slate-900 sm:rounded-[28px] sm:p-6">
      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-violet-500">
            Right Panel
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
            Extracted Expense
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Review and adjust the expense details before saving.
          </p>
        </div>

        <div
          className={`rounded-xl px-3 py-1.5 text-sm font-medium sm:rounded-2xl sm:px-4 sm:py-2 ${
            hasFile
              ? 'border border-slate-200 bg-slate-50 text-violet-700 dark:border-slate-700 dark:bg-slate-800 dark:text-violet-300'
              : 'border border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400'
          }`}
        >
          {hasFile ? 'Prefilled' : 'No file yet'}
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Merchant
          </span>
          <input
            type="text"
            name="merchant"
            disabled={isUploading}
            value={formData.merchant}
            onChange={onChange}
            placeholder="Merchant name"
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-violet-400 dark:focus:ring-slate-700 sm:text-sm"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Amount
            </span>
            <input
              type="number"
              name="amount"
              disabled={isUploading}
              step="0.01"
              value={formData.amount}
              onChange={onChange}
              placeholder="0.00"
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-violet-400 dark:focus:ring-slate-700 sm:text-sm"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Date
            </span>
            <input
              type="date"
              name="date"
              disabled={isUploading}
              value={formData.date}
              onChange={onChange}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-violet-300 focus:ring-4 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-violet-400 dark:focus:ring-slate-700 sm:text-sm"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Category
          </span>
          <select
            name="category"
            disabled={isUploading}
            value={formData.category}
            onChange={onChange}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-violet-300 focus:ring-4 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-violet-400 dark:focus:ring-slate-700 sm:text-sm"
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
          <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Notes
          </span>
          <textarea
            name="notes"
            disabled={isUploading}
            value={formData.notes}
            onChange={onChange}
            placeholder="Add any context for this expense"
            rows="5"
            className="w-full resize-none rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-violet-400 dark:focus:ring-slate-700 sm:text-sm"
          />
        </label>

        <button
          type="submit"
          disabled={!canSave || isUploading}
          className={`inline-flex min-h-11 w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition ${
            canSave && !isUploading
              ? 'bg-violet-600 text-white shadow-[0_18px_32px_-20px_rgba(124,58,237,0.9)] hover:bg-violet-700'
              : 'cursor-not-allowed bg-slate-200 text-slate-500 shadow-none dark:bg-slate-700 dark:text-slate-400'
          }`}
        >
          {isUploading ? 'Extracting receipt...' : 'Save Expense'}
        </button>
      </form>
    </article>
  )
}

export default ExtractedExpenseForm
