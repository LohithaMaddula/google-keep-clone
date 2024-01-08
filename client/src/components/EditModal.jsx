import axios from 'axios'
import { useState } from 'react'
import PropTypes from 'prop-types'
import toast from 'react-hot-toast'
import Themes from './Themes'
import useAuth from '../hooks/useAuth'
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6'
import Checkbox from './Checkbox'
import CollabInput from './CollabInput'

function EditModal({ note, setModal, fetchNotes }) {
  const [title, setTitle] = useState(note.title)
  const [desc, setDesc] = useState(note.description)
  const [theme, setTheme] = useState(note.theme)
  const [collaborators, setCollaborators] = useState(note.collaborators)
  const [isPublic, setIsPublic] = useState(note.isPublic)
  const auth = useAuth()
  const iconSize = 32

  const handleEdit = async () => {
    try {
      const user = await note.user
      const noteId = await note._id
      if (
        note.title === title &&
        note.description === desc &&
        note.theme === theme &&
        note.collaborators === collaborators &&
        note.isPublic === isPublic
      ) {
        toast.success('No changes made')
        setModal(false)
        return
      }
      const { data } = await axios.patch(`/api/edit/${user}/${noteId}`, {
        title,
        desc,
        user,
        theme,
        collaborators,
        isPublic,
      })
      if (data.success) {
        toast.success(data.success)
        setModal(false)
        fetchNotes()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={`flex flex-col justify-between p-4 gap-4 bg-${theme}`}>
      <input
        type='text'
        placeholder='Title'
        className={`outline-0 text-lg bg-${theme} placeholder-gray-800`}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <textarea
        placeholder='Take a note...'
        className={`outline-0 bg-${theme} placeholder-gray-800`}
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
      />
      {note.user === auth && (
        <CollabInput collaborators={collaborators} setCollaborators={setCollaborators} />
      )}
      <Themes setTheme={setTheme} />
      <div className='flex justify-between'>
        <button
          className='transition duration-300 hover:scale-110'
          onClick={() => setModal(false)}
          title='Close'
        >
          <FaCircleXmark size={iconSize} />
        </button>
        {note.user === auth && <Checkbox isPublic={isPublic} setIsPublic={setIsPublic} />}
        <button
          className='transition duration-300 hover:scale-110'
          onClick={() => {
            handleEdit()
            setModal(false)
          }}
          title='Create'
        >
          <FaCircleCheck size={iconSize} />
        </button>
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
