// /backend/routes/flightRoutes.js
const express = require('express');
const router = express.Router();
const { autocompleteAirports } = require('../controllers/flightController');

// אוטוקומפליט שדות תעופה/ערים
router.get('/airports/autocomplete', autocompleteAirports);

module.exports = router;
