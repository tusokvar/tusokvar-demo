// backend/api/routes.js
const express = require('express');
const router = express.Router();

const userRoutes = require('../routes/userRoutes');
const flightRoutes = require('../routes/flightRoutes');
const paymentRoutes = require('../routes/paymentRoutes');
const chatRoutes = require('../routes/chatRoutes');

router.use('/users', userRoutes);
router.use('/flights', flightRoutes);
router.use('/payments', paymentRoutes);
router.use('/chat', chatRoutes);

module.exports = router;
