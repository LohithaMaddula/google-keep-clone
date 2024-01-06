// import { GiHamburgerMenu } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { FaRegLightbulb } from 'react-icons/fa'
import { FaRegTrashAlt } from 'react-icons/fa'

function Sidebar() {
  const iconSize = 22
  return (
    <div className='flex flex-col flex-grow transition-all duration-500 max-w-14 min-w-14'>
      <div className='flex flex-col items-center justify-center gap-2 overflow-hidden transition-all duration-300'>
        {/* <GiHamburgerMenu /> */}
        <Link to={'/'} className='p-4 transition-all duration-300 hover:scale-105' title='Notes'>
          <FaRegLightbulb size={iconSize} />
          {/* <span className=''>Notes</span> */}
        </Link>
        <Link to={'/bin'} className='p-4 transition-all duration-300 hover:scale-105 ' title='Bin'>
          <FaRegTrashAlt size={iconSize} />
          {/* <span className=''>Bin</span> */}
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
