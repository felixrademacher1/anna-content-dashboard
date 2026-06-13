
const API = '';

/* ===== charts.jsx ===== */
/* ============================================================
   charts.jsx — Icons + SVG charts (Follower, Health, Sparkline, Ring)
   ============================================================ */

/* ---------- Icon set (inline SVG, stroke style) ---------- */
const ICONS = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  film: '<rect x="3" y="3" width="18" height="18" rx="2.5"/><path d="M7 3v18M17 3v18M3 8h4M3 16h4M17 8h4M17 16h4M7 12h10"/>',
  pulse: '<path d="M3 12h4l2.5-7 5 14 2.5-7H21"/>',
  bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.8.8 1.2 1.4 1.3 2.5h5.4c.1-1.1.5-1.7 1.3-2.5A6 6 0 0 0 12 3Z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  chevDown: '<path d="m6 9 6 6 6-6"/>',
  chevRight: '<path d="m9 6 6 6-6 6"/>',
  arrowUp: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
  arrowDown: '<path d="M12 5v14M19 12l-7 7-7-7"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2.5"/><circle cx="9" cy="9" r="2"/><path d="m21 15-4.5-4.5L7 20"/>',
  sparkles: '<path d="M12 3l1.8 4.7L18.5 9.5 13.8 11.3 12 16l-1.8-4.7L5.5 9.5 10.2 7.7 12 3Z"/><path d="M19 14l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  trash: '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6"/>',
  trending: '<path d="M22 7 13.5 15.5 8.5 10.5 2 17M16 7h6v6"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2.5"/><path d="M3 10h18M8 2v4M16 2v4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  flame: '<path d="M12 3c1 3 4 4.5 4 8a4 4 0 0 1-8 0c0-1.2.5-2 1-2.5 0 1.5 1 2 1.5 2 .5-2-1-3.5 1.5-5.5Z"/><path d="M12 3c1 3 4 4.5 4 8a4 4 0 0 1-8 0"/>',
  zap: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>',
  battery: '<rect x="2" y="7" width="16" height="10" rx="2.5"/><path d="M22 11v2"/>',
  heart: '<path d="M12 20s-7-4.5-9.5-9C1 8 2.5 4.5 6 4.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 6.5C19 15.5 12 20 12 20Z"/>',
  bookmark: '<path d="M19 21 12 16 5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"/>',
  share: '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v14"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  message: '<path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2Z"/>',
  filter: '<path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z"/>',
  more: '<circle cx="12" cy="5" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="12" cy="19" r="1.4"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  star: '<path d="M12 3l2.7 5.8 6.3.7-4.7 4.3 1.3 6.2L12 17.3 6.1 20.3l1.3-6.2L2.7 9.5l6.3-.7L12 3Z"/>',
  edit: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  layers: '<path d="m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5"/>',
  drag: '<circle cx="9" cy="6" r="1.3"/><circle cx="15" cy="6" r="1.3"/><circle cx="9" cy="12" r="1.3"/><circle cx="15" cy="12" r="1.3"/><circle cx="9" cy="18" r="1.3"/><circle cx="15" cy="18" r="1.3"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 17v-5"/><circle cx="12" cy="7.5" r=".5" fill="currentColor" stroke="none"/>',
};

function Icon({ name, className = 'icon', style }) {
  const inner = ICONS[name] || '';
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: inner }} />
  );
}

/* ---------- helpers ---------- */
function niceMax(v) {
  if (v <= 0) return 10;
  const pow = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / pow;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return step * pow;
}
function fmtK(n) {
  if (n == null) return '—';
  if (n >= 1000000) return (n / 1000000).toFixed(n >= 10000000 ? 0 : 1).replace('.', ',') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace('.', ',') + 'k';
  return '' + n;
}

/* ============================================================
   FollowerChart — variants: 'area' | 'line' | 'bars'
   data: [{ name, val }]
   ============================================================ */
function FollowerChart({ data, variant = 'area', height = 240 }) {
  const W = 720, H = height, padL = 16, padR = 16, padT = 26, padB = 30;
  const vals = data.map(d => d.val);
  const min = Math.min(...vals), max = Math.max(...vals);
  const lo = min - (max - min) * 0.35;
  const hi = max + (max - min) * 0.15;
  const span = hi - lo || 1;
  const iw = W - padL - padR, ih = H - padT - padB;
  const x = i => padL + (data.length === 1 ? iw / 2 : (i / (data.length - 1)) * iw);
  const y = v => padT + ih - ((v - lo) / span) * ih;
  const xb = i => padL + (i + 0.5) * (iw / data.length);

  const linePts = data.map((d, i) => `${x(i)},${y(d.val)}`).join(' ');
  const areaPts = `${padL},${padT + ih} ${linePts} ${padL + iw},${padT + ih}`;
  const grid = [0, 0.5, 1].map(t => padT + ih - t * ih);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      <defs>
        <linearGradient id="folGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {grid.map((gy, i) => (
        <line key={i} x1={padL} x2={padL + iw} y1={gy} y2={gy} stroke="var(--border)" strokeWidth="1" strokeDasharray={i === 2 ? '0' : '3 5'} />
      ))}

      {variant === 'bars' && data.map((d, i) => {
        const bw = Math.min(34, (iw / data.length) * 0.5);
        const by = y(d.val), bh = padT + ih - by;
        const last = i === data.length - 1;
        return <rect key={i} x={xb(i) - bw / 2} y={by} width={bw} height={Math.max(2, bh)} rx="5"
          fill={last ? 'var(--accent)' : 'var(--accent-soft)'} stroke={last ? 'none' : 'var(--accent)'} strokeOpacity="0.5" strokeWidth="1" />;
      })}

      {variant === 'area' && <polygon points={areaPts} fill="url(#folGrad)" />}
      {(variant === 'area' || variant === 'line') && (
        <polyline points={linePts} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      )}
      {(variant === 'area' || variant === 'line') && data.map((d, i) => {
        const last = i === data.length - 1;
        return <circle key={i} cx={x(i)} cy={y(d.val)} r={last ? 5 : 3.2}
          fill={last ? 'var(--accent)' : 'var(--surface)'} stroke="var(--accent)" strokeWidth="2" />;
      })}

      {/* last value label */}
      {(() => {
        const i = data.length - 1, cx = variant === 'bars' ? xb(i) : x(i);
        return <text x={Math.min(cx, W - 40)} y={y(data[i].val) - 12} textAnchor="middle"
          fontFamily="var(--font-display)" fontSize="15" fontWeight="700" fill="var(--ink)">{fmtK(data[i].val)}</text>;
      })()}

      {/* x labels */}
      {data.map((d, i) => {
        if (data.length > 8 && i % 2 !== 0 && i !== data.length - 1) return null;
        const cx = variant === 'bars' ? xb(i) : x(i);
        return <text key={i} x={cx} y={H - 9} textAnchor="middle" fontSize="11" fontWeight="500"
          fill="var(--ink-3)" fontFamily="var(--font-sans)">{d.name}</text>;
      })}
    </svg>
  );
}

/* ============================================================
   HealthChart — variants: 'bars' | 'lines' | 'lollipop'
   data: [{ name, energie, erschoepfung }]  (scale 1..10)
   ============================================================ */
