const express = require('express');
const fs = require('fs');
const path = require('path');
const { computeHealthScores } = require('../logic/health');

const router = express.Router();
const FILE = path.join(__dirname, '../data/checkins.json');

function load() {
  return JSON.parse(fs.readFileSync(FILE, 'utf8'));
}

function save(arr) {
  fs.writeFileSync(FILE, JSON.stringify(arr, null, 2));
}

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

// GET /api/checkins
router.get('/', (req, res) => {
  const checkins = load().sort((a, b) => b.weekStart.localeCompare(a.weekStart));
  res.json(checkins);
});

// POST /api/checkins
router.post('/', (req, res) => {
  const checkins = load();
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

  save(checkins);
  res.status(201).json(entry);
});

// DELETE /api/checkins/:id
router.delete('/:id', (req, res) => {
  const checkins = load();
  const idx = checkins.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  checkins.splice(idx, 1);
  save(checkins);
  res.json({ ok: true });
});

module.exports = router;
