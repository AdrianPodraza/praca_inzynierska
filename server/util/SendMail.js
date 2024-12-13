const transporter = require('../config/mailer')
require('dotenv').config()
async function sendEmail(to, subject, content) {
  try {
    const mailOptions = {
      from: process.env.MAIL_ADDRES,
      to: to,
      subject: subject,
      html: content,
    }

    const info = await transporter.sendMail(mailOptions)
    return info
  } catch (error) {
    throw new Error('Błąd wysyłania maila: ' + error.message)
  }
}

module.exports = {
  sendEmail,
}
