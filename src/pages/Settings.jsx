import { useState } from 'react'
import { useExpenses } from '../context/useExpenses'

function Settings({ darkMode, onToggleDarkMode }) {
  const { expenses, resetDemoData, clearAllExpenses } = useExpenses()
  const [confirmation, setConfirmation] = useState('')

  function handleRestoreSamples() {
    resetDemoData()
    setConfirmation('Sample data restored.')
  }

  function handleClearAll() {
    clearAllExpenses()
    setConfirmation('Ledger cleared.')
  }

  return (
    <section className="min-w-0 space-y-6 sm:space-y-7">
      <div className="reveal">
        <p className="eyebrow">Preferences</p>
        <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Settings
        </h2>
      </div>

      <div className="reveal reveal-1 card p-5 sm:p-6">
        <div className="mb-4 border-b border-dashed border-rule pb-4">
          <p className="eyebrow">Appearance</p>
          <h3 className="font-display mt-2 text-lg font-semibold text-ink">
            Theme
          </h3>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-ink">Dark mode</p>
            <p className="mt-1 text-sm text-ink-soft">
              Switch to the after-hours ledger.
            </p>
          </div>

          <button
            type="button"
            onClick={onToggleDarkMode}
            role="switch"
            aria-checked={darkMode}
            aria-label="Dark mode toggle"
            className={`relative inline-flex h-6 w-11 items-center rounded-full border transition-all duration-200 ease-in-out ${
              darkMode
                ? 'border-accent-deep bg-accent-solid'
                : 'border-rule bg-sunken'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full transition-all duration-200 ease-in-out ${
                darkMode ? 'translate-x-6 bg-on-accent' : 'translate-x-1 bg-card'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="reveal reveal-2 card p-5 sm:p-6">
        <div className="mb-4 border-b border-dashed border-rule pb-4">
          <p className="eyebrow">Demo Data</p>
          <h3 className="font-display mt-2 text-lg font-semibold text-ink">
            Ledger contents
          </h3>
        </div>

        <p className="max-w-2xl text-sm leading-6 text-ink-soft">
          This demo ships with a set of sample expenses so the workspace never
          opens empty. Your changes — uploads, edits, voids — persist in this
          browser. Restore the samples at any time, or clear everything to see
          the empty states.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleRestoreSamples}
            className="btn btn-primary"
          >
            Restore sample data
          </button>

          <button type="button" onClick={handleClearAll} className="btn btn-void">
            Clear all expenses
          </button>

          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint sm:ml-auto">
            {expenses.length} entr{expenses.length === 1 ? 'y' : 'ies'} on file
          </span>
        </div>

        {confirmation ? (
          <p
            className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-accent"
            role="status"
          >
            {confirmation}
          </p>
        ) : null}
      </div>
    </section>
  )
}

export default Settings
