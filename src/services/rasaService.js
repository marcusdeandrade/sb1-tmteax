const axios = require('axios');
const logger = require('../utils/logger');

class RasaService {
  constructor() {
    this.baseURL = process.env.RASA_URL || 'http://localhost:5005';
  }

  async processMessage(message) {
    try {
      const response = await axios.post(`${this.baseURL}/webhooks/rest/webhook`, {
        sender: message.from,
        message: message.body
      });

      return response.data[0]?.text || null;
    } catch (error) {
      logger.error('Error processing message with RASA:', error);
      return null;
    }
  }

  async getIntent(message) {
    try {
      const response = await axios.post(`${this.baseURL}/model/parse`, {
        text: message
      });

      return {
        intent: response.data.intent.name,
        confidence: response.data.intent.confidence,
        entities: response.data.entities
      };
    } catch (error) {
      logger.error('Error getting intent from RASA:', error);
      return null;
    }
  }

  async trainModel(trainingData) {
    try {
      const response = await axios.post(`${this.baseURL}/model/train`, trainingData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      logger.error('Error training RASA model:', error);
      throw error;
    }
  }

  async getStatus() {
    try {
      const response = await axios.get(`${this.baseURL}/status`);
      return response.data;
    } catch (error) {
      logger.error('Error getting RASA status:', error);
      return null;
    }
  }
}

module.exports = RasaService;