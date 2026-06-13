const BASE = 'http://localhost:3001/api';

const api = {
  // Posts
  getPosts: (params = {}) => {
    const q = new URLSearchParams(Object.entries(params).filter(([, v]) => v != null && v !== 'Alle'));
    return fetch(`${BASE}/posts?${q}`).then(r => r.json());
  },
  createPost: (data) => fetch(`${BASE}/posts`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
  }).then(r => r.json()),
  updatePost: (id, data) => fetch(`${BASE}/posts/${id}`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
  }).then(r => r.json()),
  deletePost: (id) => fetch(`${BASE}/posts/${id}`, { method: 'DELETE' }).then(r => r.json()),

  // Check-ins
  getCheckins: () => fetch(`${BASE}/checkins`).then(r => r.json()),
  createCheckin: (data) => fetch(`${BASE}/checkins`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
  }).then(r => r.json()),
  deleteCheckin: (id) => fetch(`${BASE}/checkins/${id}`, { method: 'DELETE' }).then(r => r.json()),

  // Ideas
  getIdeas: () => fetch(`${BASE}/ideas`).then(r => r.json()),
  createIdea: (data) => fetch(`${BASE}/ideas`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
  }).then(r => r.json()),
  updateIdea: (id, data) => fetch(`${BASE}/ideas/${id}`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
  }).then(r => r.json()),
  deleteIdea: (id) => fetch(`${BASE}/ideas/${id}`, { method: 'DELETE' }).then(r => r.json()),

  // Overview (all aggregated stats in one call)
  getOverview: (params = {}) => {
    const q = new URLSearchParams(Object.entries(params).filter(([, v]) => v != null));
    return fetch(`${BASE}/overview?${q}`).then(r => r.json());
  },

  // Screenshot parsing (server calls Groq, key stays server-side)
  parseScreenshot: async (file) => {
    const fd = new FormData();
    fd.append('image', file);
    const r = await fetch(`${BASE}/screenshot`, { method: 'POST', body: fd });
    if (!r.ok) { const e = await r.json().catch(() => ({})); return { error: e.error || `HTTP ${r.status}` }; }
    return { data: await r.json() };
  },

  // One-time migration from localStorage
  migrate: (data) => fetch(`${BASE}/migrate`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
  }).then(r => r.json()),
};
