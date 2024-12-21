const Appointment = require('../Models/Appointment')
const User = require('../Models/UserModel')
const { sendEmail } = require('../util/SendMail')
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

module.exports.CreateAppointment = async (req, res) => {
  const { date, time } = req.body
  const userId = req.user.id
  const startTime = new Date(`${date} ${time}`)
  const endTime = new Date(startTime.getTime() + 60 * 60 * 1000) // Dodajemy godzinę

  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Nie znaleziono użytkownika',
      })
    }

    const { phoneNumber, email } = user

    // Sprawdź czy termin jest dostępny
    const existingAppointment = await Appointment.findOne({ date, time })
    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message: 'Ten termin jest już zajęty',
      })
    }

    // Sprawdź czy użytkownik nie ma już wizyty
    const existingUserAppointment = await Appointment.findOne({
      email,
      date: { $gte: new Date() },
    })
    if (existingUserAppointment) {
      return res.status(409).json({
        success: false,
        message: 'Masz już umówioną wizytę',
      })
    }

    const appointment = await Appointment.create({
      date,
      time,
      phoneNumber,
      email,
      userId,
      approved: false,
      endTime,
      notes: '',
    })

    await sendEmail(email, date, time)

    res.status(201).json({
      success: true,
      message: 'Wizyta została umówiona pomyślnie',
      appointment,
    })
  } catch (error) {
    console.error('Create appointment error:', error)
    res.status(500).json({
      success: false,
      message: 'Błąd serwera podczas tworzenia wizyty',
    })
  }
}
module.exports.GetAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .sort({ date: 1, time: 1 })
      .lean()

    res.status(200).json({
      success: true,
      appointments,
    })
  } catch (error) {
    console.error('Get appointments error:', error)
    res.status(500).json({
      success: false,
      message: 'Błąd podczas pobierania wizyt',
    })
  }
}
module.exports.ApproveAppointment = async (req, res) => {
  try {
    const { id } = req.params
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { approved: true },
      { new: true },
    )

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Nie znaleziono wizyty',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Wizyta została zatwierdzona',
      appointment,
    })
  } catch (error) {
    console.error('Approve appointment error:', error)
    res.status(500).json({
      success: false,
      message: 'Błąd podczas zatwierdzania wizyty',
    })
  }
}
module.exports.DeleteAppointment = async (req, res) => {
  try {
    const { id } = req.params
    const appointment = await Appointment.findByIdAndDelete(id)

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Nie znaleziono wizyty',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Wizyta została usunięta',
    })
  } catch (error) {
    console.error('Delete appointment error:', error)
    res.status(500).json({
      success: false,
      message: 'Błąd podczas usuwania wizyty',
    })
  }
}
module.exports.FilterAppointments = async (req, res) => {
  try {
    const { date } = req.query
    const queryDate = new Date(date)

    if (isNaN(queryDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Nieprawidłowy format daty',
      })
    }

    // Ustaw początek i koniec dnia
    const startOfDay = new Date(queryDate)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(queryDate)
    endOfDay.setHours(23, 59, 59, 999)

    // Znajdź wizyty z danego dnia
    const appointments = await Appointment.find({
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).select('time')

    // Odfiltruj zajęte godziny
    const bookedTimes = appointments.map(app => app.time)
    const availableTimeSlots = allTimeSlots.filter(
      time => !bookedTimes.includes(time),
    )

    res.status(200).json({
      success: true,
      availableTimes: availableTimeSlots,
    })
  } catch (error) {
    console.error('Filter appointments error:', error)
    res.status(500).json({
      success: false,
      message: 'Błąd podczas pobierania dostępnych terminów',
    })
  }
}
module.exports.userAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      email: req.user.email,
    })
      .sort({ date: 1, time: 1 })
      .lean()

    res.status(200).json({
      success: true,
      appointments,
    })
  } catch (error) {
    console.error('User appointments error:', error)
    res.status(500).json({
      success: false,
      message: 'Błąd podczas pobierania wizyt użytkownika',
    })
  }
}

module.exports.adminAppointmentAdd = async (req, res) => {
  const { patientName, date, time, notes } = req.body

  try {
    const appointment = new Appointment({
      patientName,

      date,
      time,
      notes,
    })

    await appointment.save()
    res.status(201).json({ message: 'Wizyta została dodana pomyślnie.' })
  } catch (error) {
    res.status(500).json({ message: 'Błąd podczas dodawania wizyty.' })
  }
}
