import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', icon: 'D', to: '/' },
  { label: 'Upload Receipt', icon: 'U', to: '/upload-receipt' },
  { label: 'Expenses', icon: 'E', to: '/expenses' },
  { label: 'Categories', icon: 'C', to: '/categories' },
  { label: 'Settings', icon: 'S', to: '/settings' },
]

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 w-24 p-4 md:w-80 md:p-6">
      <div className="flex h-full flex-col rounded-[28px] border border-white/90 bg-white/92 p-4 shadow-[0_24px_50px_-38px_rgba(15,23,42,0.35)] backdrop-blur md:p-5">
        <div className="mb-8 flex items-center gap-3 px-1">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-sm font-semibold text-white shadow-[0_18px_30px_-18px_rgba(124,58,237,0.8)]">
            RF
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-semibold tracking-tight text-slate-900">
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
                `flex items-center justify-center gap-3 rounded-2xl px-3 py-3 text-left transition md:justify-start ${
                  isActive
                    ? 'bg-violet-600 text-white shadow-[0_18px_32px_-20px_rgba(124,58,237,0.9)]'
                    : 'text-slate-600 hover:bg-violet-50 hover:text-violet-700'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-semibold ${
                      isActive
                        ? 'border-white/25 bg-white/15 text-white'
                        : 'border-violet-100 bg-white text-violet-600'
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
