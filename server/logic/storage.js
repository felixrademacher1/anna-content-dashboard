const fs = require('fs');
const path = require('path');

const USE_KV = !!process.env.KV_REST_API_URL;

function getRedis() {
  const { Redis } = require('@upstash/redis');
  return new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });
}

async function load(key) {
  if (USE_KV) return (await getRedis().get(key)) || [];
  const file = path.join(__dirname, '../data', `${key}.json`);
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return []; }
}

async function save(key, data) {
  if (USE_KV) { await getRedis().set(key, data); return; }
  const file = path.join(__dirname, '../data', `${key}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

module.exports = { load, save };
