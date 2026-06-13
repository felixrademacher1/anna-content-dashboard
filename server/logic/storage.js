const fs = require('fs');
const path = require('path');

// On Vercel, process.cwd() is the project root (/var/task)
// Locally, __dirname is server/logic/ so ../../ is project root
const ROOT = process.env.VERCEL
  ? process.cwd()
  : path.join(__dirname, '../..');

function filePath(key) {
  const src = path.join(ROOT, 'server', 'data', `${key}.json`);
  if (!process.env.VERCEL) return src;

  const tmp = `/tmp/${key}.json`;
  if (!fs.existsSync(tmp)) {
    try { fs.copyFileSync(src, tmp); } catch { fs.writeFileSync(tmp, '[]'); }
  }
  return tmp;
}

async function load(key) {
  try { return JSON.parse(fs.readFileSync(filePath(key), 'utf8')); } catch { return []; }
}

async function save(key, data) {
  fs.writeFileSync(filePath(key), JSON.stringify(data, null, 2));
}

module.exports = { load, save };
