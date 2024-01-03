import toast from "react-hot-toast"
import { Link } from "react-router-dom"

function Navbar() {
  const handleLogout = async () => {
    try {
      localStorage.removeItem('user')
      toast.success('Logged out success!')
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <header className='flex justify-between bg-gray-400'>
      <Link to={'/'}>Google Keep Clone</Link>
      <button onClick={() => handleLogout()}>Logout</button>
    </header>
  )
}

export default Navbar