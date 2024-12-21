const {
  Signup,
  Login,
  adminVerification,
  verifyEmail,
  Logout,
} = require('../Controllers/AuthController')
const { userVerification } = require('../Middlewares/AuthMiddleware')
const router = require('express').Router()

router.post('/signup', Signup)
router.post('/login', Login)
router.get('/verify', userVerification, (req, res) => {
  res.status(200).json({
    status: true,
    user: req.user,
    message: 'Weryfikacja użytkownika powiodła się',
  })
})

router.get('/verify-email', verifyEmail)
router.get('/verify-admin', userVerification, adminVerification)
router.post('/logout', userVerification, Logout)

module.exports = router
