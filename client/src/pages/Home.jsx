import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import useAuth from '../hooks/useAuth'
import NoteCard from '../components/NoteCard'
import InputField from '../components/InputField'

function Home() {
  const auth = useAuth()
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [theme, setTheme] = useState('white')
  const [collaborators, setCollaborators] = useState([])
  const [isPublic, setIsPublic] = useState(false)
  const [notes, setNotes] = useState([])
  const [collabNotes, setCollabNotes] = useState([])

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post('/api/create', {
        title,
        desc,
        user: auth,
        theme,
        collaborators,
        isPublic,
      })
      if (data.success) toast.success(data.success)
      else toast.error(data.message)
      fetchNotes()
    } catch (error) {
      toast.error(error.response.data.error)
      console.error(error)
    }
  }

  const handleClear = () => {
    setTitle('')
    setDesc('')
    setTheme('white')
    setCollaborators([])
    setIsPublic(false)
  }

  const fetchNotes = async () => {
    try {
      if (auth) {
        const { data } = await axios.get(`/api/notes/${auth}`)
        setNotes(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fetchCollabs = async () => {
    try {
      if (auth) {
        const { data } = await axios.get(`/api/collabed/${auth}`)
        setCollabNotes(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCollabs()
    fetchNotes()
    //eslint-disable-next-line
  }, [auth])

  const handleBin = async (noteId, action) => {
    try {
      const { data } = await axios.patch(`/api/manage/${noteId}/${action}`)
      if (data.success) toast.success(data.success)
      else toast.error(data.message)
      fetchNotes()
    } catch (error) {
      console.error(error)
    }
  }

  const handlePin = async (noteId, action) => {
    try {
      const { data } = await axios.patch(`/api/pin/${noteId}/${action}`)
      if (data.success) toast.success(data.success)
      else toast.error(data.message)
      fetchNotes()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='w-full pt-3'>
      <div className='flex justify-center pt-2 pb-4'>
        <InputField
          theme={theme}
          setTheme={setTheme}
          setTitle={setTitle}
          setDesc={setDesc}
          handleSubmit={handleSubmit}
          collaborators={collaborators}
          setCollaborators={setCollaborators}
          isPublic={isPublic}
          setIsPublic={setIsPublic}
          handleClear={handleClear}
        />
      </div>
      {notes.length < 1 && collabNotes.length < 1 && (
        <div className='flex items-center justify-center flex-grow h-80'>
          <h1 className='text-xl font-bold text-gray-500'>No notes ;)</h1>
        </div>
      )}
      <div className='p-3'>
        {notes.some((note) => note.isPinned) && <h2 className='pb-3'>PINNED</h2>}
        <NoteCard
          notes={notes}
          handleBin={handleBin}
          handlePin={handlePin}
          filterBy={'pinned'}
          fetchNotes={fetchNotes}
        />
        {notes.some((note) => note.isPinned) && <h1 className='py-3'>OTHERS</h1>}
        <NoteCard
          notes={notes}
          handleBin={handleBin}
          handlePin={handlePin}
          filterBy={'notes'}
          fetchNotes={fetchNotes}
        />
        {collabNotes.length > 0 && (
          <>
            <h1 className='py-3'>COLLABS</h1>
            <NoteCard notes={collabNotes} />
          </>
        )}
      </div>
    </div>
  )
}

export default Home
