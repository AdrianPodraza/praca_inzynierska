import React, { useEffect, useState } from 'react'
import Logo from '../assets/Logo.svg'
import { Link } from 'react-router-dom'
import Logout from './LogoutButton'
import axios from 'axios'

type ApiResponse = {
  success: boolean
  message: string
}

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    axios
      .get<ApiResponse>('http://localhost:4000/auth/verify', {
        withCredentials: true,
      })
      .then(response => {
        setIsLoggedIn(true)
      })
      .catch(error => {
        console.error(
          'Error:',
          error.response ? error.response.data : error.message,
        )
        setIsLoggedIn(false)
      })
  }, [])

  return (
    <nav className='flex justify-between px-11 py-6 w-full h-fit items-center bg-[#FFF2CC]'>
      <img className='w-16' src={Logo} alt='Logo' />
      <div className='flex gap-3'>
        {!isLoggedIn ? (
          <>
            <Link
              to='/login'
              className='p-4 rounded-lg text-white bg-blue-500 hover:bg-blue-700 transition-all duration-100 text-lg'
            >
              Zaloguj się!
            </Link>
            <Link
              to='/signup'
              className='p-4 bg-blue-300 rounded-lg text-white hover:bg-blue-500 transition-all text-lg duration-100'
            >
              Zarejestruj się!
            </Link>
          </>
        ) : (
          <>
            {/* Dodane przyciski "Umów wizytę" i "Panel użytkownika" */}
            <Link
              to='/appointment'
              className='p-4 rounded-lg text-white bg-green-500 hover:bg-green-700 transition-all duration-100 text-lg'
            >
              Umów wizytę
            </Link>
            <Link
              to='/user-profile'
              className='p-4 rounded-lg text-white bg-blue-500 hover:bg-blue-700 transition-all duration-100 text-lg'
            >
              Panel użytkownika
            </Link>
            {/* Przycisk wylogowania */}
            <Logout />
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
