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
} = require('../Controllers/AppointmentController')

router.post(
  '/appointment',
  userVerification,
  appointmentVerification,
  CreateAppointment,
)
router.get('/appointments', GetAppointments)
router.put('/appointment/:id/approve', ApproveAppointment)
router.delete('/appointment/:id', DeleteAppointment)
router.get('/available-slots', FilterAppointments)

module.exports = router
