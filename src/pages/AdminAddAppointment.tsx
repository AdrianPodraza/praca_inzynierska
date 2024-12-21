import { useState } from 'react'
import axios from 'axios'

function AdminAddAppointment() {
  const [patientName, setPatientName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await axios.post(
        'http://localhost:4000/admin/appointments',
        {
          patientName,

          date,
          time,
          notes,
        },
        { withCredentials: true },
      )
      setSuccessMessage('Wizyta została dodana pomyślnie.')
      setErrorMessage('')
      setPatientName('')

      setDate('')
      setTime('')
      setNotes('')
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || 'Błąd podczas dodawania wizyty.',
      )
      setSuccessMessage('')
    }
  }

  return (
    <div className='w-full max-w-[960px] p-5'>
      <h1 className='text-4xl font-black mb-6'>Dodaj nową wizytę</h1>

      {successMessage && (
        <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-4'>
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4'>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='text-sm text-[#647987] block mb-1'>
            Imię i nazwisko pacjenta
          </label>
          <input
            type='text'
            value={patientName}
            onChange={e => setPatientName(e.target.value)}
            className='w-full h-10 px-3 border rounded-xl'
            required
          />
        </div>

        <div>
          <label className='text-sm text-[#647987] block mb-1'>
            Data wizyty
          </label>
          <input
            type='date'
            value={date}
            onChange={e => setDate(e.target.value)}
            className='w-full h-10 px-3 border rounded-xl'
            required
          />
        </div>
        <div>
          <label className='text-sm text-[#647987] block mb-1'>
            Godzina wizyty
          </label>
          <input
            type='time'
            value={time}
            onChange={e => setTime(e.target.value)}
            className='w-full h-10 px-3 border rounded-xl'
            required
          />
        </div>
        <div>
          <label className='text-sm text-[#647987] block mb-1'>Notatki</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className='w-full h-20 px-3 border rounded-xl'
          />
        </div>
        <div className='flex justify-end'>
          <button
            type='submit'
            className='h-10 px-4 bg-green-500 text-white text-sm font-bold rounded-xl'
          >
            Dodaj wizytę
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminAddAppointment
