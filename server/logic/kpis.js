const KPIS = {
  amplification: {
    label: 'Amplification Rate',
    unit: '%',
    good: 2,
    ok: 0.5,
    calc: (post) => {
      if (!post.views) return null;
      const val = ((post.shares || 0) + (post.saves || 0)) / post.views * 100;
      return parseFloat(val.toFixed(1));
    },
  },
  hookRate: {
    label: 'Hook Rate',
    unit: '%',
    good: 70,
    ok: 50,
    calc: (post) => {
      if (post.hookRate == null) return null;
      return parseFloat(Number(post.hookRate).toFixed(1));
    },
  },
  completion: {
    label: 'Completion Rate',
    unit: '%',
    good: 50,
    ok: 30,
    calc: (post) => {
      if (post.completionRate == null) return null;
      return parseFloat(Number(post.completionRate).toFixed(1));
    },
  },
  followerCVR: {
    label: 'Follower CVR',
    unit: '%',
    good: 1,
    ok: 0.3,
    calc: (post) => {
      if (!post.views) return null;
      const val = (post.newFollowers || 0) / post.views * 100;
      return parseFloat(val.toFixed(2));
    },
  },
  saveRate: {
    label: 'Save Rate',
    unit: '/1k',
    good: 5,
    ok: 2,
    calc: (post) => {
      if (!post.views) return null;
      const val = (post.saves || 0) / post.views * 1000;
      return parseFloat(val.toFixed(1));
    },
  },
};

function enrichPost(post) {
  const kpis = {};
  for (const [key, def] of Object.entries(KPIS)) {
    kpis[key] = def.calc(post);
  }
  return { ...post, kpis };
}

module.exports = { KPIS, enrichPost };
