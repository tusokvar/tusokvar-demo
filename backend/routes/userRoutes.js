// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/userController');

// רישום משתמש חדש
router.post('/register', registerUser);

// התחברות משתמש (login)
router.post('/login', authUser);

module.exports = router;
