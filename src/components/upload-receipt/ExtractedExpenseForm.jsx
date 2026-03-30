const categories = ['Meals', 'Travel', 'Office', 'Software', 'Supplies']

function ExtractedExpenseForm({
  canSave,
  formData,
  hasFile,
  onChange,
  onSubmit,
}) {
  return (
    <article className="rounded-[28px] border border-violet-100/80 bg-white p-5 shadow-[0_24px_48px_-38px_rgba(15,23,42,0.35)] sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-violet-500">
            Right Panel
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            Extracted Expense
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Review and adjust the mocked receipt fields before saving.
          </p>
        </div>

        <div
          className={`rounded-2xl px-4 py-2 text-sm font-medium ${
            hasFile
              ? 'border border-violet-200 bg-violet-50 text-violet-700'
              : 'border border-slate-200 bg-slate-50 text-slate-500'
          }`}
        >
          {hasFile ? 'Prefilled' : 'No file yet'}
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-6 space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Merchant
          </span>
          <input
            type="text"
            name="merchant"
            value={formData.merchant}
            onChange={onChange}
            placeholder="Merchant name"
            className="w-full rounded-2xl border border-violet-100 bg-violet-50/35 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Amount
            </span>
            <input
              type="number"
              name="amount"
              step="0.01"
              value={formData.amount}
              onChange={onChange}
              placeholder="0.00"
              className="w-full rounded-2xl border border-violet-100 bg-violet-50/35 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Date
            </span>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={onChange}
              className="w-full rounded-2xl border border-violet-100 bg-violet-50/35 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Category
          </span>
          <select
            name="category"
            value={formData.category}
            onChange={onChange}
            className="w-full rounded-2xl border border-violet-100 bg-violet-50/35 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
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
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Notes
          </span>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={onChange}
            placeholder="Add any context for this expense"
            rows="5"
            className="w-full resize-none rounded-2xl border border-violet-100 bg-violet-50/35 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
          />
        </label>

        <button
          type="submit"
          disabled={!canSave}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_32px_-20px_rgba(124,58,237,0.9)] transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-200 disabled:shadow-none"
        >
          Save Expense
        </button>
      </form>
    </article>
  )
}

export default ExtractedExpenseForm
