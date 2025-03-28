const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_ADDRES,
    pass: process.env.MAIL_PASSWORD,
  },
})

module.exports = transporter
