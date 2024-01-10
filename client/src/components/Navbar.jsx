import toast from 'react-hot-toast'

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
    <header className='flex justify-between p-3 '>
      <img
        src='/keep.png'
        alt='keep'
        className='h-8 transition-all duration-300 cursor-pointer hover:drop-shadow-xl'
      />
      <h1 className='text-2xl font-bold text-gray-600 transition-all duration-200 cursor-pointer hover:text-black'>
        Google Keep
      </h1>
      <button
        onClick={() => handleLogout()}
        className='px-2 transition-all duration-300 rounded hover:bg-gray-100'
      >
        Logout
      </button>
    </header>
  )
}

export default Navbar
