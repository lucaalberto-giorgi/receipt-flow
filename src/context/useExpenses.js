import { useContext } from 'react'
import { ExpensesContext } from './expenses-context'

export function useExpenses() {
  const context = useContext(ExpensesContext)

  if (!context) {
    throw new Error('useExpenses must be used within an ExpensesProvider')
  }

  return context
}
