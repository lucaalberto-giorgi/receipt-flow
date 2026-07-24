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
      <div className="reveal flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Preferences</p>
          <h2 className="font-display mt-3 text-3xl uppercase tracking-tight text-ink sm:text-4xl">
            Settings
          </h2>
        </div>

        <span className="copy-tag bg-carbon-blue">Copy 4 · Admin</span>
      </div>

      <div className="reveal reveal-1 card p-0">
        <div className="strip">
          <span>Appearance — Theme</span>
          <span className="font-mono text-[9px] font-bold tracking-[0.1em] opacity-70">
            RF-06
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 p-5 sm:p-6">
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
            className={`relative inline-flex h-7 w-12 items-center border-2 border-ink transition-colors duration-150 ${
              darkMode ? 'bg-accent' : 'bg-sunken'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform transition-transform duration-150 ${
                darkMode ? 'translate-x-6 bg-card' : 'translate-x-1 bg-ink'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="reveal reveal-2 card p-0">
        <div className="strip">
          <span>Demo Data — Ledger Contents</span>
          <span className="font-mono text-[9px] font-bold tracking-[0.1em] opacity-70">
            RF-07
          </span>
        </div>

        <div className="p-5 sm:p-6">
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

            <span className="figure text-xs font-bold uppercase tracking-[0.1em] text-ink-faint sm:ml-auto">
              {expenses.length} entr{expenses.length === 1 ? 'y' : 'ies'} on file
            </span>
          </div>

          {confirmation ? (
            <p
              className="figure mt-4 text-xs font-bold uppercase tracking-[0.1em] text-accent"
              role="status"
            >
              {confirmation}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default Settings
