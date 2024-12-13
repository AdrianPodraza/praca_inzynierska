const { SendMail } = require('../Controllers/AuthController')
const router = require('express').Router()
router.post('/sendmail', SendMail)

module.exports = router
