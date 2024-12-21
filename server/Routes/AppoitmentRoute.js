const { userVerification } = require('../Middlewares/AuthMiddleware')
const router = require('express').Router()
exports.router = router
const {
  appointmentVerification,
} = require('../Middlewares/AppointmentMiddleware')
const {
  CreateAppointment,
  GetAppointments,
  ApproveAppointment,
  DeleteAppointment,
  FilterAppointments,
  userAppointments,
  adminAppointmentAdd,
} = require('../Controllers/AppointmentController')

router.post(
  '/appointment',
  userVerification,
  appointmentVerification,
  CreateAppointment,
)
router.get('/appointments', userVerification, GetAppointments)
router.put('/appointment/:id/approve', userVerification, ApproveAppointment)
router.delete('/appointment/:id/delete', userVerification, DeleteAppointment)
router.get('/available-slots', userVerification, FilterAppointments)
router.get('/user-appointments', userVerification, userAppointments)
router.post('/admin-appointment-add', userVerification, adminAppointmentAdd)

module.exports = router
