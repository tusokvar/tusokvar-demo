// backend/api/routes.js
const express = require('express');
const router = express.Router();

// ייבוא כל הנתיבים
const userRoutes = require('../routes/userRoutes');
const flightRoutes = require('../routes/flightRoutes');
const emailRoutes = require('../routes/emailRoutes');

// אופציית רכיבי תשלום אם יש צורך
// const paymentRoutes = require('../routes/paymentRoutes');
// const bookingRoutes = require('../routes/bookingRoutes');

router.use('/users', userRoutes);
router.use('/flights', flightRoutes);
router.use('/emails', emailRoutes);

// במידת הצורך נוסיף כאן עוד נתיבים
// router.use('/payments', paymentRoutes);
// router.use('/bookings', bookingRoutes);

module.exports = router;
