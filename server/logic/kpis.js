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
  engagementRate: {
    label: 'Engagement Rate',
    unit: '%',
    good: 3,
    ok: 1,
    calc: (post) => {
      if (!post.views) return null;
      const val = ((post.likes || 0) + (post.comments || 0) + (post.saves || 0) + (post.shares || 0)) / post.views * 100;
      return parseFloat(val.toFixed(2));
    },
  },
  completion: {
    label: 'Completion Rate',
    unit: '%',
    good: 50,
    ok: 30,
    calc: (post) => {
      if (!post.completionRate) return null;
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
      return parseFloat(val.toFixed(3));
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
