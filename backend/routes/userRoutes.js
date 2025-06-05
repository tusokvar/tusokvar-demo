import express from 'express';
import { registerUser, authUser } from '../controllers/userController.js';

const router = express.Router();

// לדוגמה: POST /api/users/register
router.post('/register', registerUser);

// לדוגמה: POST /api/users/login
router.post('/login', authUser);

export default router;
