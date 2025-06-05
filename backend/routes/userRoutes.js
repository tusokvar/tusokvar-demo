const express = require('express');
const router = express.Router();
const { sendFlightEmail } = require('../controllers/emailController');

// POST /api/email/send
router.post('/send', sendFlightEmail);

module.exports = router;
