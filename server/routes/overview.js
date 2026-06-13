const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { enrichPost } = require('../logic/kpis');
const { avgKpi, formatMatrix, topPosts, filterByDays } = require('../logic/aggregations');

const POSTS_FILE    = path.join(__dirname, '../data/posts.json');
const CHECKINS_FILE = path.join(__dirname, '../data/checkins.json');

const loadPosts    = () => { try { return JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8')); } catch { return []; } };
const loadCheckins = () => { try { return JSON.parse(fs.readFileSync(CHECKINS_FILE, 'utf8')); } catch { return []; } };

// GET /api/overview?days=28&topKpi=amplification
router.get('/', (req, res) => {
  const { days, topKpi = 'amplification' } = req.query;

  let posts = loadPosts();
  if (days) posts = filterByDays(posts, Number(days));
  const enriched = posts.map(enrichPost);

  const checkins = [...loadCheckins()].sort((a, b) => a.weekStart.localeCompare(b.weekStart));

  // Stat cards data
  const latestCheckin = checkins.length ? checkins[checkins.length - 1] : null;
  const statCards = {
    totalPosts:        enriched.length,
    avgAmplification:  avgKpi(enriched, 'amplification'),
    avgHookRate:       avgKpi(enriched, 'hookRate'),
    avgCompletion:     avgKpi(enriched, 'completion'),
    avgFollowerCVR:    avgKpi(enriched, 'followerCVR'),
    avgSaveRate:       avgKpi(enriched, 'saveRate'),
    latestFollowers:   latestCheckin ? latestCheckin.followers : null,
    latestFollowerDelta: latestCheckin ? latestCheckin.followerDelta : null,
    followerGrowth:    checkins.length >= 2
      ? checkins[checkins.length - 1].followers - checkins[0].followers
      : null,
  };

  // Follower chart data (all time, one point per week)
  const followerChartData = checkins.map(c => ({
    name: c.weekStart.slice(5).replace('-', '/'), // MM/DD
    val: c.followers,
    weekStart: c.weekStart,
  }));

  // Health chart data (exhaustion over time)
  const healthChartData = checkins
    .filter(c => c.erschoepfung > 0)
    .map(c => ({
      name: c.weekStart.slice(5).replace('-', '/'),
      erschoepfung: c.erschoepfung,
      energie: c.drehenEnergie || 0,
      weekStart: c.weekStart,
    }));

  // Format performance matrix
  const matrix = formatMatrix(enriched);

  // Top 5 posts
  const top5 = topPosts(enriched, topKpi, 5);

  // All unique themes for filter dropdown
  const themes = [...new Set(posts.map(p => p.theme).filter(Boolean))];

  res.json({ statCards, followerChartData, healthChartData, formatMatrix: matrix, top5, themes });
});

module.exports = router;
