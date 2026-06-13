/* ============================================================
   anna.exe — Content Cockpit · Logic
   Plain JS (no JSX). Everything attaches to window.
   ============================================================ */

/* ---------- KPI definitions (mirror of server/logic/kpis.js) ---------- */
const KPIS = {
  amplification: {
    key: 'amplification', label: 'Amplification', short: 'Amp', unit: '%',
    good: 2, ok: 0.5, color: 'amp',
    desc: '(Shares + Saves) / Views',
    calc: p => (p.views > 0 ? ((p.shares + p.saves) / p.views) * 100 : null),
  },
  hookRate: {
    key: 'hookRate', label: 'Hook Rate', short: 'Hook', unit: '%',
    good: 70, ok: 50, color: 'hook',
    desc: '3-Sekunden-Retention',
    calc: p => (p.hookRate > 0 ? p.hookRate : null),
  },
  completion: {
    key: 'completion', label: 'Completion', short: 'Compl', unit: '%',
    good: 50, ok: 30, color: 'compl',
    desc: 'Watch-Through-Rate',
    calc: p => (p.completionRate > 0 ? p.completionRate : null),
  },
  followerCVR: {
    key: 'followerCVR', label: 'Follower-CVR', short: 'CVR', unit: '%',
    good: 1, ok: 0.3, color: 'cvr',
    desc: 'Neue Follower / Views',
    calc: p => (p.views > 0 && p.newFollowers > 0 ? (p.newFollowers / p.views) * 100 : null),
  },
  saveRate: {
    key: 'saveRate', label: 'Save Rate', short: 'Save', unit: '/1k',
    good: 5, ok: 2, color: 'save',
    desc: 'Saves je 1.000 Views',
    calc: p => (p.views > 0 ? (p.saves / p.views) * 1000 : null),
  },
};
const KPI_ORDER = ['amplification', 'hookRate', 'completion', 'followerCVR', 'saveRate'];

function enrichPost(p) {
  const kpis = {};
  KPI_ORDER.forEach(k => { kpis[k] = KPIS[k].calc(p); });
  return { ...p, kpis };
}

/** rating: 'good' | 'ok' | 'bad' | 'none' */
function kpiRating(key, val) {
  if (val == null) return 'none';
  const d = KPIS[key];
  if (val >= d.good) return 'good';
  if (val >= d.ok) return 'ok';
  return 'bad';
}

function fmtKpi(key, val) {
  if (val == null) return '—';
  const dec = val >= 100 ? 0 : 1;
  return val.toFixed(dec);
}

/* ---------- Aggregations (mirror of server/logic/aggregations.js) ---------- */
function avgKpi(posts, key) {
  const vals = posts.map(p => p.kpis[key]).filter(v => v != null);
  if (!vals.length) return null;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

function filterByDays(posts, days) {
  if (!days || days >= 9999) return posts;
  const cut = Date.now() - days * 86400000;
  return posts.filter(p => new Date(p.date).getTime() >= cut);
}

function formatMatrix(posts) {
  const FORMATS = ['Reel', 'Carousel', 'Story', 'Static'];
  return FORMATS.map(format => {
    const group = posts.filter(p => p.format === format);
    const kpis = {};
    KPI_ORDER.forEach(k => { kpis[k] = avgKpi(group, k); });
    return { format, count: group.length, kpis };
  }).filter(r => r.count > 0);
}

function topPosts(posts, key, limit = 5) {
  return [...posts]
    .filter(p => p.kpis[key] != null)
    .sort((a, b) => b.kpis[key] - a.kpis[key])
    .slice(0, limit);
}

function themeStats(posts) {
  const map = {};
  posts.forEach(p => {
    if (!map[p.theme]) map[p.theme] = { theme: p.theme, count: 0, views: 0 };
    map[p.theme].count++;
    map[p.theme].views += p.views;
  });
  return Object.values(map).sort((a, b) => b.views - a.views);
}

/* ---------- Health aggregation (mirror of server/logic/health.js) ---------- */
function computeHealth(drehtage) {
  const active = drehtage.filter(d => d.energie > 0 || d.erschoepfung > 0);
  const eVals = drehtage.filter(d => d.energie > 0).map(d => d.energie);
  const xVals = drehtage.filter(d => d.erschoepfung > 0).map(d => d.erschoepfung);
  const mean = a => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
  return {
    drehenEnergie: mean(eVals),
    erschoepfung: mean(xVals),
    totalMinuten: drehtage.reduce((s, d) => s + (d.zeitaufwandMin || 0), 0),
    activeDrehtage: active.length,
  };
}

/* ---------- Themes list ---------- */
const THEMES = ['Standup-Clip', 'Alltag-Skit', 'Behind the Scenes', 'Reaction', 'Q&A', 'Crowd Work'];

/* ---------- export to window ---------- */
Object.assign(window, {
  KPIS, KPI_ORDER, enrichPost, kpiRating, fmtKpi,
  avgKpi, filterByDays, formatMatrix, topPosts, themeStats, computeHealth,
  THEMES,
});
