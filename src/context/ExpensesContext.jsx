import { createContext, useContext, useMemo, useState } from 'react'
import { mockExpenses } from '../data/mockExpenses'

const ExpensesContext = createContext(null)

function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState(() => mockExpenses)

  function addExpense(expense) {
    setExpenses((currentExpenses) => [expense, ...currentExpenses])
  }

  function removeExpense(expenseId) {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== expenseId),
    )
  }

  const value = useMemo(
    () => ({
      expenses,
      addExpense,
      removeExpense,
    }),
    [expenses],
  )

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  )
}

function useExpenses() {
  const context = useContext(ExpensesContext)

  if (!context) {
    throw new Error('useExpenses must be used within an ExpensesProvider')
  }

  return context
}

export { ExpensesProvider, useExpenses }
