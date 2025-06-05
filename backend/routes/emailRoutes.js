import express from 'express';
import { sendFlightEmail } from '../controllers/emailController.js';

const router = express.Router();

router.post('/send', sendFlightEmail);

export default router;
