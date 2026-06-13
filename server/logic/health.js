function computeHealthScores(drehtage) {
  if (!Array.isArray(drehtage) || drehtage.length === 0) {
    return { drehenEnergie: 0, erschoepfung: 0, totalMinuten: 0, activeDrehtage: 0 };
  }

  const active = drehtage.filter(d => d.energie > 0 || d.erschoepfung > 0);
  const activeDrehtage = active.length;

  const energieEntries = drehtage.filter(d => d.energie > 0);
  const erschoepfungEntries = drehtage.filter(d => d.erschoepfung > 0);

  const drehenEnergie = energieEntries.length
    ? energieEntries.reduce((s, d) => s + d.energie, 0) / energieEntries.length
    : 0;

  const erschoepfung = erschoepfungEntries.length
    ? erschoepfungEntries.reduce((s, d) => s + d.erschoepfung, 0) / erschoepfungEntries.length
    : 0;

  const totalMinuten = active.reduce((s, d) => s + (d.zeitaufwandMin || 0), 0);

  return { drehenEnergie, erschoepfung, totalMinuten, activeDrehtage };
}

module.exports = { computeHealthScores };
