import jwt from 'jsonwebtoken';
import User from '../models/user.js';

/**
 * רישום משתמש חדש
 */
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // בדיקה אם קיים כבר משתמש עם אותו אימייל
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // יצירת משתמש חדש
    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.error('❌ Error registering user:', error);
    res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
};

/**
 * התחברות משתמש ותשדורת JWT
 */
export const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      // יצירת JWT
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );

      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token
      });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('❌ Error authenticating user:', error);
    res.status(500).json({ message: 'Authentication failed', error: error.message });
  }
};
