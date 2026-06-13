const fs = require('fs');
const path = require('path');

function filePath(key) {
  const p = path.join(__dirname, '../data', `${key}.json`);
  if (process.env.VERCEL) {
    const tmp = `/tmp/${key}.json`;
    if (!fs.existsSync(tmp)) {
      try { fs.copyFileSync(p, tmp); } catch { fs.writeFileSync(tmp, '[]'); }
    }
    return tmp;
  }
  return p;
}

async function load(key) {
  try { return JSON.parse(fs.readFileSync(filePath(key), 'utf8')); } catch { return []; }
}

async function save(key, data) {
  fs.writeFileSync(filePath(key), JSON.stringify(data, null, 2));
}

module.exports = { load, save };
