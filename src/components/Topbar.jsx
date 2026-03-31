function Topbar() {
  return (
    <header className="flex items-center justify-between rounded-[28px] border border-slate-200 bg-white px-5 py-4 shadow-[0_20px_45px_-34px_rgba(15,23,42,0.16)] backdrop-blur dark:border-slate-700 dark:bg-slate-900 sm:px-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-violet-500">
          Expense Workspace
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Receipt Flow
        </h1>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">User</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Avatar Placeholder</p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-600 text-sm font-semibold text-white shadow-[0_18px_30px_-18px_rgba(124,58,237,0.8)]">
          U
        </div>
      </div>
    </header>
  )
}

export default Topbar
