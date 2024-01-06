import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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
  }, [])

  return (
    <div className='flex items-center justify-center flex-grow'>
      {shared ? (
        <div
          className={`flex flex-col bg-${shared.theme} justify-between w-3/6 p-4 overflow-auto break-words transition duration-300 border rounded-md shadow-md group h-3/6 hover:shadow-xl`}
        >
          <div>
            <h1 className='overflow-auto text-lg font-semibold break-words'>{shared.title}</h1>
            <p className='text-gray-700 break-all whitespace-pre-line'>{shared.description}</p>
          </div>
          <div>
            <p className='text-xs text-gray-900 transition duration-300 opacity-0 group-hover:opacity-100'>
              *created by {shared.user}
            </p>
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-around w-3/6 p-4 transition duration-300 bg-gray-100 border rounded-md shadow-sm h-3/6 hover:shadow-xl'>
          <h1 className='text-lg font-semibold'>Note not found!</h1>
          <p className='text-gray-700 whitespace-pre-line'>Maybe private🤔</p>
          <Link
            className='p-2 text-white transition-all duration-300 bg-indigo-500 rounded hover:scale-110'
            to='/'
          >
            Go Home
          </Link>
        </div>
      )}
    </div>
  )
}

export default Shared
