import EmptyStateCard from '../EmptyStateCard'
import Skeleton from '../Skeleton'

function StatusBadge({ status }) {
  const styles =
    status === 'Reviewed'
      ? 'border border-emerald-100 bg-emerald-50 text-emerald-700'
      : 'border border-amber-100 bg-amber-50 text-amber-700'

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-[0.18em] uppercase ${styles}`}
    >
      {status}
    </span>
  )
}

function ExpensesTable({ expenses, hasExpenses, isLoading = false, onDeleteExpense }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-violet-100/80 bg-white shadow-[0_24px_48px_-38px_rgba(15,23,42,0.35)] dark:border-slate-700 dark:bg-slate-900 sm:rounded-[28px]">
      <div className="flex items-center justify-between border-b border-violet-100/80 px-4 py-3 dark:border-slate-700 sm:px-6 sm:py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-violet-500">
            Expense Table
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-xl">
            Recent expenses
          </h3>
        </div>
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="p-4 sm:p-6">
            <div className="min-w-[720px] space-y-4">
              {Array.from({ length: 6 }, (_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1.6fr_1fr_1fr_1fr_1fr_0.9fr] gap-4 rounded-2xl border border-violet-100/70 px-4 py-4 dark:border-slate-700"
                >
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-4 w-20 self-center" />
                  <Skeleton className="h-4 w-16 self-center" />
                  <Skeleton className="h-7 w-20 self-center" rounded="rounded-full" />
                  <Skeleton className="h-7 w-24 self-center" rounded="rounded-full" />
                  <Skeleton className="h-8 w-20 self-center" rounded="rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <table className="min-w-[720px] border-separate border-spacing-0 sm:min-w-full">
              <thead>
                <tr className="bg-violet-50/70 text-left dark:bg-slate-800/80">
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400 sm:px-6 sm:py-4">
                    Merchant
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400 sm:px-6 sm:py-4">
                    Date
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400 sm:px-6 sm:py-4">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400 sm:px-6 sm:py-4">
                    Category
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400 sm:px-6 sm:py-4">
                    Status
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400 sm:px-6 sm:py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="border-t border-violet-100/70 text-sm text-slate-600 transition hover:bg-violet-50/40 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                  >
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">{expense.merchant}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                          {expense.reference}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4">{expense.date}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100 sm:px-6 sm:py-4">
                      {expense.amount}
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <span className="inline-flex rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 dark:border-slate-700 dark:bg-slate-800 dark:text-violet-300">
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <StatusBadge status={expense.status} />
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <button
                        type="button"
                        onClick={() => onDeleteExpense(expense.id)}
                        className="inline-flex min-h-10 items-center gap-1 whitespace-nowrap rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40"
                      >
                        <span aria-hidden="true">🗑</span>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {expenses.length === 0 && (
          <div className="px-4 py-6 sm:px-6 sm:py-8">
            <EmptyStateCard
              eyebrow={hasExpenses ? 'No Results' : 'Getting Started'}
              title={hasExpenses ? 'No matching expenses' : 'No expenses yet'}
              description={
                hasExpenses
                  ? 'Try a different search term or clear the category filter.'
                  : 'Upload a receipt or add an expense manually to get started.'
              }
              actionLabel={hasExpenses ? undefined : 'Upload Receipt'}
              actionTo={hasExpenses ? undefined : '/upload-receipt'}
            />
          </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default ExpensesTable
