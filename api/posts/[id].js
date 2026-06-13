const { kv } = require('@vercel/kv');
const { enrichPost } = require('../_lib/kpis');

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

module.exports = async function handler(req, res) {
  const { id } = req.query;
  const posts = await kv.get('posts') || [];

  if (req.method === 'GET') {
    const post = posts.find(p => p.id === id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    return res.json(enrichPost(post));
  }

  if (req.method === 'PUT') {
    const idx = posts.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    posts[idx] = { ...posts[idx], ...coerce({ ...posts[idx], ...req.body }) };
    await kv.set('posts', posts);
    return res.json(enrichPost(posts[idx]));
  }

  if (req.method === 'DELETE') {
    const idx = posts.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    posts.splice(idx, 1);
    await kv.set('posts', posts);
    return res.json({ ok: true });
  }

  res.status(405).end();
};
