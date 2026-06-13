# anna.exe — Content Cockpit

Split architecture: Express.js backend + CDN React frontend (no build step).

---

## Project Structure

```
anna-content-dashboard/
├── index.html                  # Legacy single-file version (do not delete — migration source)
│
├── server/
│   ├── server.js               # Express entry point, route wiring
│   ├── package.json
│   ├── .env.example
│   ├── data/                   # JSON flat-file database (git-ignored in production)
│   │   ├── posts.json
│   │   ├── checkins.json
│   │   └── ideas.json
│   ├── logic/                  # Pure functions — no Express dependency
│   │   ├── kpis.js             # KPI definitions + enrichPost()
│   │   ├── aggregations.js     # avgKpi, formatMatrix, topPosts, filterByDays
│   │   └── health.js           # computeHealthScores()
│   └── routes/
│       ├── posts.js            # CRUD for posts
│       ├── checkins.js         # CRUD for weekly check-ins
│       ├── ideas.js            # CRUD for ideas
│       ├── overview.js         # Aggregated dashboard data
│       ├── screenshot.js       # Groq vision parsing (key stays server-side)
│       └── migrate.js          # One-time localStorage import
│
└── frontend/
    ├── index.html              # Full React app (CDN React + Babel + Tailwind)
    └── lib/
        └── api.js              # All fetch calls — plain JS, no JSX
```

---

## How to Start

### 1. Backend

```bash
cd anna-content-dashboard/server
cp .env.example .env
# Edit .env: add your GROQ_API_KEY
npm install
npm start          # production
npm run dev        # dev (node --watch, auto-restart)
```

Server runs on **http://localhost:3001**

### 2. Frontend

Open `frontend/index.html` directly in a browser (double-click, or use any static server):

```bash
# Option A — file:// protocol (works for most things)
open frontend/index.html

# Option B — static server (needed if CORS issues with file://)
npx serve frontend/
```

Frontend expects the backend at `http://localhost:3001`.

### 3. Verify

```bash
curl http://localhost:3001/health
# → {"ok":true}
```

---

## Migrating from the Old Single-File Version

The old `index.html` stored data in `localStorage` under keys:
- `anna_posts_v1`
- `anna_checkins_v1`
- `anna_ideas_v1`

The new frontend detects existing localStorage data on first load and shows a **migration banner**. Click "Jetzt migrieren" to move all data to the server via `POST /api/migrate`. The migration is one-time and safe — it refuses to overwrite if server already has data.

---

## All 5 KPI Formulas

| KPI | Formula | Unit | Good | OK | Color |
|-----|---------|------|------|----|-------|
| **Amplification** | `(shares + saves) / views × 100` | % | ≥ 2 | ≥ 0.5 | cyan |
| **Hook Rate** | Raw field from analytics (3-second retention) | % | ≥ 70 | ≥ 50 | coral |
| **Completion** | Raw field from analytics (watch-through %) | % | ≥ 50 | ≥ 30 | sage |
| **Follower CVR** | `newFollowers / views × 100` | % | ≥ 1 | ≥ 0.3 | yellow |
| **Save Rate** | `saves / views × 1000` | /1k | ≥ 5 | ≥ 2 | violet |

KPIs return `null` when the required fields are zero (no data). `null` is displayed as `—`.

Color coding: **green** (at or above "good"), **yellow** (between "ok" and "good"), **red/coral** (below "ok").

---

## Follower Delta Calculation

On each weekly check-in submission:
1. Find the most recent previous check-in (any week other than the current one)
2. `followerDelta = submittedFollowers - prev.followers`
3. If no previous check-in exists, `followerDelta = 0`

The overview stat card always shows the **latest** check-in's stored `followerDelta`.

---

## Health Score Aggregation

Each week contains up to 3 `drehtage` (filming days), each with:
- `energie` (1–10, higher = better)
- `erschoepfung` (1–10, higher = worse)
- `zeitaufwandMin` (minutes spent)

Aggregation (`server/logic/health.js`):
- **drehenEnergie**: mean of `energie` across drehtage where `energie > 0`
- **erschoepfung**: mean of `erschoepfung` across drehtage where `erschoepfung > 0`
- **totalMinuten**: sum of `zeitaufwandMin` across all active drehtage
- **activeDrehtage**: count of drehtage with any nonzero energy or exhaustion

Unfilled/empty drehtage (all zeros) are excluded from averages.

---

## API Endpoints

All endpoints are prefixed with `/api`.

### Health Check

```
GET /health
→ { "ok": true }
```

### Posts

```
GET /api/posts?days=28&format=Reel&hookType=Statement&duration=15–30s&theme=Büro&sortBy=amplification&limit=10
```
Returns enriched posts (with `.kpis` object). All query params optional. `days` filters by post date. `sortBy` can be any KPI key, `views`, or `date`.

```
GET /api/posts/:id
POST /api/posts         body: { date, caption, views, saves, shares, likes, comments, hookRate, completionRate, newFollowers, format, hookType, duration, theme, screenshot, uploadTime }
PUT /api/posts/:id      body: same fields (partial update ok)
DELETE /api/posts/:id
→ { "ok": true }
```

