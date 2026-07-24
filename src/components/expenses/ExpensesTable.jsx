import EmptyStateCard from '../EmptyStateCard'
import Skeleton from '../Skeleton'

function StatusStamp({ status }) {
  const color = status === 'Reviewed' ? 'text-accent' : 'text-red-ink'

  return <span className={`stamp ${color}`}>{status}</span>
}

function ExpensesTable({ expenses, hasExpenses, isLoading = false, onDeleteExpense }) {
  return (
    <section className="card overflow-hidden p-0">
      <div className="strip">
        <span>Expense Ledger — Recent Expenses</span>
        <span className="font-mono text-[9px] font-bold tracking-[0.1em] opacity-70">
          RF-05
        </span>
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="p-5 sm:p-6">
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
                  <Skeleton className="h-6 w-24 self-center" />
                  <Skeleton className="h-8 w-16 self-center" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <table className="min-w-[720px] border-separate border-spacing-0 sm:min-w-full">
              <thead>
                <tr className="bg-sunken text-left">
                  <th className="border-b-2 border-ink px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-ink sm:px-6">
                    Merchant
                  </th>
                  <th className="border-b-2 border-ink px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-ink sm:px-6">
                    Date
                  </th>
                  <th className="border-b-2 border-ink px-5 py-3 text-right text-[10px] font-bold uppercase tracking-[0.18em] text-ink sm:px-6">
                    Amount
                  </th>
                  <th className="border-b-2 border-ink px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-ink sm:px-6">
                    Category
                  </th>
                  <th className="border-b-2 border-ink px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-ink sm:px-6">
                    Status
                  </th>
                  <th className="border-b-2 border-ink px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-ink sm:px-6">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, rowIndex) => (
                  <tr
                    key={expense.id}
                    className="text-sm text-ink-soft transition hover:bg-sunken/60"
                  >
                    <td
                      className={`px-5 py-3.5 sm:px-6 ${rowIndex > 0 ? 'border-t border-rule-soft' : ''}`}
                    >
                      <div>
                        <p className="font-semibold text-ink">{expense.merchant}</p>
                        <p className="figure mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-ink-faint">
                          {expense.reference}
                        </p>
                      </div>
                    </td>
                    <td
                      className={`figure px-5 py-3.5 text-[13px] sm:px-6 ${rowIndex > 0 ? 'border-t border-rule-soft' : ''}`}
                    >
                      {expense.date}
                    </td>
                    <td
                      className={`figure px-5 py-3.5 text-right font-bold text-ink sm:px-6 ${rowIndex > 0 ? 'border-t border-rule-soft' : ''}`}
                    >
                      {expense.amount}
                    </td>
                    <td
                      className={`px-5 py-3.5 sm:px-6 ${rowIndex > 0 ? 'border-t border-rule-soft' : ''}`}
                    >
                      <span className="border border-ink bg-carbon-yellow px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-ink">
                        {expense.category}
                      </span>
                    </td>
                    <td
                      className={`px-5 py-3.5 sm:px-6 ${rowIndex > 0 ? 'border-t border-rule-soft' : ''}`}
                    >
                      <StatusStamp status={expense.status} />
                    </td>
                    <td
                      className={`px-5 py-3.5 sm:px-6 ${rowIndex > 0 ? 'border-t border-rule-soft' : ''}`}
                    >
                      <button
                        type="button"
                        onClick={() => onDeleteExpense(expense.id)}
                        className="inline-flex min-h-9 items-center border-2 border-red-ink px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-red-ink transition hover:bg-red-tint"
                      >
                        Void
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {expenses.length === 0 && (
              <div className="px-5 py-6 sm:px-6 sm:py-8">
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
