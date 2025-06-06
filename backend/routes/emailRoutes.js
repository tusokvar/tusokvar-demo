const express = require('express');
const router = express.Router();
const { sendBookingConfirmation } = require('../controllers/emailController');

router.post('/send-confirmation', sendBookingConfirmation);

module.exports = router;
