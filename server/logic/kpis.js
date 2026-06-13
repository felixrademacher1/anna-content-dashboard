// All 5 KPIs. Each takes a post object and returns a number or null.
const KPIS = {
  amplification: {
    label: 'Amplification', unit: '%', color: 'cyan', good: 2, ok: 0.5,
    calc: (p) => p.views > 0 ? ((p.shares + p.saves) / p.views * 100) : null,
  },
  hookRate: {
    label: 'Hook Rate', unit: '%', color: 'coral', good: 70, ok: 50,
    calc: (p) => p.hookRate > 0 ? p.hookRate : null,
  },
  completion: {
    label: 'Completion', unit: '%', color: 'sage', good: 50, ok: 30,
    calc: (p) => p.completionRate > 0 ? p.completionRate : null,
  },
  followerCVR: {
    label: 'Follower CVR', unit: '%', color: 'yellow', good: 1, ok: 0.3,
    calc: (p) => p.views > 0 && p.newFollowers > 0 ? (p.newFollowers / p.views * 100) : null,
  },
  saveRate: {
    label: 'Save Rate', unit: '/1k', color: 'violet', good: 5, ok: 2,
    calc: (p) => p.views > 0 ? (p.saves / p.views * 1000) : null,
  },
};

// Enrich a post with computed KPIs
function enrichPost(post) {
  const kpis = {};
  for (const [key, def] of Object.entries(KPIS)) {
    const v = def.calc(post);
    kpis[key] = v !== null ? parseFloat(v.toFixed(key === 'followerCVR' ? 2 : 1)) : null;
  }
  return { ...post, kpis };
}

module.exports = { KPIS, enrichPost };
