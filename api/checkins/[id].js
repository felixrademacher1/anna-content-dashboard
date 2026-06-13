const { kv } = require('@vercel/kv');

module.exports = async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    const checkins = await kv.get('checkins') || [];
    const idx = checkins.findIndex(c => c.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    checkins.splice(idx, 1);
    await kv.set('checkins', checkins);
    return res.json({ ok: true });
  }

  res.status(405).end();
};
