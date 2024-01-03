import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Bin from './pages/Bin'
import Layout from './pages/Layout'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'

axios.defaults.baseURL = 'http://localhost:8080'
// axios.defaults.withCredentials = true

function App() {
  return (
    <>
      <Toaster
        position='top-center'
        toastOptions={{
          // duration: 4000,
          style: {
            borderRadius: '10px',
            background: '#2b3440',
            color: '#ffffff',
          },
        }}
      />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/bin' element={<Bin />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
