const { OpenAI } = require('openai');
const fs = require('fs');
const logger = require('../utils/logger');

class TranscriptionService {
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async transcribeAudio(filepath) {
    try {
      const response = await this.client.audio.transcriptions.create({
        file: fs.createReadStream(filepath),
        model: 'whisper-1',
        language: 'pt'
      });

      return response.text;
    } catch (error) {
      logger.error('Error transcribing audio:', error);
      throw error;
    }
  }
}

module.exports = TranscriptionService;