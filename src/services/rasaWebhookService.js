const express = require('express');
const logger = require('../utils/logger');
const { Lead, Conversation, Message } = require('../models');

class RasaWebhookService {
  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.post('/webhook', this.handleWebhook.bind(this));
  }

  async handleWebhook(req, res) {
    try {
      const { sender_id, message, custom } = req.body;

      // Log incoming webhook
      logger.info('Received RASA webhook:', { sender_id, message });

      // Find the active conversation
      const lead = await Lead.findOne({
        where: { phoneNumber: sender_id }
      });

      if (!lead) {
        logger.error('Lead not found for webhook:', sender_id);
        return res.status(404).json({ error: 'Lead not found' });
      }

      const conversation = await Conversation.findOne({
        where: {
          leadId: lead.id,
          status: 'active'
        }
      });

      if (!conversation) {
        logger.error('Active conversation not found for lead:', lead.id);
        return res.status(404).json({ error: 'Conversation not found' });
      }

      // Save RASA's response as a message
      await Message.create({
        conversationId: conversation.id,
        type: 'text',
        content: message,
        direction: 'outgoing',
        metadata: {
          source: 'rasa',
          custom
        }
      });

      res.json({ status: 'success' });
    } catch (error) {
      logger.error('Error handling RASA webhook:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  getRouter() {
    return this.router;
  }
}

module.exports = RasaWebhookService;