function escapeCsvValue(value) {
  const stringValue = String(value ?? '')
  const escapedValue = stringValue.replaceAll('"', '""')
  return `"${escapedValue}"`
}

function exportExpensesCsv(expenses) {
  const headers = ['Merchant', 'Date', 'Total', 'Category', 'Notes']
  const rows = expenses.map((expense) => [
    expense.merchant,
    expense.date,
    expense.amount,
    expense.category,
    expense.notes,
  ])

  const csvContent = [headers, ...rows]
    .map((row) => row.map(escapeCsvValue).join(','))
    .join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const downloadUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = downloadUrl
  link.download = 'expenses.csv'
  link.click()

  URL.revokeObjectURL(downloadUrl)
}

export default exportExpensesCsv
