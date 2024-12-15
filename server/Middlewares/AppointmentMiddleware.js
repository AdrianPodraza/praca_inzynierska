const Appointment = require('../Models/Appointment')

const appointmentVerification = async (req, res, next) => {
  const { date, time } = req.body

  try {
    if (!date || !time) {
      return res.status(400).json({ message: 'Data i godzina są wymagane' })
    }

    const existingAppointment = await Appointment.findOne({ date, time })
    if (existingAppointment) {
      return res.status(409).json({ message: 'Ten termin jest już zajęty' })
    }

    next()
  } catch (error) {
    console.error('Błąd podczas weryfikacji terminu:', error)
    res
      .status(500)
      .json({ message: 'Wystąpił błąd serwera podczas weryfikacji terminu' })
  }
}

module.exports = { appointmentVerification }
