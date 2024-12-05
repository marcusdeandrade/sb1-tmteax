const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const { validateLeadTags } = require('../middleware/validation');

router.get('/', leadController.getAllLeads);
router.get('/:id', leadController.getLeadById);
router.patch('/:id/tags', validateLeadTags, leadController.updateLeadTags);

module.exports = router;