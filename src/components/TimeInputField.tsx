import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

type InputType = {
  label: string
  name: string
  value: string
  onChange: React.ChangeEventHandler<HTMLSelectElement>
  children?: React.ReactNode
  selectedDate: string
}

function TimeInputField({
  label,
  onChange,
  name,
  value,
  selectedDate,
}: InputType) {
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!selectedDate) return
      setIsLoading(true)
      try {
        const response = await axios.get(
          'http://localhost:4000/appointments/available-slots',
          {
            params: { date: new Date(selectedDate).toISOString() },
            withCredentials: true,
          },
        )

        if (response.data && response.data.availableTimes) {
          setAvailableTimes(response.data.availableTimes)
        } else {
          toast.error('Nieprawidłowy format danych z serwera')
        }
      } catch (error) {
        console.error('Error fetching slots:', error)
        toast.error('Nie udało się pobrać dostępnych terminów')
        setAvailableTimes([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchAvailableSlots()
  }, [selectedDate])

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!availableTimes.includes(e.target.value)) {
      toast.error('Ten termin nie jest już dostępny')
      return
    }
    onChange(e)
  }

  return (
    <>
      <div className='flex flex-col gap-2'>
        <label htmlFor={label} className='font-bold'>
          {label}:
        </label>
        <div className='relative'>
          <select
            id={label}
            className='w-full appearance-none rounded-full border-2 border-gray-400 px-[30px] py-3 pr-10'
            name={name}
            required
            value={value}
            onChange={handleTimeChange}
            disabled={!selectedDate || isLoading}
          >
            <option value=''>
              {isLoading ? 'Ładowanie...' : 'Wybierz godzinę'}
            </option>
            {availableTimes && availableTimes.length > 0 ? (
              availableTimes.map(time => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))
            ) : (
              <option value='' disabled>
                Brak dostępnych terminów
              </option>
            )}
          </select>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default TimeInputField
