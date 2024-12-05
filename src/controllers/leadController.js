const { Lead } = require('../models');
const logger = require('../utils/logger');

const leadController = {
  async getAllLeads(req, res) {
    try {
      const leads = await Lead.findAll({
        order: [['createdAt', 'DESC']]
      });
      res.json(leads);
    } catch (error) {
      logger.error('Error fetching leads:', error);
      res.status(500).json({ error: 'Failed to fetch leads' });
    }
  },

  async getLeadById(req, res) {
    try {
      const lead = await Lead.findByPk(req.params.id, {
        include: ['conversations']
      });
      if (!lead) {
        return res.status(404).json({ error: 'Lead not found' });
      }
      res.json(lead);
    } catch (error) {
      logger.error('Error fetching lead:', error);
      res.status(500).json({ error: 'Failed to fetch lead' });
    }
  },

  async updateLeadTags(req, res) {
    try {
      const { id } = req.params;
      const { tags } = req.body;

      const lead = await Lead.findByPk(id);
      if (!lead) {
        return res.status(404).json({ error: 'Lead not found' });
      }

      lead.tags = tags;
      await lead.save();

      res.json(lead);
    } catch (error) {
      logger.error('Error updating lead tags:', error);
      res.status(500).json({ error: 'Failed to update lead tags' });
    }
  }
};

module.exports = leadController;