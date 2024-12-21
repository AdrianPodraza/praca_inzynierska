import React from 'react'

import { ToastContainer } from 'react-toastify'
import Navbar from '../components/Navbar'

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div></div>
      <ToastContainer />
    </>
  )
}

export default Home
