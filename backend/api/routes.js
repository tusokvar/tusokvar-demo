const express = require('express');
const router = express.Router();

// Controllers
const flightController = require('../flightController');
const bookingController = require('../bookingController');
const paymentController = require('../paymentController');
const userController = require('../userController');

// Middleware
const { protect } = require('../middleware/authMiddleware');

// 🔹 חיפוש טיסות (ללא צורך בהתחברות)
router.get('/api/flights', flightController.searchFlights);

// 🔹 ביצוע הזמנה (דורש התחברות)
router.post('/api/book', protect, bookingController.createBooking);

// 🔹 תשלום (דורש התחברות)
router.post('/api/pay', protect, paymentController.processPayment);

// 🔹 הרשמה
router.post('/api/register', userController.registerUser);

// 🔹 התחברות
router.post('/api/login', userController.loginUser);

// 🔹 פרטי משתמש
router.get('/api/profile', protect, userController.getUserProfile);

module.exports = router;
