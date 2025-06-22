// backend/api/routes.js
const express = require('express');
const router = express.Router();

const userRoutes = require('../routes/userRoutes');
const flightRoutes = require('../routes/flightRoutes');
const paymentRoutes = require('../routes/paymentRoutes');
const chatRoutes = require('../routes/chatRoutes');
const emailRoutes = require('../routes/emailRoutes');
const currencyRoutes = require('../routes/currencyRoutes'); // נתיב חדש להמרת מטבעות

router.use('/users', userRoutes);
router.use('/flights', flightRoutes);
router.use('/payments', paymentRoutes);
router.use('/chat', chatRoutes);
router.use('/email', emailRoutes);
router.use('/currency', currencyRoutes); // שימוש בנתיב החדש

module.exports = router;
