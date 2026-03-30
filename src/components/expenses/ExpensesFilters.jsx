function ExpensesFilters({
  categories,
  searchTerm,
  selectedCategory,
  onCategoryChange,
  onSearchChange,
}) {
  return (
    <section className="rounded-[28px] border border-violet-100/80 bg-white p-5 shadow-[0_24px_48px_-38px_rgba(15,23,42,0.35)] sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end">
        <label className="block flex-1">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Search by merchant
          </span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search merchants"
            className="w-full rounded-2xl border border-violet-100 bg-violet-50/35 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
          />
        </label>

        <label className="block lg:w-72">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Filter by category
          </span>
          <select
            value={selectedCategory}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="w-full rounded-2xl border border-violet-100 bg-violet-50/35 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
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
