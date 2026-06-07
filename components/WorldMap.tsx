// Norton-Gauss · world map / footprint (ported from src/new-sections.jsx)
import { map as m } from "@/lib/content";

// Hand-curated continent polygons in equirectangular projection (x:0-1200, y:0-600).
const CONTINENT_POLYS: number[][][] = [
  [[160,150],[210,140],[260,150],[310,170],[345,210],[365,240],[355,285],[330,320],[290,335],[245,340],[225,330],[195,290],[170,260],[150,225],[140,190],[150,170]],
  [[200,90],[270,80],[330,90],[370,110],[380,140],[365,165],[330,170],[290,165],[245,160],[210,150],[195,130],[195,110]],
  [[400,70],[455,68],[480,95],[470,130],[440,140],[410,128],[400,100]],
  [[290,355],[330,360],[360,395],[365,430],[350,475],[330,510],[300,535],[275,540],[265,500],[270,450],[280,400]],
  [[560,255],[620,250],[665,280],[680,330],[685,380],[665,430],[630,465],[600,475],[575,455],[560,410],[550,355],[555,300]],
  [[540,170],[600,165],[640,175],[665,195],[660,215],[630,230],[590,228],[555,215],[540,195]],
  [[490,165],[520,160],[525,190],[505,200],[490,185]],
  [[640,250],[695,260],[710,295],[695,320],[660,325],[640,300]],
  [[600,90],[760,80],[900,85],[1010,100],[1050,140],[1030,170],[990,180],[920,180],[840,175],[780,180],[720,175],[680,165],[640,150],[615,125]],
  [[770,180],[880,180],[930,210],[940,250],[915,280],[875,295],[840,290],[800,275],[780,235]],
  [[770,260],[820,265],[820,310],[795,320],[775,300]],
  [[890,330],[950,335],[975,355],[940,365],[900,358]],
  [[990,225],[1020,225],[1015,255],[990,250]],
  [[940,420],[1015,415],[1055,440],[1055,465],[1020,485],[975,485],[945,465]],
  [[1090,485],[1115,490],[1120,510],[1100,515]],
];

function pointInPolygon(x: number, y: number, poly: number[][]) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    const intersect = (yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function generateMapDots(spacing = 14) {
  const dots: { x: number; y: number }[] = [];
  for (let y = 50; y <= 560; y += spacing) {
    const xJitter = y % (spacing * 2) === 0 ? spacing / 2 : 0;
    for (let x = 40; x <= 1170; x += spacing) {
      const px = x + xJitter;
      const py = y;
      for (const poly of CONTINENT_POLYS) {
        if (pointInPolygon(px, py, poly)) {
          dots.push({ x: px, y: py });
          break;
        }
      }
    }
  }
  return dots;
}

export default function WorldMap() {
  const dots = generateMapDots(13);
  const W = 1200, H = 600;
  const proj = (lon: number, lat: number) => ({
    x: ((lon + 180) / 360) * W,
    y: ((90 - lat) / 180) * H,
  });

  return (
    <section className="section-pad-sm" data-anim="worldmap" id="industries">
      <div className="section-tag">
        <span><span className="num">07</span> · Global footprint</span>
        <span>{m.locations.length} headquarters · 3 regions</span>
      </div>
      <div className="container">
        <div className="section-head">
          <h2 className="display-2xl">Where we <em className="serif-em" style={{ color: "var(--ng-lime)" }}>operate.</em></h2>
          <p className="right">{m.sub}</p>
        </div>

        <div className="worldmap-wrap">
          <div className="worldmap-meta">
            <span className="live">LIVE · OPERATIONS MAP</span>
            <span>EQUIRECTANGULAR · LON −180→180 · LAT −90→90</span>
          </div>

          <svg viewBox={`0 0 ${W} ${H}`}>
            {[150, 300, 450].map((y) => (
              <line key={y} x1="20" y1={y} x2={W - 20} y2={y} stroke="#1A2E29" strokeWidth="0.6" strokeDasharray="2 8" opacity="0.5" />
            ))}
            {[300, 600, 900].map((x) => (
              <line key={x} x1={x} y1="40" x2={x} y2={H - 30} stroke="#1A2E29" strokeWidth="0.6" strokeDasharray="2 8" opacity="0.5" />
            ))}

            {dots.map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r="1.4" fill="#234234" opacity="0.9" />
            ))}

            {(() => {
              const hqs = m.locations.filter((l) => l.hq);
              const arcs: { d: string; key: string }[] = [];
              m.locations.forEach((loc) => {
                if (loc.hq) return;
                let nearest = hqs[0];
                let dmin = Infinity;
                for (const h of hqs) {
                  const dx = loc.lon - h.lon;
                  const dy = loc.lat - h.lat;
                  const d = dx * dx + dy * dy;
                  if (d < dmin) {
                    dmin = d;
                    nearest = h;
                  }
                }
                const a = proj(loc.lon, loc.lat);
                const b = proj(nearest.lon, nearest.lat);
                const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 - 30 };
                arcs.push({ d: `M ${a.x} ${a.y} Q ${mid.x} ${mid.y}, ${b.x} ${b.y}`, key: loc.id });
              });
              return arcs.map((a) => (
                <path key={a.key} d={a.d} fill="none" stroke="#D9FF35" strokeWidth="0.7" opacity="0.32" />
              ));
            })()}

            {m.locations.map((loc, i) => {
              const { x, y } = proj(loc.lon, loc.lat);
              const r = loc.hq ? 7 : 4.5;
              return (
                <g key={loc.id}>
                  <circle cx={x} cy={y} r={r * 3.2} fill="#D9FF35" opacity={loc.hq ? 0.18 : 0.1}>
                    <animate attributeName="r" values={`${r};${r * 3.2};${r}`} dur="3s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
                    <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
                  </circle>
                  <circle cx={x} cy={y} r={r} fill="#D9FF35" stroke="#D9FF35" strokeWidth="1.5" />
                  <text x={x + r + 6} y={y + 4} fontFamily="JetBrains Mono" fontSize="10" letterSpacing="1.2" fill={loc.hq ? "#D9FF35" : "#F2F1EC"}>
                    {loc.name.toUpperCase()}
                  </text>
                  {loc.hq && (
                    <text x={x + r + 6} y={y - 6} fontFamily="JetBrains Mono" fontSize="8.5" letterSpacing="1.4" fill="#5A6E6A">
                      {loc.role.toUpperCase()}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="industry-strip" style={{ marginTop: 32 }}>
          {m.industries.map((ind, i) => (
            <div key={i}>
              <div className="num">{ind.num}</div>
              <h5>{ind.name}</h5>
              <p>{ind.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
