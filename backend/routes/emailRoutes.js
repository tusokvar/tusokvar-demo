// backend/routes/emailRoutes.js
const express = require('express');
const router = express.Router();
const { sendBookingConfirmation } = require('../controllers/emailController');
const { protect } = require('../middleware/authMiddleware');

router.post('/send-confirmation', protect, sendBookingConfirmation);

module.exports = router;
