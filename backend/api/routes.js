// /backend/api/routes.js
const express = require('express');
const router = express.Router();

// טעינת כל נתיבי המשנה
router.use('/flights', require('../routes/flightRoutes'));
router.use('/users', require('../routes/userRoutes'));
router.use('/email', require('../routes/emailRoutes'));
// תוכל להוסיף כאן נתיבים נוספים אם יש לך: chatRoutes וכו'

// ברירת מחדל - נתיב שגיאה
router.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = router;
