const transporter = require('../config/mailer')
const User = require('../Models/UserModel')
require('dotenv').config()
module.exports.sendEmail = async (to, date, time) => {
  const content = `
    
      <body>
        <p>Dzień dobry,</p>
        <p>Twoja wizyta została umówiona na:</p>
        <p><strong>Data:</strong> ${date}</p>
        <p><strong>Godzina:</strong> ${time}</p>
        <p>Czekaj na jej potwierdzenie</p>
      </body>
     
    `
  try {
    const mailOptions = {
      from: process.env.MAIL_ADDRES,
      to: to,
      subject: `Umówienie wizyty ${date} o godzinie ${time}`,
      html: content,
    }

    const info = await transporter.sendMail(mailOptions)
    return info
  } catch (error) {
    throw new Error('Błąd wysyłania maila: ' + error.message)
  }
}
module.exports.sendEmailConfirmation = async (to, date, time) => {
  const content = `
     
      <body>
        <p>Dzień dobry,</p>
        <p>Twoja wizyta została potwierdzona na:</p>
        <p><strong>Data:</strong> ${date}</p>
        <p><strong>Godzina:</strong> ${time}</p>
        <p>Dziękujemy za skorzystanie z naszych usług.</p>
      </body>
   
    `
  try {
    const mailOptions = {
      from: process.env.MAIL_ADDRES,
      to: to,
      subject: `Potwierdzenie wizyty dnia ${date} o godzinie ${time}`,
      html: content,
    }

    const info = await transporter.sendMail(mailOptions)
    return info
  } catch (error) {
    throw new Error('Błąd wysyłania maila: ' + error.message)
  }
}

module.exports.sendEmailVerification = async (to, subject, html) => {
  await transporter.sendMail({
    from: process.env.MAIL_ADDRESS,
    to,
    subject,
    html,
  })
}
