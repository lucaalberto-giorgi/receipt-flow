import DashboardRecentExpenses from '../components/dashboard/DashboardRecentExpenses'
import DashboardSummaryCard from '../components/dashboard/DashboardSummaryCard'
import EmptyStateCard from '../components/EmptyStateCard'
import Skeleton from '../components/Skeleton'
import { useExpenses } from '../context/ExpensesContext'

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
      <div className="flex flex-col gap-2 border-b border-violet-100/80 pb-4 dark:border-slate-700 sm:gap-3 sm:pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-violet-500">
            Expense Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            Dashboard
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Monitor receipts flowing into the workspace and keep an eye on the
            latest review activity.
          </p>
        </div>

        <div className="rounded-xl border border-violet-100 bg-violet-50/80 px-3 py-2.5 text-sm text-slate-600 shadow-[0_14px_28px_-24px_rgba(76,29,149,0.45)] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 sm:rounded-2xl sm:px-4 sm:py-3">
          Live shared expense state
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }, (_, index) => (
            <article
              key={index}
              className="rounded-2xl border border-violet-100/80 bg-white p-4 shadow-[0_24px_48px_-38px_rgba(15,23,42,0.35)] dark:border-slate-700 dark:bg-slate-900 sm:rounded-[28px] sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <Skeleton className="h-3 w-16" rounded="rounded-full" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <Skeleton className="h-12 w-12" rounded="rounded-2xl" />
              </div>
              <Skeleton className="mt-8 h-10 w-24" />
              <Skeleton className="mt-5 h-7 w-20" rounded="rounded-full" />
            </article>
          ))
        ) : (
          <>
            <DashboardSummaryCard
              accent="violet"
              eyebrow="Records"
              title="Total Expenses"
              value={String(totalExpenses)}
            />
            <DashboardSummaryCard
              accent="indigo"
              eyebrow="Value"
              title="Total Amount"
              value={formatCurrency(totalAmount)}
            />
            <DashboardSummaryCard
              accent="emerald"
              eyebrow="Checked"
              title="Reviewed Expenses"
              value={String(reviewedExpenses)}
            />
            <DashboardSummaryCard
              accent="amber"
              eyebrow="Queue"
              title="Pending Expenses"
              value={String(pendingExpenses)}
            />
          </>
        )}
      </div>

      <div className="grid min-w-0 gap-5 sm:gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <section className="rounded-2xl border border-violet-100/80 bg-white p-4 shadow-[0_24px_48px_-38px_rgba(15,23,42,0.35)] dark:border-slate-700 dark:bg-slate-900 sm:rounded-[28px] sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-violet-500">
            Top Category
          </p>
          {isLoading ? (
            <div className="mt-5 space-y-4">
              <Skeleton className="h-8 w-52" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full max-w-md" />
                <Skeleton className="h-4 w-4/5 max-w-sm" />
              </div>
              <div className="mt-5 rounded-2xl border border-violet-100 bg-violet-50/70 p-4 dark:border-slate-700 dark:bg-slate-800 sm:mt-6 sm:rounded-[24px] sm:p-5">
                <div className="flex items-end justify-between gap-4">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-16" />
                  </div>
                  <Skeleton className="h-7 w-28" rounded="rounded-full" />
                </div>
              </div>
            </div>
          ) : hasExpenses ? (
            <>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                {topCategoryName}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                The most common expense category in the current shared state,
                updating automatically as new receipts are saved.
              </p>

              <div className="mt-5 rounded-2xl border border-violet-100 bg-violet-50/70 p-4 dark:border-slate-700 dark:bg-slate-800 sm:mt-6 sm:rounded-[24px] sm:p-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Expense count
                    </p>
                    <p className="mt-2 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                      {topCategoryCount}
                    </p>
                  </div>

                  <span className="inline-flex rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-violet-700 dark:border-slate-700 dark:bg-slate-800 dark:text-violet-300">
                    Leading category
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="mt-5">
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
