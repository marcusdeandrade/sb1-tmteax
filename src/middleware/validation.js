const validateTagData = (req, res, next) => {
  const { name, color, description, category } = req.body;
  
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Tag name is required and must be a string' });
  }

  if (color && !/^#[0-9A-F]{6}$/i.test(color)) {
    return res.status(400).json({ error: 'Color must be a valid hex color code' });
  }

  if (description && typeof description !== 'string') {
    return res.status(400).json({ error: 'Description must be a string' });
  }

  if (category && typeof category !== 'string') {
    return res.status(400).json({ error: 'Category must be a string' });
  }

  next();
};

const validateLeadTags = (req, res, next) => {
  const { tags } = req.body;
  
  if (!Array.isArray(tags)) {
    return res.status(400).json({ error: 'Tags must be an array' });
  }

  if (!tags.every(tag => typeof tag === 'string')) {
    return res.status(400).json({ error: 'All tags must be strings' });
  }

  next();
};

module.exports = {
  validateTagData,
  validateLeadTags
};