const express = require('express');
const router = express.Router();
const TagService = require('../services/tagService');
const { validateTagData } = require('../middleware/validation');

const tagService = new TagService();

router.get('/', async (req, res) => {
  try {
    const tags = await tagService.getAllTags();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

router.get('/category/:category', async (req, res) => {
  try {
    const tags = await tagService.getTagsByCategory(req.params.category);
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tags by category' });
  }
});

router.post('/', validateTagData, async (req, res) => {
  try {
    const tag = await tagService.createTag(req.body);
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tag' });
  }
});

router.post('/:tagId/leads/:leadId', async (req, res) => {
  try {
    await tagService.assignTagToLead(req.params.leadId, req.params.tagId);
    res.json({ message: 'Tag assigned successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign tag' });
  }
});

router.delete('/:tagId/leads/:leadId', async (req, res) => {
  try {
    await tagService.removeTagFromLead(req.params.leadId, req.params.tagId);
    res.json({ message: 'Tag removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove tag' });
  }
});

router.get('/leads/:leadId', async (req, res) => {
  try {
    const tags = await tagService.getLeadTags(req.params.leadId);
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lead tags' });
  }
});

module.exports = router;