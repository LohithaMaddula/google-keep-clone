import { useState } from 'react'
import Themes from './Themes'
import PropTypes from 'prop-types'
import { FaCircleXmark, FaCircleCheck } from 'react-icons/fa6'
import Checkbox from './Checkbox'
import CollabInput from './CollabInput'

function InputField({
  theme,
  setTitle,
  setDesc,
  setTheme,
  collaborators,
  setCollaborators,
  isPublic,
  setIsPublic,
  handleSubmit,
}) {
  const [open, setOpen] = useState(false)
  const iconSize = 30

  return (
    <div
      className='w-4/6 overflow-hidden bg-gray-50 border border-gray-200 rounded-md shadow-md'
      title='Add note'
    >
      {open ? (
        <div className={`flex flex-col justify-between p-3 gap-4 bg-${theme}`}>
          <input
            type='text'
            placeholder='Title'
            className={`outline-0 text-lg bg-${theme} placeholder-gray-800`}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder='Take a note...'
            className={`outline-0 bg-${theme} placeholder-gray-800`}
            onChange={(e) => setDesc(e.target.value)}
            autoFocus
          />
          <CollabInput collaborators={collaborators} setCollaborators={setCollaborators} />
          <div className='flex justify-between'>
            <Themes setTheme={setTheme} setOpen={setOpen} />
            <Checkbox isPublic={isPublic} setIsPublic={setIsPublic} />
            <button
              className='transition duration-300 hover:scale-110'
              onClick={() => setOpen(!open)}
              title='Close'
            >
              <FaCircleXmark size={iconSize} />
            </button>
            <button
              className='transition duration-300 hover:scale-110'
              onClick={() => {
                handleSubmit()
                setOpen(!open)
              }}
              title='Create'
            >
              <FaCircleCheck size={iconSize} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div
            className='flex items-center h-10 ml-6 text-gray-600 cursor-text transition-all duration-500'
            onClick={() => setOpen(!open)}
          >
            Take a note...
          </div>
        </>
      )}
    </div>
  )
}

InputField.propTypes = {
  theme: PropTypes.string,
  setTitle: PropTypes.func,
  setTheme: PropTypes.func,
  setDesc: PropTypes.func,
  isPublic: PropTypes.bool,
  setIsPublic: PropTypes.func,
  setCollaborators: PropTypes.func,
  collaborators: PropTypes.array,
  handleSubmit: PropTypes.func,
}

export default InputField
