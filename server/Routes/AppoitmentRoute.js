const router = require("express").Router();
const { 
  CreateAppointment, 
  GetAppointments, 
  ApproveAppointment,
  DeleteAppointment 
} = require("../Controllers/AppointmentController");
const { appointmentVerification } = require("../Middlewares/AppointmentMiddleware");

router.post("/appointment", appointmentVerification, CreateAppointment);
router.get("/appointments", GetAppointments);
router.put("/appointment/:id/approve", ApproveAppointment);
router.delete("/appointment/:id", DeleteAppointment);

module.exports = router;