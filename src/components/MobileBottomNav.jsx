import { NavLink } from 'react-router-dom'
import { navItems } from './navItems'

function MobileBottomNav() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 md:hidden">
      <nav className="card mx-auto max-w-md p-1.5">
        <div className="grid grid-cols-4 gap-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex min-h-14 flex-col items-center justify-center gap-1 px-2 py-2 text-center transition ${
                  isActive
                    ? 'bg-ink text-card'
                    : 'text-ink-soft hover:bg-sunken hover:text-ink'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`font-mono text-[10px] font-bold tracking-[0.08em] ${
                      isActive ? 'text-red-ink' : 'text-ink-faint'
                    }`}
                  >
                    {item.index}
                  </span>
                  <span className="text-[10px] font-bold uppercase leading-none tracking-[0.06em]">
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
