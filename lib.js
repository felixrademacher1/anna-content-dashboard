/* ============================================================
   anna.exe — Content Cockpit · Data + Logic
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
  engagementRate: {
    key: 'engagementRate', label: 'Engagement Rate', short: 'ER', unit: '%',
    good: 3, ok: 1, color: 'hook',
    desc: '(Likes + Kommentare + Saves + Shares) / Views',
    calc: p => (p.views > 0 ? ((p.likes + p.comments + (p.saves || 0) + (p.shares || 0)) / p.views) * 100 : null),
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
const KPI_ORDER = ['amplification', 'engagementRate', 'completion', 'followerCVR', 'saveRate'];

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
  if (key === 'followerCVR') return val.toFixed(3);
  const dec = val >= 100 ? 0 : (val >= 10 ? 1 : 1);
  return val.toFixed(dec);
}

/* ---------- Aggregations (mirror of server/logic/aggregations.js) ---------- */
function avgKpi(posts, key) {
  const vals = posts.map(p => p.kpis[key]).filter(v => v != null);
  if (!vals.length) return null;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

function filterByDays(posts, days) {
  if (!days) return posts;
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

/* ============================================================
   DEMO DATA — Anna Okot, Comedian
   ============================================================ */
const THEMES = ['Standup-Clip', 'Alltag-Skit', 'Behind the Scenes', 'Reaction', 'Q&A', 'Crowd Work'];

// helper to build a post
let _pid = 0;
function P(daysAgo, caption, format, hookType, duration, theme, views, likes, comments, saves, shares, hookRate, completionRate, newFollowers, uploadTime) {
  const d = new Date(Date.now() - daysAgo * 86400000);
  return {
    id: 'p' + (++_pid),
    createdAt: d.toISOString(),
    date: d.toISOString().slice(0, 10),
    uploadTime,
    caption, format, hookType, duration, theme,
    views, likes, comments, saves, shares,
    hookRate, completionRate, newFollowers,
    screenshot: null,
  };
}

const RAW_POSTS = [
  P(2,  'POV: deine Mutter ruft an, während du auf der Bühne stehst', 'Reel', 'Szene', '15–30s', 'Standup-Clip', 184000, 21400, 980, 5200, 3100, 78, 61, 2400, '18:30'),
  P(4,  'Ich erkläre meinem Vater was ein Algorithmus ist', 'Reel', 'Statement', '30–60s', 'Alltag-Skit', 92000, 11200, 640, 2800, 1400, 71, 54, 1100, '19:05'),
  P(6,  'Crowd Work mit einem Banker — er hat es nicht überlebt', 'Reel', 'Szene', '30–60s', 'Crowd Work', 240000, 28800, 1500, 7100, 4200, 82, 58, 3300, '20:00'),
  P(8,  'Backstage 3 Minuten vor dem Auftritt', 'Story', 'Text-only', 'unter 15s', 'Behind the Scenes', 41000, 3800, 120, 380, 90, 0, 0, 210, '17:45'),
  P(9,  'Wenn du als Comedian zur Familienfeier kommst', 'Reel', 'Frage', '15–30s', 'Alltag-Skit', 128000, 15600, 870, 4100, 2200, 74, 56, 1700, '18:15'),
  P(11, '5 Dinge die niemand übers Touren erzählt', 'Carousel', 'Statement', 'über 60s', 'Behind the Scenes', 34000, 4100, 290, 1900, 410, 0, 0, 520, '12:30'),
  P(13, 'Reaction: mein erster Auftritt vs. heute', 'Reel', 'Szene', '30–60s', 'Reaction', 76000, 8900, 510, 2100, 980, 69, 49, 740, '19:40'),
  P(15, 'Die Frage die ich nach jeder Show bekomme', 'Reel', 'Frage', '15–30s', 'Q&A', 58000, 6400, 720, 1500, 690, 66, 52, 480, '20:20'),
  P(17, 'Open Mic in Berlin — der Typ in Reihe 2', 'Reel', 'Szene', '30–60s', 'Crowd Work', 156000, 18900, 1100, 4600, 2700, 79, 60, 2100, '21:00'),
  P(19, 'Mein Manager liest meine Tweets vor', 'Reel', 'Statement', '15–30s', 'Reaction', 67000, 7200, 430, 1700, 820, 72, 47, 590, '18:50'),
  P(21, 'Wie ich Bits schreibe (es ist chaotisch)', 'Carousel', 'Statement', 'über 60s', 'Behind the Scenes', 28000, 3300, 240, 1400, 320, 0, 0, 380, '11:15'),
  P(23, 'POV: du buchst eine Show im falschen Bundesland', 'Reel', 'Szene', '15–30s', 'Standup-Clip', 112000, 13800, 760, 3400, 1900, 76, 55, 1300, '19:25'),
  P(25, 'Statisches Tour-Poster Drop', 'Static', 'Text-only', 'unter 15s', 'Behind the Scenes', 19000, 2400, 180, 210, 64, 0, 0, 140, '10:00'),
  P(27, 'Q&A: nein, ich kann nicht „mal eben spontan was Lustiges sagen"', 'Reel', 'Frage', '30–60s', 'Q&A', 49000, 5100, 540, 1200, 470, 64, 44, 360, '20:10'),
  P(30, 'Der Moment wenn der Witz nicht zündet', 'Reel', 'Szene', 'unter 15s', 'Standup-Clip', 203000, 24600, 1320, 6100, 3600, 81, 63, 2900, '18:40'),
  P(33, 'Tour-Vlog Teil 1: Hamburg', 'Carousel', 'Statement', 'über 60s', 'Behind the Scenes', 31000, 3600, 210, 1100, 280, 0, 0, 300, '13:20'),
  P(36, 'Reaction auf meinen schlechtesten Auftritt', 'Reel', 'Szene', '30–60s', 'Reaction', 88000, 9800, 620, 2300, 1100, 70, 51, 810, '19:15'),
  P(40, 'Crowd Work: das Paar in der ersten Reihe', 'Reel', 'Szene', '15–30s', 'Crowd Work', 134000, 16100, 920, 3900, 2300, 77, 57, 1600, '20:35'),
];

const POSTS = RAW_POSTS.map(enrichPost);

/* ---------- Check-ins (8 weeks, followers 2.4k → 5.2k) ---------- */
function monOf(daysAgo) {
  const d = new Date(Date.now() - daysAgo * 86400000);
  const day = (d.getDay() + 6) % 7; // 0 = Monday
  d.setDate(d.getDate() - day);
  return d;
}
let _cid = 0;
function CK(weeksAgo, followers, drehtage) {
  const start = monOf(weeksAgo * 7 + 3);
  const end = new Date(start); end.setDate(end.getDate() + 6);
  const h = computeHealth(drehtage);
  return {
    id: 'c' + (++_cid),
    weekStart: start.toISOString().slice(0, 10),
    weekEnd: end.toISOString().slice(0, 10),
    followers,
    ...h,
    drehtage,
    createdAt: start.toISOString(),
  };
}
function DT(label, datum, energie, erschoepfung, zeitaufwandMin, vibeNote) {
  return { label, datum, energie, erschoepfung, zeitaufwandMin, vibeNote };
}

const RAW_CHECKINS = [
  CK(7, 2410, [DT('Drehtag 1', '', 6, 5, 120, 'Tasten gesucht, aber okay'), DT('Drehtag 2', '', 7, 4, 90, ''), DT('Drehtag 3', '', 0, 0, 0, '')]),
  CK(6, 2680, [DT('Drehtag 1', '', 8, 3, 75, 'Im Flow'), DT('Drehtag 2', '', 5, 7, 150, 'müde, zu viel auf einmal'), DT('Drehtag 3', '', 0, 0, 0, '')]),
  CK(5, 3050, [DT('Drehtag 1', '', 7, 4, 90, ''), DT('Drehtag 2', '', 8, 3, 80, 'gute Ideen'), DT('Drehtag 3', '', 6, 5, 110, '')]),
  CK(4, 3420, [DT('Drehtag 1', '', 9, 2, 60, 'beste Session bisher'), DT('Drehtag 2', '', 7, 4, 95, ''), DT('Drehtag 3', '', 0, 0, 0, '')]),
  CK(3, 3890, [DT('Drehtag 1', '', 6, 6, 140, 'Energie ging spät hoch'), DT('Drehtag 2', '', 8, 3, 70, ''), DT('Drehtag 3', '', 7, 4, 100, 'solide')]),
  CK(2, 4380, [DT('Drehtag 1', '', 8, 3, 85, ''), DT('Drehtag 2', '', 9, 2, 65, 'on fire'), DT('Drehtag 3', '', 0, 0, 0, '')]),
  CK(1, 4830, [DT('Drehtag 1', '', 7, 5, 110, ''), DT('Drehtag 2', '', 6, 6, 130, 'ausgelaugt nach Tour'), DT('Drehtag 3', '', 8, 3, 75, 'wieder da')]),
  CK(0, 5210, [DT('Drehtag 1', '', 9, 2, 70, 'top form'), DT('Drehtag 2', '', 8, 3, 80, ''), DT('Drehtag 3', '', 0, 0, 0, '')]),
];

// followerDelta vs previous week
const CHECKINS = RAW_CHECKINS.map((c, i) => ({
  ...c,
  followerDelta: i === 0 ? 0 : c.followers - RAW_CHECKINS[i - 1].followers,
})).reverse(); // newest first

/* ---------- Ideas ---------- */
let _iid = 0;
function ID(text, category, status, linkedPostId) {
  return { id: 'i' + (++_iid), createdAt: new Date().toISOString(), text, category, status, linkedPostId };
}
const IDEAS = [
  ID('Skit-Reihe: „Anna erklärt deutsche Bürokratie"', 'Alltag-Skit', 'Idee'),
  ID('Crowd-Work-Compilation aus der Berlin-Show', 'Crowd Work', 'In Produktion'),
  ID('Q&A: Wie wird man eigentlich Comedian?', 'Q&A', 'Idee'),
  ID('Reaction auf alte Sets von 2022', 'Reaction', 'In Produktion'),
  ID('Behind the Scenes: Tour-Bus-Tagebuch', 'Behind the Scenes', 'Idee'),
  ID('POV: erster Auftritt vor 2.000 Leuten', 'Standup-Clip', 'Live', 'p1'),
  ID('„Mein Vater & der Algorithmus" Fortsetzung', 'Alltag-Skit', 'Live', 'p2'),
  ID('Bit über Dating-Apps für die nächste Show', 'Standup-Clip', 'Idee'),
  ID('Carousel: 5 Lektionen vom Open Mic', 'Behind the Scenes', 'In Produktion'),
  ID('Reaction: Kommentare unter meinem Viral-Reel', 'Reaction', 'Idee'),
];

/* ---------- export to window ---------- */
Object.assign(window, {
  KPIS, KPI_ORDER, enrichPost, kpiRating, fmtKpi,
  avgKpi, filterByDays, formatMatrix, topPosts, themeStats, computeHealth,
  POSTS, CHECKINS, IDEAS, THEMES,
});
