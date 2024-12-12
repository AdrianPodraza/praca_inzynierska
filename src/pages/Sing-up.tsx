import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { ToastContainer, toast } from 'react-toastify'

type InputValues = {
  email: string
  password: string
  username: string
}

type ServerResponse = {
  success: boolean
  message: string
}

const Signup: React.FC = () => {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState<InputValues>({
    email: '',
    password: '',
    username: '',
  })

  const { email, password, username } = inputValue

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
      position: 'bottom-right',
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      const { data }: AxiosResponse<ServerResponse> = await axios.post(
        'http://localhost:4000/signup',
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
    } catch (error) {
      console.log(error)
    }
    setInputValue({
      email: '',
      password: '',
      username: '',
    })
  }

  return (
    <div className='form_container'>
      <h2>Signup Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            value={email}
            placeholder='Enter your email'
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            name='username'
            value={username}
            placeholder='Enter your username'
            onChange={handleOnChange}
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
          />
        </div>
        <button type='submit'>Submit</button>
        <span>
          Already have an account? <Link to={'/login'}>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Signup
