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
    <section className="min-w-0 space-y-5 sm:space-y-6">
      <div className="reveal flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-[28px]">
            Settings
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            Workspace preferences and demo data controls.
          </p>
        </div>

        <span className="copy-meta">Copy 4 · Admin</span>
      </div>

      <div className="reveal reveal-1 card p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 border-b border-rule-soft pb-4">
          <div>
            <p className="eyebrow">Appearance</p>
            <h3 className="mt-2 text-base font-bold tracking-tight text-ink">
              Theme
            </h3>
          </div>
          <span className="copy-meta">RF-06</span>
        </div>

        <div className="flex items-center justify-between gap-4 pt-4">
          <div>
            <p className="text-sm font-semibold text-ink">Dark mode</p>
            <p className="mt-1 text-sm text-ink-soft">
              Flip the form over to the carbon sheet.
            </p>
          </div>

          <button
            type="button"
            onClick={onToggleDarkMode}
            role="switch"
            aria-checked={darkMode}
            aria-label="Dark mode toggle"
            className={`relative inline-flex h-6 w-11 items-center border border-ink transition-colors duration-150 ${
              darkMode ? 'bg-accent' : 'bg-sunken'
            }`}
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform transition-transform duration-150 ${
                darkMode ? 'translate-x-6 bg-card' : 'translate-x-1 bg-ink'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="reveal reveal-2 card p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 border-b border-rule-soft pb-4">
          <div>
            <p className="eyebrow">Demo data</p>
            <h3 className="mt-2 text-base font-bold tracking-tight text-ink">
              Ledger contents
            </h3>
          </div>
          <span className="copy-meta">RF-07</span>
        </div>

        <div className="pt-4">
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

            <span className="copy-meta sm:ml-auto">
              {expenses.length} entr{expenses.length === 1 ? 'y' : 'ies'} on file
            </span>
          </div>

          {confirmation ? (
            <p className="figure mt-4 text-xs font-bold text-accent" role="status">
              {confirmation}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default Settings
