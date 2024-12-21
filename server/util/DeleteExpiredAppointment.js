const cron = require('node-cron')
const Appointment = require('../Models/Appointment') // Importuj model wizyty

// Funkcja do usuwania wizyt, które zakończyły się godzinę temu
const deleteExpiredAppointments = async () => {
  try {
    const now = new Date()

    // Znajdź wizyty, które zakończyły się godzinę temu
    const appointmentsToDelete = await Appointment.find({
      endTime: { $lt: new Date(now.getTime() - 60 * 60 * 1000) }, // Minęła godzina
    })

    // Usuwanie wizyt
    if (appointmentsToDelete.length > 0) {
      await Appointment.deleteMany({
        endTime: { $lt: new Date(now.getTime() - 60 * 60 * 1000) },
      })

      console.log(`Deleted ${appointmentsToDelete.length} appointments.`)
    }
  } catch (error) {
    console.error('Error deleting expired appointments:', error)
  }
}

cron.schedule('*/30 * * * *', deleteExpiredAppointments)
