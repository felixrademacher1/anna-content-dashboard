const router = require('express').Router();
const { enrichPost } = require('../logic/kpis');
const { filterByDays } = require('../logic/aggregations');
const { load, save } = require('../logic/storage');

const uid = () => Math.random().toString(36).slice(2) + Date.now();

// GET /api/posts?days=28&format=Reel&hookType=Statement&sortBy=amplification
router.get('/', async (req, res) => {
  let posts = await load('posts');
  const { days, format, hookType, duration, theme, sortBy = 'date', limit } = req.query;

  if (days) posts = filterByDays(posts, Number(days));
  if (format && format !== 'Alle') posts = posts.filter(p => p.format === format);
  if (hookType && hookType !== 'Alle') posts = posts.filter(p => p.hookType === hookType);
  if (duration && duration !== 'Alle') posts = posts.filter(p => p.duration === duration);
  if (theme && theme !== 'Alle') posts = posts.filter(p => p.theme === theme);

  let enriched = posts.map(enrichPost);

  enriched.sort((a, b) => {
    if (sortBy === 'date') return b.date.localeCompare(a.date);
    if (sortBy === 'views') return (b.views || 0) - (a.views || 0);
    return (b.kpis[sortBy] ?? -Infinity) - (a.kpis[sortBy] ?? -Infinity);
  });

  if (limit) enriched = enriched.slice(0, Number(limit));

  res.json(enriched);
});

// GET /api/posts/:id
router.get('/:id', async (req, res) => {
  const posts = await load('posts');
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json(enrichPost(post));
});

// POST /api/posts
router.post('/', async (req, res) => {
  const posts = await load('posts');
  const post = {
    id: uid(),
    createdAt: new Date().toISOString(),
    likes: 0, comments: 0, completionRate: 0, newFollowers: 0,
    hookType: 'Statement', duration: '15–30s', theme: '', screenshot: null,
    ...req.body,
    views: Number(req.body.views) || 0,
    saves: Number(req.body.saves) || 0,
    shares: Number(req.body.shares) || 0,
    likes: Number(req.body.likes) || 0,
    comments: Number(req.body.comments) || 0,
    hookRate: Number(req.body.hookRate) || 0,
    completionRate: Number(req.body.completionRate) || 0,
    newFollowers: Number(req.body.newFollowers) || 0,
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
  posts[idx] = {
    ...posts[idx], ...req.body,
    views: Number(req.body.views ?? posts[idx].views) || 0,
    saves: Number(req.body.saves ?? posts[idx].saves) || 0,
    shares: Number(req.body.shares ?? posts[idx].shares) || 0,
    likes: Number(req.body.likes ?? posts[idx].likes) || 0,
    comments: Number(req.body.comments ?? posts[idx].comments) || 0,
    hookRate: Number(req.body.hookRate ?? posts[idx].hookRate) || 0,
    completionRate: Number(req.body.completionRate ?? posts[idx].completionRate) || 0,
    newFollowers: Number(req.body.newFollowers ?? posts[idx].newFollowers) || 0,
  };
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
