function ExpensesFilters({
  categories,
  searchTerm,
  selectedCategory,
  onCategoryChange,
  onSearchChange,
}) {
  return (
    <section className="card p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <label className="block flex-1">
          <span className="field-label">Search expenses</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Merchant, category, date…"
            className="field"
          />
        </label>

        <label className="block lg:w-64">
          <span className="field-label">Category</span>
          <select
            value={selectedCategory}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="field"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  )
}

export default ExpensesFilters
