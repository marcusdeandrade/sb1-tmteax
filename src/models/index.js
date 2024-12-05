const sequelize = require('../config/database');
const Lead = require('./Lead');
const Conversation = require('./Conversation');
const Message = require('./Message');
const Tag = require('./Tag');
const Resource = require('./Resource');

// Define relationships
Lead.hasMany(Conversation, {
  foreignKey: 'leadId',
  as: 'conversations'
});

Conversation.belongsTo(Lead, {
  foreignKey: 'leadId',
  as: 'lead'
});

Conversation.hasMany(Message, {
  foreignKey: 'conversationId',
  as: 'messages'
});

Message.belongsTo(Conversation, {
  foreignKey: 'conversationId',
  as: 'conversation'
});

Lead.belongsToMany(Tag, {
  through: 'lead_tags',
  foreignKey: 'lead_id',
  otherKey: 'tag_id',
  as: 'associatedTags'
});

Tag.belongsToMany(Lead, {
  through: 'lead_tags',
  foreignKey: 'tag_id',
  otherKey: 'lead_id',
  as: 'taggedLeads'
});

// Sync models with database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database models synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database models:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  Lead,
  Conversation,
  Message,
  Tag,
  Resource,
  syncDatabase
};