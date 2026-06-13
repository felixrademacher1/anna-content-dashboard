const fs = require('fs');
const path = require('path');

// In-memory store seeded from the JSON files in the repo.
// require() is resolved at bundle time so this always works on Vercel.
const store = {
  posts:    require('../data/posts.json'),
  checkins: require('../data/checkins.json'),
  ideas:    require('../data/ideas.json'),
};

async function load(key) {
  return store[key] || [];
}

async function save(key, data) {
  store[key] = data;
  // Also write to disk when running locally so data persists across restarts
  if (!process.env.VERCEL) {
    const file = path.join(__dirname, '../data', `${key}.json`);
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  }
}

module.exports = { load, save };
