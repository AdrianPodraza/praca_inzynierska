import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

const VerifyEmail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState<string | null>(null)
  const [isVerified, setIsVerified] = useState<boolean | null>(null)

  // Wyciągamy token z query string
  const getQueryParams = (param: string) => {
    const urlParams = new URLSearchParams(location.search)
    return urlParams.get(param)
  }
  const token = getQueryParams('token')

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:4000/auth/verify-email?token=${token}`)
        .then(response => {
          setIsVerified(true)
          setError(null) // Wyczyść błąd
        })
        .catch(error => {
          // Obsługa błędu
          setIsVerified(false)
          setError(error.response?.data?.message || 'Błąd weryfikacji')
        })
    }
  }, [token, navigate])

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-96'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          Weryfikacja Konta
        </h2>
        {isVerified === null ? (
          <>
            <p className='text-gray-700 mb-4'>
              Trwa weryfikacja Twojego konta...
            </p>
            <div className='flex justify-center items-center'>
              <div className='animate-spin rounded-full border-t-4 border-blue-500 w-12 h-12 border-solid'></div>
            </div>
          </>
        ) : isVerified ? (
          <p className='text-green-500 mb-4'>
            Twoje konto zostało pomyślnie zweryfikowane!
          </p>
        ) : (
          <>
            <p className='text-red-500 mb-4'>{error}</p>
            <p className='text-gray-700'>
              Proszę spróbować ponownie lub skontaktować się z pomocą
              techniczną.
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default VerifyEmail
