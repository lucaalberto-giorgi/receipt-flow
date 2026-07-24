import DashboardRecentExpenses from '../components/dashboard/DashboardRecentExpenses'
import DashboardSummaryCard from '../components/dashboard/DashboardSummaryCard'
import EmptyStateCard from '../components/EmptyStateCard'
import Skeleton from '../components/Skeleton'
import { useExpenses } from '../context/useExpenses'

function parseAmount(amount) {
  return Number.parseFloat(String(amount).replace(/[^0-9.-]/g, '')) || 0
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

function Dashboard() {
  const { expenses, isLoading } = useExpenses()

  const totalExpenses = expenses.length
  const totalAmount = expenses.reduce(
    (sum, expense) => sum + parseAmount(expense.amount),
    0,
  )
  const reviewedExpenses = expenses.filter(
    (expense) => expense.status === 'Reviewed',
  ).length
  const pendingExpenses = expenses.filter(
    (expense) => expense.status === 'Pending',
  ).length

  const categoryCounts = expenses.reduce((counts, expense) => {
    counts[expense.category] = (counts[expense.category] ?? 0) + 1
    return counts
  }, {})

  const topCategoryEntry =
    Object.entries(categoryCounts).sort((left, right) => right[1] - left[1])[0] ??
    null

  const topCategoryName = topCategoryEntry?.[0] ?? 'No category yet'
  const topCategoryCount = topCategoryEntry?.[1] ?? 0
  const recentExpenses = expenses.slice(0, 4)
  const hasExpenses = expenses.length > 0

  return (
    <section className="min-w-0 space-y-5 sm:space-y-6">
      <div className="reveal flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-[28px]">
            Dashboard
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-ink-soft">
            Monitor receipts flowing into the ledger and keep an eye on the
            latest review activity.
          </p>
        </div>

        <div className="flex flex-col items-start gap-1 sm:items-end">
          <span className="copy-meta">Copy 1 · Original</span>
          <span className="copy-meta">{totalExpenses} entries on file</span>
        </div>
      </div>

      <div className="reveal reveal-1 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }, (_, index) => (
            <article key={index} className="card p-5">
              <div className="flex items-baseline justify-between gap-4">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-8" />
              </div>
              <Skeleton className="mt-5 h-8 w-28" />
              <Skeleton className="mt-5 h-3 w-32" />
            </article>
          ))
        ) : (
          <>
            <DashboardSummaryCard
              index="01"
              title="Total Expenses"
              value={String(totalExpenses)}
              caption="Entries on file"
            />
            <DashboardSummaryCard
              index="02"
              title="Total Amount"
              value={formatCurrency(totalAmount)}
              caption="Gross spend · USD"
            />
            <DashboardSummaryCard
              index="03"
              title="Reviewed"
              value={String(reviewedExpenses)}
              caption="Stamped reviewed"
            />
            <DashboardSummaryCard
              index="04"
              title="Pending"
              value={String(pendingExpenses)}
              caption="Awaiting review"
            />
          </>
        )}
      </div>

      <div className="reveal reveal-2 grid min-w-0 gap-4 sm:gap-5 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <section className="card p-5 sm:p-6">
          <p className="eyebrow">Top category</p>
          {isLoading ? (
            <div className="mt-4 space-y-4">
              <Skeleton className="h-7 w-40" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full max-w-md" />
                <Skeleton className="h-4 w-4/5 max-w-sm" />
              </div>
              <div className="mt-5 border border-rule bg-sunken/60 p-4">
                <div className="flex items-end justify-between gap-4">
                  <div className="space-y-3">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-8 w-12" />
                  </div>
                  <Skeleton className="h-5 w-28" />
                </div>
              </div>
            </div>
          ) : hasExpenses ? (
            <>
              <h3 className="mt-2 text-xl font-bold tracking-tight text-ink">
                {topCategoryName}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-ink-soft">
                The most frequent expense category across the current ledger,
                updating automatically as new receipts are posted.
              </p>

              <div className="mt-5 border border-rule bg-sunken/60 p-4">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="copy-meta">Expense count</p>
                    <p className="figure mt-1.5 text-3xl font-bold tracking-tight text-ink">
                      {topCategoryCount}
                    </p>
                  </div>

                  <span className="badge bg-accent-tint text-accent">
                    Leading category
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="mt-4">
              <EmptyStateCard
                eyebrow="Analytics"
                title="No analytics available yet"
                description="Add your first expense and this section will surface your top category automatically."
                actionLabel="Upload Receipt"
                actionTo="/upload-receipt"
                padded={false}
              />
            </div>
          )}
        </section>

        <DashboardRecentExpenses expenses={recentExpenses} isLoading={isLoading} />
      </div>
    </section>
  )
}

export default Dashboard
