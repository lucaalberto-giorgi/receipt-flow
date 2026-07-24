import EmptyStateCard from '../EmptyStateCard'
import Skeleton from '../Skeleton'

function StatusBadge({ status }) {
  const styles =
    status === 'Reviewed'
      ? 'bg-accent-tint text-accent'
      : 'bg-red-tint text-red-ink'

  return <span className={`badge ${styles}`}>{status}</span>
}

function ExpensesTable({ expenses, hasExpenses, isLoading = false, onDeleteExpense }) {
  return (
    <section className="card overflow-hidden p-0">
      <div className="flex items-center justify-between gap-3 px-5 py-4 sm:px-6">
        <div>
          <p className="eyebrow">Expense ledger</p>
          <h3 className="mt-2 text-base font-bold tracking-tight text-ink">
            Recent expenses
          </h3>
        </div>

        <span className="copy-meta">RF-05</span>
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="border-t border-rule p-5 sm:p-6">
            <div className="min-w-[720px] space-y-4">
              {Array.from({ length: 6 }, (_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1.6fr_1fr_1fr_1fr_1fr_0.9fr] gap-4 border-b border-rule-soft px-2 pb-4"
                >
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-4 w-20 self-center" />
                  <Skeleton className="h-4 w-16 self-center" />
                  <Skeleton className="h-5 w-20 self-center" />
                  <Skeleton className="h-5 w-24 self-center" />
                  <Skeleton className="h-7 w-14 self-center" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <table className="min-w-[720px] border-separate border-spacing-0 sm:min-w-full">
              <thead>
                <tr className="bg-sunken/70 text-left">
                  <th className="border-y border-rule px-5 py-2.5 text-[11px] font-semibold text-ink-soft sm:px-6">
                    Merchant
                  </th>
                  <th className="border-y border-rule px-5 py-2.5 text-[11px] font-semibold text-ink-soft sm:px-6">
                    Date
                  </th>
                  <th className="border-y border-rule px-5 py-2.5 text-right text-[11px] font-semibold text-ink-soft sm:px-6">
                    Amount
                  </th>
                  <th className="border-y border-rule px-5 py-2.5 text-[11px] font-semibold text-ink-soft sm:px-6">
                    Category
                  </th>
                  <th className="border-y border-rule px-5 py-2.5 text-[11px] font-semibold text-ink-soft sm:px-6">
                    Status
                  </th>
                  <th className="border-y border-rule px-5 py-2.5 text-right text-[11px] font-semibold text-ink-soft sm:px-6">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, rowIndex) => (
                  <tr
                    key={expense.id}
                    className="text-sm text-ink-soft transition hover:bg-sunken/50"
                  >
                    <td
                      className={`px-5 py-3 sm:px-6 ${rowIndex > 0 ? 'border-t border-rule-soft' : ''}`}
                    >
                      <div>
                        <p className="font-semibold text-ink">{expense.merchant}</p>
                        <p className="copy-meta mt-0.5">{expense.reference}</p>
                      </div>
                    </td>
                    <td
                      className={`figure px-5 py-3 text-[13px] sm:px-6 ${rowIndex > 0 ? 'border-t border-rule-soft' : ''}`}
                    >
                      {expense.date}
                    </td>
                    <td
                      className={`figure px-5 py-3 text-right font-bold text-ink sm:px-6 ${rowIndex > 0 ? 'border-t border-rule-soft' : ''}`}
                    >
                      {expense.amount}
                    </td>
                    <td
                      className={`px-5 py-3 sm:px-6 ${rowIndex > 0 ? 'border-t border-rule-soft' : ''}`}
                    >
                      <span className="badge bg-sunken text-ink-soft">
                        {expense.category}
                      </span>
                    </td>
                    <td
                      className={`px-5 py-3 sm:px-6 ${rowIndex > 0 ? 'border-t border-rule-soft' : ''}`}
                    >
                      <StatusBadge status={expense.status} />
                    </td>
                    <td
                      className={`px-5 py-3 text-right sm:px-6 ${rowIndex > 0 ? 'border-t border-rule-soft' : ''}`}
                    >
                      <button
                        type="button"
                        onClick={() => onDeleteExpense(expense.id)}
                        className="inline-flex min-h-8 items-center px-2 py-1 text-[13px] font-semibold text-red-ink transition hover:bg-red-tint"
                      >
                        Void
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {expenses.length === 0 && (
              <div className="border-t border-rule px-5 py-6 sm:px-6 sm:py-8">
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
