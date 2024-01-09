import { useRef, useState } from 'react'
import Themes from './Themes'
import PropTypes from 'prop-types'
import { FaCircleXmark, FaCircleCheck } from 'react-icons/fa6'
import Checkbox from './Checkbox'
import CollabInput from './CollabInput'
import { motion } from 'framer-motion'
import useClickOutside from '../hooks/useClickOutside'

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
  handleClear,
}) {
  const divRef = useRef(null)
  const [open, setOpen] = useState(false)
  const iconSize = 32

  useClickOutside(divRef, () => {
    setOpen(false)
  })

  return (
    <motion.div
      className='w-4/6 overflow-hidden border border-gray-200 rounded-md shadow-md bg-gray-50'
      title='Add note'
      layout
      ref={divRef}
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
          <CollabInput
            collaborators={collaborators}
            setCollaborators={setCollaborators}
            isInput={true}
          />
          <div className='flex flex-col md:flex-row justify-between gap-1'>
            <Themes setTheme={setTheme} setOpen={setOpen} />
            <div className='flex flex-grow justify-between lg:pl-8 gap-0.5'>
              <button
                className='transition duration-300 hover:scale-110'
                onClick={() => setOpen(!open)}
                title='Close'
              >
                <FaCircleXmark size={iconSize} />
              </button>
              <Checkbox isPublic={isPublic} setIsPublic={setIsPublic} />
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
        </div>
      ) : (
        <>
          <div
            className='flex items-center h-10 ml-6 text-gray-600 transition-all duration-500 cursor-text'
            onClick={() => {
              setOpen(!open)
              handleClear()
            }}
          >
            Take a note...
          </div>
        </>
      )}
    </motion.div>
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
  handleClear: PropTypes.func,
}

export default InputField
