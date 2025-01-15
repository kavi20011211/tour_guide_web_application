const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User' 
  },
  booking_date: {
    type: [Date],
    required: true, 
    validate: {
      validator: function (dates) {
        return Array.isArray(dates) && dates.length === 2 && dates[0] < dates[1];
      },
      message: 'Booking date must be a range with [startDate, endDate] where startDate is before endDate.',
    }
  },
  locations: {
    type: [String], 
    required: true, 
  },
}, {
  timestamps: true 
});

module.exports = mongoose.model('Booking', BookingSchema);
