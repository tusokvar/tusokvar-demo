// backend/routes/flightRoutes.js
const express = require('express');
const router = express.Router();
const { searchFlights } = require('../controllers/flightController');

// חיפוש טיסות
router.post('/search', searchFlights);

module.exports = router;
