const { Tag, Lead } = require('../models');
const logger = require('../utils/logger');

class TagService {
  async createTag(tagData) {
    try {
      const tag = await Tag.create(tagData);
      logger.info('Tag created successfully:', tag.name);
      return tag;
    } catch (error) {
      logger.error('Error creating tag:', error);
      throw error;
    }
  }

  async getAllTags() {
    try {
      const tags = await Tag.findAll({
        order: [['name', 'ASC']]
      });
      return tags;
    } catch (error) {
      logger.error('Error fetching tags:', error);
      throw error;
    }
  }

  async getTagsByCategory(category) {
    try {
      const tags = await Tag.findAll({
        where: { category },
        order: [['name', 'ASC']]
      });
      return tags;
    } catch (error) {
      logger.error('Error fetching tags by category:', error);
      throw error;
    }
  }

  async assignTagToLead(leadId, tagId) {
    try {
      const lead = await Lead.findByPk(leadId);
      const tag = await Tag.findByPk(tagId);

      if (!lead || !tag) {
        throw new Error('Lead or Tag not found');
      }

      await lead.addTag(tag);
      logger.info(`Tag ${tag.name} assigned to lead ${leadId}`);
      return true;
    } catch (error) {
      logger.error('Error assigning tag to lead:', error);
      throw error;
    }
  }

  async removeTagFromLead(leadId, tagId) {
    try {
      const lead = await Lead.findByPk(leadId);
      const tag = await Tag.findByPk(tagId);

      if (!lead || !tag) {
        throw new Error('Lead or Tag not found');
      }

      await lead.removeTag(tag);
      logger.info(`Tag ${tag.name} removed from lead ${leadId}`);
      return true;
    } catch (error) {
      logger.error('Error removing tag from lead:', error);
      throw error;
    }
  }

  async getLeadTags(leadId) {
    try {
      const lead = await Lead.findByPk(leadId, {
        include: [{
          model: Tag,
          through: { attributes: [] }
        }]
      });

      if (!lead) {
        throw new Error('Lead not found');
      }

      return lead.Tags;
    } catch (error) {
      logger.error('Error fetching lead tags:', error);
      throw error;
    }
  }
}

module.exports = TagService;