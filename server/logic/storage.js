const fs = require('fs');
const path = require('path');

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;
const USE_KV = !!KV_URL;

async function load(key) {
  if (USE_KV) {
    const res = await fetch(`${KV_URL}/get/${key}`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
    });
    const { result } = await res.json();
    return result ? JSON.parse(result) : [];
  }
  const file = path.join(__dirname, '../data', `${key}.json`);
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return []; }
}

async function save(key, data) {
  if (USE_KV) {
    await fetch(`${KV_URL}/set/${key}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([JSON.stringify(data)]),
    });
    return;
  }
  const file = path.join(__dirname, '../data', `${key}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

module.exports = { load, save };
