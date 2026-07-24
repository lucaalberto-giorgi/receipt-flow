import { NavLink } from 'react-router-dom'
import { navItems } from './navItems'

function ReceiptGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
    >
      <path d="M6 3h12v16.5l-2 -1.5l-2 1.5l-2 -1.5l-2 1.5l-2 -1.5l-2 1.5Z" />
      <path d="M9 7.5h6" />
      <path d="M9 11h6" />
      <path d="M9 14.5h3.5" />
    </svg>
  )
}

// Decorative barcode for the sidebar footer — hand-set bar widths.
function Barcode() {
  const bars = [
    2, 1, 3, 1, 1, 2, 1, 4, 1, 2, 2, 1, 3, 1, 2, 1, 1, 3, 1, 2, 4, 1, 1, 2,
  ]
  let x = 0

  return (
    <svg viewBox="0 0 60 14" aria-hidden="true" className="h-3.5 w-24 text-ink-soft">
      {bars.map((width, index) => {
        const barX = x
        x += width + 1
        return (
          <rect key={index} x={barX} y="0" width={width} height="14" fill="currentColor" />
        )
      })}
    </svg>
  )
}

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[18rem] p-5 md:block">
      <div className="card flex h-full flex-col p-0">
        <div className="strip">
          <span>Receipt Flow</span>
          <span className="font-mono text-[9px] font-bold tracking-[0.1em] opacity-70">
            RF-00
          </span>
        </div>

        <div className="flex items-center gap-3 border-b-2 border-ink px-4 py-4">
          <div className="flex h-10 w-10 items-center justify-center bg-ink text-card">
            <ReceiptGlyph />
          </div>

          <div>
            <p className="font-display text-sm uppercase leading-tight tracking-tight text-ink">
              Expense
              <br />
              Report
            </p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1.5 p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `group flex items-center gap-3 border-2 px-3 py-2.5 transition ${
                  isActive
                    ? 'border-ink bg-ink text-card shadow-[3px_3px_0_0_var(--press)]'
                    : 'border-transparent text-ink-soft hover:border-ink hover:bg-sunken hover:text-ink'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`font-mono text-[11px] font-bold tracking-[0.08em] ${
                      isActive ? 'text-red-ink' : 'text-ink-faint group-hover:text-ink-soft'
                    }`}
                  >
                    {item.index}
                  </span>
                  <span className="text-[13px] font-semibold uppercase tracking-[0.08em]">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t-2 border-dashed border-rule px-4 py-4">
          <Barcode />
          <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink-faint">
            RF · Ledger No. 0001
          </p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
