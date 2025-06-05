// backend/controllers/userController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = []; // בשלב זה משתמש בזיכרון - בהמשך יעבור למסד נתונים

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'נרשמת בהצלחה' });
  } catch (err) {
    res.status(500).json({ error: 'שגיאה ברישום המשתמש' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ error: 'משתמש לא נמצא' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'סיסמה שגויה' });

    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '2h' });

    res.json({ message: 'התחברת בהצלחה', token });
  } catch (err) {
    res.status(500).json({ error: 'שגיאה בהתחברות' });
  }
};

module.exports = { register, login };
