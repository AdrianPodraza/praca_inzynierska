import { useState, useEffect } from 'react'
import axios from 'axios'

type UserAppointment = {
  _id: string
  date: string
  time: string
  approved: boolean
}

function UserAppointments() {
  const [appointments, setAppointments] = useState<UserAppointment[]>([])

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        'http://localhost:4000/appointments/user-appointments',
        {
          withCredentials: true,
        },
      )

      const sortedAppointments = response.data.appointments.sort(
        (a: UserAppointment, b: UserAppointment) => {
          const dateA = new Date(`${a.date}T${a.time}`)
          const dateB = new Date(`${b.date}T${b.time}`)
          return dateA.getTime() - dateB.getTime()
        },
      )
      setAppointments(sortedAppointments)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      await axios.delete(
        `http://localhost:4000/appointments/appointment/${appointmentId}/delete`,
        {
          withCredentials: true,
        },
      )
      fetchAppointments()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  return (
    <div className='w-full max-w-[960px] p-5'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-4xl font-black'>Twoje wizyty</h1>
      </div>

      {appointments.length > 0 ? (
        <ul className='space-y-4'>
          {appointments.map(appointment => (
            <li
              key={appointment._id}
              className={`border p-4 rounded-xl ${
                appointment.approved ? 'border-[#4caf50]' : 'border-[#ff9800]'
              }`}
            >
              <div className='flex justify-between items-center'>
                <div>
                  <h3 className='text-lg font-semibold'>
                    {formatDate(appointment.date)} - {appointment.time}
                  </h3>
                  <p className='text-sm text-[#647987]'>
                    {appointment.approved ? 'Potwierdzona' : 'Oczekująca'}
                  </p>
                </div>
                <div>
                  {!appointment.approved && (
                    <button
                      onClick={() => handleCancelAppointment(appointment._id)}
                      className='text-red-500 text-sm'
                    >
                      Anuluj wizytę
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nie masz żadnych umówionych wizyt.</p>
      )}
    </div>
  )
}

export default UserAppointments
