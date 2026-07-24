import EmptyStateCard from '../EmptyStateCard'
import Skeleton from '../Skeleton'

function StatusStamp({ status }) {
  const color = status === 'Reviewed' ? 'text-accent' : 'text-amber-ink'

  return <span className={`stamp ${color}`}>{status}</span>
}

function DashboardRecentExpenses({ expenses, isLoading = false }) {
  return (
    <section className="card p-5 sm:p-6">
      <div className="flex flex-col gap-2 border-b border-dashed border-rule pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:pb-5">
        <div>
          <p className="eyebrow">Recent Expenses</p>
          <h3 className="font-display mt-2 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            Latest activity
          </h3>
        </div>

        <span className="w-fit font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
          {expenses.length} shown
        </span>
      </div>

      <div className="mt-1 divide-y divide-rule-soft">
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
                  <Skeleton className="h-5 w-16" rounded="rounded-[3px]" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-6 w-20" rounded="rounded-[4px]" />
                </div>
              </article>
            ))
          : expenses.map((expense) => (
              <article
                key={expense.id}
                className="flex flex-col gap-3 py-4 transition hover:bg-sunken/50 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">
                    {expense.merchant}
                  </p>
                  <p className="figure mt-1 text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                    {expense.reference} · {expense.date}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                  <span className="rounded-[3px] border border-rule bg-sunken px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">
                    {expense.category}
                  </span>
                  <span className="figure text-sm font-semibold text-ink">
                    {expense.amount}
                  </span>
                  <StatusStamp status={expense.status} />
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
