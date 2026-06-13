const { kv } = require('@vercel/kv');

const POSTS = [{"likes": 421, "comments": 46, "completionRate": 0, "newFollowers": 5, "hookType": "Frage", "duration": "30-60s", "theme": "Q&A", "screenshot": null, "caption": "Rate my Rizz Teil 1 – Hinge Edition", "date": "2026-06-07", "uploadTime": "20:00", "format": "Carousel", "views": 16956, "saves": 33, "shares": 3, "hookRate": 0, "id": "wjyhrwv7d31781361087154", "createdAt": "2026-06-13T14:31:27.154Z"}, {"likes": 96, "comments": 14, "completionRate": 100, "newFollowers": 2, "hookType": "Szene", "duration": "15-30s", "theme": "Alltag-Skit", "screenshot": null, "caption": "POV: Ich mit 12 im Bus zur Schule", "date": "2026-06-03", "uploadTime": "18:00", "format": "Reel", "views": 7059, "saves": 4, "shares": 2, "hookRate": 0, "id": "ems1e8evv61781361087136", "createdAt": "2026-06-13T14:31:27.136Z"}, {"likes": 182, "comments": 25, "completionRate": 57.7, "newFollowers": 5, "hookType": "Szene", "duration": "30-60s", "theme": "Standup-Clip", "screenshot": null, "caption": "Nogger-Bit (Live Show)", "date": "2026-06-05", "uploadTime": "19:00", "format": "Reel", "views": 5728, "saves": 6, "shares": 10, "hookRate": 0, "id": "zbs4itpsplk1781361087098", "createdAt": "2026-06-13T14:31:27.098Z"}];

const CHECKINS = [{"id": "dz4imhel0u51781360603179", "weekStart": "2026-06-08", "weekEnd": "2026-06-14", "followers": 3677, "followerDelta": 77, "drehtage": [{"label": "Drehtag 1", "datum": "", "energie": 8, "erschoepfung": 2, "zeitaufwandMin": 0, "vibeNote": "No stress at all"}, {"label": "Drehtag 2", "datum": "", "energie": 8, "erschoepfung": 2, "zeitaufwandMin": 0, "vibeNote": "No stress at all"}, {"label": "Drehtag 3", "datum": "", "energie": 8, "erschoepfung": 2, "zeitaufwandMin": 0, "vibeNote": "No stress at all"}], "drehenEnergie": 8, "erschoepfung": 2, "totalMinuten": 0, "activeDrehtage": 3, "createdAt": "2026-06-13T14:23:23.179Z"}, {"id": "lastweek001", "weekStart": "2026-06-01", "weekEnd": "2026-06-07", "followers": 3600, "followerDelta": 0, "drehtage": [], "drehenEnergie": 0, "erschoepfung": 0, "totalMinuten": 0, "activeDrehtage": 0, "createdAt": "2026-06-06T12:00:00.000Z"}];

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const existing = await kv.get('posts');
  if (existing && existing.length > 0) {
    return res.json({ ok: false, message: 'Already seeded', posts: existing.length });
  }

  await kv.set('posts', POSTS);
  await kv.set('checkins', CHECKINS);
  await kv.set('ideas', []);

  res.json({ ok: true, posts: POSTS.length, checkins: CHECKINS.length });
};
