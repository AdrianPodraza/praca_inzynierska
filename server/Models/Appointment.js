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
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: Date,
    required: true,
  },
})

module.exports = mongoose.model('appointment', appointmentSchema)
