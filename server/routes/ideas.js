const router = require('express').Router();
const { load, save } = require('../logic/storage');

const uid = () => Math.random().toString(36).slice(2) + Date.now();

router.get('/', async (req, res) => res.json(await load('ideas')));

router.get('/:id', async (req, res) => {
  const idea = (await load('ideas')).find(i => i.id === req.params.id);
  if (!idea) return res.status(404).json({ error: 'Not found' });
  res.json(idea);
});

router.post('/', async (req, res) => {
  const ideas = await load('ideas');
  const idea = { status: 'Idee', ...req.body, id: uid(), createdAt: new Date().toISOString() };
  ideas.unshift(idea);
  await save('ideas', ideas);
  res.status(201).json(idea);
});

router.put('/:id', async (req, res) => {
  const ideas = await load('ideas');
  const idx = ideas.findIndex(i => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  ideas[idx] = { ...ideas[idx], ...req.body };
  await save('ideas', ideas);
  res.json(ideas[idx]);
});

router.delete('/:id', async (req, res) => {
  const ideas = await load('ideas');
  const idx = ideas.findIndex(i => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  ideas.splice(idx, 1);
  await save('ideas', ideas);
  res.json({ ok: true });
});

module.exports = router;
