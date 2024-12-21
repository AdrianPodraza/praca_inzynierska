// Controllers/UserController.js
const User = require('../Models/UserModel')
const bcrypt = require('bcryptjs')

module.exports = {
  // Pobranie danych użytkownika
  getUserData: async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select('-password')
      res.status(200).json({
        status: true,
        user,
      })
    } catch (error) {
      res.status(500).json({
        status: false,
        message: 'Błąd podczas pobierania danych użytkownika',
      })
    }
  },

  // Aktualizacja danych użytkownika
  updateUserData: async (req, res) => {
    try {
      const { username, email, phoneNumber } = req.body

      // Sprawdzenie czy email jest już zajęty
      if (email) {
        const existingUser = await User.findOne({
          email,
          _id: { $ne: req.user._id },
        })

        if (existingUser) {
          return res.status(400).json({
            status: false,
            message: 'Ten email jest już zajęty',
          })
        }
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          $set: {
            username: username || req.user.username,
            email: email || req.user.email,
            phoneNumber: phoneNumber || req.user.phoneNumber,
          },
        },
        { new: true, select: '-password' },
      )

      res.status(200).json({
        status: true,
        user: updatedUser,
        message: 'Dane użytkownika zaktualizowane',
      })
    } catch (error) {
      res.status(500).json({
        status: false,
        message: 'Błąd podczas aktualizacji danych',
      })
    }
  },

  changePassword: async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body

      const user = await User.findById(req.user._id)
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password,
      )

      if (!isPasswordValid) {
        return res.status(400).json({
          status: false,
          message: 'Nieprawidłowe obecne hasło',
        })
      }

      const salt = await bcrypt.genSalt(12)
      const hashedPassword = await bcrypt.hash(newPassword, salt)

      await User.findByIdAndUpdate(req.user._id, {
        password: hashedPassword,
      })

      res.status(200).json({
        status: true,
        message: 'Hasło zostało zmienione',
      })
    } catch (error) {
      res.status(500).json({
        status: false,
        message: 'Błąd podczas zmiany hasła',
      })
    }
  },

  deleteAccount: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.user._id)

      res.clearCookie('token')
      res.status(200).json({
        status: true,
        message: 'Konto zostało usunięte',
      })
    } catch (error) {
      res.status(500).json({
        status: false,
        message: 'Błąd podczas usuwania konta',
      })
    }
  },
  getPatients: async (req, res) => {
    try {
      const patients = await User.find()
      res.status(200).json({
        success: true,
        patients,
      })
    } catch (error) {
      console.error('Error fetching patients:', error)
      res.status(500).json({
        success: false,
        message: 'Server error',
      })
    }
  },
}
