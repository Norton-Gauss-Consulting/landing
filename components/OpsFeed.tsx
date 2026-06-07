"use client";

// Norton-Gauss · hero ops feed (ported from src/sections.jsx)
import { useEffect, useState } from "react";
import { opsfeedSeed, type OpsRow } from "@/lib/content";

type Row = OpsRow & { _id?: number };

export default function OpsFeed() {
  const [rows, setRows] = useState<Row[]>(opsfeedSeed);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % opsfeedSeed.length;
      const now = new Date();
      const hh = String(now.getUTCHours()).padStart(2, "0");
      const mm = String(now.getUTCMinutes()).padStart(2, "0");
      const ss = String(now.getUTCSeconds()).padStart(2, "0");
      const next: Row = { ...opsfeedSeed[i], ts: `${hh}:${mm}:${ss}`, _id: Date.now() };
      setRows((prev) => [next, ...prev].slice(0, 8));
    }, 1700);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="opsfeed">
      <div className="opsfeed-head">
        <span className="tag">OPS · LIVE FEED</span>
        <span>{rows.length} EVENTS · STREAMING</span>
      </div>
      <div className="opsfeed-rows">
        {rows.map((r, i) => (
          <div key={r._id || r.ts} className={`opsfeed-row ${i === 0 ? "new" : ""}`}>
            <span className="ts">{r.ts}</span>
            <span className="agent">{r.a}</span>
            <span className="ev">{r.e}</span>
            <span className="lat">{r.lat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
