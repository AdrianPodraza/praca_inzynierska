const router = require('express').Router()
const { userVerification } = require('../Middlewares/AuthMiddleware')
const {
  getUserData,
  updateUserData,
  changePassword,
  deleteAccount,
  getPatients,
} = require('../Controllers/UserController')

router.get('/profile', userVerification, getUserData)
router.put('/profile', userVerification, updateUserData)
router.put('/change-password', userVerification, changePassword)
router.delete('/account', userVerification, deleteAccount)
router.get('/patients', userVerification, getPatients)

module.exports = router
