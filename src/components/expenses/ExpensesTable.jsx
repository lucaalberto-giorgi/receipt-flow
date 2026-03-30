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

function ExpensesTable({ expenses }) {
  return (
    <section className="overflow-hidden rounded-[28px] border border-violet-100/80 bg-white shadow-[0_24px_48px_-38px_rgba(15,23,42,0.35)]">
      <div className="flex items-center justify-between border-b border-violet-100/80 px-5 py-4 sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-violet-500">
            Expense Table
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
            Recent expenses
          </h3>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-violet-50/70 text-left">
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 sm:px-6">
                Merchant
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 sm:px-6">
                Date
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 sm:px-6">
                Amount
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 sm:px-6">
                Category
              </th>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 sm:px-6">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr
                key={expense.id}
                className="border-t border-violet-100/70 text-sm text-slate-600 transition hover:bg-violet-50/40"
              >
                <td className="px-5 py-4 sm:px-6">
                  <div>
                    <p className="font-medium text-slate-900">{expense.merchant}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">
                      {expense.reference}
                    </p>
                  </div>
                </td>
                <td className="px-5 py-4 sm:px-6">{expense.date}</td>
                <td className="px-5 py-4 font-semibold text-slate-900 sm:px-6">
                  {expense.amount}
                </td>
                <td className="px-5 py-4 sm:px-6">
                  <span className="inline-flex rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
                    {expense.category}
                  </span>
                </td>
                <td className="px-5 py-4 sm:px-6">
                  <StatusBadge status={expense.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {expenses.length === 0 && (
          <div className="px-6 py-16 text-center">
            <p className="text-lg font-semibold tracking-tight text-slate-900">
              No matching expenses
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Try a different merchant name or clear the category filter.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ExpensesTable