function HealthChart({ data, variant = 'bars', height = 240 }) {
  const W = 720, H = height, padL = 28, padR = 16, padT = 22, padB = 30;
  const iw = W - padL - padR, ih = H - padT - padB;
  const y = v => padT + ih - (v / 10) * ih;
  const xb = i => padL + (i + 0.5) * (iw / data.length);
  const grid = [0, 2, 4, 6, 8, 10];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      {grid.map((g, i) => (
        <g key={i}>
          <line x1={padL} x2={padL + iw} y1={y(g)} y2={y(g)} stroke="var(--border)" strokeWidth="1" strokeDasharray={g === 0 ? '0' : '3 5'} />
          <text x={padL - 8} y={y(g) + 4} textAnchor="end" fontSize="10" fill="var(--ink-3)" fontFamily="var(--font-sans)">{g}</text>
        </g>
      ))}

      {variant === 'bars' && data.map((d, i) => {
        const slot = iw / data.length, bw = Math.min(15, slot * 0.32), gap = 3;
        const cx = xb(i);
        const items = [
          { v: d.energie, c: 'var(--good)', off: -(bw / 2 + gap / 2) },
          { v: d.erschoepfung, c: 'var(--hook)', off: (bw / 2 + gap / 2) },
        ];
        return items.map((it, k) => {
          const by = y(it.v), bh = padT + ih - by;
          return <rect key={i + '-' + k} x={cx + it.off - bw / 2} y={by} width={bw} height={Math.max(2, bh)} rx="4" fill={it.c} />;
        });
      })}

      {variant === 'lines' && ['energie', 'erschoepfung'].map((key, k) => {
        const c = k === 0 ? 'var(--good)' : 'var(--hook)';
        const pts = data.map((d, i) => `${xb(i)},${y(d[key])}`).join(' ');
        return (
          <g key={key}>
            <polyline points={pts} fill="none" stroke={c} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" strokeDasharray={k === 1 ? '5 4' : '0'} />
            {data.map((d, i) => <circle key={i} cx={xb(i)} cy={y(d[key])} r="3.4" fill="var(--surface)" stroke={c} strokeWidth="2" />)}
          </g>
        );
      })}

      {variant === 'lollipop' && data.map((d, i) => {
        const cx = xb(i);
        return (
          <g key={i}>
            <line x1={cx} x2={cx} y1={y(d.energie)} y2={y(d.erschoepfung)} stroke="var(--border-2)" strokeWidth="2" />
            <circle cx={cx} cy={y(d.energie)} r="6" fill="var(--good)" />
            <circle cx={cx} cy={y(d.erschoepfung)} r="6" fill="var(--hook)" />
          </g>
        );
      })}

      {data.map((d, i) => (
        <text key={i} x={xb(i)} y={H - 9} textAnchor="middle" fontSize="11" fontWeight="500" fill="var(--ink-3)" fontFamily="var(--font-sans)">{d.name}</text>
      ))}
    </svg>
  );
}

/* ---------- Sparkline ---------- */
function Sparkline({ data, color = 'var(--accent)', w = 96, h = 30 }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data), max = Math.max(...data), span = (max - min) || 1;
  const x = i => (i / (data.length - 1)) * w;
  const y = v => h - 3 - ((v - min) / span) * (h - 6);
  const pts = data.map((v, i) => `${x(i)},${y(v)}`).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={x(data.length - 1)} cy={y(data[data.length - 1])} r="2.6" fill={color} />
    </svg>
  );
}

/* ---------- Ring gauge (for KPI cards variant) ---------- */
function Ring({ pct, color, size = 56, stroke = 6, children }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  const p = Math.max(0, Math.min(1, pct));
  return (
    <div style={{ position: 'relative', width: size, height: size, flex: 'none' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - p)}
          style={{ transition: 'stroke-dashoffset .6s var(--ease)' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>{children}</div>
    </div>
  );
}

Object.assign(window, { Icon, ICONS, FollowerChart, HealthChart, Sparkline, Ring, fmtK, niceMax });


/* ===== ui.jsx ===== */
/* ============================================================
   ui.jsx — shared atoms: formatting, badges, stat cards, drawer, fields
   ============================================================ */
const nf = new Intl.NumberFormat('de-DE');
const fmtN = n => (n == null ? '—' : nf.format(Math.round(n)));

function kpiVar(key) {
  return { amplification: '--amp', engagementRate: '--hook', completion: '--compl', followerCVR: '--cvr', saveRate: '--save' }[key];
}
function kpiSoftVar(key) {
  return { amplification: '--amp-soft', engagementRate: '--hook-soft', completion: '--compl-soft', followerCVR: '--cvr-soft', saveRate: '--save-soft' }[key];
}
const ratingLabel = { good: 'Stark', ok: 'Solide', bad: 'Schwach', none: 'Keine Daten' };

function KpiBadge({ k, val }) {
  const r = kpiRating(k, val);
  if (r === 'none') return null;
  const color = r === 'good' ? 'var(--good)' : r === 'ok' ? 'var(--accent)' : 'var(--bad)';
  return <span style={{ display: 'inline-block', width: 32, height: 5, borderRadius: 99, background: color, opacity: .75 }} />;
}

function DeltaPill({ value, suffix = '' }) {
  if (value == null) return null;
  const up = value >= 0;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 13, fontWeight: 600,
      color: up ? 'var(--good)' : 'var(--bad)' }} className="num">
      <Icon name={up ? 'arrowUp' : 'arrowDown'} className="icon-sm" />
      {up ? '+' : ''}{fmtN(value)}{suffix}
    </span>
  );
}

/* ---------- Segmented control ---------- */
function Segmented({ options, value, onChange, size = 'md' }) {
  return (
    <div style={{ display: 'inline-flex', background: 'var(--surface-3)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-pill)', padding: 3, gap: 2 }}>
      {options.map(o => {
        const v = typeof o === 'string' ? o : o.value;
        const lbl = typeof o === 'string' ? o : o.label;
        const active = v === value;
        return (
          <button key={v} onClick={() => onChange(v)} style={{
            height: size === 'sm' ? 28 : 32, padding: size === 'sm' ? '0 12px' : '0 14px',
            borderRadius: 'var(--radius-pill)', fontSize: 13, fontWeight: 600,
            color: active ? 'var(--ink)' : 'var(--ink-3)',
            background: active ? 'var(--surface)' : 'transparent',
            boxShadow: active ? 'var(--shadow-xs)' : 'none', transition: 'all .14s var(--ease)',
          }}>{lbl}</button>
        );
      })}
    </div>
  );
}

/* ---------- Hero stat tile (followers / posts) ---------- */
function HeroTile({ label, value, sub, delta, deltaSuffix, spark, accent = false, icon }) {
  return (
    <div className="card" style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 4,
      background: accent ? 'var(--ink-btn)' : 'var(--surface)', borderColor: accent ? 'var(--ink-btn)' : 'var(--border)',
      position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {icon && <Icon name={icon} className="icon-sm" style={{ color: accent ? 'var(--accent)' : 'var(--ink-3)' }} />}
        <span className="eyebrow" style={{ color: accent ? 'rgba(243,241,233,.6)' : 'var(--ink-3)' }}>{label}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, marginTop: 2 }}>
        <div className="num" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 38, lineHeight: 1,
          letterSpacing: '-.03em', color: accent ? 'var(--ink-on-dark)' : 'var(--ink)' }}>{value}</div>
        {spark && <div style={{ opacity: .9 }}><Sparkline data={spark} color={accent ? 'var(--accent)' : 'var(--accent)'} /></div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
        {delta != null && <DeltaPill value={delta} suffix={deltaSuffix} />}
        {sub && <span style={{ fontSize: 12.5, color: accent ? 'rgba(243,241,233,.55)' : 'var(--ink-3)' }}>{sub}</span>}
      </div>
    </div>
  );
}

/* ---------- KPI stat (the 5 averages) — 3 presentation variants ---------- */
function KpiStat({ k, val, variant }) {
  const def = KPIS[k];
  const r = kpiRating(k, val);
  const color = `var(${kpiVar(k)})`;
  const soft = `var(${kpiSoftVar(k)})`;
  const target = def.good;
  const pct = val == null ? 0 : Math.min(1, val / (target * 1.25));
  const display = fmtKpi(k, val);

  if (variant === 'ring') {
    return (
      <div className="card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
        <Ring pct={pct} color={color} size={58} stroke={6}>
          <Icon name={kpiIcon(k)} className="icon-sm" style={{ color }} />
        </Ring>
        <div style={{ minWidth: 0 }}>
          <div className="eyebrow" style={{ marginBottom: 3, display: 'flex', alignItems: 'center', gap: 5 }}>{def.label}<KpiTooltip k={k} /></div>
          <div className="num" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, lineHeight: 1 }}>
            {display}<span style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 600, marginLeft: 2 }}>{def.unit}</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'bar') {
    return (
      <div className="card" style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <span className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>{def.label}<KpiTooltip k={k} /></span>
          <span className="dot" style={{ background: color }} />
        </div>
        <div className="num" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, lineHeight: 1 }}>
          {display}<span style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 600, marginLeft: 2 }}>{def.unit}</span>
        </div>
        <div style={{ height: 6, background: 'var(--surface-3)', borderRadius: 99, overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, width: (pct * 100) + '%', background: color, borderRadius: 99,
            transition: 'width .6s var(--ease)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--ink-3)' }}>
          <span>Ziel {target}{def.unit}</span>
          <span>{ratingLabel[r]}</span>
        </div>
      </div>
    );
  }

  // 'clean' default
  return (
    <div className="card" style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <span className="dot" style={{ background: color }} />
        <span className="eyebrow">{def.label}</span>
        <KpiTooltip k={k} />
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 6 }}>
        <div className="num" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 30, lineHeight: 1 }}>
          {display}<span style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 600, marginLeft: 2 }}>{def.unit}</span>
        </div>
      </div>
      <KpiBadge k={k} val={val} />
    </div>
  );
}

function kpiIcon(k) {
  return { amplification: 'share', engagementRate: 'flame', completion: 'target', followerCVR: 'trending', saveRate: 'bookmark' }[k];
}

/* ---------- Drawer (slide-over) ---------- */
function Drawer({ open, onClose, title, subtitle, children, footer, width = 480 }) {
  React.useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, onClose]);
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 60, pointerEvents: open ? 'auto' : 'none' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(26,24,19,.34)',
        opacity: open ? 1 : 0, transition: 'opacity .26s var(--ease)', backdropFilter: 'blur(2px)' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 'min(' + width + 'px, 100%)',
        background: 'var(--surface)', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column',
        transform: open ? 'translateX(0)' : 'translateX(100%)', transition: 'transform .3s var(--ease)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12,
          padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 700 }}>{title}</h3>
            {subtitle && <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 2 }}>{subtitle}</div>}
          </div>
          <button className="btn btn-icon btn-ghost" onClick={onClose} aria-label="Schließen"><Icon name="x" /></button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>{children}</div>
        {footer && <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>{footer}</div>}
      </div>
    </div>
  );
}

/* ---------- Form fields ---------- */
function Field({ label, hint, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)' }}>{label}</span>
      {children}
      {hint && <span style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{hint}</span>}
    </label>
  );
}
const inputStyle = {
  height: 42, padding: '0 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-2)',
  background: 'var(--surface-2)', fontSize: 14, outline: 'none', width: '100%', transition: 'border-color .14s, box-shadow .14s',
};
function TextInput(props) {
  const [foc, setFoc] = React.useState(false);
  return <input {...props} onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
    style={{ ...inputStyle, borderColor: foc ? 'var(--accent)' : 'var(--border-2)',
      boxShadow: foc ? '0 0 0 3px var(--accent-soft)' : 'none', ...(props.style || {}) }} />;
}
function SelectInput({ value, onChange, options }) {
  return (
    <div style={{ position: 'relative' }}>
      <select value={value} onChange={e => onChange(e.target.value)}
        style={{ ...inputStyle, appearance: 'none', paddingRight: 34, cursor: 'pointer' }}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <Icon name="chevDown" className="icon-sm" style={{ position: 'absolute', right: 12, top: 13, color: 'var(--ink-3)', pointerEvents: 'none' }} />
    </div>
  );
}

/* ---------- Slider (1..10) ---------- */
function ScaleSlider({ value, onChange, color = 'var(--accent)', max = 10 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <input type="range" min="0" max={max} step="1" value={value} onChange={e => onChange(+e.target.value)}
        style={{ flex: 1, accentColor: color, height: 4 }} />
      <span className="num" style={{ width: 26, textAlign: 'right', fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: 16,
        color: value === 0 ? 'var(--ink-3)' : 'var(--ink)' }}>{value || '–'}</span>
    </div>
  );
}

/* ---------- KPI info tooltip ---------- */
function KpiTooltip({ k }) {
  const [show, setShow] = React.useState(false);
  const def = KPIS[k];
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <Icon name="info" style={{ width: 13, height: 13, color: 'var(--ink-3)', cursor: 'default', flexShrink: 0 }} />
      {show && (
        <span style={{
          position: 'absolute', bottom: 'calc(100% + 7px)', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--ink-btn)', color: 'var(--ink-on-dark)',
          fontSize: 12, lineHeight: 1.5, padding: '8px 12px', borderRadius: 9,
          whiteSpace: 'nowrap', zIndex: 200, pointerEvents: 'none',
          boxShadow: '0 4px 18px rgba(0,0,0,.22)',
        }}>
          <span style={{ display: 'block', fontWeight: 700, marginBottom: 2 }}>{def.label}</span>
          <span style={{ opacity: .8 }}>{def.desc}</span>
          <span style={{ display: 'block', opacity: .55, marginTop: 3, fontSize: 11 }}>
            Gut ≥{def.good}{def.unit} · Ok ≥{def.ok}{def.unit}
          </span>
        </span>
      )}
    </span>
  );
}

Object.assign(window, {
  nf, fmtN, kpiVar, kpiSoftVar, ratingLabel, KpiBadge, DeltaPill, Segmented,
  HeroTile, KpiStat, kpiIcon, KpiTooltip, Drawer, Field, TextInput, SelectInput, ScaleSlider, inputStyle,
});


/* ===== views.jsx ===== */
/* ============================================================
   views.jsx — OverviewView + PostsView
   ============================================================ */

function weekLabel(weekStart) {
  const d = new Date(weekStart);
  return d.getDate() + '.' + (d.getMonth() + 1) + '.';
}

/* ============================================================
   OVERVIEW
   ============================================================ */
