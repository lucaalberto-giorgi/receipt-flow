import EmptyStateCard from '../EmptyStateCard'
import Skeleton from '../Skeleton'

function StatusStamp({ status }) {
  const color = status === 'Reviewed' ? 'text-accent' : 'text-red-ink'

  return <span className={`stamp ${color}`}>{status}</span>
}

function DashboardRecentExpenses({ expenses, isLoading = false }) {
  return (
    <section className="card p-0">
      <div className="strip">
        <span>Recent Expenses — Latest Activity</span>
        <span className="font-mono text-[9px] font-bold tracking-[0.1em] opacity-70">
          {expenses.length} shown
        </span>
      </div>

      <div className="divide-y divide-rule-soft px-5 sm:px-6">
        {isLoading
          ? Array.from({ length: 4 }, (_, index) => (
              <article
                key={index}
                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <div className="space-y-2">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </article>
            ))
          : expenses.map((expense) => (
              <article
                key={expense.id}
                className="flex flex-col gap-3 py-4 transition hover:bg-sunken/60 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">
                    {expense.merchant}
                  </p>
                  <p className="figure mt-1 text-[11px] font-bold uppercase tracking-[0.1em] text-ink-faint">
                    {expense.reference} · {expense.date}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                  <span className="border border-ink bg-carbon-yellow px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-ink">
                    {expense.category}
                  </span>
                  <span className="figure text-sm font-bold text-ink">
                    {expense.amount}
                  </span>
                  <StatusStamp status={expense.status} />
                </div>
              </article>
            ))}

        {!isLoading && expenses.length === 0 && (
          <div className="py-5">
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
