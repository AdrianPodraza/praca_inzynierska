import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function EditUserPassword() {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      setError('Nowe hasło i potwierdzenie hasła muszą być takie same.')
      return
    }

    try {
      const response = await axios.put(
        'http://localhost:4000/user/change-password',
        { oldPassword, newPassword },
        { withCredentials: true },
      )
      setSuccessMessage('Hasło zostało zmienione pomyślnie.')
      setError('')
      setTimeout(() => {
        navigate('/user-profile') // Przekierowanie po pomyślnym zaktualizowaniu hasła
      }, 2000)
    } catch (error: any) {
      setError(error.response?.data?.message || 'Błąd podczas zmiany hasła')
      setSuccessMessage('')
    }
  }

  return (
    <div className='w-full max-w-[960px] p-5'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-4xl font-black'>Zmień hasło</h1>
      </div>

      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4'>
          {error}
        </div>
      )}

      {successMessage && (
        <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-4'>
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='text-sm text-[#647987] block mb-1'>
            Stare hasło
          </label>
          <input
            type='password'
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            className='w-full h-10 px-3 border rounded-xl'
          />
        </div>
        <div>
          <label className='text-sm text-[#647987] block mb-1'>
            Nowe hasło
          </label>
          <input
            type='password'
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className='w-full h-10 px-3 border rounded-xl'
          />
        </div>
        <div>
          <label className='text-sm text-[#647987] block mb-1'>
            Potwierdź nowe hasło
          </label>
          <input
            type='password'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className='w-full h-10 px-3 border rounded-xl'
          />
        </div>

        <div className='flex justify-end'>
          <button
            type='submit'
            className='h-10 px-4 bg-green-500 text-white text-sm font-bold rounded-xl'
          >
            Zmień hasło
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditUserPassword
