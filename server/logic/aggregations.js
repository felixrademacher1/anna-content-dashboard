const { KPIS, enrichPost } = require('./kpis');

// Average of a KPI across enriched posts (ignores nulls)
function avgKpi(enrichedPosts, kpiKey) {
  const vals = enrichedPosts.map(p => p.kpis[kpiKey]).filter(v => v !== null);
  return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
}

// Group posts by format, compute avg KPIs per format
function formatMatrix(enrichedPosts) {
  const groups = {};
  for (const p of enrichedPosts) {
    if (!groups[p.format]) groups[p.format] = [];
    groups[p.format].push(p);
  }
  return Object.entries(groups).map(([format, posts]) => ({
    format,
    count: posts.length,
    kpis: Object.fromEntries(
      Object.keys(KPIS).map(k => [k, avgKpi(posts, k)])
    ),
  }));
}

// Top N posts sorted by a KPI key (or 'views', 'date')
function topPosts(enrichedPosts, sortKey = 'amplification', n = 5) {
  const sorted = [...enrichedPosts].sort((a, b) => {
    if (sortKey === 'date') return b.date.localeCompare(a.date);
    if (sortKey === 'views') return (b.views || 0) - (a.views || 0);
    return (b.kpis[sortKey] ?? -Infinity) - (a.kpis[sortKey] ?? -Infinity);
  });
  return sorted.slice(0, n);
}

// Filter posts to a time window (days=null means all)
function filterByDays(posts, days, field = 'date') {
  if (!days) return posts;
  const cut = new Date();
  cut.setDate(cut.getDate() - days);
  return posts.filter(p => new Date(p[field] + 'T12:00:00') >= cut);
}

module.exports = { avgKpi, formatMatrix, topPosts, filterByDays };
