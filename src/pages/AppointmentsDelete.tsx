import { useState, useEffect } from 'react'
import axios from 'axios'

type Appointment = {
  _id: string
  date: string
  time: string
  approved: boolean
  phoneNumber: string
  email: string
}
type ApiResponse = {
  success: boolean
  appointments: Appointment[]
}

function AppointmentsDelete() {
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    axios
      .get<ApiResponse[]>('http://localhost:4000/appointments/appointments', {
        withCredentials: true,
      })
      .then(response => {
        const approvedAppointments = response.data.appointments
          .filter(appointment => appointment.approved)
          .sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`)
            const dateB = new Date(`${b.date}T${b.time}`)
            return dateA.getTime() - dateB.getTime()
          })
        setAppointments(approvedAppointments)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }, [])

  function handleCancel(id: string) {
    axios
      .delete(`http://localhost:4000/appointments/appointment/${id}/delete`, {
        withCredentials: true,
      })
      .then(() => {
        setAppointments(
          appointments.filter(appointment => appointment._id !== id),
        )
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const groupedAppointments = appointments.reduce(
    (groups: { [key: string]: Appointment[] }, appointment) => {
      const date = appointment.date.split('T')[0]
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(appointment)
      return groups
    },
    {},
  )

  return (
    <div className='flex flex-1 justify-center py-5'>
      <div className='w-full max-w-[960px] p-5'>
        <h1 className='text-4xl font-black mb-6'>
          Zarządzanie potwierdzonymi wizytami
        </h1>

        {Object.keys(groupedAppointments).length > 0 ? (
          <div className='space-y-8'>
            {Object.entries(groupedAppointments).map(
              ([date, dayAppointments]) => (
                <div key={date} className='bg-white rounded-xl p-6 shadow-sm'>
                  <h2 className='text-2xl font-bold mb-4'>
                    {formatDate(date)}
                  </h2>
                  <ul className='space-y-6'>
                    {dayAppointments.map(appointment => (
                      <li
                        key={appointment._id}
                        className='border-b border-gray-100 last:border-0 pb-6 last:pb-0'
                      >
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-4'>
                          <div>
                            <p className='text-sm text-[#647987]'>Czas</p>
                            <p className='text-sm font-medium'>
                              {appointment.time}
                            </p>
                          </div>
                          <div>
                            <p className='text-sm text-[#647987]'>Status</p>
                            <p className='text-sm font-medium text-green-500'>
                              Potwierdzona
                            </p>
                          </div>
                          <div>
                            <p className='text-sm text-[#647987]'>
                              Numer telefonu
                            </p>
                            <p className='text-sm font-medium'>
                              {appointment.phoneNumber}
                            </p>
                          </div>
                          <div>
                            <p className='text-sm text-[#647987]'>Email</p>
                            <p className='text-sm font-medium'>
                              {appointment.email}
                            </p>
                          </div>
                        </div>
                        <div className='flex justify-end'>
                          <button
                            className='h-10 px-4 bg-red-500 text-white text-sm font-bold rounded-xl'
                            onClick={() => handleCancel(appointment._id)}
                          >
                            Anuluj wizytę
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            )}
          </div>
        ) : (
          <p className='text-gray-500'>Brak potwierdzonych wizyt.</p>
        )}
      </div>
    </div>
  )
}

export default AppointmentsDelete
