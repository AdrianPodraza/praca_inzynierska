import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import InputField from '../components/InputField'
import backgroundImage from '../assets/background.png'
import { FaUser, FaHome } from 'react-icons/fa'
import { IoEyeSharp } from 'react-icons/io5'

type InputValues = {
  email: string
  password: string
}

type ServerResponse = {
  success: boolean
  message: string
  user?: {
    email: string
    username: string
    isAdmin: boolean
  }
}

const Signin: React.FC = () => {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState<InputValues>({
    email: '',
    password: '',
  })
  const [error, setError] = useState<string | null>(null)

  const { email, password } = inputValue

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setInputValue({
      ...inputValue,
      [name]: value,
    })
  }

  const handleError = (err: string): void => {
    setError(err)
    toast.error(err, {
      position: 'bottom-left',
    })
  }

  const handleSuccess = (msg: string): void => {
    toast.success(msg, {
      position: 'bottom-left',
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      const { data }: AxiosResponse<ServerResponse> = await axios.post(
        'http://localhost:4000/auth/login',
        {
          ...inputValue,
        },
        { withCredentials: true },
      )

      const { success, message } = data
      if (success) {
        handleSuccess(message)

        try {
          const adminCheck = await axios.get(
            'http://localhost:4000/auth/verify-admin',
            {
              withCredentials: true, // Wysyłanie ciasteczka z tokenem
            },
          )

          setTimeout(() => {
            if (adminCheck.data.isAdmin) {
              navigate('/admin-panel')
            } else {
              navigate('/')
            }
          }, 1000)
        } catch (error) {
          setTimeout(() => {
            navigate('/')
          }, 1000)
        }
      } else {
        handleError(message)
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        handleError(
          error.response?.data?.message ||
            error.message ||
            'Wystąpił błąd sieciowy',
        )
      } else {
        handleError('Wystąpił nieoczekiwany błąd')
      }
      console.error('Error:', error)
    }
    setInputValue({
      email: '',
      password: '',
    })
  }

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '100vw',
      }}
      className='flex items-center'
    >
      <form onSubmit={handleSubmit}>
        <div className='flex w-[600px] flex-col gap-7 rounded-xl border-2 border-solid border-black bg-white p-20'>
          <div className='flex flex-col items-center'>
            <div className='grid h-9 w-9 place-items-center rounded-full border-2 border-solid border-black'>
              <Link to='/'>
                <FaHome className='h-6 w-6 text-yellow-300' />
              </Link>
            </div>
            <span>
              <b>Logowanie</b>
            </span>
          </div>

          {error && <div className='text-red-500'>{error}</div>}

          <InputField
            label='e-mail lub nr-tel'
            type='text'
            name='email'
            value={email}
            onChange={handleOnChange}
          >
            <FaUser className='absolute right-5 top-1/2 -translate-y-1/2' />
          </InputField>

          <InputField
            label='hasło'
            type='password'
            name='password'
            value={password}
            onChange={handleOnChange}
          >
            <IoEyeSharp className='absolute right-5 top-1/2 -translate-y-1/2' />
          </InputField>
          <p className='-mt-7 place-self-end'>
            Nie masz konta?{' '}
            <Link to='/signup' className='text-blue-500 underline'>
              Zarejestruj się!
            </Link>
          </p>

          <button className='grid place-items-center rounded-full bg-green-400 p-3 font-bold text-white'>
            Zaloguj
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  )
}

export default Signin
