const router = require('express').Router();
const { load, save } = require('../logic/storage');

const uid = () => Math.random().toString(36).slice(2) + Date.now();

// GET /api/ideas
router.get('/', async (req, res) => res.json(await load('ideas')));

// POST /api/ideas
router.post('/', async (req, res) => {
  const ideas = await load('ideas');
  const idea = { id: uid(), createdAt: new Date().toISOString(), status: 'Idee', ...req.body };
  ideas.unshift(idea);
  await save('ideas', ideas);
  res.status(201).json(idea);
});

// PUT /api/ideas/:id
router.put('/:id', async (req, res) => {
  const ideas = await load('ideas');
  const idx = ideas.findIndex(i => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  ideas[idx] = { ...ideas[idx], ...req.body };
  await save('ideas', ideas);
  res.json(ideas[idx]);
});

// DELETE /api/ideas/:id
router.delete('/:id', async (req, res) => {
  const ideas = await load('ideas');
  const idx = ideas.findIndex(i => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  ideas.splice(idx, 1);
  await save('ideas', ideas);
  res.json({ ok: true });
});

module.exports = router;
