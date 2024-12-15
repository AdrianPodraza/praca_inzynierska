const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number,
    default: 30,
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})
module.exports = mongoose.model('appointment', appointmentSchema)
