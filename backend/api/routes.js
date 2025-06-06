const express = require('express');
const router = express.Router();

const userRoutes = require('../routes/userRoutes');
const flightRoutes = require('../routes/flightRoutes');
const emailRoutes = require('../routes/emailRoutes');

router.use('/users', userRoutes);
router.use('/flights', flightRoutes);
router.use('/emails', emailRoutes);

module.exports = router;
