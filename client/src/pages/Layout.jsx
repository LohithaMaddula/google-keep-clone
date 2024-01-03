import { Outlet } from 'react-router-dom';
import Navbar from './../components/Navbar';
import Sidebar from '../components/Sidebar';

function Layout() {
  return (
    <>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}

export default Layout