function OverviewView({ posts, checkins, days, setDays, statCardStyle, followerVariant, healthVariant, onOpenPost }) {
  const [topKpi, setTopKpi] = React.useState('amplification');
  const inRange = React.useMemo(() => filterByDays(posts, days), [posts, days]);

  const totalViews = inRange.reduce((s, p) => s + p.views, 0);
  const avgs = {};
  KPI_ORDER.forEach(k => { avgs[k] = avgKpi(inRange, k); });
  const matrix = formatMatrix(inRange);
  const top5 = topPosts(inRange, topKpi, 5);
  const themes = themeStats(inRange).slice(0, 4);

  const chrono = [...checkins].reverse();
  const folData = chrono.map(c => ({ name: weekLabel(c.weekStart), val: c.followers }));
  const healthData = chrono.map(c => ({ name: weekLabel(c.weekStart), energie: +c.drehenEnergie.toFixed(1), erschoepfung: +c.erschoepfung.toFixed(1) }));
  const latest = checkins[0];
  const folSpark = chrono.map(c => c.followers);

  const dayOpts = [{ value: 7, label: '7T' }, { value: 28, label: '28T' }, { value: 90, label: '90T' }, { value: 9999, label: 'Alle' }];

  return (
    <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      {/* sub-toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="eyebrow">Zeitraum</span>
          <Segmented options={dayOpts} value={days} onChange={setDays} size="sm" />
        </div>
        <div style={{ fontSize: 13, color: 'var(--ink-3)' }} className="num">
          {inRange.length} Posts · {fmtN(totalViews)} Views
        </div>
      </div>

      {/* hero tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
        <HeroTile label="Follower" value={fmtN(latest.followers)} accent icon="heart"
          delta={latest.followerDelta} deltaSuffix=" Wo." spark={folSpark} sub="diese Woche" />
        <HeroTile label="Posts im Zeitraum" value={inRange.length} icon="film"
          sub={days >= 9999 ? 'gesamt' : `letzte ${days} Tage`} />
        <HeroTile label="Gesamtreichweite" value={fmtK(totalViews)} icon="eye" sub="Views im Zeitraum" />
        <HeroTile label="Beste Energie" value={latest.drehenEnergie.toFixed(1)} icon="zap"
          sub={`Ø über ${latest.activeDrehtage} Drehtage`} />
      </div>

      {/* KPI averages */}
      <section>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700 }}>Ø KPIs im Zeitraum</h2>
          <span style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>Durchschnitt über alle Posts mit Daten</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(184px, 1fr))', gap: 14 }}>
          {KPI_ORDER.map(k => <KpiStat key={k} k={k} val={avgs[k]} variant={statCardStyle} />)}
        </div>
      </section>

      {/* charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 14 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <div>
              <span className="eyebrow">Follower-Wachstum</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
                <span className="num" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22 }}>{fmtN(latest.followers)}</span>
                <DeltaPill value={latest.followers - chrono[0].followers} />
                <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>seit {weekLabel(chrono[0].weekStart)}</span>
              </div>
            </div>
            <Icon name="trending" style={{ color: 'var(--accent)' }} />
          </div>
          <FollowerChart data={folData} variant={followerVariant} />
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <div>
              <span className="eyebrow">Dreh-Health</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 6 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 600 }}>
                  <span className="dot" style={{ background: 'var(--good)' }} />Energie</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 600 }}>
                  <span className="dot" style={{ background: 'var(--hook)' }} />Erschöpfung</span>
              </div>
            </div>
            <Icon name="pulse" style={{ color: 'var(--hook)' }} />
          </div>
          <HealthChart data={healthData} variant={healthVariant} />
        </div>
      </div>

      {/* matrix + top5 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)', gap: 14 }} className="ov-split">
        <FormatMatrix matrix={matrix} />
        <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>Top 5 Posts</h2>
            <div style={{ position: 'relative' }}>
              <SelectInput value={topKpi} onChange={setTopKpi}
                options={KPI_ORDER} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {top5.map((p, i) => (
              <button key={p.id} onClick={() => onOpenPost(p)} style={{ display: 'flex', alignItems: 'center', gap: 12,
                textAlign: 'left', padding: '10px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--surface-2)',
                border: '1px solid var(--border)', transition: 'all .14s var(--ease)', width: '100%' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.background = 'var(--surface-3)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface-2)'; }}>
                <span className="num" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: 'var(--ink-3)', width: 20 }}>{i + 1}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.caption}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{p.format} · {fmtK(p.views)} Views</div>
                </div>
                <span className="num" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: `var(${kpiVar(topKpi)})` }}>
                  {fmtKpi(topKpi, p.kpis[topKpi])}<span style={{ fontSize: 11, color: 'var(--ink-3)', marginLeft: 1 }}>{KPIS[topKpi].unit}</span>
                </span>
              </button>
            ))}
          </div>
          {themes.length > 0 && (
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
              <span className="eyebrow">Top-Themen</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                {themes.map(t => (
                  <span key={t.theme} className="chip" style={{ height: 28 }}>{t.theme}
                    <span className="num" style={{ color: 'var(--ink-3)', fontWeight: 600 }}>{fmtK(t.views)}</span></span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Format matrix ---------- */
function FormatMatrix({ matrix }) {
  return (
    <div className="card" style={{ padding: 20, overflowX: 'auto' }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Format-Matrix</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 480 }}>
        <thead>
          <tr>
            <th style={thStyle('left')}>Format</th>
            <th style={thStyle('center')}>Posts</th>
            {KPI_ORDER.map(k => <th key={k} style={thStyle('center')}>{KPIS[k].short}</th>)}
          </tr>
        </thead>
        <tbody>
          {matrix.map(row => (
            <tr key={row.format}>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{row.format}</td>
              <td style={{ ...tdStyle, textAlign: 'center', color: 'var(--ink-3)' }} className="num">{row.count}</td>
              {KPI_ORDER.map(k => {
                const v = row.kpis[k];
                const r = kpiRating(k, v);
                return (
                  <td key={k} style={{ ...tdStyle, textAlign: 'center' }}>
                    <span className="num" style={{
                      display: 'inline-block', minWidth: 42, padding: '3px 6px', borderRadius: 6, fontWeight: 600, fontSize: 13,
                      background: v == null ? 'transparent' : (r === 'good' ? 'var(--good-soft)' : r === 'bad' ? 'var(--bad-soft)' : 'var(--surface-3)'),
                      color: v == null ? 'var(--ink-3)' : (r === 'good' ? 'var(--good)' : r === 'bad' ? 'var(--bad)' : 'var(--ink-2)'),
                    }}>{fmtKpi(k, v)}</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
const thStyle = (align) => ({ textAlign: align, fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase',
  color: 'var(--ink-3)', padding: '0 8px 10px', borderBottom: '1px solid var(--border)' });
const tdStyle = { padding: '11px 8px', borderBottom: '1px solid var(--border)', fontSize: 14 };

/* ============================================================
   POSTS
   ============================================================ */
function PostsView({ posts, onOpenPost, onAdd }) {
  const [q, setQ] = React.useState('');
  const [format, setFormat] = React.useState('Alle');
  const [hookType, setHookType] = React.useState('Alle');
  const [theme, setTheme] = React.useState('Alle');
  const [sortBy, setSortBy] = React.useState('date');
  const [showFilters, setShowFilters] = React.useState(false);

  const themes = ['Alle', ...Array.from(new Set(posts.map(p => p.theme)))];
  const hookTypes = ['Alle', 'Statement', 'Frage', 'Szene', 'Text-only'];
  const formats = ['Alle', 'Reel', 'Carousel', 'Story', 'Static'];

  let list = posts.filter(p =>
    (format === 'Alle' || p.format === format) &&
    (hookType === 'Alle' || p.hookType === hookType) &&
    (theme === 'Alle' || p.theme === theme) &&
    (!q || p.caption.toLowerCase().includes(q.toLowerCase()))
  );
  list = [...list].sort((a, b) => {
    if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'views') return b.views - a.views;
    const av = a.kpis[sortBy], bv = b.kpis[sortBy];
    if (av == null) return 1; if (bv == null) return -1;
    return bv - av;
  });

  const sortOpts = [{ value: 'date', label: 'Datum' }, { value: 'views', label: 'Views' }, ...KPI_ORDER.map(k => ({ value: k, label: KPIS[k].short }))];

  return (
    <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* toolbar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1 1 240px', minWidth: 200 }}>
            <Icon name="search" className="icon-sm" style={{ position: 'absolute', left: 13, top: 13, color: 'var(--ink-3)' }} />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Caption durchsuchen…"
              style={{ ...inputStyle, paddingLeft: 36 }} />
          </div>
          <button className={`btn btn-ghost ${showFilters ? 'active' : ''}`} onClick={() => setShowFilters(v => !v)}
            style={showFilters ? { borderColor: 'var(--ink-btn)', color: 'var(--ink)' } : {}}>
            <Icon name="filter" className="icon-sm" />Filter</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
            <span style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>Sortieren</span>
            <div style={{ width: 130 }}><SelectInput value={sortBy} onChange={setSortBy} options={sortOpts.map(o => o.value)} /></div>
          </div>
        </div>

        {/* format chips */}
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {formats.map(f => <button key={f} className={`chip ${format === f ? 'active' : ''}`} onClick={() => setFormat(f)}>{f}</button>)}
        </div>

        {showFilters && (
          <div className="card" style={{ padding: 14, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            <Field label="Hook-Typ"><SelectInput value={hookType} onChange={setHookType} options={hookTypes} /></Field>
            <Field label="Thema"><SelectInput value={theme} onChange={setTheme} options={themes} /></Field>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, color: 'var(--ink-3)' }} className="num">{list.length} {list.length === 1 ? 'Post' : 'Posts'}</span>
        <button className="btn btn-ghost" onClick={onAdd}><Icon name="plus" className="icon-sm" />Post hinzufügen</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {list.map(p => <PostCard key={p.id} post={p} onOpen={() => onOpenPost(p)} highlight={sortBy} />)}
        {list.length === 0 && (
          <div className="card" style={{ padding: 48, textAlign: 'center', color: 'var(--ink-3)' }}>
            <Icon name="search" style={{ width: 28, height: 28, margin: '0 auto 10px' }} />
            <div style={{ fontWeight: 600, color: 'var(--ink-2)' }}>Keine Posts gefunden</div>
            <div style={{ fontSize: 13 }}>Passe Suche oder Filter an.</div>
          </div>
        )}
      </div>
    </div>
  );
}

function PostCard({ post, onOpen, highlight }) {
  return (
    <button onClick={onOpen} className="card" style={{ padding: 0, overflow: 'hidden', textAlign: 'left', width: '100%',
      display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', transition: 'box-shadow .16s var(--ease), border-color .16s' }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.borderColor = 'var(--border-strong)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.borderColor = 'var(--border)'; }}>
      {/* info */}
      <div style={{ flex: '1 1 320px', minWidth: 0, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600 }}>
            <span className="dot" style={{ background: 'var(--accent)' }} />{post.format}</span>
          <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>·</span>
          <span style={{ fontSize: 12, color: 'var(--ink-3)', whiteSpace: 'nowrap' }} className="num">{new Date(post.date).toLocaleDateString('de-DE', { day: '2-digit', month: 'short' })}</span>
          <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>· {post.uploadTime}</span>
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.35, color: 'var(--ink)' }}>{post.caption}</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto' }}>
          <span className="chip" style={{ height: 26, fontSize: 11.5 }}>{post.theme}</span>
          <span className="chip" style={{ height: 26, fontSize: 11.5 }}>{post.hookType}</span>
          <span className="chip" style={{ height: 26, fontSize: 11.5 }}>{post.duration}</span>
        </div>
      </div>
      {/* kpi strip */}
      <div style={{ display: 'flex', alignItems: 'stretch', borderLeft: '1px solid var(--border)', background: 'var(--surface-2)', flexWrap: 'wrap' }}>
        <KpiCell label="Views" value={fmtK(post.views)} />
        {KPI_ORDER.map(k => {
          const v = post.kpis[k], r = kpiRating(k, v);
          return <KpiCell key={k} label={KPIS[k].short} value={fmtKpi(k, v)} unit={KPIS[k].unit}
            color={v == null ? 'var(--ink-3)' : `var(${kpiVar(k)})`}
            dot={r} active={highlight === k} />;
        })}
      </div>
    </button>
  );
}
function KpiCell({ label, value, unit, color = 'var(--ink)', dot, active }) {
  return (
    <div style={{ padding: '14px 14px', minWidth: 72, display: 'flex', flexDirection: 'column', gap: 3,
      justifyContent: 'center', background: active ? 'var(--surface-3)' : 'transparent' }}>
      <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>{label}</span>
      <span className="num" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color, lineHeight: 1 }}>
        {value}{unit && value !== '—' && <span style={{ fontSize: 10, color: 'var(--ink-3)', marginLeft: 1 }}>{unit}</span>}
      </span>
    </div>
  );
}

Object.assign(window, { OverviewView, PostsView, FormatMatrix, PostCard, KpiCell, weekLabel });


/* ===== views2.jsx ===== */
/* ============================================================
   views2.jsx — CheckinView, IdeasView, AddPostDrawer, PostDetailDrawer
   ============================================================ */

function fmtRange(c) {
  const s = new Date(c.weekStart), e = new Date(c.weekEnd);
  const o = { day: '2-digit', month: 'short' };
  return s.toLocaleDateString('de-DE', o) + ' – ' + e.toLocaleDateString('de-DE', o);
}

/* ---------- mini health meter ---------- */
function Meter({ value, max = 10, color }) {
  return (
    <div style={{ height: 6, background: 'var(--surface-3)', borderRadius: 99, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: (value / max * 100) + '%', background: color, borderRadius: 99, transition: 'width .5s var(--ease)' }} />
    </div>
  );
}

/* ============================================================
   CHECK-IN
   ============================================================ */
function CheckinView({ checkins, onSubmit }) {
  const [formOpen, setFormOpen] = React.useState(false);
  const latest = checkins[0];

  if (!latest) return (
    <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--ink-2)', maxWidth: 540 }}>
          Wöchentlicher Puls: Follower-Stand plus wie sich die Drehtage angefühlt haben.
        </p>
        <button className="btn btn-primary" onClick={() => setFormOpen(true)}><Icon name="plus" className="icon-sm" />Neuer Check-in</button>
      </div>
      <div className="card" style={{ padding: 48, textAlign: 'center', color: 'var(--ink-3)' }}>
        <Icon name="pulse" style={{ width: 28, height: 28, margin: '0 auto 10px' }} />
        <div style={{ fontWeight: 600, color: 'var(--ink-2)', marginBottom: 4 }}>Noch kein Check-in</div>
        <div style={{ fontSize: 13 }}>Klick auf „Neuer Check-in" um zu starten.</div>
      </div>
      <CheckinForm open={formOpen} onClose={() => setFormOpen(false)}
        latest={{ followers: 0, drehenEnergie: 0, erschoepfung: 0, totalMinuten: 0, activeDrehtage: 0 }}
        onSubmit={onSubmit} />
    </div>
  );

  return (
    <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--ink-2)', maxWidth: 540 }}>
          Wöchentlicher Puls: Follower-Stand plus wie sich die Drehtage angefühlt haben. Energie hoch, Erschöpfung niedrig — das ist nachhaltiges Tempo.
        </p>
        <button className="btn btn-primary" onClick={() => setFormOpen(true)}><Icon name="plus" className="icon-sm" />Neuer Check-in</button>
      </div>

      {/* latest highlight */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
          <HiStat label="Follower" value={fmtN(latest.followers)} delta={latest.followerDelta} dark />
          <HiStat label="Ø Energie" value={latest.drehenEnergie.toFixed(1)} sub="von 10" accent="var(--good)" />
          <HiStat label="Ø Erschöpfung" value={latest.erschoepfung.toFixed(1)} sub="von 10" accent="var(--hook)" />
          <HiStat label="Drehzeit" value={Math.round(latest.totalMinuten / 60 * 10) / 10 + 'h'} sub={`${latest.activeDrehtage} aktive Drehtage`} />
        </div>
      </div>

      {/* history */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700 }}>Verlauf</h2>
        {checkins.map((c, idx) => (
          <div key={c.id} className="card" style={{ padding: 18, display: 'flex', flexWrap: 'wrap', gap: 18, alignItems: 'center' }}>
            <div style={{ flex: '1 1 200px', minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon name="calendar" className="icon-sm" style={{ color: 'var(--ink-3)' }} />
                <span style={{ fontWeight: 700, fontSize: 14.5, whiteSpace: 'nowrap' }} className="num">{fmtRange(c)}</span>
                {idx === 0 && <span className="badge badge-ok" style={{ background: 'var(--accent-soft)', color: 'var(--accent-deep)' }}>Aktuell</span>}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
                <span className="num" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22 }}>{fmtN(c.followers)}</span>
                <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>Follower</span>
                <DeltaPill value={c.followerDelta} />
              </div>
            </div>
            <div style={{ flex: '1 1 220px', display: 'flex', flexDirection: 'column', gap: 9 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 11.5, color: 'var(--ink-3)', width: 78 }}>Energie</span>
                <div style={{ flex: 1 }}><Meter value={c.drehenEnergie} color="var(--good)" /></div>
                <span className="num" style={{ width: 26, textAlign: 'right', fontWeight: 600, fontSize: 13 }}>{c.drehenEnergie.toFixed(1)}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 11.5, color: 'var(--ink-3)', width: 78 }}>Erschöpfung</span>
                <div style={{ flex: 1 }}><Meter value={c.erschoepfung} color="var(--hook)" /></div>
                <span className="num" style={{ width: 26, textAlign: 'right', fontWeight: 600, fontSize: 13 }}>{c.erschoepfung.toFixed(1)}</span>
              </div>
            </div>
            <div style={{ flex: '0 0 auto', display: 'flex', gap: 18, alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div className="num" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18 }}>{c.activeDrehtage}</div>
                <div style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>Drehtage</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div className="num" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18 }}>{Math.round(c.totalMinuten / 60 * 10) / 10}h</div>
                <div style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>Drehzeit</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CheckinForm open={formOpen} onClose={() => setFormOpen(false)} latest={latest} onSubmit={onSubmit} />
    </div>
  );
}

function HiStat({ label, value, sub, delta, accent, dark }) {
  return (
    <div style={{ padding: '20px 22px', borderRight: '1px solid var(--border)',
      background: dark ? 'var(--ink-btn)' : 'transparent' }}>
      <div className="eyebrow" style={{ color: dark ? 'rgba(243,241,233,.6)' : 'var(--ink-3)' }}>{label}</div>
      <div className="num" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 30, lineHeight: 1.1,
        color: dark ? 'var(--ink-on-dark)' : (accent || 'var(--ink)') }}>{value}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
        {delta != null && <DeltaPill value={delta} />}
        {sub && <span style={{ fontSize: 12, color: dark ? 'rgba(243,241,233,.5)' : 'var(--ink-3)' }}>{sub}</span>}
      </div>
    </div>
  );
}

function CheckinForm({ open, onClose, latest, onSubmit }) {
  const blank = () => [1, 2, 3].map(i => ({ label: 'Drehtag ' + i, datum: '', energie: 0, erschoepfung: 0, zeitaufwandMin: 0, vibeNote: '' }));
  const [followers, setFollowers] = React.useState('');
  const [dreh, setDreh] = React.useState(blank());

  React.useEffect(() => { if (open) { setFollowers(String(latest.followers + 0)); setDreh(blank()); } }, [open]);

  const upd = (i, field, val) => setDreh(d => d.map((x, k) => k === i ? { ...x, [field]: val } : x));
  const preview = computeHealth(dreh);

  const submit = () => {
    onSubmit({ followers: parseInt(followers) || latest.followers, drehtage: dreh });
    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose} title="Neuer Check-in" subtitle="Diese Woche" width={520}
      footer={<>
        <button className="btn btn-ghost" onClick={onClose}>Abbrechen</button>
        <button className="btn btn-primary" onClick={submit}><Icon name="check" className="icon-sm" />Check-in speichern</button>
      </>}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Field label="Aktueller Follower-Stand" hint={`Letzte Woche: ${fmtN(latest.followers)} — Delta wird automatisch berechnet`}>
          <TextInput type="number" value={followers} onChange={e => setFollowers(e.target.value)} className="num" />
        </Field>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)' }}>Drehtage</span>
          {dreh.map((d, i) => (
            <div key={i} className="card" style={{ padding: 14, background: 'var(--surface-2)', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600, fontSize: 13.5 }}>{d.label}</span>
                <span style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{d.zeitaufwandMin || 0} min</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--ink-2)', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className="dot" style={{ background: 'var(--good)' }} />Energie</div>
                  <ScaleSlider value={d.energie} onChange={v => upd(i, 'energie', v)} color="var(--good)" />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--ink-2)', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className="dot" style={{ background: 'var(--hook)' }} />Erschöpfung</div>
                  <ScaleSlider value={d.erschoepfung} onChange={v => upd(i, 'erschoepfung', v)} color="var(--hook)" />
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <div style={{ flex: '0 0 110px' }}>
                    <TextInput type="number" placeholder="Minuten" value={d.zeitaufwandMin || ''} onChange={e => upd(i, 'zeitaufwandMin', parseInt(e.target.value) || 0)} style={{ height: 38 }} />
                  </div>
                  <TextInput placeholder="Vibe-Notiz…" value={d.vibeNote} onChange={e => upd(i, 'vibeNote', e.target.value)} style={{ height: 38 }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: 14, background: 'var(--accent-tint)', borderColor: 'var(--accent-soft)' }}>
          <span className="eyebrow" style={{ color: 'var(--accent-deep)' }}>Vorschau</span>
          <div style={{ display: 'flex', gap: 18, marginTop: 8, flexWrap: 'wrap' }}>
            <PreviewStat label="Ø Energie" value={preview.drehenEnergie.toFixed(1)} />
            <PreviewStat label="Ø Erschöpfung" value={preview.erschoepfung.toFixed(1)} />
            <PreviewStat label="Drehzeit" value={Math.round(preview.totalMinuten / 60 * 10) / 10 + 'h'} />
            <PreviewStat label="Aktive Tage" value={preview.activeDrehtage} />
          </div>
        </div>
      </div>
    </Drawer>
  );
}
function PreviewStat({ label, value }) {
  return (
    <div>
      <div className="num" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18 }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{label}</div>
    </div>
  );
}

