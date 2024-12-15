const Appointment = require('../Models/Appointment')
const User = require('../Models/UserModel')
const { sendEmail } = require('../util/sendMail')
const { router } = require('../Routes/AppoitmentRoute')
module.exports.CreateAppointment = async (req, res, next) => {
  console.log('Received data:', req.body)
  const { date, time } = req.body

  const userId = req.user.id

  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    const { phoneNumber, email } = user

    const existingAppointment = await Appointment.findOne({ date, time })
    if (existingAppointment) {
      return res.json({ message: 'Ten termin jest już zajęty' })
    }
    const existingUser = await Appointment.findOne({ phoneNumber, email })
    if (existingUser) {
      return res.json({ message: 'Masz już umówioną wizyte' })
    }
    const appointment = await Appointment.create({
      date,
      time,
      phoneNumber,
      email,
      approved: false,
    })
    await appointment.save()

    res.status(201).json({
      message: 'Wizyta została umówiona pomyślnie',
      success: true,
      appointment,
    })
    sendEmail(
      email,
      `Wizyta dnia ${date} o godzinie ${time}`,
      '<p>umówiona Wizyta</p>',
    )
    next()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Błąd serwera podczas tworzenia wizyty' })
  }
}

module.exports.GetAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find()
    res.status(200).json({ success: true, appointments })
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
    res.status(200).json({
      message: 'Wizyta została zatwierdzona',
      success: true,
      appointment,
    })
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
    res.status(200).json({ message: 'Wizyta została usunięta', success: true })
    next()
  } catch (error) {
    console.error(error)
  }
}
module.exports.FilterAppointments = async (req, res) => {
  try {
    const { date } = req.query
    const queryDate = new Date(date)
    if (isNaN(queryDate.getTime())) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid date format' })
    }
    const allTimeSlots = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
    ]
    const appointments = await Appointment.find({
      date: {
        $gte: new Date(queryDate.setHours(0, 0, 0)),
        $lt: new Date(queryDate.setHours(23, 59, 59)),
      },
    })
    let availableTimeSlots
    if (appointments.length === 0) {
      availableTimeSlots = allTimeSlots
    } else {
      const bookedTimes = appointments.map(app => app.time)
      availableTimeSlots = allTimeSlots.filter(
        time => !bookedTimes.includes(time),
      )
    }
    res.status(200).json({ success: true, availableTimes: availableTimeSlots })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Błąd podczas pobierania dostępnych terminów',
      error: error.message,
    })
  }
}
