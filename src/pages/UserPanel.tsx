import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.svg'
import { Outlet } from 'react-router-dom'

function UserPanel() {
  return (
    <div className='flex flex-col'>
      <div className='flex border-b  border-solid border-[#f0f3f4] px-10 py-3'>
        <div className='flex items-center gap-4 text-[#111517] w-full justify-between'>
          <Link to='/'>
            <img className='w-16' src={Logo} alt='Wp logo' />
          </Link>
          <nav>
            <ul className='flex gap-8 items-center'>
              <li>
                <Link to='edit'>Edytuj dane</Link>
              </li>
              <li>
                <Link to='appointments'>Umówione wizyty </Link>
              </li>
              <li>
                <Link to='change-password'>Zmień hasło</Link>
              </li>
              <li>
                <Link to='/appointment'>Umów wizyte</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className='flex  w-full justify-center'>
        <Outlet />
      </div>
    </div>
  )
}

export default UserPanel

// <div className='w-full max-w-[960px] p-5'>
//   <div className='flex justify-between items-center mb-6'>
//     <h1 className='text-4xl font-black'>Panel użytkownika</h1>
//   </div>

//   <div className='bg-white rounded-xl p-6 shadow-sm'>
//     <div className='space-x-4'>
//       <button
//         className='h-10 px-4 bg-[#f0f3f4] text-sm font-bold rounded-xl'
//         onClick={() => navigate('/user-profile/edit')}
//       >
//         Edytuj dane
//       </button>
//       <button
//         className='h-10 px-4 bg-[#f0f3f4] text-sm font-bold rounded-xl'
//         onClick={() => navigate('/user-profile/appointments')}
//       >
//         Twoje wizyty
//       </button>
//       <button
//         className='h-10 px-4 bg-[#f0f3f4] text-sm font-bold rounded-xl'
//         onClick={() => navigate('/user-profile/change-password')}
//       >
//         Zmień hasło
//       </button>
//     </div>
//   </div>
// </div>
