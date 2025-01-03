import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Signin from './pages/Sign-in'
import Signup from './pages/Sign-up'
import Home from './pages/Home'
import AdminPanel from './pages/AdminPanel'
import AppointmentsApprove from './pages/AppointmentsApprove'
import AppointmentsDelete from './pages/AppointmentsDelete'
import AppointmentsAll from './pages/AppointmentsAll'
import AdminProtectedRoute from './HOC/ProtectedAdminRoute'
import UserProtectedRoute from './HOC/ProtectedUserRoute'
import Appoitment from './pages/Appointment'
import UserPanel from './pages/UserPanel'
import VerifyEmail from './pages/VerifyEmail'
import PatientsAll from './pages/PatientAll'
import EditUserProfile from './pages/EditUserProfile'
import UserAppointments from './pages/UserAppointments'
import EditUserPassword from './pages/EditUserPassword'
import AdminAddAppointment from './pages/AdminAddAppointment'
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/verify-email' element={<VerifyEmail />} />

        <Route path='/' element={<Home />} />
        <Route element={<UserProtectedRoute />}>
          <Route path='/user-profile' element={<UserPanel />}>
            <Route path='/user-profile/edit' element={<EditUserProfile />} />
            <Route
              path='/user-profile/appointments'
              element={<UserAppointments />}
            />
            <Route
              path='/user-profile/change-password'
              element={<EditUserPassword />}
            />
          </Route>
          <Route path='/appointment' element={<Appoitment />} />
        </Route>

        <Route element={<AdminProtectedRoute />}>
          <Route path='/admin-panel' element={<AdminPanel />}>
            <Route
              path='appointment-approve'
              element={<AppointmentsApprove />}
            />
            <Route path='appointment-add' element={<AdminAddAppointment />} />

            <Route path='appointment-delete' element={<AppointmentsDelete />} />
            <Route path='appointment-all' element={<AppointmentsAll />} />
            <Route path='patient-all' element={<PatientsAll />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
