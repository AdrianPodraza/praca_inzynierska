const User = require('../Models/UserModel')
const {
  createSecretToken,
  generateVerificationToken,
} = require('../util/SecretToken')
const bcrypt = require('bcryptjs')
const { sendEmail, sendEmailVerification } = require('../util/SendMail')

module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username, createdAt, phoneNumber } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }
    const verificationToken = generateVerificationToken()
    const user = await User.create({
      email,
      password,
      username,
      createdAt,
      phoneNumber,
      verificationToken,
    })
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`
    await sendEmailVerification(
      email,
      'Potwierdzenie rejestracji',
      `<h1>Potwierdź swoje konto</h1><p>Kliknij w poniższy link, aby aktywować swoje konto:</p><a href="${verificationLink}">Aktywuj konto</a>`,
    )
    res.status(201).json({
      message:
        'User signed up successfully. Please check your email to verify your account.',
      success: true,
      user,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({ message: 'Incorrect password or email' })
    }
    if (!user.isVerified) {
      return res.status(400).json({ message: 'Please verify your email first' })
    }

    const auth = await bcrypt.compare(password, user.password)
    if (!auth) {
      return res.json({ message: 'Incorrect password or email' })
    }
    const token = createSecretToken(user._id)
    res.cookie('token', token, {
      withCredentials: true,
      httpOnly: true,
      sameSite: 'strict',
    })
    res.status(201).json({
      message: 'User logged in successfully',
      success: true,
      user: {
        email: user.email,
        username: user.username,
        isAdmin: user.admin,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports.Logout = (req, res) => {
  try {
    // Usuwamy token z ciasteczek
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    })

    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    console.error('Error during logout:', error)
    res.status(500).json({ message: 'Server error during logout' })
  }
}

module.exports.SendMail = async (req, res) => {
  try {
    await sendEmail(
      'adrianpodrazacv@gmail.com',
      'Temat wiadomości',
      '<h1>Treść HTML</h1><p>Przykładowa wiadomość</p>',
    )
    res.status(200).json({ message: 'Email wysłany pomyślnie' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
module.exports.adminVerification = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: false,
        message: 'Brak danych użytkownika',
      })
    }

    // Zwracamy status true jeśli użytkownik jest adminem
    return res.status(200).json({
      status: req.user.admin,
      user: req.user,
      message: req.user.admin
        ? 'Weryfikacja admina powiodła się'
        : 'Brak uprawnień administratora',
    })
  } catch (error) {
    console.error('Admin verification error:', error)
    return res.status(500).json({
      status: false,
      message: 'Błąd serwera podczas weryfikacji',
    })
  }
}

module.exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query

    // Szukamy użytkownika z danym tokenem
    const user = await User.findOne({ verificationToken: token })

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' }) // Token nieważny lub wygasł
    }

    // Sprawdzamy, czy konto zostało już zweryfikowane
    if (user.isVerified) {
      return res.status(400).json({ message: 'Account already verified' })
    }

    // Aktualizujemy status użytkownika
    user.isVerified = true
    user.verificationToken = null // Usuwamy token po weryfikacji
    await user.save()

    res.status(200).json({ message: 'Account verified successfully' })
  } catch (error) {
    console.error('Error verifying email:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
