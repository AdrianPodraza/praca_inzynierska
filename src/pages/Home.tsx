import React from 'react'

import { ToastContainer } from 'react-toastify'
import Navbar from '../components/Navbar'
import ContactUs from './ContactUs'

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <ContactUs />
      <ToastContainer />
    </>
  )
}

export default Home
