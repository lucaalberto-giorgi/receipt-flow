import { Outlet } from 'react-router-dom'
import MobileBottomNav from './MobileBottomNav'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

function Layout() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Sidebar />

      <div className="pl-0 md:pl-[18rem]">
        <div className="flex min-h-screen min-w-0 flex-col px-3 py-3 pb-24 sm:px-6 sm:py-5 md:pb-5">
          <Topbar />

          <main className="mt-4 min-w-0 flex-1">
            <Outlet />
          </main>
        </div>
      </div>

      <MobileBottomNav />
    </div>
  )
}

export default Layout
