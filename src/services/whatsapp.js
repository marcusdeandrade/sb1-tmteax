const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const logger = require('../utils/logger');
const { Lead, Conversation, Message } = require('../models');
const RasaService = require('./rasaService');
const OpenAIService = require('./openaiService');
const AudioService = require('./audioService');
const TranscriptionService = require('./transcriptionService');
const ResourceService = require('./resourceService');
const DelayService = require('./delayService');

class WhatsAppService {
  constructor(io) {
    this.io = io;
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        args: ['--no-sandbox']
      }
    });

    this.rasaService = new RasaService();
    this.openaiService = new OpenAIService();
    this.audioService = new AudioService();
    this.transcriptionService = new TranscriptionService();
    this.resourceService = new ResourceService();
    this.delayService = new DelayService();
    this.threadMap = new Map();

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.client.on('qr', (qr) => {
      logger.info('QR Code received');
      qrcode.generate(qr, { small: true });
      this.io.emit('whatsapp:qr', qr);
    });

    this.client.on('ready', () => {
      logger.info('WhatsApp client is ready');
      this.io.emit('whatsapp:ready');
    });

    this.client.on('message', async (msg) => {
      try {
        await this.handleIncomingMessage(msg);
      } catch (error) {
        logger.error('Error handling incoming message:', error);
      }
    });

    this.client.on('disconnected', (reason) => {
      logger.info('WhatsApp client disconnected:', reason);
      this.io.emit('whatsapp:disconnected', reason);
    });
  }

  async handleIncomingMessage(msg) {
    const phoneNumber = msg.from.split('@')[0];
    
    const [lead] = await Lead.findOrCreate({
      where: { phoneNumber },
      defaults: {
        status: 'new'
      }
    });

    const [conversation] = await Conversation.findOrCreate({
      where: {
        leadId: lead.id,
        status: 'active'
      },
      defaults: {
        lastMessageAt: new Date()
      }
    });

    let messageContent = msg.body;

    if (msg.type === 'audio' || msg.type === 'ptt') {
      try {
        const media = await msg.downloadMedia();
        const audioPath = await this.audioService.saveAudio(Buffer.from(media.data, 'base64'));
        const wavPath = await this.audioService.convertToWav(audioPath);
        messageContent = await this.transcriptionService.transcribeAudio(wavPath);
        await this.audioService.cleanupFile(wavPath);
      } catch (error) {
        logger.error('Error processing audio message:', error);
        await msg.reply('Desculpe, não consegui processar sua mensagem de áudio.');
        return;
      }
    }

    const message = await Message.create({
      conversationId: conversation.id,
      type: msg.type,
      content: messageContent,
      direction: 'incoming',
      metadata: {
        messageId: msg.id._serialized,
        timestamp: msg.timestamp
      }
    });

    if (!this.threadMap.has(msg.from)) {
      const threadId = await this.openaiService.createThread();
      this.threadMap.set(msg.from, threadId);
    }

    const rasaResponse = await this.rasaService.processMessage(msg);
    
    if (rasaResponse) {
      // Calcular delay e simular digitação
      const delay = this.delayService.calculateDelay(rasaResponse, {
        isComplexResponse: rasaResponse.length > 100
      });
      
      await this.delayService.simulateTyping(this.client, msg.from, delay);

      // Check if there's a resource request
      const intent = await this.rasaService.getIntent(messageContent);
      if (intent && intent.intent.startsWith('solicitar_')) {
        const resourceType = intent.intent.replace('solicitar_', '');
        const resource = await this.resourceService.getResourceByTag(resourceType);
        if (resource) {
          await this.resourceService.sendResource(this.client, msg.from, resource);
        }
      }

      await msg.reply(rasaResponse);
      
      await Message.create({
        conversationId: conversation.id,
        type: 'text',
        content: rasaResponse,
        direction: 'outgoing',
        metadata: {
          source: 'rasa'
        }
      });
    } else {
      const threadId = this.threadMap.get(msg.from);
      const openaiResponse = await this.openaiService.processMessage(threadId, messageContent);
      
      if (openaiResponse) {
        // Calcular delay e simular digitação para resposta do OpenAI
        const delay = this.delayService.calculateDelay(openaiResponse, {
          isComplexResponse: true // Respostas do OpenAI geralmente são mais elaboradas
        });
        
        await this.delayService.simulateTyping(this.client, msg.from, delay);
        
        await msg.reply(openaiResponse);
        
        await Message.create({
          conversationId: conversation.id,
          type: 'text',
          content: openaiResponse,
          direction: 'outgoing',
          metadata: {
            source: 'openai'
          }
        });
      }
    }

    await conversation.update({
      lastMessageAt: new Date()
    });

    this.io.emit('whatsapp:message', {
      lead,
      conversation,
      message
    });
  }

  async initialize() {
    try {
      await this.client.initialize();
    } catch (error) {
      logger.error('Error initializing WhatsApp client:', error);
      throw error;
    }
  }
}

module.exports = WhatsAppService;