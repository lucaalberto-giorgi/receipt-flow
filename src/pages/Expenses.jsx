import { useState } from 'react'
import ExpensesFilters from '../components/expenses/ExpensesFilters'
import ExpensesTable from '../components/expenses/ExpensesTable'
import Skeleton from '../components/Skeleton'
import { useExpenses } from '../context/useExpenses'
import exportExpensesCsv from '../utils/exportExpensesCsv'

function parseAmount(amount) {
  return Number.parseFloat(String(amount).replace(/[^0-9.-]/g, '')) || 0
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

function Expenses() {
  const { expenses, removeExpense, isLoading } = useExpenses()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All categories')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedExpenseId, setSelectedExpenseId] = useState(null)

  const categories = ['All categories', ...new Set(expenses.map((expense) => expense.category))]
  const totalSpend = expenses.reduce(
    (sum, expense) => sum + parseAmount(expense.amount),
    0,
  )
  const spendingByCategory = expenses.reduce((categoryTotals, expense) => {
    const category = expense.category || 'Other'
    categoryTotals[category] = (categoryTotals[category] ?? 0) + parseAmount(expense.amount)
    return categoryTotals
  }, {})
  const categoryBreakdown = Object.entries(spendingByCategory).sort(
    (left, right) => right[1] - left[1],
  )
  const maxCategoryAmount = categoryBreakdown[0]?.[1] ?? 0
  const topCategory =
    expenses.length === 0
      ? '—'
      : categoryBreakdown[0]?.[0] || 'Other'

  const filteredExpenses = expenses.filter((expense) => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase()
    const matchesSearch =
      normalizedSearchTerm === '' ||
      [expense.merchant, expense.category, expense.date].some((value) =>
        String(value).toLowerCase().includes(normalizedSearchTerm),
      )
    const matchesCategory =
      selectedCategory === 'All categories' ||
      expense.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  function handleExportCsv() {
    exportExpensesCsv(filteredExpenses)
  }

  function handleDeleteExpense(expenseId) {
    setSelectedExpenseId(expenseId)
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setSelectedExpenseId(null)
  }

  function handleConfirmDelete() {
    if (selectedExpenseId === null) {
      return
    }

    removeExpense(selectedExpenseId)
    handleCloseModal()
  }

  return (
    <>
      <section className="min-w-0 space-y-6 sm:space-y-7">
        <div className="reveal flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Expense Ledger</p>
            <h2 className="font-display mt-3 text-3xl uppercase tracking-tight text-ink sm:text-4xl">
              Expenses
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-ink-soft">
              Review posted receipts, scan the latest activity, and narrow the
              list with quick filters.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 sm:items-end">
            <span className="copy-tag bg-carbon-yellow">Copy 3 · File</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleExportCsv}
                disabled={isLoading}
                className="btn btn-ghost"
              >
                Export CSV
              </button>

              <span className="figure text-xs font-bold tracking-[0.06em] text-ink-soft">
                {filteredExpenses.length} ENTR{filteredExpenses.length === 1 ? 'Y' : 'IES'}
              </span>
            </div>
          </div>
        </div>

        <div className="reveal reveal-1 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }, (_, index) => (
                <article key={index} className="card p-5 sm:p-6">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="mt-6 h-9 w-28" />
                  <Skeleton className="mt-4 h-3 w-36" />
                </article>
              ))
            : (
              <>
                <article className="card p-0">
                  <div className="strip">
                    <span>Total Spend</span>
                    <span className="font-mono text-[9px] font-bold tracking-[0.1em] opacity-70">
                      NO. 01
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="figure text-3xl font-bold tracking-tight text-ink sm:text-[34px]">
                      {formatCurrency(totalSpend)}
                    </p>
                    <div className="tear mt-4" />
                    <p className="mt-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink-faint">
                      Across all saved expenses
                    </p>
                  </div>
                </article>

                <article className="card p-0">
                  <div className="strip">
                    <span>Volume</span>
                    <span className="font-mono text-[9px] font-bold tracking-[0.1em] opacity-70">
                      NO. 02
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="figure text-3xl font-bold tracking-tight text-ink sm:text-[34px]">
                      {expenses.length}
                    </p>
                    <div className="tear mt-4" />
                    <p className="mt-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink-faint">
                      Entries in the ledger
                    </p>
                  </div>
                </article>

                <article className="card p-0">
                  <div className="strip">
                    <span>Top Category</span>
                    <span className="font-mono text-[9px] font-bold tracking-[0.1em] opacity-70">
                      NO. 03
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="figure truncate text-3xl font-bold tracking-tight text-ink sm:text-[34px]">
                      {topCategory}
                    </p>
                    <div className="tear mt-4" />
                    <p className="mt-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink-faint">
                      Highest spend right now
                    </p>
                  </div>
                </article>
              </>
            )}
        </div>

        <section className="reveal reveal-2 card p-0">
          <div className="strip">
            <span>Spending by Category — Breakdown</span>
            <span className="font-mono text-[9px] font-bold tracking-[0.1em] opacity-70">
              RF-03
            </span>
          </div>

          <div className="p-5 sm:p-6">
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 4 }, (_, index) => (
                  <div key={index} className="border-b border-rule-soft pb-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="mt-3 h-2 w-full" />
                  </div>
                ))}
              </div>
            ) : categoryBreakdown.length === 0 ? (
              <p className="py-6 text-sm text-ink-soft">No expense data yet.</p>
            ) : (
              <div className="space-y-4">
                {categoryBreakdown.map(([category, amount]) => (
                  <div
                    key={category}
                    className="border-b border-rule-soft pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-baseline justify-between gap-4 text-sm">
                      <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-ink">
                        {category}
                      </span>
                      <span className="figure font-bold text-ink">
                        {formatCurrency(amount)}
                      </span>
                    </div>

                    <div className="mt-2.5 h-2.5 w-full border border-ink bg-card">
                      <div
                        className="h-full bg-accent transition-all"
                        style={{
                          width: `${maxCategoryAmount > 0 ? (amount / maxCategoryAmount) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <div className="reveal reveal-3 space-y-6 sm:space-y-7">
          <ExpensesFilters
            categories={categories}
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onSearchChange={setSearchTerm}
          />

          <ExpensesTable
            isLoading={isLoading}
            expenses={filteredExpenses}
            hasExpenses={expenses.length > 0}
            onDeleteExpense={handleDeleteExpense}
          />
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="card w-full max-w-md p-0">
            <div className="strip strip-red">
              <span>Void Entry</span>
              <span className="font-mono text-[9px] font-bold tracking-[0.1em] opacity-70">
                RF-86
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-display text-lg uppercase tracking-tight text-ink">
                Void this expense?
              </h3>
              <p className="mt-2 text-sm text-ink-soft">
                It will be struck from the ledger. This action cannot be undone.
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="btn btn-void"
                >
                  Void entry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Expenses
