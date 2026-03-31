import DashboardRecentExpenses from '../components/dashboard/DashboardRecentExpenses'
import DashboardSummaryCard from '../components/dashboard/DashboardSummaryCard'
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
  const { expenses } = useExpenses()

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

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 border-b border-violet-100/80 pb-5 dark:border-slate-700 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-violet-500">
            Expense Overview
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Dashboard
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Monitor receipts flowing into the workspace and keep an eye on the
            latest review activity.
          </p>
        </div>

        <div className="rounded-2xl border border-violet-100 bg-violet-50/80 px-4 py-3 text-sm text-slate-600 shadow-[0_14px_28px_-24px_rgba(76,29,149,0.45)] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
          Live shared expense state
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <section className="rounded-[28px] border border-violet-100/80 bg-white p-5 shadow-[0_24px_48px_-38px_rgba(15,23,42,0.35)] dark:border-slate-700 dark:bg-slate-900 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-violet-500">
            Top Category
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {topCategoryName}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
            The most common expense category in the current shared state,
            updating automatically as new receipts are saved.
          </p>

          <div className="mt-6 rounded-[24px] border border-violet-100 bg-violet-50/70 p-5 dark:border-slate-700 dark:bg-slate-800">
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
        </section>

        <DashboardRecentExpenses expenses={recentExpenses} />
      </div>
    </section>
  )
}

export default Dashboard
