const express = require('express');
const router = express.Router();
const { sendFlightEmail } = require('../controllers/emailController');

router.post('/send', sendFlightEmail);

module.exports = router;
