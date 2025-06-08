// backend/controllers/bookingController.js
const Booking = require('../models/booking');

exports.createBooking = async (req, res) => {
  const { user, flightDetails, passengers, totalPrice, currency, amadeusBookingId } = req.body;

  try {
    const booking = new Booking({
      user,
      flightDetails,
      passengers,
      totalPrice,
      currency,
      amadeusBookingId,
      paymentStatus: 'completed'
    });

    await booking.save();

    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookingsByUser = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
