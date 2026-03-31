function Settings({ darkMode, onToggleDarkMode }) {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-violet-500">
          Preferences
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Settings
        </h2>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Appearance</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Customize how the app looks.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Dark mode</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Switch between light and dark theme
            </p>
          </div>

          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label="Dark mode toggle"
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 ease-in-out ${
              darkMode ? 'bg-slate-900' : 'bg-slate-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-200 ease-in-out ${
                darkMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Settings
