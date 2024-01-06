import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import Loading from '../components/Loading'

function Bin() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  const getNotes = async () => {
    try {
      const user = localStorage.getItem('user')
      const { data } = await axios.get(`/api/bin/${user}`)
      setNotes(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getNotes()
  }, [])

  const handleDelete = async (noteId) => {
    try {
      const { data } = await axios.delete(`/api/delete/${noteId}`)
      if (data.success) toast.success(data.success)
      else toast.error(data.message)
      getNotes()
    } catch (error) {
      console.log(error)
    }
  }

  const handleRestore = async (noteId, action) => {
    try {
      const { data } = await axios.patch(`/api/manage/${noteId}/${action}`)
      if (data.success) toast.success(data.success)
      else toast.error(data.message)
      getNotes()
    } catch (error) {
      console.log(error)
    }
  }

  setTimeout(() => {
    setLoading(false)
  }, 1000)

  return (
    <div className='flex-grow p-4'>
      {loading ? (
        <div className='flex items-center h-full'>
          <Loading />
        </div>
      ) : notes.length < 1 ? (
        <div className='flex items-center justify-center h-full transition duration-300'>
          <h1 className='text-xl font-bold text-gray-500'>Nothing :)</h1>
        </div>
      ) : (
        <NoteCard
          notes={notes}
          handleDelete={handleDelete}
          handleRestore={handleRestore}
          filterBy={'bin'}
        />
      )}
    </div>
  )
}

export default Bin
