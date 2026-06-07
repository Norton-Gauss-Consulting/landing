"use client";

// Norton-Gauss · top status bar (ported from src/sections.jsx)
import { useEffect, useState } from "react";

export default function Topbar() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const upd = () => {
      const d = new Date();
      const hh = String(d.getUTCHours()).padStart(2, "0");
      const mm = String(d.getUTCMinutes()).padStart(2, "0");
      setTime(`${hh}:${mm} UTC`);
    };
    upd();
    const id = setInterval(upd, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="topbar">
      <div>
        <span className="live">Norton-Gauss · 2026</span>
        <span>Consulting &amp; engineering, in one pod</span>
        <span>5 practices</span>
      </div>
      <div>
        <span>{time}</span>
        <span>EMEA · NAM · LATAM · APAC</span>
        <span>Strategy that ships</span>
      </div>
    </div>
  );
}
