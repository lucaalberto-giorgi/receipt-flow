import { useState } from 'react'
import ExpensesFilters from '../components/expenses/ExpensesFilters'
import ExpensesTable from '../components/expenses/ExpensesTable'
import { mockExpenses } from '../data/mockExpenses'

function Expenses() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All categories')

  const categories = ['All categories', ...new Set(mockExpenses.map((expense) => expense.category))]

  const filteredExpenses = mockExpenses.filter((expense) => {
    const matchesSearch = expense.merchant
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase())
    const matchesCategory =
      selectedCategory === 'All categories' ||
      expense.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 border-b border-violet-100/80 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-violet-500">
            Expense Ledger
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Expenses
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Review submitted receipts, scan the latest activity, and narrow the
            list with quick filters.
          </p>
        </div>

        <div className="rounded-2xl border border-violet-100 bg-violet-50/80 px-4 py-3 text-sm text-slate-600 shadow-[0_14px_28px_-24px_rgba(76,29,149,0.45)]">
          {filteredExpenses.length} expense{filteredExpenses.length === 1 ? '' : 's'}
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
