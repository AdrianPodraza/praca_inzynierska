const Appointment = require('../Models/Appointment')

module.exports.CreateAppointment = async (req, res, next) => {
  try {
    const { date, time, phoneNumber, email } = req.body
    const existingAppointment = await Appointment.findOne({ date, time })
    if (existingAppointment) {
      return res.json({ message: 'Ten termin jest już zajęty' })
    }
    const appointment = await Appointment.create({ 
      date, 
      time, 
      phoneNumber, 
      email,
      approved: false 
    })
    res
      .status(201)
      .json({ message: 'Wizyta została umówiona pomyślnie', success: true, appointment })
    next()
  } catch (error) {
    console.error(error)
  }
}

module.exports.GetAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find()
    res
      .status(200)
      .json({ success: true, appointments })
    next()
  } catch (error) {
    console.error(error)
  }
}

module.exports.ApproveAppointment = async (req, res, next) => {
  try {
    const { id } = req.params
    const appointment = await Appointment.findById(id)
    if (!appointment) {
      return res.json({ message: 'Nie znaleziono wizyty' })
    }
    appointment.approved = true
    await appointment.save()
    res
      .status(200)
      .json({ message: 'Wizyta została zatwierdzona', success: true, appointment })
    next()
  } catch (error) {
    console.error(error)
  }
}

module.exports.DeleteAppointment = async (req, res, next) => {
  try {
    const { id } = req.params
    const appointment = await Appointment.findByIdAndDelete(id)
    if (!appointment) {
      return res.json({ message: 'Nie znaleziono wizyty' })
    }
    res
      .status(200)
      .json({ message: 'Wizyta została usunięta', success: true })
    next()
  } catch (error) {
    console.error(error)
  }
}
