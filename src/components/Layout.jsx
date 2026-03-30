import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

function Layout() {
  return (
    <div className="min-h-screen text-slate-900">
      <Sidebar />

      <div className="pl-24 md:pl-80">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 sm:py-6">
          <Topbar />

          <main className="mt-5 flex-1 rounded-[28px] border border-violet-100/80 bg-white/90 p-5 shadow-[0_28px_60px_-42px_rgba(76,29,149,0.35)] backdrop-blur sm:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout
