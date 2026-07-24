import { Link, useLocation } from 'react-router-dom'
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
  const location = useLocation()
  const isOnUploadPage = location.pathname === '/upload-receipt'

  return (
    <header className="flex items-center justify-between gap-3 border-b border-rule pb-4 sm:gap-4">
      <div className="min-w-0">
        <p className="font-display text-base tracking-tight text-ink md:hidden">
          Receipt Flow
        </p>
        <p className="hidden text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint md:block">
          Statement date
        </p>
        <p className="figure truncate text-xs font-bold tracking-[0.04em] text-ink-soft md:mt-0.5 md:text-[13px]">
          {formatStatementDate()}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={resetDemoData}
          className="copy-meta underline decoration-dotted underline-offset-4 transition hover:text-red-ink"
          title="Restore the sample expenses"
        >
          Reset
        </button>

        <span className="stamp hidden text-accent sm:inline-flex">Demo</span>

        {!isOnUploadPage && (
          <Link to="/upload-receipt" className="btn btn-primary">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="square"
            >
              <path d="M12 16V5" />
              <path d="m7 10 5-5 5 5" />
              <path d="M5 19h14" />
            </svg>
            Upload receipt
          </Link>
        )}
      </div>
    </header>
  )
}

export default Topbar
