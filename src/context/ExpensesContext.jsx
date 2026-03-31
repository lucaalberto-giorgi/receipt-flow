import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ExpensesContext = createContext(null)

function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const frameId = globalThis.requestAnimationFrame(() => {
      setIsLoading(false)
    })

    return () => {
      globalThis.cancelAnimationFrame?.(frameId)
    }
  }, [])

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
      isLoading,
      addExpense,
      removeExpense,
    }),
    [expenses, isLoading],
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
