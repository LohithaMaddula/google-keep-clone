import { GiHamburgerMenu } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { FaRegLightbulb } from 'react-icons/fa'
import { IoIosNotifications } from 'react-icons/io'
import { FaRegTrashAlt } from 'react-icons/fa'

function Sidebar() {
  return (
    <div className='flex flex-col w-20 overflow-hidden transition-all duration-500 bg-red-500 hover:w-52 h-80'>
      <div className='flex flex-col items-center justify-center '>
        <GiHamburgerMenu />
        <Link to={'/'} className='flex items-center justify-center p-4 bg-green-500'>
          <FaRegLightbulb />
          <span className=''>Notes</span>
        </Link>
        <Link to={'/'} className='flex items-center justify-center p-4 bg-green-500'>
          <IoIosNotifications />
          <span className=''>Reminder</span>
        </Link>
        <Link to={'/bin'} className='flex items-center justify-center p-4 bg-green-500'>
          <FaRegTrashAlt />
          <span className=''>Bin</span>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
