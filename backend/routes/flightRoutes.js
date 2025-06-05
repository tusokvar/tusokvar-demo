const express = require('express');
const router = express.Router();
const {
  searchFlights,
  getFlightDetails
} = require('../controllers/flightController');

// חיפוש טיסות
router.get('/search', searchFlights);

// קבלת פרטי טיסה לפי מזהה
router.get('/:id', getFlightDetails);

module.exports = router;
