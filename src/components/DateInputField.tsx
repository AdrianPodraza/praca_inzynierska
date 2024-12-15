import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type InputType = {
  label: string
  type: string
  name: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  children?: React.ReactNode
}

function DateInputField({ label, type, onChange, name, value }: InputType) {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const maxDate = new Date()
  maxDate.setDate(maxDate.getDate() + 22)

  const minDateStr = tomorrow.toISOString().split('T')[0]
  const maxDateStr = maxDate.toISOString().split('T')[0]

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value)
    const day = date.getDay()

    if (day === 0 || day === 6) {
      toast.error('Wybierz dzień od poniedziałku do piątku', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      return
    }
    onChange(e)
  }

  return (
    <>
      <div className='flex flex-col gap-2'>
        <label htmlFor={label}>
          <b>{label}:</b>
        </label>
        <div className='relative flex'>
          <input
            id={label}
            className='w-full rounded-full border-2 border-gray-400 px-[30px] py-3'
            type={type}
            placeholder={`Wpisz ${label}:`}
            name={name}
            required
            value={value}
            onChange={type === 'date' ? handleDateChange : onChange}
            min={type === 'date' ? minDateStr : undefined}
            max={type === 'date' ? maxDateStr : undefined}
            onKeyDown={e => e.preventDefault()}
          />
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default DateInputField
