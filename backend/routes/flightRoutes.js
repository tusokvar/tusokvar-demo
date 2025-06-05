const express = require('express');
const router = express.Router();
const { searchFlights, getFlightDetails } = require('../controllers/flightController');

router.get('/search', searchFlights);
router.get('/:id', getFlightDetails);

module.exports = router;
