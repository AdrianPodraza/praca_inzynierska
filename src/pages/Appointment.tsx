import React, { useState, ChangeEvent, FormEvent } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import TimeInputField from '../components/TimeInputField'
import backgroundImage from '../assets/background.png'
import { FaHome } from 'react-icons/fa'
import { useCookies } from 'react-cookie'

import DateInputField from '../components/DateInputField'
type InputValues = {
  time: string
  date: string
}

function Appoitment() {
  const [cookies, , removeCookie] = useCookies(['token'])
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState<InputValues>({
    time: '',
    date: '',
  })
  const [error, setError] = useState<string | null>(null)

  const { date, time } = inputValue

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
    navigate('/')
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    try {
      const response = await axios.post(
        'http://localhost:4000/appointments/appointment',
        { date, time },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        },
      )
      if (response.data.success) {
        handleSuccess(response.data.message)
      } else {
        handleError(response.data.message)
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
    setInputValue({ time: '', date: '' })
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
              <b>Umawianie wizyty</b>
            </span>
          </div>

          {error && <div className='text-red-500'>{error}</div>}

          <DateInputField
            label='Data wizyty'
            type='date'
            name='date'
            value={date}
            onChange={handleOnChange}
          ></DateInputField>

          <TimeInputField
            label='godzina wizyty'
            name='time'
            value={time}
            selectedDate={date}
            onChange={handleOnChange}
          ></TimeInputField>

          <button className='grid place-items-center rounded-full bg-green-400 p-3 font-bold text-white'>
            Umów wizyte
          </button>
        </div>
      </form>
    </div>
  )
}

export default Appoitment
