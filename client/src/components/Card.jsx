import moment from 'moment'
import { FaBell, FaBellSlash, FaCopy, FaEdit, FaTrash, FaTrashRestore } from 'react-icons/fa'
import { RiUnpinFill } from 'react-icons/ri'
import { TbPinnedFilled } from 'react-icons/tb'
import EditModal from './EditModal'
import PropTypes from 'prop-types'
import useAuth from '../hooks/useAuth'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Modal from './Modal'
import TimePicker from './TimePicker'
import axios from 'axios'

function Card({
  data,
  index,
  handlePin,
  handleBin,
  fetchNotes,
  handleRestore,
  handleDelete,
  filterBy,
}) {
  const auth = useAuth()
  const iconSize = 20
  const [modal, setModal] = useState(false)
  const [timeModal, setTimeModal] = useState(false)
  const [modalNoteId, setModalNoteId] = useState(null)

  const handleCopyLink = async (id) => {
    try {
      await navigator.clipboard.writeText(`${import.meta.env.VITE_CLIENT_URL}/shared/${id}`)
      toast.success('Link copied to clipboard')
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteReminder = async (noteId) => {
    try {
      await axios.delete(`/api/deleteReminder/${noteId}`)
      toast.success('Removed reminder successfully!')
      handleRemoveLocalStorage(noteId)
      fetchNotes()
    } catch (error) {
      console.error(error)
    }
  }

  const handleRemoveLocalStorage = async (noteId) => {
    try {
      const existingRemindersString = localStorage.getItem('reminders')
      let existingReminders = existingRemindersString ? JSON.parse(existingRemindersString) : []
      // Find the reminder with the specified noteId
      const reminderToRemove = existingReminders.find((reminder) => reminder.noteId === noteId)
      if (reminderToRemove) {
        // Fetch the timeout field
        const { timeout } = reminderToRemove
        // Remove the reminder from the array
        existingReminders = existingReminders.filter((reminder) => reminder.noteId !== noteId)
        // Update local storage
        localStorage.setItem('reminders', JSON.stringify(existingReminders))
        // Use the 'timeout' value as needed
        console.log('Timeout for noteId', noteId, ':', timeout)
        clearTimeout(timeout)
      } else {
        console.warn('Reminder with noteId', noteId, 'not found in local storage')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {auth === data.user ? (
        <div
          key={index}
          className={`group bg-${data.theme} p-4 rounded-md shadow-sm hover:shadow-xl border transition duration-300`}
        >
          <div className='flex justify-between'>
            <h1 className='overflow-auto text-lg font-semibold text-gray-900 break-words'>
              {data.title}
            </h1>
            <div className='transition-all duration-300 opacity-0 group-hover:opacity-100'>
              {!data.isBinned &&
                (data.isPinned ? (
                  <button className='' onClick={() => handlePin(data._id, 'notPinned')}>
                    <RiUnpinFill size={iconSize} />
                  </button>
                ) : (
                  <button className='' onClick={() => handlePin(data._id, 'isPinned')}>
                    <TbPinnedFilled size={iconSize} />
                  </button>
                ))}
            </div>
          </div>
          <p className='text-gray-700 break-words whitespace-pre-line'>{data.description}</p>
          <div className='flex justify-between gap-3 pt-3 transition-all duration-300 opacity-0 group-hover:opacity-100'>
            {filterBy === 'reminder' ? (
              <p className='text-xs transition-all duration-300 opacity-0 group-hover:opacity-100'>
                Reminding {moment(data.reminder).fromNow()}
              </p>
            ) : (
              <p className='text-xs transition-all duration-300 opacity-0 group-hover:opacity-100'>
                Edited {moment(data.updatedAt).fromNow()}
              </p>
            )}

            {data.isBinned ? (
              <>
                <button className='' onClick={() => handleDelete(data._id)}>
                  <FaTrash size={20} />
                </button>
                <button className='' onClick={() => handleRestore(data._id, 'toNotes')}>
                  <FaTrashRestore size={20} />
                </button>
              </>
            ) : (
              <>
                {data.reminder ? (
                  <button onClick={() => handleDeleteReminder(data._id)}>
                    <FaBellSlash size={19} />
                  </button>
                ) : (
                  <button onClick={() => setTimeModal(!timeModal)}>
                    <FaBell />
                  </button>
                )}
                {data.isPublic && (
                  <button onClick={() => handleCopyLink(data._id)}>
                    <FaCopy />
                  </button>
                )}
                <button className='' onClick={() => handleBin(data._id, 'toBin')}>
                  <FaTrash />
                </button>
                <button
                  className=''
                  onClick={() => {
                    setModalNoteId(data._id)
                    setModal(!modal)
                  }}
                >
                  <FaEdit />
                </button>
              </>
            )}
          </div>
          {/* {modal && modalNoteId === data._id && (
               <EditModal note={data} fetchNotes={fetchNotes} setModal={setModal} />
          )} */}
          <Modal modal={timeModal} setModal={setTimeModal}>
            <TimePicker setModal={setTimeModal} note={data} fetchNotes={fetchNotes} />
          </Modal>
          <Modal modal={modal && modalNoteId === data._id} setModal={setModal}>
            <EditModal note={data} fetchNotes={fetchNotes} setModal={setModal} />
          </Modal>
        </div>
      ) : (
        <div
          key={index}
          className={`group bg-${data.theme} p-4 rounded-md shadow-sm hover:shadow-xl border transition duration-300`}
        >
          <h1 className='overflow-auto text-lg font-semibold text-gray-900 break-words'>
            {data.title}
          </h1>
          <p className='text-gray-700 break-words whitespace-pre-line'>{data.description}</p>
          <p className='pt-3 text-xs transition-all duration-300 opacity-0 group-hover:opacity-100'>
            *created by {data.user}
          </p>
          <div className='flex justify-between gap-3 pt-2 transition-all duration-300 opacity-0 group-hover:opacity-100'>
            <p className='text-xs transition-all duration-300 opacity-0 group-hover:opacity-100'>
              Edited {moment(data.updatedAt).fromNow()}
            </p>
            <button
              className=''
              onClick={() => {
                setModalNoteId(data._id)
                setModal(!modal)
              }}
            >
              <FaEdit />
            </button>
          </div>
          <Modal modal={modal && modalNoteId === data._id} setModal={setModal}>
            <EditModal note={data} fetchNotes={fetchNotes} setModal={setModal} />
          </Modal>
        </div>
      )}
    </>
  )
}

Card.propTypes = {
  filterBy: PropTypes.string,
  handleBin: PropTypes.func,
  handlePin: PropTypes.func,
  handleDelete: PropTypes.func,
  handleRestore: PropTypes.func,
  fetchNotes: PropTypes.func,
  data: PropTypes.object,
  index: PropTypes.number,
}

export default Card
