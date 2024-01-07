import { useState } from 'react'
import toast from 'react-hot-toast'
import PropTypes from 'prop-types'

function TimePicker({ setModal, note }) {

  const [time, setTime] = useState('')
  const title = note.title.substring(0, 20) + (note.title.length > 20 ? '...' : '')
  const desc = note.description.substring(0, 40) + (note.description.length > 40 ? '...' : '')

  const handleNotification = async () => {
    try {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        const notification = new Notification(title, {
          body: desc,
          icon: 'keep.png',
        })

        notification.onclick = function () {
          window.location.href = `${import.meta.env.VITE_CLIENT_URL}/reminders` // Redirects in the current tab/window
        }
      } else {
        toast.error('Some error occurred')
        console.log('This browser does not support notifications.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = () => {
    try {
      // Assuming the input is in the format HH:mm
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
        toast.success(`Set a reminder on ${time}`)
        setModal(false)
        setTimeout(() => {
          toast.success('You have a reminder!')
          handleNotification()
        }, timeDifference)
      } else {
        toast.error('Invalid time!')
        console.error('Invalid time')
      }
    } catch (error) {
      console.error(error)
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
}

export default TimePicker
