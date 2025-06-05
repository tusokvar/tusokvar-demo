import express from 'express';
import { getFlights } from '../controllers/flightController.js';

const router = express.Router();

// לדוגמה נתיב לקבלת טיסות, למשל: GET /api/flights?origin=TLV&destination=NYC&date=2025-06-10
router.get('/', getFlights);

export default router;
