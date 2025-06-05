// backend/routes/emailRoutes.js
const express = require('express');
const router = express.Router();
const { sendFlightEmail } = require('../controllers/emailController');

// שליחת מייל על טיסה
router.post('/send', sendFlightEmail);

module.exports = router;
