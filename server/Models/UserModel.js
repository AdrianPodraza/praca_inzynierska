const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Your email address is required'],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Your password is required'],
    },
    admin: {
      type: Boolean,
      default: false,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
  },
  { timestamps: true }, // automatycznie tworzy pola createdAt i updatedAt
)

// Hashowanie hasła przed zapisaniem
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

module.exports = mongoose.model('User', userSchema)
