import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import useAuth from '../hooks/useAuth'
import moment from 'moment'
import { TbPinnedFilled } from 'react-icons/tb'
import { RiUnpinFill } from 'react-icons/ri'
import { FaTrash } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'
import EditModal from '../components/EditModal'

function Home() {
  const auth = useAuth()
  const [open, isOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [notes, setNotes] = useState([])
  const [modal, setModal] = useState(false)
  const [modalNoteId, setModalNoteId] = useState(null)

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post('/api/create', { title, desc, user: auth })
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
    <div className='w-full h-screen'>
      <h1>Welcome</h1>
      <div className='flex justify-center'>
        <div className='w-4/6 overflow-hidden bg-gray-100 border border-gray-200 rounded-md shadow-xl'>
          {open ? (
            <div className='flex flex-col justify-between gap-4'>
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
              <button className='bg-red-400' onClick={() => isOpen(false)}>
                close
              </button>
              <button className='bg-green-400' onClick={handleSubmit}>
                Submit
              </button>
              <div>
                <div className='flex'>
                  <div className='p-2 bg-red-500 rounded-full' />
                  <div className='p-2 bg-green-500 rounded-full' />
                  <div className='p-2 bg-white rounded-full' />
                  <div className='p-2 bg-blue-500 rounded-full' />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div
                className='flex items-center h-10 ml-6 text-gray-600 cursor-text'
                onClick={() => isOpen(true)}
              >
                Take a note...
              </div>
            </>
          )}
        </div>
      </div>
      <div className='p-3'>
        {notes.some((note) => note.isPinned) && <h2>PINNED</h2>}
        <div className='grid grid-cols-4 gap-5 '>
          {notes
            .filter((data) => data.isPinned)
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .map((data, index) => (
              <div
                key={index}
                className='p-3 transition-all duration-500 bg-red-300 rounded hover:shadow-2xl'
              >
                <h1 className='text-xl font-bold'>{data.title}</h1>
                <p className='whitespace-pre-line'>{data.description}</p>
                <p className='text-sm'>Edited {moment(data.updatedAt).fromNow()}</p>
                <button
                  className='p-2 mt-5 bg-red-600 rounded'
                  onClick={() => handleBin(data._id, 'toBin')}
                >
                  <FaTrash />
                </button>
                {data.isPinned ? (
                  <button
                    className='p-2 mt-5 bg-green-600 rounded'
                    onClick={() => handlePin(data._id, 'notPinned')}
                  >
                    <RiUnpinFill />
                  </button>
                ) : (
                  <button
                    className='p-2 mt-5 bg-green-600 rounded'
                    onClick={() => handlePin(data._id, 'isPinned')}
                  >
                    <TbPinnedFilled />
                  </button>
                )}
              </div>
            ))}
        </div>
        {notes.some((note) => note.isPinned) && <h1>OTHERS</h1>}
        <div className='grid grid-cols-4 gap-5 '>
          {notes
            .filter((data) => !data.isPinned)
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .map((data, index) => (
              <div
                key={index}
                className='p-3 transition-all duration-500 bg-red-300 rounded hover:shadow-2xl'
              >
                <h1 className='text-xl font-bold'>{data.title}</h1>
                <p className='whitespace-pre-line'>{data.description}</p>
                <p className='text-sm'>Edited {moment(data.updatedAt).fromNow()}</p>
                <button
                  className='p-2 mt-5 bg-red-600 rounded'
                  onClick={() => handleBin(data._id, 'toBin')}
                >
                  <FaTrash />
                </button>
                {data.isPinned ? (
                  <button
                    className='p-2 mt-5 bg-green-600 rounded'
                    onClick={() => handlePin(data._id, 'notPinned')}
                  >
                    <RiUnpinFill />
                  </button>
                ) : (
                  <button
                    className='p-2 mt-5 bg-green-600 rounded'
                    onClick={() => handlePin(data._id, 'isPinned')}
                  >
                    <TbPinnedFilled />
                  </button>
                )}
                <button
                  className='p-2 mt-5 rounded bg-cyan-600'
                  onClick={() => {
                    setModalNoteId(data._id)
                    setModal(!modal)
                  }}
                >
                  <FaEdit />
                </button>
                {modal && modalNoteId === data._id && <EditModal note={data} />}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Home
