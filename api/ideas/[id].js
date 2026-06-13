const { kv } = require('@vercel/kv');

module.exports = async function handler(req, res) {
  const { id } = req.query;
  const ideas = await kv.get('ideas') || [];

  if (req.method === 'GET') {
    const idea = ideas.find(i => i.id === id);
    if (!idea) return res.status(404).json({ error: 'Not found' });
    return res.json(idea);
  }

  if (req.method === 'PUT') {
    const idx = ideas.findIndex(i => i.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    ideas[idx] = { ...ideas[idx], ...req.body };
    await kv.set('ideas', ideas);
    return res.json(ideas[idx]);
  }

  if (req.method === 'DELETE') {
    const idx = ideas.findIndex(i => i.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    ideas.splice(idx, 1);
    await kv.set('ideas', ideas);
    return res.json({ ok: true });
  }

  res.status(405).end();
};
