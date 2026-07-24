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
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
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
    <svg viewBox="0 0 60 14" aria-hidden="true" className="h-3.5 w-24 text-ink-faint">
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
      <div className="flex h-full flex-col rounded-[10px] border border-rule bg-card p-5">
        <div className="mb-8 flex items-center gap-3 px-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-solid text-on-accent">
            <ReceiptGlyph />
          </div>

          <div>
            <p className="font-display text-lg font-semibold leading-tight tracking-tight text-ink">
              Receipt Flow
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint">
              Expense Ledger
            </p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-md border-l-2 px-3 py-2.5 transition ${
                  isActive
                    ? 'border-accent bg-sunken text-accent'
                    : 'border-transparent text-ink-soft hover:bg-sunken hover:text-ink'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`font-mono text-[11px] font-medium tracking-[0.1em] ${
                      isActive ? 'text-accent' : 'text-ink-faint group-hover:text-ink-soft'
                    }`}
                  >
                    {item.index}
                  </span>
                  <span className="text-sm font-medium tracking-tight">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-6 border-t border-dashed border-rule pt-5">
          <Barcode />
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
            RF · Ledger No. 0001
          </p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
