const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize;

const LeadTag = sequelize.define('LeadTag', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  leadId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  tagId: {
    type: DataTypes.UUID,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = LeadTag;