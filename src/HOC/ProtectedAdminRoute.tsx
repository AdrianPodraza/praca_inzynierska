import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import axios from 'axios'

const AdminProtectedRoute = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const response = await axios.get(
          'http://localhost:4000/auth/verify-admin',
          {
            withCredentials: true,
          },
        )
        // Sprawdzamy status z odpowiedzi
        setIsAdmin(response.data.status)
      } catch (error) {
        setIsAdmin(false)
      } finally {
        setLoading(false)
      }
    }

    verifyAdmin()
  }, [])

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500' />
      </div>
    )
  }

  return isAdmin ? <Outlet /> : <Navigate to='/' replace />
}

export default AdminProtectedRoute
