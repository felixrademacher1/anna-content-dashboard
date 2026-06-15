const { kv } = require('@vercel/kv');

const POSTS = [
  // Week Jun 8–14
  {"id": "post_jun14_deshalb_single", "createdAt": "2026-06-15T00:00:00.000Z", "date": "2026-06-14", "uploadTime": "11:00", "format": "Reel", "caption": "Deshalb bin ich Single", "views": 58627, "likes": 664, "comments": 39, "saves": 51, "shares": 14, "hookRate": 0, "completionRate": 27, "newFollowers": 0, "hookType": "Szene", "duration": "30-60s", "theme": "Standup-Clip", "screenshot": null},
  {"id": "post_jun11_hinge_pt2", "createdAt": "2026-06-15T00:00:00.000Z", "date": "2026-06-11", "uploadTime": "18:30", "format": "Video", "caption": "Rate my Rizz – Hinge Pt. 2", "views": 4136, "likes": 142, "comments": 25, "saves": 7, "shares": 2, "hookRate": 0, "completionRate": 0, "newFollowers": 0, "hookType": "Frage", "duration": "30-60s", "theme": "Q&A", "screenshot": null},
  {"id": "post_jun8_wieso_single", "createdAt": "2026-06-15T00:00:00.000Z", "date": "2026-06-08", "uploadTime": "18:30", "format": "Reel", "caption": "Wieso ich Single bin", "views": 11237, "likes": 363, "comments": 31, "saves": 15, "shares": 13, "hookRate": 0, "completionRate": 47, "newFollowers": 14, "hookType": "Szene", "duration": "15-30s", "theme": "Standup-Clip", "screenshot": null},
  // Week Jun 1–7
  {"likes": 421, "comments": 46, "completionRate": 0, "newFollowers": 5, "hookType": "Frage", "duration": "30-60s", "theme": "Q&A", "screenshot": null, "caption": "Rate my Rizz Teil 1 – Hinge Edition", "date": "2026-06-07", "uploadTime": "20:00", "format": "Carousel", "views": 16956, "saves": 33, "shares": 3, "hookRate": 0, "id": "wjyhrwv7d31781361087154", "createdAt": "2026-06-13T14:31:27.154Z"},
  {"likes": 96, "comments": 14, "completionRate": 100, "newFollowers": 2, "hookType": "Szene", "duration": "15-30s", "theme": "Alltag-Skit", "screenshot": null, "caption": "POV: Ich mit 12 im Bus zur Schule", "date": "2026-06-03", "uploadTime": "18:00", "format": "Reel", "views": 7059, "saves": 4, "shares": 2, "hookRate": 0, "id": "ems1e8evv61781361087136", "createdAt": "2026-06-13T14:31:27.136Z"},
  {"likes": 182, "comments": 25, "completionRate": 57.7, "newFollowers": 5, "hookType": "Szene", "duration": "30-60s", "theme": "Standup-Clip", "screenshot": null, "caption": "Nogger-Bit (Live Show)", "date": "2026-06-05", "uploadTime": "19:00", "format": "Reel", "views": 5728, "saves": 6, "shares": 10, "hookRate": 0, "id": "zbs4itpsplk1781361087098", "createdAt": "2026-06-13T14:31:27.098Z"}
];
const CHECKINS = [
  {"id": "checkin_jun8_jun14", "weekStart": "2026-06-08", "weekEnd": "2026-06-14", "followers": 3722, "followerDelta": 45, "drehtage": [], "drehenEnergie": 10, "erschoepfung": 1, "totalMinuten": 40, "activeDrehtage": 0, "createdAt": "2026-06-15T00:00:00.000Z"},
  {"id": "lastweek001", "weekStart": "2026-06-01", "weekEnd": "2026-06-07", "followers": 3677, "followerDelta": 77, "drehtage": [], "drehenEnergie": 8, "erschoepfung": 2, "totalMinuten": 0, "activeDrehtage": 0, "createdAt": "2026-06-06T12:00:00.000Z"}
];

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  await kv.set('posts', POSTS);
  await kv.set('checkins', CHECKINS);
  await kv.set('ideas', []);
  res.json({ ok: true, posts: POSTS.length, checkins: CHECKINS.length });
};
