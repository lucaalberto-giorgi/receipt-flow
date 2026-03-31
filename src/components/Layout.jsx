import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Sidebar />

      <div className="pl-28 md:pl-[19rem]">
        <div className="flex min-h-screen flex-col px-4 py-4 sm:px-5 sm:py-5">
          <Topbar />

          <main className="mt-4 flex-1 rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_24px_48px_-38px_rgba(15,23,42,0.18)] dark:border-slate-700 dark:bg-slate-900 sm:p-7">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout
