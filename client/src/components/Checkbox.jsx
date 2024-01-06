import { FaLock, FaLockOpen } from 'react-icons/fa'
import PropTypes from 'prop-types'

function Checkbox({ isPublic, setIsPublic }) {
  return (
    <div className='flex items-center' title='Make it public'>
      <input
        type='checkbox'
        id='choose-me'
        className='hidden peer'
        onChange={() => setIsPublic(!isPublic)}
      />
      <label
        htmlFor='choose-me'
        className={`hover:scale-110 p-2 select-none cursor-pointer rounded-full border-2 bg-gray-300 border-gray-800 font-bold text-gray-800 transition-all duration-200 ease-in-out ${
          isPublic
            ? 'peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-800'
            : ''
        }`}
      >
        {isPublic ? <FaLockOpen /> : <FaLock />}
      </label>
    </div>
  )
}

Checkbox.propTypes = {
  isPublic: PropTypes.bool,
  setIsPublic: PropTypes.func,
}

export default Checkbox
