const { Tag, Lead } = require('../models');
const logger = require('../utils/logger');

const tagController = {
  async getAllTags(req, res) {
    try {
      const tags = await Tag.findAll({
        order: [['name', 'ASC']]
      });
      res.json(tags);
    } catch (error) {
      logger.error('Error fetching tags:', error);
      res.status(500).json({ error: 'Failed to fetch tags' });
    }
  },

  async createTag(req, res) {
    try {
      const { name, color, description } = req.body;
      const tag = await Tag.create({ name, color, description });
      res.status(201).json(tag);
    } catch (error) {
      logger.error('Error creating tag:', error);
      res.status(500).json({ error: 'Failed to create tag' });
    }
  },

  async assignTagToLead(req, res) {
    try {
      const { leadId, tagId } = req.params;
      const lead = await Lead.findByPk(leadId);
      const tag = await Tag.findByPk(tagId);

      if (!lead || !tag) {
        return res.status(404).json({ error: 'Lead or Tag not found' });
      }

      await lead.addTag(tag);
      res.json({ message: 'Tag assigned successfully' });
    } catch (error) {
      logger.error('Error assigning tag:', error);
      res.status(500).json({ error: 'Failed to assign tag' });
    }
  }
};

module.exports = tagController;