/* ============================================================
   IDEAS — pipeline (Idee → In Produktion → Live)
   ============================================================ */
const IDEA_STAGES = ['Idee', 'In Produktion', 'Live'];
const stageIcon = { 'Idee': 'bulb', 'In Produktion': 'film', 'Live': 'star' };

function IdeasView({ ideas, onAdd, onMove, onDelete }) {
  const [text, setText] = React.useState('');
  const [cat, setCat] = React.useState(THEMES[0]);

  const add = () => { if (!text.trim()) return; onAdd({ text: text.trim(), category: cat, status: 'Idee' }); setText(''); };

  return (
    <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div className="card" style={{ padding: 14, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 260px' }}>
          <Icon name="bulb" className="icon-sm" style={{ position: 'absolute', left: 13, top: 13, color: 'var(--accent)' }} />
          <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()}
            placeholder="Neue Idee festhalten…" style={{ ...inputStyle, paddingLeft: 36 }} />
        </div>
        <div style={{ width: 180 }}><SelectInput value={cat} onChange={setCat} options={THEMES} /></div>
        <button className="btn btn-accent" onClick={add}><Icon name="plus" className="icon-sm" />Hinzufügen</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
        {IDEA_STAGES.map((stage, si) => {
          const items = ideas.filter(i => i.status === stage);
          return (
            <div key={stage} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '2px 4px' }}>
                <Icon name={stageIcon[stage]} className="icon-sm" style={{ color: si === 2 ? 'var(--accent)' : 'var(--ink-2)' }} />
                <span style={{ fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap' }}>{stage}</span>
                <span className="num" style={{ fontSize: 12, color: 'var(--ink-3)', background: 'var(--surface-3)', borderRadius: 99, padding: '1px 8px' }}>{items.length}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, background: 'var(--bg-2)', borderRadius: 'var(--radius-md)',
                padding: 8, minHeight: 120, border: '1px dashed var(--border-2)' }}>
                {items.map(idea => (
                  <div key={idea.id} className="card" style={{ padding: 13, display: 'flex', flexDirection: 'column', gap: 9 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 500, lineHeight: 1.4 }}>{idea.text}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                      <span className="chip" style={{ height: 24, fontSize: 11 }}>{idea.category}</span>
                      <div style={{ display: 'flex', gap: 4 }}>
                        {si > 0 && <button className="ico-btn" onClick={() => onMove(idea.id, IDEA_STAGES[si - 1])} title="Zurück"><Icon name="chevRight" className="icon-sm" style={{ transform: 'rotate(180deg)' }} /></button>}
                        {si < 2 && <button className="ico-btn" onClick={() => onMove(idea.id, IDEA_STAGES[si + 1])} title="Weiter"><Icon name="chevRight" className="icon-sm" /></button>}
                        <button className="ico-btn" onClick={() => onDelete(idea.id)} title="Löschen"><Icon name="trash" className="icon-sm" /></button>
                      </div>
                    </div>
                  </div>
                ))}
                {items.length === 0 && <div style={{ fontSize: 12, color: 'var(--ink-3)', textAlign: 'center', padding: '18px 0' }}>Nichts hier</div>}
              </div>
            </div>
          );
        })}
      </div>
      <style>{`.ico-btn{width:28px;height:28px;display:grid;place-items:center;border-radius:7px;color:var(--ink-3);transition:all .14s;}
        .ico-btn:hover{background:var(--surface-3);color:var(--ink);}`}</style>
    </div>
  );
}

