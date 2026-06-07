// Norton-Gauss · landing-page content (ported from src/content.jsx).
// Only the data consumed by the shell + Hero is included so far; later
// sections will extend this module as they are ported.

export type Counter = { v: string; unit?: string; k: string };
export type OpsRow = { ts: string; a: string; e: string; lat: string };

export const hero: { counters: Counter[] } = {
  counters: [
    { v: "5", k: "Core practices" },
    { v: "3", k: "Delivery HQs" },
    { v: "120", unit: "+", k: "Senior engineers & consultants" },
    { v: "2019", k: "Founded" },
  ],
};

// Hero ops-feed seed events — reads like client-engagement signal.
export const opsfeedSeed: OpsRow[] = [
  { ts: "14:02:11", a: "PROGRAMME-04", e: "Production cutover · agent fleet (finance close)", lat: "live" },
  { ts: "14:02:09", a: "PROGRAMME-12", e: "Workflow automation · STP test passed", lat: "live" },
  { ts: "14:02:04", a: "PROGRAMME-07", e: "API integration · CRM ↔ pricing engine", lat: "live" },
  { ts: "14:01:58", a: "PROGRAMME-02", e: "Customer portal · v1.4 to production", lat: "live" },
  { ts: "14:01:51", a: "PROGRAMME-09", e: "Cloud migration · region 3 of 4 cut over", lat: "live" },
  { ts: "14:01:44", a: "PROGRAMME-11", e: "Edge node fleet · 1,820 of 4,200 deployed", lat: "live" },
  { ts: "14:01:35", a: "PROGRAMME-03", e: "Operating-model rollout · region EMEA-South", lat: "live" },
  { ts: "14:01:28", a: "PROGRAMME-06", e: "AI assistant · adoption +18pts at +30d", lat: "live" },
];

export const marquee: string[] = [
  "Hyper-Automation", "Agentic AI", "Digital Transformation",
  "Custom Software", "Cloud & Edge",
  "Workflow orchestration", "Multi-agent systems", "Cloud migration",
  "Customer portals", "AI-enabled applications",
];
