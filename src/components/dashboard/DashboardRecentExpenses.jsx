import categoryChipClass from '../../utils/categoryChipClass'
import EmptyStateCard from '../EmptyStateCard'
import Skeleton from '../Skeleton'

function StatusBadge({ status }) {
  const styles =
    status === 'Reviewed'
      ? 'bg-accent-tint text-accent'
      : 'bg-red-tint text-red-ink'

  return <span className={`badge ${styles}`}>{status}</span>
}

function DashboardRecentExpenses({ expenses, isLoading = false }) {
  return (
    <section className="card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 pb-3">
        <div>
          <p className="eyebrow">Recent expenses</p>
        </div>

        <span className="copy-meta">{expenses.length} shown</span>
      </div>

      <div className="divide-y divide-rule-soft border-t border-rule-soft">
        {isLoading
          ? Array.from({ length: 4 }, (_, index) => (
              <article
                key={index}
                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </article>
            ))
          : expenses.map((expense) => (
              <article
                key={expense.id}
                className="flex flex-col gap-2.5 py-3.5 transition hover:bg-sunken/60 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="monogram h-9 w-9 text-[12px]">
                    {expense.merchant?.charAt(0) || '?'}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">
                      {expense.merchant}
                    </p>
                    <p className="copy-meta mt-0.5">
                      {expense.reference} · {expense.date}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 sm:justify-end">
                  <span className={categoryChipClass(expense.category)}>
                    {expense.category}
                  </span>
                  <span className="figure text-sm font-bold text-ink">
                    {expense.amount}
                  </span>
                  <StatusBadge status={expense.status} />
                </div>
              </article>
            ))}

        {!isLoading && expenses.length === 0 && (
          <div className="pt-4">
            <EmptyStateCard
              eyebrow="Latest Activity"
              title="No expenses yet"
              description="Upload a receipt to get started and your recent activity will appear here."
              actionLabel="Upload Receipt"
              actionTo="/upload-receipt"
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default DashboardRecentExpenses
