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
    <svg viewBox="0 0 60 14" aria-hidden="true" className="h-3 w-20 text-ink-faint">
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
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[17rem] p-5 md:block">
      <div className="card flex h-full flex-col p-0">
        <div className="strip">
          <span>Receipt Flow</span>
          <span className="copy-meta !text-card/60">RF-00</span>
        </div>

        <div className="flex items-center gap-3 border-b border-rule px-4 py-4">
          <div className="flex h-9 w-9 items-center justify-center bg-ink text-card">
            <ReceiptGlyph />
          </div>

          <div>
            <p className="text-sm font-semibold leading-tight text-ink">
              Expense workspace
            </p>
            <p className="copy-meta mt-0.5">Ledger No. 0001</p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-0.5 p-3">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `group flex items-center gap-3 border-l-2 px-3 py-2.5 transition ${
                  isActive
                    ? 'border-red-ink bg-sunken text-ink'
                    : 'border-transparent text-ink-soft hover:bg-sunken hover:text-ink'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`font-mono text-[10px] font-bold tracking-[0.08em] ${
                      isActive ? 'text-red-ink' : 'text-ink-faint group-hover:text-ink-soft'
                    }`}
                  >
                    {item.index}
                  </span>
                  <span className="text-[13px] font-semibold">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-dashed border-rule px-4 py-4">
          <Barcode />
          <p className="copy-meta mt-1.5">RF · Est. 2026</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
