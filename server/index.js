const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
require('dotenv').config()
const authRoute = require('./Routes/AuthRoute')
const mailRoute = require('./Routes/MailRoute')
const userRoute = require('./Routes/UserRoute')
const appointmentRoute = require('./Routes/AppoitmentRoute')
const { MONGO_URL, PORT } = process.env
require('./util/DeleteExpiredAppointment')
mongoose
  .connect(MONGO_URL)
  .then(() => console.log('MongoDB is  connected successfully'))
  .catch(err => console.error(err))

app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
)
app.use(cookieParser())

app.use(express.json())

app.use('/auth', authRoute)
app.use('/api', mailRoute)
app.use('/appointments', appointmentRoute)
app.use('/user', userRoute)
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
