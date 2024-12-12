import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Signin from './pages/Sign-in'
import Signup from './pages/Sing-up'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Home />} />{' '}
      </Routes>
    </Router>
  )
}

export default App
