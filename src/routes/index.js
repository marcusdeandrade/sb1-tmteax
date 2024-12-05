const express = require('express');
const router = express.Router();
const leadsRouter = require('./leads');
const RasaWebhookService = require('../services/rasaWebhookService');

const rasaWebhookService = new RasaWebhookService();

router.get('/', (req, res) => {
  res.json({ message: 'WhatsApp Bot API is running' });
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Lead management routes
router.use('/leads', leadsRouter);

// RASA webhook routes
router.use('/rasa', rasaWebhookService.getRouter());

module.exports = router;