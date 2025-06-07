// backend/routes/flightRoutes.js
const express = require('express');
const router = express.Router();
const { searchFlights, bookFlight } = require('../controllers/flightController');
const { protect } = require('../middleware/authMiddleware');

router.post('/search', searchFlights);
router.post('/book', protect, bookFlight);

module.exports = router;
