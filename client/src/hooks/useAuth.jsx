import { useEffect, useState } from "react"

function useAuth() {

 const [auth, setAuth] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('user')

    if (!storedUser) {
      // If not, prompt the user to enter their email
      const userInput = prompt('Enter your email')
      if (userInput) {
        setAuth(userInput)
        localStorage.setItem('user', userInput)
      } else {
        // Handle the case where the user cancels the prompt
        alert('Email is required. Please refresh and enter your email.')
      }
    } else {
      // If the user is already in local storage, set it in the state
      setAuth(storedUser)
    }
  }, [])

  return auth
}

export default useAuth