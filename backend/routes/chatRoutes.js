// /backend/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const { askGPT } = require('../controllers/chatController');

router.post('/ask', askGPT);

module.exports = router;
