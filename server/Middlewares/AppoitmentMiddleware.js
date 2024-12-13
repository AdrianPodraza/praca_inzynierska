const appointmentVerification = async (req, res, next) => {
    const { date, time } = req.body;
   
    
    try {
      const existingAppointment = await Appointment.findOne({ date, time });
      if (existingAppointment) {
        return res.json({ message: "Ten termin jest już zajęty" });
      }
      next();
    } catch (error) {
      console.error(error);
    }
  };
  