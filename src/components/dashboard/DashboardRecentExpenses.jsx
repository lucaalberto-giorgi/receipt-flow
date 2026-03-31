function StatusBadge({ status }) {
  const styles =
    status === 'Reviewed'
      ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
      : 'border-amber-100 bg-amber-50 text-amber-700'

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${styles}`}
    >
      {status}
    </span>
  )
}

function DashboardRecentExpenses({ expenses }) {
  return (
    <section className="rounded-[28px] border border-violet-100/80 bg-white p-5 shadow-[0_24px_48px_-38px_rgba(15,23,42,0.35)] dark:border-slate-700 dark:bg-slate-900 sm:p-6">
      <div className="flex items-center justify-between gap-4 border-b border-violet-100/80 pb-5 dark:border-slate-700">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-violet-500">
            Recent Expenses
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Latest activity
          </h3>
        </div>

        <span className="rounded-2xl border border-violet-100 bg-violet-50 px-3 py-2 text-sm text-violet-700 dark:border-slate-700 dark:bg-slate-800 dark:text-violet-300">
          {expenses.length} shown
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {expenses.map((expense) => (
          <article
            key={expense.id}
            className="flex flex-col gap-4 rounded-[24px] border border-violet-100/80 bg-violet-50/35 p-4 dark:border-slate-700 dark:bg-slate-800 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium text-slate-900 dark:text-slate-100">{expense.merchant}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                {expense.reference}
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{expense.date}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:justify-end">
              <span className="inline-flex rounded-full border border-violet-100 bg-white px-3 py-1 text-xs font-medium text-violet-700 dark:border-slate-700 dark:bg-slate-800 dark:text-violet-300">
                {expense.category}
              </span>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {expense.amount}
              </span>
              <StatusBadge status={expense.status} />
            </div>
          </article>
        ))}

        {expenses.length === 0 && (
          <div className="rounded-[24px] border border-dashed border-violet-200 bg-violet-50/60 px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-800">
            <p className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              No expenses yet
            </p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Save a receipt from the upload page to populate the dashboard.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default DashboardRecentExpenses
