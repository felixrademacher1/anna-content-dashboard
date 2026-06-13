const { kv } = require('@vercel/kv');
const { computeHealthScores } = require('./_lib/health');

function uid() {
  return Math.random().toString(36).slice(2) + Date.now();
}

function getMon(today) {
  const d = new Date(today);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setUTCHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

module.exports = async function handler(req, res) {
  const checkins = await kv.get('checkins') || [];

  if (req.method === 'GET') {
    return res.json([...checkins].sort((a, b) => b.weekStart.localeCompare(a.weekStart)));
  }

  if (req.method === 'POST') {
    const { followers, drehtage = [] } = req.body;

    const weekStart = getMon(new Date());
    const weekEndDate = new Date(weekStart);
    weekEndDate.setDate(weekEndDate.getDate() + 6);
    const weekEnd = weekEndDate.toISOString().slice(0, 10);

    const others = checkins.filter(c => c.weekStart !== weekStart).sort((a, b) => b.weekStart.localeCompare(a.weekStart));
    const prev = others[0] || null;
    const followerDelta = prev ? (Number(followers) || 0) - (prev.followers || 0) : 0;

    const health = computeHealthScores(drehtage);

    const existingIdx = checkins.findIndex(c => c.weekStart === weekStart);
    const entry = {
      id: existingIdx >= 0 ? checkins[existingIdx].id : uid(),
      weekStart,
      weekEnd,
      followers: Number(followers) || 0,
      followerDelta,
      drehtage,
      ...health,
      createdAt: existingIdx >= 0 ? checkins[existingIdx].createdAt : new Date().toISOString(),
    };

    if (existingIdx >= 0) {
      checkins[existingIdx] = entry;
    } else {
      checkins.unshift(entry);
    }

    await kv.set('checkins', checkins);
    return res.status(201).json(entry);
  }

  res.status(405).end();
};
