import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaTrashRestore } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa'

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
      const {data} = await axios.delete(`/api/delete/${noteId}`)
      if (data.success) toast.success(data.success)
      else toast.error(data.message)
      getNotes()
    } catch (error) {
      console.log(error)
    }
  }

  const handleRestore = async (noteId, action) => {
    try {
      const {data} = await axios.patch(`/api/manage/${noteId}/${action}`)
      if (data.success) toast.success(data.success)
      else toast.error(data.message)
      getNotes()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='grid grid-cols-4 transition-all duration-500'>
      {notes?.map((data, index) => (
        <div
          key={index}
          className='p-4 m-4 transition-all duration-500 bg-red-300 rounded hover:shadow-2xl'
        >
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          <div className='flex justify-center gap-6'>
            <button className='' onClick={() => handleDelete(data._id)}>
              <FaTrash size={20}/>
            </button>
            <button className='' onClick={() => handleRestore(data._id, 'toNotes')}>
              <FaTrashRestore size={20}/>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Bin
