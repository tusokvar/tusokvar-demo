const express = require('express');
const router = express.Router();
const { searchFlights } = require('../controllers/flightController');
const { protect } = require('../middleware/authMiddleware');

router.post('/search', searchFlights);

module.exports = router;
