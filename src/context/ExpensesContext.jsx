import { useEffect, useMemo, useState } from 'react'
import { ExpensesContext } from './expenses-context'

const STORAGE_KEY = 'receipt-flow-expenses-v1'

// Sample entries shown on first visit so the demo never opens empty.
// Cleared or edited state persists in localStorage; "Restore sample data"
// brings these back at any time.
const SAMPLE_EXPENSES = [
  {
    id: 'sample-01',
    merchant: 'Blue Bottle Coffee',
    date: '2026-07-22',
    amount: '$8.25',
    category: 'Food',
    notes: 'Latte, croissant',
    status: 'Reviewed',
    reference: 'RCPT-0181',
  },
  {
    id: 'sample-02',
    merchant: 'Uber',
    date: '2026-07-21',
    amount: '$24.60',
    category: 'Travel',
    notes: 'Airport drop-off',
    status: 'Pending',
    reference: 'RCPT-0177',
  },
  {
    id: 'sample-03',
    merchant: 'Tesco Express',
    date: '2026-07-19',
    amount: '$32.47',
    category: 'Food',
    notes: 'Weekly groceries',
    status: 'Reviewed',
    reference: 'RCPT-0169',
  },
  {
    id: 'sample-04',
    merchant: 'Vueling Airlines',
    date: '2026-07-16',
    amount: '$118.40',
    category: 'Travel',
    notes: 'BCN–LGW one-way',
    status: 'Reviewed',
    reference: 'RCPT-0164',
  },
  {
    id: 'sample-05',
    merchant: 'Netflix',
    date: '2026-07-14',
    amount: '$15.99',
    category: 'Entertainment',
    notes: 'Monthly subscription',
    status: 'Reviewed',
    reference: 'RCPT-0158',
  },
  {
    id: 'sample-06',
    merchant: 'Octopus Energy',
    date: '2026-07-10',
    amount: '$89.20',
    category: 'Utilities',
    notes: 'July electricity',
    status: 'Pending',
    reference: 'RCPT-0151',
  },
  {
    id: 'sample-07',
    merchant: 'Muji',
    date: '2026-07-08',
    amount: '$27.90',
    category: 'Shopping',
    notes: 'Notebooks, pens',
    status: 'Reviewed',
    reference: 'RCPT-0146',
  },
  {
    id: 'sample-08',
    merchant: 'Pret A Manger',
    date: '2026-07-05',
    amount: '$12.35',
    category: 'Food',
    notes: 'Team lunch',
    status: 'Pending',
    reference: 'RCPT-0139',
  },
]

function loadInitialExpenses() {
  try {
    const stored = globalThis.localStorage?.getItem(STORAGE_KEY)

    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) {
        return parsed
      }
    }
  } catch {
    // Corrupt storage — fall through to the sample ledger.
  }

  return SAMPLE_EXPENSES
}

function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState(loadInitialExpenses)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const frameId = globalThis.requestAnimationFrame(() => {
      setIsLoading(false)
    })

    return () => {
      globalThis.cancelAnimationFrame?.(frameId)
    }
  }, [])

  useEffect(() => {
    try {
      globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(expenses))
    } catch {
      // Storage unavailable (private mode, quota) — state stays in memory.
    }
  }, [expenses])

  function addExpense(expense) {
    setExpenses((currentExpenses) => [expense, ...currentExpenses])
  }

  function removeExpense(expenseId) {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== expenseId),
    )
  }

  function resetDemoData() {
    setExpenses(SAMPLE_EXPENSES)
  }

  function clearAllExpenses() {
    setExpenses([])
  }

  const value = useMemo(
    () => ({
      expenses,
      isLoading,
      addExpense,
      removeExpense,
      resetDemoData,
      clearAllExpenses,
    }),
    [expenses, isLoading],
  )

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  )
}

export { ExpensesProvider }
