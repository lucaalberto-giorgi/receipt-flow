import EmptyStateCard from '../EmptyStateCard'
import Skeleton from '../Skeleton'

function StatusStamp({ status }) {
  const color = status === 'Reviewed' ? 'text-accent' : 'text-amber-ink'

  return <span className={`stamp ${color}`}>{status}</span>
}

function ExpensesTable({ expenses, hasExpenses, isLoading = false, onDeleteExpense }) {
  return (
    <section className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-dashed border-rule px-5 py-4 sm:px-6">
        <div>
          <p className="eyebrow">Expense Ledger</p>
          <h3 className="font-display mt-2 text-lg font-semibold tracking-tight text-ink sm:text-xl">
            Recent expenses
          </h3>
        </div>
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
                  <Skeleton className="h-5 w-20 self-center" rounded="rounded-[3px]" />
                  <Skeleton className="h-6 w-24 self-center" rounded="rounded-[4px]" />
                  <Skeleton className="h-8 w-16 self-center" rounded="rounded-md" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <table className="min-w-[720px] border-separate border-spacing-0 sm:min-w-full">
              <thead>
                <tr className="bg-sunken text-left">
                  <th className="px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-soft sm:px-6">
                    Merchant
                  </th>
                  <th className="px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-soft sm:px-6">
                    Date
                  </th>
                  <th className="px-5 py-3 text-right font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-soft sm:px-6">
                    Amount
                  </th>
                  <th className="px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-soft sm:px-6">
                    Category
                  </th>
                  <th className="px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-soft sm:px-6">
                    Status
                  </th>
                  <th className="px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-soft sm:px-6">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="text-sm text-ink-soft transition hover:bg-sunken/50"
                  >
                    <td className="border-t border-rule-soft px-5 py-3.5 sm:px-6">
                      <div>
                        <p className="font-medium text-ink">{expense.merchant}</p>
                        <p className="figure mt-1 text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                          {expense.reference}
                        </p>
                      </div>
                    </td>
                    <td className="figure border-t border-rule-soft px-5 py-3.5 text-[13px] sm:px-6">
                      {expense.date}
                    </td>
                    <td className="figure border-t border-rule-soft px-5 py-3.5 text-right font-semibold text-ink sm:px-6">
                      {expense.amount}
                    </td>
                    <td className="border-t border-rule-soft px-5 py-3.5 sm:px-6">
                      <span className="rounded-[3px] border border-rule bg-sunken px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">
                        {expense.category}
                      </span>
                    </td>
                    <td className="border-t border-rule-soft px-5 py-3.5 sm:px-6">
                      <StatusStamp status={expense.status} />
                    </td>
                    <td className="border-t border-rule-soft px-5 py-3.5 sm:px-6">
                      <button
                        type="button"
                        onClick={() => onDeleteExpense(expense.id)}
                        className="inline-flex min-h-9 items-center rounded-md border border-red-ink/50 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-red-ink transition hover:bg-red-tint"
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
