const express = require('express');
const fs = require('fs');
const path = require('path');
const { enrichPost } = require('../logic/kpis');
const { filterByDays, topPosts } = require('../logic/aggregations');

const router = express.Router();
const FILE = path.join(__dirname, '../data/posts.json');

function load() {
  return JSON.parse(fs.readFileSync(FILE, 'utf8'));
}

function save(arr) {
  fs.writeFileSync(FILE, JSON.stringify(arr, null, 2));
}

function uid() {
  return Math.random().toString(36).slice(2) + Date.now();
}

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
router.get('/', (req, res) => {
  const { days, format, hookType, duration, theme, sortBy = 'date', limit } = req.query;

  let posts = load();
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
router.get('/:id', (req, res) => {
  const post = load().find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json(enrichPost(post));
});

// POST /api/posts
router.post('/', (req, res) => {
  const posts = load();
  const post = {
    likes: 0,
    comments: 0,
    completionRate: 0,
    newFollowers: 0,
    hookType: 'Statement',
    duration: '15–30s',
    theme: '',
    screenshot: null,
    ...coerce(req.body),
    id: uid(),
    createdAt: new Date().toISOString(),
  };
  posts.unshift(post);
  save(posts);
  res.status(201).json(enrichPost(post));
});

// PUT /api/posts/:id
router.put('/:id', (req, res) => {
  const posts = load();
  const idx = posts.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  posts[idx] = { ...posts[idx], ...coerce({ ...posts[idx], ...req.body }) };
  save(posts);
  res.json(enrichPost(posts[idx]));
});

// DELETE /api/posts/:id
router.delete('/:id', (req, res) => {
  const posts = load();
  const idx = posts.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  posts.splice(idx, 1);
  save(posts);
  res.json({ ok: true });
});

module.exports = router;
