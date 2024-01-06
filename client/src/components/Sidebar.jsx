// import { GiHamburgerMenu } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { FaRegLightbulb } from 'react-icons/fa'
import { FaRegTrashAlt } from 'react-icons/fa'

function Sidebar() {
  const iconSize = 22
  return (
    <div className='flex flex-col flex-grow max-w-14 min-w-14 transition-all duration-500'>
      <div className='flex flex-col items-center justify-center gap-2 overflow-hidden transition-all duration-300'>
        {/* <GiHamburgerMenu /> */}
        <Link to={'/'} className='p-4 hover:scale-105 transition-all duration-300'>
          <FaRegLightbulb size={iconSize} />
          {/* <span className=''>Notes</span> */}
        </Link>
        <Link to={'/bin'} className='p-4 hover:scale-105 transition-all duration-300 '>
          <FaRegTrashAlt size={iconSize} />
          {/* <span className=''>Bin</span> */}
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
