const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const FILE = path.join(__dirname, '../data/ideas.json');

function load() {
  return JSON.parse(fs.readFileSync(FILE, 'utf8'));
}

function save(arr) {
  fs.writeFileSync(FILE, JSON.stringify(arr, null, 2));
}

function uid() {
  return Math.random().toString(36).slice(2) + Date.now();
}

// GET /api/ideas
router.get('/', (req, res) => {
  res.json(load());
});

// GET /api/ideas/:id
router.get('/:id', (req, res) => {
  const idea = load().find(i => i.id === req.params.id);
  if (!idea) return res.status(404).json({ error: 'Not found' });
  res.json(idea);
});

// POST /api/ideas
router.post('/', (req, res) => {
  const ideas = load();
  const idea = {
    status: 'Idee',
    ...req.body,
    id: uid(),
    createdAt: new Date().toISOString(),
  };
  ideas.unshift(idea);
  save(ideas);
  res.status(201).json(idea);
});

// PUT /api/ideas/:id
router.put('/:id', (req, res) => {
  const ideas = load();
  const idx = ideas.findIndex(i => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  ideas[idx] = { ...ideas[idx], ...req.body };
  save(ideas);
  res.json(ideas[idx]);
});

// DELETE /api/ideas/:id
router.delete('/:id', (req, res) => {
  const ideas = load();
  const idx = ideas.findIndex(i => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  ideas.splice(idx, 1);
  save(ideas);
  res.json({ ok: true });
});

module.exports = router;
