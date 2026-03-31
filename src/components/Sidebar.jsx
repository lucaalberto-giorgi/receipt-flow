import { NavLink } from 'react-router-dom'

export const navItems = [
  { label: 'Dashboard', mobileLabel: 'Dashboard', icon: 'D', to: '/' },
  { label: 'Upload Receipt', mobileLabel: 'Upload', icon: 'U', to: '/upload-receipt' },
  { label: 'Expenses', mobileLabel: 'Expenses', icon: 'E', to: '/expenses' },
  { label: 'Settings', mobileLabel: 'Settings', icon: 'S', to: '/settings' },
]

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-20 p-3 md:block md:w-72 md:p-5">
      <div className="flex h-full flex-col rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_24px_50px_-38px_rgba(15,23,42,0.18)] backdrop-blur dark:border-slate-700 dark:bg-slate-900 md:p-5">
        <div className="mb-6 flex items-center gap-2.5 px-0.5 md:mb-8 md:gap-3 md:px-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-slate-800 dark:text-violet-300 md:h-10 md:w-10">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-[18px] w-[18px] md:h-5 md:w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8.5 3.5h5l4 4v11a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z" />
              <path d="M13.5 3.5v4h4" />
              <path d="M9.5 11.5h5" />
              <path d="M9.5 15h5" />
            </svg>
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Receipt Flow
            </p>
            <p className="text-xs uppercase tracking-[0.28em] text-violet-500">
              Workspace
            </p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center justify-center gap-3 rounded-2xl px-2.5 py-2.5 text-left transition md:justify-start md:px-3 md:py-3 ${
                  isActive
                    ? 'bg-violet-600 text-white shadow-[0_18px_32px_-20px_rgba(124,58,237,0.9)]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-violet-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-violet-300'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl border text-sm font-semibold md:h-10 md:w-10 ${
                      isActive
                        ? 'border-white/25 bg-white/15 text-white'
                        : 'border-slate-200 bg-white text-violet-600 dark:border-slate-700 dark:bg-slate-800 dark:text-violet-300'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="hidden text-sm font-medium tracking-tight md:block">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
