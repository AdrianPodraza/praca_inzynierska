import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { FaUser, FaHome } from 'react-icons/fa'
import { IoEyeSharp } from 'react-icons/io5'
import { BsFillTelephoneFill } from 'react-icons/bs'
import InputField from '../components/InputField'
import backgroundImage from '../assets/background.png'

type InputValues = {
  email: string
  password: string
  username: string
  phoneNumber: string
  confirmPassword: string
}

type ServerResponse = {
  success: boolean
  message: string
}

const Signup: React.FC = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState<InputValues>({
    email: '',
    password: '',
    username: '',
    phoneNumber: '',
    confirmPassword: '',
  })

  const { email, password, username, phoneNumber, confirmPassword } = inputValue

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
      position: 'bottom-right',
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (password !== confirmPassword) {
      handleError('Hasła nie są identyczne')
      return
    }
    try {
      const { data }: AxiosResponse<ServerResponse> = await axios.post(
        'http://localhost:4000/auth/signup',
        {
          email,
          password,
          username,
          phoneNumber,
        },
        { withCredentials: true },
      )

      const { success, message } = data
      if (success) {
        handleSuccess(
          'Rejestracja powiodła się. Sprawdź swoją skrzynkę e-mail w celu potwierdzenia konta.',
        )
        setTimeout(() => {
          navigate('/')
        }, 1000)
      } else {
        handleError(message)
      }
    } catch (error) {
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
      username: '',
      phoneNumber: '',
      confirmPassword: '',
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
              <b>Rejestracja</b>
            </span>
          </div>

          {error && <div className='text-red-500'>{error}</div>}

          <InputField
            label='e-mail'
            type='text'
            name='email'
            value={email}
            onChange={handleOnChange}
          >
            <FaUser className='absolute right-5 top-1/2 -translate-y-1/2' />
          </InputField>

          <InputField
            label='numer telefonu'
            type='text'
            name='phoneNumber'
            value={phoneNumber}
            onChange={handleOnChange}
          >
            <BsFillTelephoneFill className='absolute right-5 top-1/2 -translate-y-1/2' />
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

          <InputField
            label='potwierdzenie hasła'
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleOnChange}
          >
            <IoEyeSharp className='absolute right-5 top-1/2 -translate-y-1/2' />
          </InputField>
          <p className='-mt-7 place-self-end'>
            {' '}
            Masz już konto?
            <Link to='/login' className='text-blue-500 underline'>
              Zaloguj się!
            </Link>
          </p>

          <button className='grid place-items-center rounded-full bg-green-400 p-3 font-bold text-white'>
            Zarejestruj
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Signup
