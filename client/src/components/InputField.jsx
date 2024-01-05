import { useState } from 'react'
import Themes from './Themes'
import PropTypes from 'prop-types'

function InputField({ theme, setTitle, setDesc, setTheme, handleSubmit }) {
  const [open, setOpen] = useState(false)

  return (
    <div className='w-4/6 overflow-hidden bg-gray-100 border border-gray-200 rounded-md shadow-md'>
      {open ? (
        <div className={`flex flex-col justify-between gap-4 bg-${theme}`}>
          <input
            type='text'
            placeholder='Title'
            className='outline-0'
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder='Text'
            className='outline-0'
            onChange={(e) => setDesc(e.target.value)}
          />
          <Themes setTheme={setTheme} setOpen={setOpen} />
          <button className='bg-red-400' onClick={() => setOpen(false)}>
            close
          </button>
          <button className='bg-green-400' onClick={handleSubmit}>
            Submit
          </button>
        </div>
      ) : (
        <>
          <div
            className='flex items-center h-10 ml-6 text-gray-600 cursor-text'
            onClick={() => setOpen(true)}
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
  handleSubmit: PropTypes.func,
}

export default InputField