/* ============================================================
   ADD POST DRAWER — with simulated AI screenshot parsing
   ============================================================ */
function AddPostDrawer({ open, onClose, onSave }) {
  const empty = {
    caption: '', date: new Date().toISOString().slice(0, 10), uploadTime: '18:00',
    format: 'Reel', hookType: 'Szene', duration: '15–30s', theme: THEMES[0],
    views: 0, likes: 0, comments: 0, saves: 0, shares: 0, hookRate: 0, completionRate: 0, newFollowers: 0,
  };
  const [f, setF] = React.useState(empty);
  const [parsing, setParsing] = React.useState(false);
  const [parsed, setParsed] = React.useState(false);
  const [shot, setShot] = React.useState(null);
  React.useEffect(() => { if (open) { setF(empty); setParsing(false); setParsed(false); setShot(null); } }, [open]);

  const set = (k, v) => setF(s => ({ ...s, [k]: v }));
  const setNum = (k, v) => set(k, parseInt(v) || 0);

  const handleFile = (file) => {
    if (!file) return;
    setParsing(true); setParsed(false);
    const reader = new FileReader();
    reader.onload = e => {
      setShot(e.target.result);
      fetch(`${API}/api/screenshot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataUrl: e.target.result }),
      })
        .then(r => r.json())
        .then(data => {
          setF(s => ({
            ...s,
            views: data.views ?? s.views,
            likes: data.likes ?? s.likes,
            comments: data.comments ?? s.comments,
            saves: data.saves ?? s.saves,
            shares: data.shares ?? s.shares,
            hookRate: data.hookRate ?? s.hookRate,
            completionRate: data.completionRate ?? s.completionRate,
            newFollowers: data.newFollowers ?? s.newFollowers,
          }));
          setParsing(false); setParsed(true);
        })
        .catch(() => { setParsing(false); setParsed(false); });
    };
    reader.readAsDataURL(file);
  };
  const onDrop = e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); };

  const previewKpis = enrichPost(f).kpis;
  const save = () => { if (!f.caption.trim()) { set('caption', 'Unbenannter Post'); } onSave(f); onClose(); };

  const metricFields = [
    ['views', 'Views'], ['likes', 'Likes'], ['comments', 'Kommentare'], ['saves', 'Saves'],
    ['shares', 'Shares'], ['hookRate', 'Hook Rate %'], ['completionRate', 'Completion %'], ['newFollowers', 'Neue Follower'],
  ];

  return (
    <Drawer open={open} onClose={onClose} title="Post hinzufügen" subtitle="Screenshot hochladen oder manuell eintragen" width={560}
      footer={<>
        <button className="btn btn-ghost" onClick={onClose}>Abbrechen</button>
        <button className="btn btn-primary" onClick={save}><Icon name="check" className="icon-sm" />Post speichern</button>
      </>}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* dropzone */}
        <div onDrop={onDrop} onDragOver={e => e.preventDefault()}
          style={{ border: '1.5px dashed ' + (parsed ? 'var(--good)' : 'var(--border-strong)'), borderRadius: 'var(--radius-md)',
            padding: shot ? 12 : 24, background: 'var(--surface-2)', textAlign: 'center', position: 'relative', transition: 'all .2s' }}>
          {shot ? (
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', textAlign: 'left' }}>
              <img src={shot} alt="" style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 10, border: '1px solid var(--border)' }} />
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
                {parsing ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent-deep)', fontWeight: 600, fontSize: 13.5, lineHeight: 1.25 }}>
                    <span className="spin"><Icon name="sparkles" className="icon-sm" /></span>KI liest Analytics…
                  </div>
                ) : (
                  <div style={{ color: 'var(--good)', fontWeight: 600, fontSize: 13.5, display: 'flex', alignItems: 'center', gap: 6, lineHeight: 1.25 }}>
                    <Icon name="check" className="icon-sm" />Erkannt — bitte prüfen
                  </div>
                )}
                <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Screenshot der Insights</div>
              </div>
              <label className="btn btn-ghost" style={{ height: 34 }}>Ersetzen
                <input type="file" accept="image/*" hidden onChange={e => handleFile(e.target.files[0])} /></label>
            </div>
          ) : (
            <label style={{ cursor: 'pointer', display: 'block' }}>
              <Icon name="upload" style={{ width: 26, height: 26, color: 'var(--accent)', margin: '0 auto 8px' }} />
              <div style={{ fontWeight: 600, fontSize: 14 }}>Analytics-Screenshot ablegen</div>
              <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 2 }}>KI liest Views, Saves, Hook Rate &amp; Co. automatisch aus</div>
              <input type="file" accept="image/*" hidden onChange={e => handleFile(e.target.files[0])} />
            </label>
          )}
        </div>

        {/* meta */}
        <Field label="Caption"><TextInput value={f.caption} onChange={e => set('caption', e.target.value)} placeholder="Worum geht's im Post?" /></Field>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Field label="Datum"><TextInput type="date" value={f.date} onChange={e => set('date', e.target.value)} /></Field>
          <Field label="Uploadzeit"><TextInput type="time" value={f.uploadTime} onChange={e => set('uploadTime', e.target.value)} /></Field>
          <Field label="Format"><SelectInput value={f.format} onChange={v => set('format', v)} options={['Reel', 'Carousel', 'Story', 'Static']} /></Field>
          <Field label="Hook-Typ"><SelectInput value={f.hookType} onChange={v => set('hookType', v)} options={['Statement', 'Frage', 'Szene', 'Text-only']} /></Field>
          <Field label="Länge"><SelectInput value={f.duration} onChange={v => set('duration', v)} options={['unter 15s', '15–30s', '30–60s', 'über 60s']} /></Field>
          <Field label="Thema"><SelectInput value={f.theme} onChange={v => set('theme', v)} options={THEMES} /></Field>
        </div>

        {/* metrics */}
        <div>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)' }}>Metriken</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 10, marginTop: 8 }}>
            {metricFields.map(([k, lbl]) => (
              <label key={k} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{lbl}</span>
                <TextInput type="number" className="num" value={f[k] || ''} onChange={e => setNum(k, e.target.value)} style={{ height: 38 }} />
              </label>
            ))}
          </div>
        </div>

        {/* live KPI preview */}
        <div className="card" style={{ padding: 14, background: 'var(--surface-2)' }}>
          <span className="eyebrow">Live-KPI-Vorschau</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
            {KPI_ORDER.map(k => {
              const v = previewKpis[k], r = kpiRating(k, v);
              return (
                <div key={k} style={{ flex: '1 1 90px', padding: '8px 10px', borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 10.5, color: 'var(--ink-3)', fontWeight: 600 }}>{KPIS[k].short}</div>
                  <div className="num" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16,
                    color: v == null ? 'var(--ink-3)' : `var(${kpiVar(k)})` }}>{fmtKpi(k, v)}<span style={{ fontSize: 9, color: 'var(--ink-3)' }}>{KPIS[k].unit}</span></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}.spin{display:inline-flex;animation:spin 1s linear infinite}`}</style>
    </Drawer>
  );
}

/* ============================================================
   POST DETAIL DRAWER
   ============================================================ */
function PostDetailDrawer({ post, onClose }) {
  return (
    <Drawer open={!!post} onClose={onClose} title={post ? post.format + ' · Detail' : ''} width={480}>
      {post && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.4 }}>{post.caption}</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
              <span className="chip">{new Date(post.date).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
              <span className="chip">{post.uploadTime} Uhr</span>
              <span className="chip">{post.theme}</span>
              <span className="chip">{post.hookType}</span>
              <span className="chip">{post.duration}</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)' }}>
            {[['Views', fmtN(post.views), 'eye'], ['Likes', fmtN(post.likes), 'heart'], ['Kommentare', fmtN(post.comments), 'message'],
              ['Saves', fmtN(post.saves), 'bookmark'], ['Shares', fmtN(post.shares), 'share'], ['Neue Follower', fmtN(post.newFollowers), 'arrowUp']].map(([l, v, ic]) => (
              <div key={l} style={{ background: 'var(--surface)', padding: '14px 12px' }}>
                <Icon name={ic} className="icon-sm" style={{ color: 'var(--ink-3)' }} />
                <div className="num" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, marginTop: 6 }}>{v}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{l}</div>
              </div>
            ))}
          </div>

          <div>
            <span className="eyebrow">KPIs</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
              {KPI_ORDER.map(k => {
                const v = post.kpis[k];
                return (
                  <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                    <span className="dot" style={{ background: `var(${kpiVar(k)})` }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 13.5 }}>{KPIS[k].label}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{KPIS[k].desc}</div>
                    </div>
                    <span className="num" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18 }}>{fmtKpi(k, v)}<span style={{ fontSize: 11, color: 'var(--ink-3)' }}>{KPIS[k].unit}</span></span>
                    <KpiBadge k={k} val={v} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}

