function ExpensesFilters({
  categories,
  searchTerm,
  selectedCategory,
  onCategoryChange,
  onSearchChange,
}) {
  return (
    <section className="card p-0">
      <div className="strip">
        <span>Search &amp; Filter</span>
        <span className="font-mono text-[9px] font-bold tracking-[0.1em] opacity-70">
          RF-04
        </span>
      </div>

      <div className="flex flex-col gap-4 p-5 sm:gap-5 sm:p-6 lg:flex-row lg:items-end">
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

        <label className="block lg:w-72">
          <span className="field-label">Filter by category</span>
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
