const router = require('express').Router();
const { load, save } = require('../logic/storage');

// POST /api/migrate — one-time localStorage import
router.post('/', async (req, res) => {
  const { posts = [], checkins = [], ideas = [] } = req.body;

  const existingPosts = await load('posts');
  if (existingPosts.length > 0) {
    return res.status(409).json({ error: 'Data already exists. Clear data first if you want to reimport.' });
  }

  await save('posts', posts);
  await save('checkins', checkins);
  await save('ideas', ideas);

  res.json({ imported: { posts: posts.length, checkins: checkins.length, ideas: ideas.length } });
});

module.exports = router;
