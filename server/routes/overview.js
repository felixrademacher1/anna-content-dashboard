const express = require('express');
const fs = require('fs');
const path = require('path');
const { enrichPost } = require('../logic/kpis');
const { avgKpi, formatMatrix, topPosts, filterByDays } = require('../logic/aggregations');

const router = express.Router();
const POSTS_FILE = path.join(__dirname, '../data/posts.json');
const CHECKINS_FILE = path.join(__dirname, '../data/checkins.json');

// GET /api/overview?days=28&topKpi=amplification
router.get('/', (req, res) => {
  const { days, topKpi = 'amplification' } = req.query;

  let posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  if (days) posts = filterByDays(posts, days, 'date');
  const enriched = posts.map(enrichPost);

  const checkins = JSON.parse(fs.readFileSync(CHECKINS_FILE, 'utf8'))
    .sort((a, b) => a.weekStart.localeCompare(b.weekStart));

  const latest = checkins[checkins.length - 1] || null;
  const first = checkins[0] || null;

  const statCards = {
    totalPosts: enriched.length,
    avgAmplification: avgKpi(enriched, 'amplification'),
    avgEngagementRate: avgKpi(enriched, 'engagementRate'),
    avgCompletion: avgKpi(enriched, 'completion'),
    avgFollowerCVR: avgKpi(enriched, 'followerCVR'),
    avgSaveRate: avgKpi(enriched, 'saveRate'),
    latestFollowers: latest ? latest.followers : null,
    latestFollowerDelta: latest ? latest.followerDelta : null,
    followerGrowth: (latest && first && latest !== first)
      ? latest.followers - first.followers
      : null,
  };

  const followerChartData = checkins.map(c => {
    const d = new Date(c.weekStart);
    const name = `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
    return { name, val: c.followers, weekStart: c.weekStart };
  });

  const healthChartData = checkins
    .filter(c => c.erschoepfung > 0)
    .map(c => {
      const d = new Date(c.weekStart);
      const name = `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
      return { name, erschoepfung: c.erschoepfung, energie: c.drehenEnergie, weekStart: c.weekStart };
    });

  const themes = [...new Set(posts.map(p => p.theme).filter(t => t && t.trim()))];

  res.json({
    statCards,
    followerChartData,
    healthChartData,
    formatMatrix: formatMatrix(enriched),
    top5: topPosts(enriched, topKpi, 5),
    themes,
  });
});

module.exports = router;
