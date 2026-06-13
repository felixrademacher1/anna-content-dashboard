const { kv } = require('@vercel/kv');

function uid() {
  return Math.random().toString(36).slice(2) + Date.now();
}

module.exports = async function handler(req, res) {
  const ideas = await kv.get('ideas') || [];

  if (req.method === 'GET') {
    return res.json(ideas);
  }

  if (req.method === 'POST') {
    const idea = {
      status: 'Idee',
      ...req.body,
      id: uid(),
      createdAt: new Date().toISOString(),
    };
    ideas.unshift(idea);
    await kv.set('ideas', ideas);
    return res.status(201).json(idea);
  }

  res.status(405).end();
};
