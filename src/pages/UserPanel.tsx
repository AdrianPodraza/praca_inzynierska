import { useNavigate } from 'react-router-dom'

function UserPanel() {
  const navigate = useNavigate()

  return (
    <div className='w-full max-w-[960px] p-5'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-4xl font-black'>Panel użytkownika</h1>
      </div>

      <div className='bg-white rounded-xl p-6 shadow-sm'>
        <div className='space-x-4'>
          <button
            className='h-10 px-4 bg-[#f0f3f4] text-sm font-bold rounded-xl'
            onClick={() => navigate('/user-profile/edit')}
          >
            Edytuj dane
          </button>
          <button
            className='h-10 px-4 bg-[#f0f3f4] text-sm font-bold rounded-xl'
            onClick={() => navigate('/user-profile/appointments')}
          >
            Twoje wizyty
          </button>
          <button
            className='h-10 px-4 bg-[#f0f3f4] text-sm font-bold rounded-xl'
            onClick={() => navigate('/user-profile/change-password')}
          >
            Zmień hasło
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserPanel
