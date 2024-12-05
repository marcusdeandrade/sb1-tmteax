const express = require('express');
const cors = require('cors');
const routes = require('../routes');
const { errorHandler, notFound } = require('../middleware/error');

const configureApp = () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use('/', routes);

  // Error handling
  app.use(notFound);
  app.use(errorHandler);

  return app;
};

module.exports = configureApp;