import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

type UserData = {
  email: string
  username: string
  phoneNumber: string
}

function EditUserProfile() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<UserData>({
    email: '',
    username: '',
    phoneNumber: '',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/user/profile', {
        withCredentials: true,
      })
      setFormData(response.data.user)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.put(
        'http://localhost:4000/user/profile',
        formData,
        { withCredentials: true },
      )
      setError('')
      navigate('/user-profile') // Przekierowanie po zapisaniu zmian
    } catch (error) {
      setError('Błąd podczas aktualizacji danych')
    }
  }

  return (
    <div className='w-full max-w-[960px] p-5'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-4xl font-black'>Edytuj dane użytkownika</h1>
      </div>

      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4'>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div>
            <label className='text-sm text-[#647987] block mb-1'>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              className='w-full h-10 px-3 border rounded-xl'
            />
          </div>
          <div>
            <label className='text-sm text-[#647987] block mb-1'>
              Nazwa użytkownika
            </label>
            <input
              type='text'
              name='username'
              value={formData.username}
              onChange={handleInputChange}
              className='w-full h-10 px-3 border rounded-xl'
            />
          </div>
          <div>
            <label className='text-sm text-[#647987] block mb-1'>
              Numer telefonu
            </label>
            <input
              type='tel'
              name='phoneNumber'
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className='w-full h-10 px-3 border rounded-xl'
            />
          </div>
        </div>
        <div className='flex justify-end'>
          <button
            type='submit'
            className='h-10 px-4 bg-green-500 text-white text-sm font-bold rounded-xl'
          >
            Zapisz zmiany
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditUserProfile
