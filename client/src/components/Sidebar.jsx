// import { GiHamburgerMenu } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { FaRegLightbulb } from 'react-icons/fa'
import { FaRegTrashAlt } from 'react-icons/fa'

function Sidebar() {
  return (
    <div className='flex flex-col flex-grow max-w-20 transition-all duration-500 bg-red-300'>
      <div className='flex flex-col items-center justify-center '>
        {/* <GiHamburgerMenu /> */}
        <Link to={'/'} className='flex items-center justify-center p-4 '>
          <FaRegLightbulb />
          {/* <span className=''>Notes</span> */}
        </Link>
        <Link to={'/bin'} className='flex items-center justify-center p-4 '>
          <FaRegTrashAlt />
          {/* <span className=''>Bin</span> */}
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
