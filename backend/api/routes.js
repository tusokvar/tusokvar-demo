const express = require('express');
const router = express.Router();

// דוגמה פשוטה: בדיקה שה-API עובד
router.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// כאן ייכנסו בהמשך הנתיבים לטיסות, מלונות, תשלומים ועוד

module.exports = router;
