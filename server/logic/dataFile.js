const fs = require('fs');
const path = require('path');

const IS_VERCEL = !!process.env.VERCEL;

function dataPath(filename) {
  if (!IS_VERCEL) return path.join(__dirname, '../data', filename);

  const tmpPath = path.join('/tmp', filename);
  if (!fs.existsSync(tmpPath)) {
    const srcPath = path.join(__dirname, '../data', filename);
    try { fs.copyFileSync(srcPath, tmpPath); } catch { fs.writeFileSync(tmpPath, '[]'); }
  }
  return tmpPath;
}

module.exports = { dataPath };
