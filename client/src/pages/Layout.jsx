import { Outlet } from 'react-router-dom'
import Navbar from './../components/Navbar'
import Sidebar from '../components/Sidebar'

function Layout() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex flex-grow'>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
