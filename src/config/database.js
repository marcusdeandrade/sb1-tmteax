const { Sequelize } = require('sequelize');
const logger = require('../utils/logger');

const createSequelizeInstance = () => {
  const {
    DB_HOST = 'localhost',
    DB_USER = 'postgres',
    DB_PASS = 'postgres',
    DB_NAME = 'bot_whatsapp',
    DB_PORT = 5432,
    NODE_ENV = 'development'
  } = process.env;

  return new Sequelize({
    dialect: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    logging: (msg) => logger.debug(msg),
    define: {
      underscored: true,
      timestamps: true
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
};

const sequelize = createSequelizeInstance();

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    throw error;
  }
};

module.exports = sequelize;
module.exports.testConnection = testConnection;