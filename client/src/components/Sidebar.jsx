import { NavLink } from 'react-router-dom'
import { FaBell, FaRegLightbulb } from 'react-icons/fa'
import { FaRegTrashAlt } from 'react-icons/fa'

function Sidebar() {
  const iconSize = 22
  return (
    <div className='flex flex-col flex-grow transition-all duration-500 max-w-14 min-w-14'>
      <div className='flex flex-col items-center justify-center gap-2 overflow-hidden transition-all duration-300'>
        <NavLink
          to='/'
          className={({ isActive }) =>
            `p-3 transition-all duration-300 hover:scale-105 rounded-full ${
              isActive ? 'bg-yellow-200' : ''
            }`
          }
          title='Notes'
        >
          <FaRegLightbulb size={iconSize} />
          {/* <span className=''>Notes</span> */}
        </NavLink>
        <NavLink
          to='/reminders'
          className={({ isActive }) =>
            `p-3 transition-all duration-300 hover:scale-105 rounded-full ${
              isActive ? 'bg-yellow-200' : ''
            }`
          }
          title='Notes'
        >
          <FaBell size={iconSize} />
          {/* <span className=''>Notes</span> */}
        </NavLink>
        <NavLink
          to='/bin'
          className={({ isActive }) =>
            `p-3 transition-all duration-300 hover:scale-105 rounded-full ${
              isActive ? 'bg-yellow-200' : ''
            }`
          }
          title='Bin'
        >
          <FaRegTrashAlt size={iconSize} />
          {/* <span className=''>Bin</span> */}
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
