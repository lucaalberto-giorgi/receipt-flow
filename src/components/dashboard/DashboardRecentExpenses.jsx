import EmptyStateCard from '../EmptyStateCard'
import Skeleton from '../Skeleton'

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

function DashboardRecentExpenses({ expenses, isLoading = false }) {
  return (
    <section className="rounded-2xl border border-violet-100/80 bg-white p-4 shadow-[0_24px_48px_-38px_rgba(15,23,42,0.35)] dark:border-slate-700 dark:bg-slate-900 sm:rounded-[28px] sm:p-6">
      <div className="flex flex-col gap-2 border-b border-violet-100/80 pb-4 dark:border-slate-700 sm:gap-3 sm:pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-violet-500">
            Recent Expenses
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
            Latest activity
          </h3>
        </div>

        <span className="w-fit rounded-xl border border-violet-100 bg-violet-50 px-3 py-1.5 text-sm text-violet-700 dark:border-slate-700 dark:bg-slate-800 dark:text-violet-300 sm:rounded-2xl sm:py-2">
          {expenses.length} shown
        </span>
      </div>

      <div className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
        {isLoading
          ? Array.from({ length: 4 }, (_, index) => (
              <article
                key={index}
                className="flex flex-col gap-3 rounded-2xl border border-violet-100/80 bg-violet-50/35 p-3 dark:border-slate-700 dark:bg-slate-800 sm:gap-4 sm:rounded-[24px] sm:p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-2">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                  <Skeleton className="h-7 w-20" rounded="rounded-full" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-7 w-24" rounded="rounded-full" />
                </div>
              </article>
            ))
          : expenses.map((expense) => (
          <article
            key={expense.id}
            className="flex flex-col gap-3 rounded-2xl border border-violet-100/80 bg-violet-50/35 p-3 dark:border-slate-700 dark:bg-slate-800 sm:gap-4 sm:rounded-[24px] sm:p-4 sm:flex-row sm:items-center sm:justify-between"
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

        {!isLoading && expenses.length === 0 && (
          <EmptyStateCard
            eyebrow="Latest Activity"
            title="No expenses yet"
            description="Upload a receipt to get started and your recent activity will appear here."
            actionLabel="Upload Receipt"
            actionTo="/upload-receipt"
          />
        )}
      </div>
    </section>
  )
}

export default DashboardRecentExpenses
