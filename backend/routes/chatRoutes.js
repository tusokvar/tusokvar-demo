// backend/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const { getChatResponse } = require('../controllers/chatController');

router.post('/', getChatResponse);

module.exports = router;
