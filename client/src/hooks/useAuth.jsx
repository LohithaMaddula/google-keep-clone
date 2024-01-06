import { useEffect, useState } from "react"

function useAuth() {

 const [auth, setAuth] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      const userInput = prompt('Enter your email')
      if (userInput) {
        setAuth(userInput)
        localStorage.setItem('user', userInput)
      } else {
        alert('Email is required. Please refresh and enter your email.')
      }
    } else {
      setAuth(storedUser)
    }
  }, [])

  return auth
}

export default useAuth