Object.assign(window, { CheckinView, IdeasView, AddPostDrawer, PostDetailDrawer, IDEA_STAGES });


/* ===== app.jsx ===== */
/* ============================================================
   app.jsx — shell, navigation, state, tweaks, mount
   ============================================================ */
const { useState, useEffect, useMemo } = React;

const NAV = [
  { id: 'overview', label: 'Übersicht', icon: 'grid' },
  { id: 'posts', label: 'Posts', icon: 'film' },
  { id: 'checkin', label: 'Check-in', icon: 'pulse' },
  { id: 'ideas', label: 'Ideen', icon: 'bulb' },
];
const META = {
  overview: { title: 'Übersicht', sub: 'Wo Anna gerade steht — und wohin es geht.' },
  posts: { title: 'Posts', sub: 'Jeder Clip, jede Kennzahl an einem Ort.' },
  checkin: { title: 'Check-in', sub: 'Der wöchentliche Puls hinter den Zahlen.' },
  ideas: { title: 'Ideen', sub: 'Von der Idee bis live auf der Bühne.' },
};

const ACCENTS = {
  amber: ['#E08A1E', '#B96E10', '#FBEAD0', '#FDF4E6'],
  teal: ['#1E8A86', '#136561', '#D6EEEC', '#EAF6F5'],
  coral: ['#D85A3E', '#B0432B', '#F8E0D9', '#FCEFEA'],
  violet: ['#7A5BC9', '#5E40A8', '#E8E1F6', '#F2EEFA'],
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "statCardStyle": "clean",
  "followerVariant": "area",
  "healthVariant": "bars",
  "accent": ["#E08A1E", "#B96E10", "#FBEAD0", "#FDF4E6"]
}/*EDITMODE-END*/;

