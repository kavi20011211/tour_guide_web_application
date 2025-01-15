const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

connectDB();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', require('./routes/UserRoute'));
app.use('/api/bookings', require('./routes/BookingRoute'));


module.exports = (req, res) => {
  app(req, res); 
};
