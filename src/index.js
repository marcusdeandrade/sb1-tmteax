const http = require('http');
require('dotenv').config();
const configureApp = require('./config/app');
const configureSocket = require('./config/socket');
const sequelize = require('./config/database');
const { syncDatabase } = require('./models');
const WhatsAppService = require('./services/whatsapp');
const logger = require('./utils/logger');

const app = configureApp();
const server = http.createServer(app);
const io = configureSocket(server);

// Make io available globally
app.set('io', io);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Test database connection and sync models
    await sequelize.testConnection();
    await syncDatabase();
    logger.info('Database synchronized successfully.');

    // Initialize WhatsApp client
    const whatsappService = new WhatsAppService(io);
    await whatsappService.initialize();
    
    // Make WhatsApp service available globally
    app.set('whatsapp', whatsappService);

    server.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();