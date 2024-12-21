import { useState, useEffect } from 'react'
import axios from 'axios'

type Patient = {
  _id: string
  name: string
  phoneNumber: string
  email: string
  address: string
}

type ApiResponse = {
  success: boolean
  patients: Patient[]
}

function PatientsAll() {
  const [patients, setPatients] = useState<Patient[]>([])

  useEffect(() => {
    axios
      .get<ApiResponse>('http://localhost:4000/user/patients', {
        withCredentials: true,
      })
      .then(response => {
        if (response.data.success && response.data.patients) {
          setPatients(response.data.patients)
        }
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }, [])

  return (
    <div className='flex flex-1 justify-center py-5'>
      <div className='w-full max-w-[960px] p-5'>
        <h1 className='text-4xl font-black mb-6'>Lista wszystkich pacjentów</h1>

        {patients.length > 0 ? (
          <div className='space-y-8'>
            {patients.map(patient => (
              <div
                key={patient._id}
                className='bg-white rounded-xl p-6 shadow-sm'
              >
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                  <div>
                    <p className='text-sm text-[#647987]'>Imię i nazwisko</p>
                    <p className='text-sm font-medium'>{patient.name}</p>
                  </div>
                  <div>
                    <p className='text-sm text-[#647987]'>Numer telefonu</p>
                    <p className='text-sm font-medium'>{patient.phoneNumber}</p>
                  </div>
                  <div>
                    <p className='text-sm text-[#647987]'>Email</p>
                    <p className='text-sm font-medium'>{patient.email}</p>
                  </div>
                  <div>
                    <p className='text-sm text-[#647987]'>Adres</p>
                    <p className='text-sm font-medium'>{patient.address}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-gray-500'>Brak pacjentów do wyświetlenia.</p>
        )}
      </div>
    </div>
  )
}

export default PatientsAll
