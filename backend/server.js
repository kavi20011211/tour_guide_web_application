const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000
const connectDB = require('./config/db')

connectDB();

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/users',require('./routes/UserRoute'))
app.use('/api/bookings',require('./routes/BookingRoute'))

app.listen(PORT,() => console.log(`Server is connected on ${PORT}`))
