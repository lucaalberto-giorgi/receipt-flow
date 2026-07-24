import { NavLink } from 'react-router-dom'
import { navItems } from './navItems'

function MobileBottomNav() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 md:hidden">
      <nav className="mx-auto max-w-md rounded-[10px] border border-rule bg-card/95 p-1.5 backdrop-blur">
        <div className="grid grid-cols-4 gap-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex min-h-14 flex-col items-center justify-center gap-1 rounded-md px-2 py-2 text-center transition ${
                  isActive
                    ? 'bg-sunken text-accent'
                    : 'text-ink-soft hover:bg-sunken hover:text-ink'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`font-mono text-[10px] font-semibold tracking-[0.1em] ${
                      isActive ? 'text-accent' : 'text-ink-faint'
                    }`}
                  >
                    {item.index}
                  </span>
                  <span className="text-[11px] font-medium leading-none tracking-tight">
                    {item.mobileLabel ?? item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default MobileBottomNav
