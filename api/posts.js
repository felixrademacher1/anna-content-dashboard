const { kv } = require('@vercel/kv');
const { enrichPost } = require('./_lib/kpis');
const { filterByDays, topPosts } = require('./_lib/aggregations');

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

module.exports = async function handler(req, res) {
  const posts = await kv.get('posts') || [];

  if (req.method === 'GET') {
    const { days, format, hookType, duration, theme, sortBy = 'date', limit } = req.query;
    let filtered = [...posts];
    if (days) filtered = filterByDays(filtered, days, 'date');
    if (format) filtered = filtered.filter(p => p.format === format);
    if (hookType) filtered = filtered.filter(p => p.hookType === hookType);
    if (duration) filtered = filtered.filter(p => p.duration === duration);
    if (theme) filtered = filtered.filter(p => p.theme === theme);
    let enriched = filtered.map(enrichPost);
    enriched = topPosts(enriched, sortBy, limit ? Number(limit) : enriched.length);
    return res.json(enriched);
  }

  if (req.method === 'POST') {
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
    await kv.set('posts', posts);
    return res.status(201).json(enrichPost(post));
  }

  res.status(405).end();
};
