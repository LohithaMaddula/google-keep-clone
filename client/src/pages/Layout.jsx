import { Outlet } from 'react-router-dom'
import Navbar from './../components/Navbar'
import Sidebar from '../components/Sidebar'

function Layout() {
  return (
    <div className='min-h-screen'>
      <Navbar />
      <div className='flex h-full'>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
