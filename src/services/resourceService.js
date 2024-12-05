const { Resource } = require('../models');
const { Op } = require('sequelize');
const { MessageMedia } = require('whatsapp-web.js');
const logger = require('../utils/logger');

class ResourceService {
  async getResourceByTag(tag) {
    try {
      const resources = await Resource.findAll({
        where: {
          tags: {
            [Op.contains]: [tag]
          }
        }
      });
      return resources[0]; // Return the first matching resource
    } catch (error) {
      logger.error('Error fetching resources by tag:', error);
      throw error;
    }
  }

  async getResourceByName(name) {
    try {
      const resource = await Resource.findOne({
        where: { name }
      });
      return resource;
    } catch (error) {
      logger.error('Error fetching resource by name:', error);
      throw error;
    }
  }

  async sendResource(client, to, resource) {
    try {
      let message;
      
      switch (resource.type) {
        case 'link':
          message = `${resource.description}\n${resource.url}`;
          break;
        case 'file':
        case 'document':
          const media = await MessageMedia.fromUrl(resource.url);
          await client.sendMessage(to, media, {
            caption: resource.description
          });
          return;
      }

      if (message) {
        await client.sendMessage(to, message);
      }
    } catch (error) {
      logger.error('Error sending resource:', error);
      throw error;
    }
  }
}

module.exports = ResourceService;