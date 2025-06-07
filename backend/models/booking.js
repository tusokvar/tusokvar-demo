// backend/models/booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flightDetails: { type: Object, required: true },
  passengers: { type: Array, required: true },
  totalPrice: { type: Number, required: true },
  currency: { type: String, required: true },
  bookingDate: { type: Date, default: Date.now },
  paymentStatus: { type: String, default: 'pending' },
  amadeusBookingId: { type: String, required: false }
});

module.exports = mongoose.model('Booking', BookingSchema);
