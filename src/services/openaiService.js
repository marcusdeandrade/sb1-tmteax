const { OpenAI } = require('openai');
const logger = require('../utils/logger');

class OpenAIService {
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    this.assistantId = process.env.OPENAI_ASSISTANT_ID;
  }

  async createThread() {
    try {
      const thread = await this.client.beta.threads.create();
      return thread.id;
    } catch (error) {
      logger.error('Error creating OpenAI thread:', error);
      throw error;
    }
  }

  async processMessage(threadId, message) {
    try {
      // Add the message to the thread
      await this.client.beta.threads.messages.create(threadId, {
        role: 'user',
        content: message
      });

      // Run the assistant
      const run = await this.client.beta.threads.runs.create(threadId, {
        assistant_id: this.assistantId
      });

      // Wait for the run to complete
      let runStatus = await this.client.beta.threads.runs.retrieve(threadId, run.id);
      while (runStatus.status !== 'completed') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        runStatus = await this.client.beta.threads.runs.retrieve(threadId, run.id);
      }

      // Get the assistant's response
      const messages = await this.client.beta.threads.messages.list(threadId);
      const lastMessage = messages.data[0];

      return lastMessage.content[0].text.value;
    } catch (error) {
      logger.error('Error processing message with OpenAI:', error);
      throw error;
    }
  }
}

module.exports = OpenAIService;