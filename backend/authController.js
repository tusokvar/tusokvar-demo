// backend/authController.js

const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'defaultsecret', {
    expiresIn: '7d',
  });
};

const authenticate = (req, res) => {
  const { email } = req.body;

  // סימולציה של אימות – במערכת האמיתית תבדוק סיסמה ומשתמש
  if (!email) {
    return res.status(400).json({ error: 'יש לספק אימייל' });
  }

  const fakeUserId = 'user123';
  const token = generateToken(fakeUserId);

  return res.status(200).json({ token });
};

module.exports = {
  authenticate,
};
