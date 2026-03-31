function Topbar() {
  return (
    <header className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 shadow-[0_20px_45px_-34px_rgba(15,23,42,0.16)] backdrop-blur dark:border-slate-700 dark:bg-slate-900 sm:gap-4 sm:rounded-[28px] sm:px-6 sm:py-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-violet-500">
          Expense Workspace
        </p>
        <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
          Receipt Flow
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2 py-1.5 dark:border-slate-700 dark:bg-slate-800 sm:gap-3 sm:rounded-2xl sm:px-3 sm:py-2">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">User</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Avatar Placeholder</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-600 text-sm font-semibold text-white shadow-[0_18px_30px_-18px_rgba(124,58,237,0.8)] sm:h-11 sm:w-11">
          U
        </div>
      </div>
    </header>
  )
}

export default Topbar
