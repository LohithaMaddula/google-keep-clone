import axios from 'axios'
import { useState } from 'react'
import PropTypes from 'prop-types'
import toast from 'react-hot-toast'

function EditModal({ note }) {
  const [open, isOpen] = useState(false)
  const [title, setTitle] = useState(note.title)
  const [desc, setDesc] = useState(note.description)

  const handleEdit = async () => {
    try {
      const user = await note.user
      const noteId = await note._id
      const {data} = await axios.patch(`/api/edit/${user}/${noteId}`, { title, desc, user })
      if (data.success) toast.success(data.success)
      else toast.error(data.message)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <div className='flex flex-col justify-between gap-4'>
        <input
          type='text'
          placeholder='Title'
          className='outline-0'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder='Text'
          className='outline-0'
          name='desc'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className='bg-red-400' onClick={() => isOpen(false)}>
          close
        </button>
        <button className='bg-green-400' onClick={() => handleEdit()}>
          Edit
        </button>
        <div>
          <div className='flex'>
            <div className='p-2 bg-red-500 rounded-full' />
            <div className='p-2 bg-green-500 rounded-full' />
            <div className='p-2 bg-white rounded-full' />
            <div className='p-2 bg-blue-500 rounded-full' />
          </div>
        </div>
      </div>
    </div>
  )
}

EditModal.propTypes = {
  note: PropTypes.object,
}

export default EditModal
