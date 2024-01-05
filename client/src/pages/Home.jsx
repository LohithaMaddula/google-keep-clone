import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import useAuth from '../hooks/useAuth'
import NoteCard from '../components/NoteCard'
import Themes from '../components/Themes'

function Home() {
  const auth = useAuth()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [notes, setNotes] = useState([])
  const [theme, setTheme] = useState('white')

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post('/api/create', { title, desc, user: auth, theme })
      if (data.success) toast.success(data.success)
      else toast.error(data.message)
      fetchNotes()
    } catch (error) {
      toast.error(error.response.data.error)
      console.error(error)
    }
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

  useEffect(() => {
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
    <div className='w-full h-screen pt-3 bg-white'>
      <div className='flex justify-center'>
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
      </div>
      <div className='p-3'>
        {notes.some((note) => note.isPinned) && <h2>PINNED</h2>}
        <NoteCard notes={notes} handleBin={handleBin} handlePin={handlePin} filterBy={'pinned'} />
        {notes.some((note) => note.isPinned) && <h1>OTHERS</h1>}
        <NoteCard
          notes={notes}
          handleBin={handleBin}
          handlePin={handlePin}
          filterBy={'notes'}
          fetchNotes={fetchNotes}
        />
      </div>
    </div>
  )
}

export default Home
