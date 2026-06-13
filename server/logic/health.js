// Compute aggregate health scores from drehtage array.
// Only drehtage with score > 0 count (unfilled days are excluded).
function computeHealthScores(drehtage = []) {
  const withEnergie = drehtage.filter(d => d.energie > 0);
  const withErschop = drehtage.filter(d => d.erschoepfung > 0);
  const active = drehtage.filter(d => d.energie > 0 || d.erschoepfung > 0);

  const drehenEnergie = withEnergie.length
    ? Math.round(withEnergie.reduce((s, d) => s + d.energie, 0) / withEnergie.length)
    : 0;
  const erschoepfung = withErschop.length
    ? Math.round(withErschop.reduce((s, d) => s + d.erschoepfung, 0) / withErschop.length)
    : 0;
  const totalMinuten = active.reduce((s, d) => s + (Number(d.zeitaufwandMin) || 0), 0);

  return { drehenEnergie, erschoepfung, totalMinuten, activeDrehtage: active.length };
}

module.exports = { computeHealthScores };
