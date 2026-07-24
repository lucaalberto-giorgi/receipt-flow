import { useExpenses } from '../context/useExpenses'

function formatStatementDate() {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
    .format(new Date())
    .toUpperCase()
}

function Topbar() {
  const { resetDemoData } = useExpenses()

  return (
    <header className="flex items-center justify-between gap-3 border-b-2 border-ink pb-4 sm:gap-4">
      <div className="min-w-0">
        <p className="font-display text-base uppercase tracking-tight text-ink md:hidden">
          Receipt Flow
        </p>
        <p className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-ink-faint md:block">
          Statement date
        </p>
        <p className="figure truncate text-xs font-bold tracking-[0.06em] text-ink-soft md:mt-1 md:text-sm">
          {formatStatementDate()}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={resetDemoData}
          className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink-faint underline decoration-2 underline-offset-4 transition hover:text-red-ink"
          title="Restore the sample expenses"
        >
          Reset
        </button>

        <span className="stamp text-accent">Demo Workspace</span>
      </div>
    </header>
  )
}

export default Topbar
