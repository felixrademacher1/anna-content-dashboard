const router = require('express').Router();
const fs = require('fs');
const { dataPath } = require('../logic/dataFile');

// POST /api/migrate — one-time localStorage import
router.post('/', (req, res) => {
  const { posts = [], checkins = [], ideas = [] } = req.body;

  // Only import if current files are empty (safety guard)
  let existingPosts = [];
  try {
    existingPosts = JSON.parse(fs.readFileSync(dataPath('posts.json'), 'utf8') || '[]');
  } catch {}

  if (existingPosts.length > 0) {
    return res.status(409).json({ error: 'Data already exists. Delete data files first if you want to reimport.' });
  }

  fs.writeFileSync(dataPath('posts.json'),    JSON.stringify(posts,    null, 2));
  fs.writeFileSync(dataPath('checkins.json'), JSON.stringify(checkins, null, 2));
  fs.writeFileSync(dataPath('ideas.json'),    JSON.stringify(ideas,    null, 2));

  res.json({ imported: { posts: posts.length, checkins: checkins.length, ideas: ideas.length } });
});

module.exports = router;
