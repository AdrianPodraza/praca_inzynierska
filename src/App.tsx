import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Signin from './pages/Sign-in'
import Signup from './pages/Sign-up'
import Home from './pages/Home'
import Appoitment from './pages/Appoitment'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/appoitment' element={<Appoitment />} />
        <Route path='/' element={<Home />} />{' '}
      </Routes>
    </Router>
  )
}

export default App
