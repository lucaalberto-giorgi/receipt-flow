import { NavLink } from 'react-router-dom'
import { navItems } from './Sidebar'

function MobileBottomNav() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 md:hidden">
      <nav className="mx-auto max-w-md rounded-[24px] border border-slate-200 bg-white/95 p-2 shadow-[0_24px_48px_-32px_rgba(15,23,42,0.28)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/95">
        <div className="grid grid-cols-4 gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-center transition ${
                  isActive
                    ? 'bg-violet-600 text-white shadow-[0_18px_32px_-20px_rgba(124,58,237,0.9)]'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-violet-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-violet-300'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${
                      isActive
                        ? 'bg-white/15 text-white'
                        : 'bg-violet-50 text-violet-600 dark:bg-slate-800 dark:text-violet-300'
                    }`}
                  >
                    {item.icon}
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