Post object returned from server always includes `.kpis`:
```json
{
  "id": "abc123",
  "date": "2026-03-15",
  "caption": "Mein bester Post",
  "views": 10000,
  "saves": 250,
  "shares": 50,
  ...
  "kpis": {
    "amplification": 3.0,
    "hookRate": null,
    "completion": null,
    "followerCVR": null,
    "saveRate": 25.0
  }
}
```

### Check-ins

```
GET /api/checkins
→ Array sorted by weekStart descending

POST /api/checkins
body: {
  "followers": 4832,
  "drehtage": [
    { "label": "Drehtag 1", "datum": "2026-03-10", "energie": 8, "erschoepfung": 3, "zeitaufwandMin": 90, "vibeNote": "top form" },
    { "label": "Drehtag 2", "datum": "2026-03-12", "energie": 5, "erschoepfung": 6, "zeitaufwandMin": 120, "vibeNote": "" }
  ]
}
→ Upserts the current week (Monday–Sunday). Computes followerDelta, drehenEnergie, erschoepfung, totalMinuten.

DELETE /api/checkins/:id
→ { "ok": true }
```

### Ideas

```
GET /api/ideas
POST /api/ideas        body: { text, category?, status? }
PUT /api/ideas/:id     body: { text?, category?, status?, linkedPostId? }
DELETE /api/ideas/:id
```

### Overview (aggregated)

```
GET /api/overview?days=28&topKpi=amplification
→ {
    statCards: { totalPosts, avgAmplification, avgHookRate, avgCompletion, avgFollowerCVR, avgSaveRate, latestFollowers, latestFollowerDelta, followerGrowth },
    followerChartData: [{ name, val, weekStart }],
    healthChartData:   [{ name, erschoepfung, energie, weekStart }],
    formatMatrix: [{ format, count, kpis: { amplification, hookRate, ... } }],
    top5: [...enrichedPosts],
    themes: [...]
  }
```

### Screenshot Parsing (Groq Vision)

```
POST /api/screenshot
Content-Type: multipart/form-data
Field: image (file)
→ { views, likes, comments, saves, shares, hookRate, completionRate, newFollowers }
  (null for any field not visible in the screenshot)
```

GROQ_API_KEY lives only on the server. The frontend sends the image file as multipart — no key ever leaves the server.

### Migration

```
POST /api/migrate
body: { posts: [...], checkins: [...], ideas: [...] }
→ { imported: { posts: N, checkins: N, ideas: N } }
```

Fails with 409 if `data/posts.json` already has entries.

---

## Data Models

### Post

```json
{
  "id": "string",
  "createdAt": "ISO timestamp",
  "date": "YYYY-MM-DD",
  "uploadTime": "HH:MM",
  "caption": "string",
  "format": "Reel | Carousel | Story | Static",
  "hookType": "Statement | Frage | Szene | Text-only",
  "duration": "unter 15s | 15–30s | 30–60s | über 60s",
  "theme": "string",
  "views": 0,
  "likes": 0,
  "comments": 0,
  "saves": 0,
  "shares": 0,
  "hookRate": 0,
  "completionRate": 0,
  "newFollowers": 0,
  "screenshot": "base64 data URL or null"
}
```

### Checkin

```json
{
  "id": "string",
  "weekStart": "YYYY-MM-DD (Monday)",
  "weekEnd": "YYYY-MM-DD (Sunday)",
  "followers": 4832,
  "followerDelta": 48,
  "drehenEnergie": 7,
  "erschoepfung": 4,
  "totalMinuten": 210,
  "activeDrehtage": 2,
  "drehtage": [
    {
      "label": "Drehtag 1",
      "datum": "YYYY-MM-DD",
      "energie": 8,
      "erschoepfung": 3,
      "zeitaufwandMin": 90,
      "vibeNote": "string"
    }
  ],
  "createdAt": "ISO timestamp"
}
```

### Idea

```json
{
  "id": "string",
  "createdAt": "ISO timestamp",
  "text": "string",
  "category": "string",
  "status": "Idee | In Produktion | Live",
  "linkedPostId": "post ID or undefined"
}
```

---

## Logic Location Cross-Reference

| Feature | File |
|---------|------|
| KPI formulas (calc) | `server/logic/kpis.js` → `KPIS[key].calc()` |
| KPI color coding (display) | `frontend/index.html` → `kpiColor()` |
| Post enrichment (add .kpis) | `server/logic/kpis.js` → `enrichPost()` |
| avgKpi, formatMatrix, topPosts | `server/logic/aggregations.js` |
| filterByDays | `server/logic/aggregations.js` |
| Health score aggregation | `server/logic/health.js` → `computeHealthScores()` |
| Follower delta | `server/routes/checkins.js` → `POST /` handler |
| Week start (Monday) | `server/routes/checkins.js` → `getMon()` |
| Groq vision call | `server/routes/screenshot.js` |
| All API calls | `frontend/lib/api.js` |
| UI components | `frontend/index.html` (all components inline, Babel transpiled) |
| State management | `frontend/index.html` → `App` component, React useState |
| Data persistence | `server/data/*.json` (flat JSON files, read/written per request) |
