const router = require('express').Router();
const { computeHealthScores } = require('../logic/health');
const { load, save } = require('../logic/storage');

const uid = () => Math.random().toString(36).slice(2) + Date.now();

function getMon(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  const day = d.getDay();
  d.setDate(d.getDate() - day + (day === 0 ? -6 : 1));
  return d.toISOString().split('T')[0];
}

function getSun(monStr) {
  const d = new Date(monStr + 'T12:00:00');
  d.setDate(d.getDate() + 6);
  return d.toISOString().split('T')[0];
}

// GET /api/checkins
router.get('/', async (req, res) => {
  const checkins = await load('checkins');
  res.json([...checkins].sort((a, b) => b.weekStart.localeCompare(a.weekStart)));
});

// POST /api/checkins — upserts current week
router.post('/', async (req, res) => {
  const { followers, drehtage = [] } = req.body;
  if (!followers) return res.status(400).json({ error: 'followers required' });

  const checkins = await load('checkins');
  const weekStart = getMon(new Date().toISOString().split('T')[0]);
  const weekEnd = getSun(weekStart);

  const prev = [...checkins]
    .filter(c => c.weekStart !== weekStart)
    .sort((a, b) => b.weekStart.localeCompare(a.weekStart))[0];

  const followerDelta = prev ? Number(followers) - (prev.followers || 0) : 0;
  const health = computeHealthScores(drehtage);

  const entry = {
    id: uid(),
    weekStart,
    weekEnd,
    followers: Number(followers),
    followerDelta,
    drehtage: drehtage.map(d => ({ ...d, zeitaufwandMin: Number(d.zeitaufwandMin) || 0 })),
    ...health,
    createdAt: new Date().toISOString(),
  };

  const existingIdx = checkins.findIndex(c => c.weekStart === weekStart);
  if (existingIdx >= 0) {
    entry.id = checkins[existingIdx].id;
    checkins[existingIdx] = entry;
  } else {
    checkins.unshift(entry);
  }

  await save('checkins', checkins);
  res.status(201).json(entry);
});

// DELETE /api/checkins/:id
router.delete('/:id', async (req, res) => {
  const checkins = await load('checkins');
  const idx = checkins.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  checkins.splice(idx, 1);
  await save('checkins', checkins);
  res.json({ ok: true });
});

module.exports = router;
