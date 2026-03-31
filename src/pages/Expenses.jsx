import { useState } from 'react'
import ExpensesFilters from '../components/expenses/ExpensesFilters'
import ExpensesTable from '../components/expenses/ExpensesTable'
import { useExpenses } from '../context/ExpensesContext'
import exportExpensesCsv from '../utils/exportExpensesCsv'

function Expenses() {
  const { expenses } = useExpenses()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All categories')

  const categories = ['All categories', ...new Set(expenses.map((expense) => expense.category))]

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

  return (
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

      <ExpensesFilters
        categories={categories}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onSearchChange={setSearchTerm}
      />

      <ExpensesTable expenses={filteredExpenses} />
    </section>
  )
}

export default Expenses
