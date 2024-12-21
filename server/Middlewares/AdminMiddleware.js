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
