import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'

function Bin() {
  const [notes, setNotes] = useState([])

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

  return <NoteCard notes={notes} handleDelete={handleDelete} handleRestore={handleRestore} />
}

export default Bin
