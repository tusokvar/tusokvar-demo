const express = require('express');
const router = express.Router();
const {
  searchFlights,
  getFlightById
} = require('../controllers/flightController');

router.get('/search', searchFlights);
router.get('/:id', getFlightById);

module.exports = router;
