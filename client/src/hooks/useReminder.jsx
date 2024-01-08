import axios from 'axios'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import useAuth from './useAuth'

function useReminder() {
  const auth = useAuth()
  const [reminders, setReminders] = useState([])
  const [trigger, setTrigger] = useState(false)

  const triggerElement = () => {
    setTrigger(!trigger)
  }

  const fetchReminders = async () => {
    try {
      const storedReminders = localStorage.getItem('reminders')
      if (storedReminders) {
        const parsedReminders = await JSON.parse(storedReminders)
        const currentTimestamp = new Date().getTime()
        const filteredReminders = parsedReminders.filter(
          (reminder) => new Date(reminder.notificationTime).getTime() > currentTimestamp
        )
        // Update state with filtered reminders
        setReminders(filteredReminders)
        // Update local storage with filtered reminders
        localStorage.setItem('reminders', JSON.stringify(filteredReminders))
        const remindersToDelete = parsedReminders.filter(
          (reminder) => new Date(reminder.notificationTime).getTime() <= currentTimestamp
        )
        // Delete each reminder from the server
        await Promise.all(
          remindersToDelete.map(async (reminder) => {
            try {
              await axios.delete(`/api/deleteReminder/${reminder.noteId}`)
            } catch (error) {
              console.error(`Failed to delete reminder with noteId ${reminder.noteId}`, error)
            }
          })
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleNotification = async (title, desc) => {
    try {
      if (!('Notification' in window)) {
        toast.error('Your browser does not support notifications.')
        return
      }

      const parsedTitle = title.substring(0, 20) + (title.length > 20 ? '...' : '')
      const parsedDesc = desc.substring(0, 40) + (desc.length > 40 ? '...' : '')
      const permission = await Notification.requestPermission()

      if (permission === 'granted') {
        const notification = new Notification(parsedTitle, {
          body: parsedDesc,
          icon: 'keep.png',
        })

        notification.onclick = function () {
          window.location.href = `${import.meta.env.VITE_CLIENT_URL}/reminders`
        }
      } else if (permission === 'denied') {
        toast.error("Notification permission denied. You won't receive reminders.")
      } else {
        toast.error('Error requesting notification permission.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteReminder = async (noteId) => {
    try {
      await axios.delete(`/api/deleteReminder/${noteId}`)
      handleDeleteLocalStorage(noteId)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteLocalStorage = async (noteId) => {
    try {
      const existingRemindersString = localStorage.getItem('reminders')
      let existingReminders = existingRemindersString ? JSON.parse(existingRemindersString) : []
      existingReminders = existingReminders.filter((reminder) => reminder.noteId !== noteId)
      localStorage.setItem('reminders', JSON.stringify(existingReminders))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const pushNotifications = async () => {
      try {
        if (reminders.length < 1) return null

        reminders?.forEach((reminder) => {
          const { noteId, notificationTime } = reminder
          const currentTime = new Date()
          const timeDifference = new Date(notificationTime) - currentTime

          if (timeDifference > 0) {
            const timeout = setTimeout(async () => {
              toast.success('You have a reminder!')
              const { data } = await axios.get(`/api/note/${auth}/${noteId}`)
              handleNotification(data.title, data.description)
              await handleDeleteReminder(noteId)
            }, timeDifference)

            const reminderWithTimeout = { ...reminder, timeout }
            const storedReminders = JSON.parse(localStorage.getItem('reminders')) || []
            // Remove the old reminder from local storage
            const updatedReminders = storedReminders.filter((r) => r.noteId !== reminder.noteId)
            // Add the reminder with timeout to the array
            const newReminders = [...updatedReminders, reminderWithTimeout]
            localStorage.setItem('reminders', JSON.stringify(newReminders))
          } else {
            toast.error('Invalid time!')
            console.error('Invalid time')
          }
        })
      } catch (error) {
        console.error(error)
      }
    }

    pushNotifications()

    return () => {
      reminders.forEach((reminder) => {
        clearTimeout(reminder.timeout)
      })
    }
    // eslint-disable-next-line
  }, [reminders, auth])

  useEffect(() => {
    return () => {
      // console.count('count')
      fetchReminders()
    }
  }, [trigger])

  return { fetchReminders, triggerElement }
}

export default useReminder
