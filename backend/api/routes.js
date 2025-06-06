// /backend/api/routes.js
const express = require('express');
const router = express.Router();

router.use('/flights', require('../routes/flightRoutes'));
router.use('/users', require('../routes/userRoutes'));
router.use('/email', require('../routes/emailRoutes'));
router.use('/chat', require('../routes/chatRoutes')); // <-- חדש!

router.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = router;
