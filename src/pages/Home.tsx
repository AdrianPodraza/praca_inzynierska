import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios, { AxiosResponse } from 'axios'
import { ToastContainer, toast } from 'react-toastify'

interface ServerResponse {
  status: boolean
  user: string
}

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [cookies, , removeCookie] = useCookies(['token'])
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    const verifyCookie = async (): Promise<void> => {
      if (!cookies.token) {
        navigate('/login')
        return
      }

      try {
        const { data }: AxiosResponse<ServerResponse> = await axios.post(
          'http://localhost:4000',
          {},
          { withCredentials: true },
        )

        const { status, user } = data
        setUsername(user)

        if (status) {
          toast(`Hello ${user}`, {
            position: 'top-right',
          })
        } else {
          removeCookie('token')
          navigate('/login')
        }
      } catch (error) {
        console.error('Verification error:', error)
        removeCookie('token')
        navigate('/login')
      }
    }

    verifyCookie()
  }, [cookies, navigate, removeCookie])

  const Logout = (): void => {
    removeCookie('token')
    navigate('/signup')
  }

  return (
    <>
      <div>
        <h4>
          {' '}
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  )
}

export default Home
