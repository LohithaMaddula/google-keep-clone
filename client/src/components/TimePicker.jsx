import { useState } from 'react'
import useReminder from '../hooks/useReminder'
import toast from 'react-hot-toast'
import PropTypes from 'prop-types'
import axios from 'axios'

function TimePicker({ note, setModal, fetchNotes }) {
  const [time, setTime] = useState('')
  const { fetchReminders } = useReminder()

  const handleSubmit = async () => {
    try {
      const noteId = note._id
      const [hours, minutes] = time.split(':')
      const currentTime = new Date()
      const notificationTime = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate(),
        parseInt(hours),
        parseInt(minutes),
        0
      )

      const timeDifference = notificationTime - currentTime

      if (timeDifference > 0) {
        await axios.put(`/api/setReminder/${noteId}`, { timestamp: notificationTime })
        setModal(false)
        handleLocalStorage(noteId, notificationTime)
        toast.success(`Setting a reminder on ${time}`)
        fetchReminders()
        fetchNotes()
      } else {
         toast.error('Invalid time!')
         console.error('Invalid time')
      }
    } catch (error) {
      console.error(error)
    }
  }

  // eslint-disable-next-line no-unused-vars
  const handleLocalStorage = async (noteId, notificationTime) => {
    try {
      const existingRemindersString = localStorage.getItem('reminders')
      const existingReminders = existingRemindersString ? JSON.parse(existingRemindersString) : []
      // Add the new reminder to the existing reminders
      const newReminderData = { noteId: noteId, notificationTime: notificationTime }
      const updatedReminders = [...existingReminders, newReminderData]
      // Store the updated reminders back in localStorage
      localStorage.setItem('reminders', JSON.stringify(updatedReminders))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col justify-between p-4 gap-4 bg-white'>
      <h1>Set your time</h1>
      <input type='time' onChange={(e) => setTime(e.target.value)} className='text-xl' />
      <button
        onClick={() => handleSubmit()}
        className='p-1 bg-violet-300 hover:bg-violet-400 rounded transition duration-300'
      >
        Set Reminder
      </button>
    </div>
  )
}

TimePicker.propTypes = {
  setModal: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired,
  fetchNotes: PropTypes.func,
}

export default TimePicker
