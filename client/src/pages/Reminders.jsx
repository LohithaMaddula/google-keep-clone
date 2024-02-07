import useAuth from '../hooks/useAuth'
import axios from 'axios'
import { useEffect, useState } from 'react'
import NoteCard from '../components/NoteCard'

function Reminders() {
  const auth = useAuth()
  const [notes, setNotes] = useState([])
  const reminders = JSON.parse(localStorage.getItem('reminders'))
  const [filteredNotes, setFilteredNotes] = useState([])

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

  const filterNotes = () => {
    const filtered = notes.filter((note) =>
      reminders?.some((reminder) => reminder.noteId === note._id)
    )
    setFilteredNotes(filtered)
  }

  useEffect(() => {
    fetchNotes()
    // eslint-disable-next-line
  }, [auth])

  useEffect(() => {
    filterNotes()
    // eslint-disable-next-line
  }, [notes])

  return (
    <div className='w-full pt-4 p-2'>
      {filterNotes.length === 0 ? (
        <div className='flex items-center justify-center h-full transition duration-300'>
          <h1 className='text-xl font-bold text-gray-500'>No Reminders for now!</h1>
        </div>
      ) : (
        <NoteCard notes={filteredNotes} fetchNotes={fetchNotes} filterBy={'reminder'} />
      )}
    </div>
  )
}

export default Reminders
