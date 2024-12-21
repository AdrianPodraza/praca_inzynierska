import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Logout = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    axios
      .post('http://localhost:4000/auth/logout', {}, { withCredentials: true })
      .then(response => {
        console.log(response.data.message) // "Logged out successfully"
        navigate('/login') // Przekierowanie na stronę logowania
      })
      .catch(error => {
        console.error('Error during logout:', error)
      })
  }

  return (
    <button
      onClick={handleLogout}
      className='bg-red-500 text-white py-2 px-4 rounded-md'
    >
      Wyloguj się
    </button>
  )
}

export default Logout
