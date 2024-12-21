require('dotenv').config()
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

module.exports.createSecretToken = user => {
  return jwt.sign({ id: user._id, admin: user.admin }, process.env.TOKEN_KEY, {
    expiresIn: '1h',
  })
}

module.exports.generateVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex')
}
