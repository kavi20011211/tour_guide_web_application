const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', require('./routes/UserRoute'));
app.use('/api/bookings', require('./routes/BookingRoute'));

// Define root route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Exporting the Express app as a serverless function for Vercel
module.exports = (req, res) => {
  app(req, res); // Pass the request and response to Express app to handle
};
