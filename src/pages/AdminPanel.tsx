import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.svg'
import { Outlet } from 'react-router-dom'

function AdminPanel() {
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
                <Link to='appointment-approve'>Potwierdź wizytę</Link>
              </li>
              <li>
                <Link to='appointment-delete'>Anuluj wizytę</Link>
              </li>
              <li>
                <Link to='appointment-add'>Dodaj wizyte</Link>
              </li>
              <li>
                <Link to='appointment-all'>Wszystkie wizyty</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <Outlet />
    </div>
  )
}

export default AdminPanel
