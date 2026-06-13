const router = require('express').Router();
const fs = require('fs');
const { dataPath } = require('../logic/dataFile');

const load = () => { try { return JSON.parse(fs.readFileSync(dataPath('ideas.json'), 'utf8')); } catch { return []; } };
const save = (d) => fs.writeFileSync(dataPath('ideas.json'), JSON.stringify(d, null, 2));
const uid = () => Math.random().toString(36).slice(2) + Date.now();

// GET /api/ideas
router.get('/', (req, res) => res.json(load()));

// POST /api/ideas
router.post('/', (req, res) => {
  const ideas = load();
  const idea = { id: uid(), createdAt: new Date().toISOString(), status: 'Idee', ...req.body };
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
