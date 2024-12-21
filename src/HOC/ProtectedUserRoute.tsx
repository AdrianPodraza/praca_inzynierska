import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import axios from 'axios'

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get('http://localhost:4000/auth/verify', {
          withCredentials: true,
        })
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Verification error:', error)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    verifyUser()
  }, [])

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500' />
      </div>
    )
  }

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' replace />
}

export default ProtectedRoute
