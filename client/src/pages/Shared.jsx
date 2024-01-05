import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

function Shared() {
  const [shared, setShared] = useState()
  const { noteId } = useParams()

  useEffect(() => {
    const fetchSharedNote = async () => {
      try {
        const { data } = await axios.get(`/api/shared/${noteId}`)
        setShared(data)
      } catch (error) {
        toast.error(error.response.data.message)
        console.error(error)
      }
    }
    return () => fetchSharedNote()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId])

  return (
    <div className='flex flex-grow justify-center items-center'>
      {shared ? (
        <div
          className={`h-3/6 w-3/6 bg-${shared.theme} p-4 rounded-md shadow-md hover:shadow-xl border transition duration-300`}
        >
          <h1 className='text-lg font-semibold'>{shared.title}</h1>
          <p className='text-gray-700 whitespace-pre-line'>{shared.description}</p>
        </div>
      ) : (
        <div className='h-3/6 w-3/6 flex flex-col justify-around items-center bg-gray-100 p-4 rounded-md shadow-sm hover:shadow-xl border transition duration-300'>
          <h1 className='text-lg font-semibold'>Note not found!</h1>
          <p className='text-gray-700 whitespace-pre-line'>Maybe private🤔</p>
        </div>
      )}
    </div>
  )
}

export default Shared
