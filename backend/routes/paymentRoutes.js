const express = require('express');
const router = express.Router();
const { processPayment, getExchangeRate } = require('../controllers/paymentController');

router.post('/', processPayment);
router.get('/exchange-rate', getExchangeRate);

module.exports = router;
