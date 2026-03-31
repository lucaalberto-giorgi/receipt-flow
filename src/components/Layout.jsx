import { Outlet } from 'react-router-dom'
import MobileBottomNav from './MobileBottomNav'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Sidebar />

      <div className="pl-0 md:pl-[19rem]">
        <div className="flex min-h-screen min-w-0 flex-col px-2 py-2 pb-24 sm:px-5 sm:py-5 sm:pb-24 md:pb-5">
          <Topbar />

          <main className="mt-2 min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_24px_48px_-38px_rgba(15,23,42,0.18)] dark:border-slate-700 dark:bg-slate-900 sm:mt-4 sm:rounded-[28px] sm:p-7">
            <Outlet />
          </main>
        </div>
      </div>

      <MobileBottomNav />
    </div>
  )
}

export default Layout
