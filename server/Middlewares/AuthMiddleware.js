const User = require('../Models/UserModel')
require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports.userVerification = async (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Brak tokena, autoryzacja odmówiona' })
  }

  try {
    // Dekodowanie tokenu, aby uzyskać dane użytkownika
    const decoded = jwt.verify(token, process.env.TOKEN_KEY)

    // Szukamy użytkownika w bazie danych
    const user = await User.findById(decoded.id)

    // Jeśli użytkownik nie istnieje, zwracamy błąd 404
    if (!user) {
      return res.status(404).json({ message: 'Użytkownik nie istnieje' })
    }

    // Dodajemy użytkownika do requesta, aby był dostępny w dalszej części aplikacji
    req.user = user

    next() // Przechodzimy do kolejnej funkcji (np. kontrolera)
  } catch (error) {
    console.error('Błąd weryfikacji tokenu:', error)

    // Jeśli wystąpił problem z JWT lub jakikolwiek błąd, zwracamy błąd 403
    return res.status(403).json({ message: 'Nieprawidłowy token' })
  }
}
