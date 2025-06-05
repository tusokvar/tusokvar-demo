const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');

const router = express.Router();

// רישום משתמש חדש
router.post('/register', registerUser);

// התחברות משתמש
router.post('/login', loginUser);

// פרופיל משתמש
router.get('/profile', getUserProfile);

module.exports = router;
