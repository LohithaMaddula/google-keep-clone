import axios from 'axios'
import { useState } from 'react'
import PropTypes from 'prop-types'
import toast from 'react-hot-toast'
import Themes from './Themes'

function EditModal({ note, fetchNotes, setModal }) {
  const [title, setTitle] = useState(note.title)
  const [desc, setDesc] = useState(note.description)
  const [theme, setTheme] = useState(note.theme)

  const handleEdit = async () => {
    try {
      const user = await note.user
      const noteId = await note._id
      if (note.title === title && note.description === desc && note.theme === theme) {
        toast.success('No changes made')
        setModal(false)
        return
      }
      const { data } = await axios.patch(`/api/edit/${user}/${noteId}`, {
        title,
        desc,
        user,
        theme,
      })
      if (data.success) {
        toast.success(data.success)
        fetchNotes()
        setModal(false)
      } else toast.error(data.message)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <div className={`flex flex-col justify-between gap-4 p-2 mt-2 bg-${theme}`}>
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
        <button className='bg-red-400' onClick={() => setModal(false)}>
          close
        </button>
        <button className='bg-green-400' onClick={() => handleEdit()}>
          Edit
        </button>
        <Themes setTheme={setTheme} />
      </div>
    </div>
  )
}

EditModal.propTypes = {
  note: PropTypes.object,
  fetchNotes: PropTypes.func,
  setModal: PropTypes.func,
}

export default EditModal
