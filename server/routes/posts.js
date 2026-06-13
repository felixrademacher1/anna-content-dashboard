const router = require('express').Router();
const { enrichPost } = require('../logic/kpis');
const { filterByDays, topPosts } = require('../logic/aggregations');
const { load, save } = require('../logic/storage');

const uid = () => Math.random().toString(36).slice(2) + Date.now();

function coerce(body) {
  return {
    ...body,
    views: Number(body.views) || 0,
    likes: Number(body.likes) || 0,
    comments: Number(body.comments) || 0,
    saves: Number(body.saves) || 0,
    shares: Number(body.shares) || 0,
    hookRate: Number(body.hookRate) || 0,
    completionRate: Number(body.completionRate) || 0,
    newFollowers: Number(body.newFollowers) || 0,
  };
}

// GET /api/posts
router.get('/', async (req, res) => {
  const { days, format, hookType, duration, theme, sortBy = 'date', limit } = req.query;
  let posts = await load('posts');
  if (days) posts = filterByDays(posts, days, 'date');
  if (format) posts = posts.filter(p => p.format === format);
  if (hookType) posts = posts.filter(p => p.hookType === hookType);
  if (duration) posts = posts.filter(p => p.duration === duration);
  if (theme) posts = posts.filter(p => p.theme === theme);
  let enriched = posts.map(enrichPost);
  enriched = topPosts(enriched, sortBy, limit ? Number(limit) : enriched.length);
  res.json(enriched);
});

// GET /api/posts/:id
router.get('/:id', async (req, res) => {
  const post = (await load('posts')).find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json(enrichPost(post));
});

// POST /api/posts
router.post('/', async (req, res) => {
  const posts = await load('posts');
  const post = {
    likes: 0, comments: 0, completionRate: 0, newFollowers: 0,
    hookType: 'Statement', duration: '15–30s', theme: '', screenshot: null,
    ...coerce(req.body),
    id: uid(),
    createdAt: new Date().toISOString(),
  };
  posts.unshift(post);
  await save('posts', posts);
  res.status(201).json(enrichPost(post));
});

// PUT /api/posts/:id
router.put('/:id', async (req, res) => {
  const posts = await load('posts');
  const idx = posts.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  posts[idx] = { ...posts[idx], ...coerce({ ...posts[idx], ...req.body }) };
  await save('posts', posts);
  res.json(enrichPost(posts[idx]));
});

// DELETE /api/posts/:id
router.delete('/:id', async (req, res) => {
  const posts = await load('posts');
  const idx = posts.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  posts.splice(idx, 1);
  await save('posts', posts);
  res.json({ ok: true });
});

module.exports = router;
