import { useState } from 'react'
import ExpensesFilters from '../components/expenses/ExpensesFilters'
import ExpensesTable from '../components/expenses/ExpensesTable'
import { useExpenses } from '../context/ExpensesContext'
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
  const { expenses, removeExpense } = useExpenses()
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
      ? '-'
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
      <section className="space-y-6">
        <div className="flex flex-col gap-3 border-b border-violet-100/80 pb-5 dark:border-slate-700 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-violet-500">
              Expense Ledger
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Expenses
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
              Review submitted receipts, scan the latest activity, and narrow the
              list with quick filters.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
            >
              Export CSV
            </button>

            <div className="rounded-2xl border border-violet-100 bg-violet-50/80 px-4 py-3 text-sm text-slate-600 shadow-[0_14px_28px_-24px_rgba(76,29,149,0.45)] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
              {filteredExpenses.length} expense{filteredExpenses.length === 1 ? '' : 's'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-[28px] border border-violet-100/80 bg-white p-5 shadow-[0_24px_48px_-38px_rgba(15,23,42,0.35)] dark:border-slate-700 dark:bg-slate-900 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-violet-500">
              Summary
            </p>
            <h3 className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">
              Total Spend
            </h3>
            <p className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {formatCurrency(totalSpend)}
            </p>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Across all saved expenses
            </p>
          </article>

          <article className="rounded-[28px] border border-violet-100/80 bg-white p-5 shadow-[0_24px_48px_-38px_rgba(15,23,42,0.35)] dark:border-slate-700 dark:bg-slate-900 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-violet-500">
              Volume
            </p>
            <h3 className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">
              Total Expenses
            </h3>
            <p className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {expenses.length}
            </p>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Items currently in shared state
            </p>
          </article>

          <article className="rounded-[28px] border border-violet-100/80 bg-white p-5 shadow-[0_24px_48px_-38px_rgba(15,23,42,0.35)] dark:border-slate-700 dark:bg-slate-900 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-violet-500">
              Leader
            </p>
            <h3 className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">
              Top Category
            </h3>
            <p className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {topCategory}
            </p>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Highest spend category right now
            </p>
          </article>
        </div>

        <section className="rounded-[28px] border border-violet-100/80 bg-white p-5 shadow-[0_24px_48px_-38px_rgba(15,23,42,0.35)] dark:border-slate-700 dark:bg-slate-900 sm:p-6">
          <div className="flex items-center justify-between gap-4 border-b border-violet-100/80 pb-4 dark:border-slate-700">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-violet-500">
                Breakdown
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                Spending by Category
              </h3>
            </div>
          </div>

          {categoryBreakdown.length === 0 ? (
            <p className="py-8 text-sm text-slate-500 dark:text-slate-400">
              No expense data yet.
            </p>
          ) : (
            <div className="mt-4 space-y-4 px-1">
              {categoryBreakdown.map(([category, amount]) => (
                <div
                  key={category}
                  className="rounded-xl border border-violet-100/80 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50"
                >
                  <div className="flex items-baseline justify-between gap-4 text-sm">
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      {category}
                    </span>
                    <span className="font-semibold text-slate-600 dark:text-slate-300">
                      {formatCurrency(amount)}
                    </span>
                  </div>

                  <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                    <div
                      className="h-1.5 rounded-full bg-violet-600 transition-all"
                      style={{
                        width: `${maxCategoryAmount > 0 ? (amount / maxCategoryAmount) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <ExpensesFilters
          categories={categories}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onSearchChange={setSearchTerm}
        />

        <ExpensesTable
          expenses={filteredExpenses}
          onDeleteExpense={handleDeleteExpense}
        />
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Delete expense?
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseModal}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Expenses
