import Logo from '../assets/Logo.svg'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <nav className='flex justify-between px-11 py-6 w-full h-fit items-center bg-[#FFF2CC]'>
      <img className='w-16' src={Logo} />
      <div className='flex gap-3'>
        <Link
          to='/login'
          className='p-4  rounded-lgtext-white  transition-all duration-100 text-lg text-black  '
        >
          Zaloguj się!
        </Link>
        <Link
          to='/signup'
          className='p-4 bg-blue-300 rounded-lg text-white hover:bg-blue-500 transition-all text-lg duration-100'
        >
          Zarejetru się!
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
