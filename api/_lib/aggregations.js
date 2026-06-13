const { enrichPost } = require('./kpis');

function avgKpi(enrichedPosts, kpiKey) {
  const vals = enrichedPosts.map(p => p.kpis[kpiKey]).filter(v => v !== null && v !== undefined);
  if (vals.length === 0) return null;
  return parseFloat((vals.reduce((s, v) => s + v, 0) / vals.length).toFixed(2));
}

function formatMatrix(enrichedPosts) {
  const groups = {};
  for (const post of enrichedPosts) {
    const fmt = post.format || 'Unknown';
    if (!groups[fmt]) groups[fmt] = [];
    groups[fmt].push(post);
  }
  return Object.entries(groups).map(([format, posts]) => ({
    format,
    count: posts.length,
    kpis: {
      amplification: avgKpi(posts, 'amplification'),
      engagementRate: avgKpi(posts, 'engagementRate'),
      completion: avgKpi(posts, 'completion'),
      followerCVR: avgKpi(posts, 'followerCVR'),
      saveRate: avgKpi(posts, 'saveRate'),
    },
  }));
}

function topPosts(enrichedPosts, sortKey, n) {
  const sorted = [...enrichedPosts].sort((a, b) => {
    if (sortKey === 'date') return new Date(b.date || 0) - new Date(a.date || 0);
    if (sortKey === 'views') return (b.views || 0) - (a.views || 0);
    const av = a.kpis[sortKey] ?? -Infinity;
    const bv = b.kpis[sortKey] ?? -Infinity;
    return bv - av;
  });
  return sorted.slice(0, n);
}

function filterByDays(posts, days, field = 'date') {
  if (!days) return posts;
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - Number(days));
  cutoff.setUTCHours(12, 0, 0, 0);
  return posts.filter(p => p[field] && new Date(p[field]) >= cutoff);
}

module.exports = { avgKpi, formatMatrix, topPosts, filterByDays };
