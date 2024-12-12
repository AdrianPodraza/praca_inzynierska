import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { ToastContainer, toast } from 'react-toastify'

type InputValues = {
  email: string
  password: string
}

type ServerResponse = {
  success: boolean
  message: string
}

const Signin: React.FC = () => {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState<InputValues>({
    email: '',
    password: '',
  })

  const { email, password } = inputValue

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setInputValue({
      ...inputValue,
      [name]: value,
    })
  }

  const handleError = (err: string): void => {
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
        'http://localhost:4000/login',
        {
          ...inputValue,
        },
        { withCredentials: true },
      )

      const { success, message } = data
      if (success) {
        handleSuccess(message)
        setTimeout(() => {
          navigate('/')
        }, 1000)
      } else {
        handleError(message)
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        handleError(
          'Network error: ' + (error.response?.data.message || error.message),
        )
      } else {
        handleError('Unexpected error occurred.')
      }
      console.error('Error:', error)
    }
    setInputValue({
      email: '',
      password: '',
    })
  }

  return (
    <div>
      <h2>Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            value={email}
            placeholder='Enter your email'
            onChange={handleOnChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            placeholder='Enter your password'
            onChange={handleOnChange}
            required
          />
        </div>
        <button type='submit'>Submit</button>
        <span>
          Already have an account? <Link to='/signup'>Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Signin