function monNow() {
  const d = new Date();
  const day = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - day);
  return d;
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [view, setView] = useState('overview');
  const [posts, setPosts] = useState([]);
  const [checkins, setCheckins] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(9999);
  const [addOpen, setAddOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [mobile, setMobile] = useState(window.innerWidth <= 860);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/posts`).then(r => r.json()),
      fetch(`${API}/api/checkins`).then(r => r.json()),
      fetch(`${API}/api/ideas`).then(r => r.json()),
    ]).then(([p, c, i]) => {
      setPosts(p);
      setCheckins(c);
      setIdeas(i);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const h = () => setMobile(window.innerWidth <= 860);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  // apply accent palette to CSS vars
  useEffect(() => {
    const [a, deep, soft, tint] = t.accent || ACCENTS.amber;
    const r = document.documentElement.style;
    r.setProperty('--accent', a);
    r.setProperty('--accent-deep', deep);
    r.setProperty('--accent-soft', soft);
    r.setProperty('--accent-tint', tint);
  }, [t.accent]);

  /* ---- actions ---- */
  const addPost = async (data) => {
    const res = await fetch(`${API}/api/posts`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
    });
    const p = await res.json();
    setPosts(ps => [p, ...ps]);
  };
  const submitCheckin = async ({ followers, drehtage }) => {
    const res = await fetch(`${API}/api/checkins`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ followers, drehtage }),
    });
    const c = await res.json();
    setCheckins(cs => {
      const without = cs.filter(x => x.weekStart !== c.weekStart);
      return [c, ...without].sort((a, b) => b.weekStart.localeCompare(a.weekStart));
    });
  };
  const addIdea = async (data) => {
    const res = await fetch(`${API}/api/ideas`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
    });
    const idea = await res.json();
    setIdeas(is => [idea, ...is]);
  };
  const moveIdea = async (id, status) => {
    await fetch(`${API}/api/ideas/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }),
    });
    setIdeas(is => is.map(i => i.id === id ? { ...i, status } : i));
  };
  const delIdea = async (id) => {
    await fetch(`${API}/api/ideas/${id}`, { method: 'DELETE' });
    setIdeas(is => is.filter(i => i.id !== id));
  };

  const meta = META[view];

  if (loading) return (
    <div style={{ display: 'grid', placeItems: 'center', height: '100vh', fontSize: 14, color: 'var(--ink-3)', fontFamily: 'var(--font-sans)' }}>
      Verbinde mit Backend…
    </div>
  );

  return (
    <div className="shell">
      {!mobile && (
        <aside className="sidebar">
          <Brand />
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '6px 12px', flex: 1 }}>
            {NAV.map(n => (
              <button key={n.id} className={'navitem' + (view === n.id ? ' active' : '')} onClick={() => setView(n.id)}>
                <Icon name={n.icon} className="icon-sm" />{n.label}
              </button>
            ))}
          </nav>
          {checkins[0] && <ProfileCard followers={checkins[0].followers} delta={checkins[0].followerDelta} />}
        </aside>
      )}

      <div className="main">
        <header className="topbar">
          {mobile && <Brand compact />}
          <div style={{ minWidth: 0, flex: 1 }}>
            <h1 style={{ fontSize: mobile ? 22 : 27, fontWeight: 800, lineHeight: 1.05 }}>{meta.title}</h1>
            {!mobile && <p style={{ margin: '4px 0 0', fontSize: 14, color: 'var(--ink-3)' }}>{meta.sub}</p>}
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
            <button className="btn btn-primary" onClick={() => setAddOpen(true)}>
              <Icon name="plus" className="icon-sm" />{!mobile && 'Post hinzufügen'}
            </button>
          </div>
        </header>

        <main className="content">
          {view === 'overview' && checkins.length > 0 && <OverviewView posts={posts} checkins={checkins} days={days} setDays={setDays}
            statCardStyle={t.statCardStyle} followerVariant={t.followerVariant} healthVariant={t.healthVariant}
            onOpenPost={setDetail} />}
          {view === 'overview' && checkins.length === 0 && (
            <div style={{ display: 'grid', placeItems: 'center', height: 300, color: 'var(--ink-3)', fontSize: 14, textAlign: 'center' }}>
              <div><Icon name="pulse" style={{ width: 28, height: 28, margin: '0 auto 10px', color: 'var(--ink-3)' }} />
              <div style={{ fontWeight: 600, color: 'var(--ink-2)', marginBottom: 4 }}>Noch kein Check-in</div>
              <div>Geh auf „Check-in" und leg los — danach erscheinen hier alle Graphen.</div></div>
            </div>
          )}
          {view === 'posts' && <PostsView posts={posts} onOpenPost={setDetail} onAdd={() => setAddOpen(true)} />}
          {view === 'checkin' && <CheckinView checkins={checkins} onSubmit={submitCheckin} />}
          {view === 'ideas' && <IdeasView ideas={ideas} onAdd={addIdea} onMove={moveIdea} onDelete={delIdea} />}
        </main>
      </div>

      {mobile && (
        <nav className="tabbar">
          {NAV.map(n => (
            <button key={n.id} className={'tabitem' + (view === n.id ? ' active' : '')} onClick={() => setView(n.id)}>
              <Icon name={n.icon} className="icon" />
              <span>{n.label}</span>
            </button>
          ))}
        </nav>
      )}

      <AddPostDrawer open={addOpen} onClose={() => setAddOpen(false)} onSave={addPost} />
      <PostDetailDrawer post={detail} onClose={() => setDetail(null)} />

      <TweaksPanel>
        <TweakSection label="Stat-Cards" />
        <TweakRadio label="KPI-Karten" value={t.statCardStyle}
          options={[{ value: 'clean', label: 'Clean' }, { value: 'ring', label: 'Ring' }, { value: 'bar', label: 'Balken' }]}
          onChange={v => setTweak('statCardStyle', v)} />
        <TweakSection label="Charts" />
        <TweakRadio label="Follower" value={t.followerVariant}
          options={[{ value: 'area', label: 'Fläche' }, { value: 'line', label: 'Linie' }, { value: 'bars', label: 'Balken' }]}
          onChange={v => setTweak('followerVariant', v)} />
        <TweakRadio label="Health" value={t.healthVariant}
          options={[{ value: 'bars', label: 'Balken' }, { value: 'lines', label: 'Linien' }, { value: 'lollipop', label: 'Lolli' }]}
          onChange={v => setTweak('healthVariant', v)} />
        <TweakSection label="Akzent" />
        <TweakColor label="Bühnenlicht" value={t.accent}
          options={[ACCENTS.amber, ACCENTS.teal, ACCENTS.coral, ACCENTS.violet]}
          onChange={v => setTweak('accent', v)} />
      </TweaksPanel>

      <ShellStyles mobile={mobile} />
    </div>
  );
}

function Brand({ compact }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: compact ? 0 : '20px 20px 14px' }}>
      <div style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--ink-btn)', display: 'grid', placeItems: 'center', flex: 'none' }}>
        <span className="mono" style={{ color: 'var(--accent)', fontWeight: 600, fontSize: 16, letterSpacing: '-.04em' }}>a:</span>
      </div>
      {!compact && (
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, letterSpacing: '-.02em', lineHeight: 1 }}>anna.exe</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.04em' }}>content cockpit</div>
        </div>
      )}
    </div>
  );
}

function ProfileCard({ followers, delta }) {
  return (
    <div style={{ margin: 12, padding: 12, borderRadius: 'var(--radius-md)', background: 'var(--surface-2)', border: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--accent-deep))',
        display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 700, fontFamily: 'var(--font-display)', flex: 'none' }}>AO</div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 13.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Anna Okot</div>
        <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Comedian · {fmtN(followers)}</div>
      </div>
    </div>
  );
}

function ShellStyles({ mobile }) {
  return (
    <style>{`
    .shell{display:flex;min-height:100vh;}
    .sidebar{width:var(--nav-w);flex:none;position:sticky;top:0;height:100vh;display:flex;flex-direction:column;
      background:var(--surface);border-right:1px solid var(--border);}
    .navitem{display:flex;align-items:center;gap:11px;height:42px;padding:0 14px;border-radius:var(--radius-sm);
      font-size:14px;font-weight:600;color:var(--ink-2);transition:all .14s var(--ease);text-align:left;}
    .navitem:hover{background:var(--surface-2);color:var(--ink);}
    .navitem.active{background:var(--ink-btn);color:var(--ink-on-dark);}
    .navitem.active .icon-sm{color:var(--accent);}
    .main{flex:1;min-width:0;display:flex;flex-direction:column;}
    .topbar{position:sticky;top:0;z-index:20;display:flex;align-items:center;gap:14px;
      padding:${mobile ? '14px 18px' : '22px 32px'};background:rgba(241,239,232,.86);backdrop-filter:blur(10px);
      border-bottom:1px solid var(--border);}
    .content{padding:${mobile ? '20px 18px 96px' : '26px 32px 48px'};max-width:1280px;width:100%;margin:0 auto;}
    .tabbar{position:fixed;bottom:0;left:0;right:0;z-index:40;display:flex;background:var(--surface);
      border-top:1px solid var(--border);padding:6px 8px env(safe-area-inset-bottom);box-shadow:0 -2px 14px rgba(26,24,19,.05);}
    .tabitem{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:8px 0;border-radius:10px;
      font-size:11px;font-weight:600;color:var(--ink-3);transition:color .14s;}
    .tabitem.active{color:var(--ink);}
    .tabitem.active .icon{color:var(--accent);}
    @media (max-width:760px){.ov-split{grid-template-columns:1fr !important;}}
    `}</style>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

