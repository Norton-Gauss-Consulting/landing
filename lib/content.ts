// Norton-Gauss · landing-page content (ported from src/content.jsx).
// Verbatim copy of the handoff data consumed by the home-page sections.

export type Counter = { v: string; unit?: string; k: string };
export type OpsRow = { ts: string; a: string; e: string; lat: string };
export type Metric = { k: string; v: string };
export type Kpi = { k: string; v: string };

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

// ─── Manifesto banner ─────────────────────────────────────────────
export const manifestoBanner = {
  pre: "Strategy is easy.",
  post: "Operations are ",
  em: "hard.",
  sub: "Most transformation programmes produce decks. We produce systems.",
};

// ─── Thesis — old vs new ops ──────────────────────────────────────
export const thesis = {
  then: {
    tag: "The default state",
    h: "Fragmented tools, manual workflows, slow decisions.",
    items: [
      "Operations stretched across a dozen SaaS tools that do not talk.",
      "Critical workflows held together by spreadsheets and email.",
      "Data exists, but decisions still wait for someone to compile it.",
      "AI pilots prove value, then stall at the boundary of production.",
      "Transformation programmes produce slides; operations stay the same.",
    ],
  },
  now: {
    tag: "The operating system we build",
    h: "Automated, intelligent, scalable — and actually in production.",
    items: [
      { s: "Workflows automated end-to-end.", t: "Handoffs become orchestrated steps, not Slack threads." },
      { s: "AI agents inside guardrails.", t: "Reasoning, acting and escalating where policy allows." },
      { s: "Software built for the operation.", t: "Internal tools, portals and APIs tailored to the work." },
      { s: "Infrastructure that scales.", t: "Cloud and edge foundations designed for elasticity and unit economics." },
      { s: "Operating model embedded.", t: "Strategy, technology and execution aligned around outcomes." },
    ],
  },
};

// ─── Featured practice (top of practices section) ─────────────────
export const featured = {
  num: "01 / 05",
  eyebrow: "Featured practice · Hyper-Automation",
  summary:
    "We design and build the automation layer — workflow orchestration, RPA, document and data automation, and API integrations — that turns manual operations into systems your business can rely on. Not pilots. Production.",
  bullets: [
    "Workflow & process orchestration",
    "RPA & document automation",
    "API integration & data flow",
    "Process mining & re-engineering",
    "Exception-handling design",
    "Operator UX & adoption",
  ],
  kpi: [
    { k: "Median cycle-time cut", v: "−60%" },
    { k: "Straight-through processing", v: "+30pts" },
    { k: "Programme delivery cadence", v: "8–12 weeks" },
  ] as Kpi[],
};

// ─── Five practices ───────────────────────────────────────────────
export type Service = { num: string; id: string; title: string; meta: string; summary: string };
export const services: Service[] = [
  { num: "01", id: "automation", title: "Hyper-Automation", meta: "Workflows · RPA · Integrations · Process orchestration", summary: "We eliminate repetitive work and connect the systems your operation already runs on. Workflow orchestration, RPA, document and data automation, and the API integrations that make them feel like one system instead of twenty." },
  { num: "02", id: "agentic", title: "Agentic AI", meta: "AI agents · Multi-agent workflows · Human-in-the-loop", summary: "We design AI agents and AI-assisted workflows that can reason, act, escalate and support teams inside controlled business environments — with the evaluations, guardrails and monitoring that keep them safe in production." },
  { num: "03", id: "transformation", title: "Digital Transformation", meta: "Operating model · Technology roadmap · Programme delivery", summary: "We align business strategy, operating model, technology roadmap and execution. End-to-end programmes — diagnosis through delivery — with the change discipline that makes either one stick after the steering committee adjourns." },
  { num: "04", id: "software", title: "Custom Software Development", meta: "Web apps · Portals · Internal platforms · APIs", summary: "We build the software off-the-shelf systems cannot — internal platforms, customer portals, workflow tools, dashboards, APIs and AI-enabled applications, engineered by senior full-stack teams that ship and run what they build." },
  { num: "05", id: "cloud-edge", title: "Cloud & Edge", meta: "Architecture · Migration · Cloud-native · Edge compute", summary: "We modernise infrastructure, deployment and distributed systems — multi-cloud platforms, cloud-native applications and edge compute — engineered for elasticity, governance and unit economics that hold at scale." },
];

// ─── Delivery framework — six stages ──────────────────────────────
export type FrameworkStep = { step: string; code: string; title: string; lede: string; body: string; out: string[] };
export const framework: FrameworkStep[] = [
  { step: "01", code: "DISCOVER", title: "Discover", lede: "Map the operating reality — not the org chart.", body: "A small senior team maps the as-is system end-to-end: data flows, decision rights, vendor stack, and the work that actually happens between the boxes on the diagram.", out: ["Operating-model map", "Decision-rights matrix", "Systems & data inventory", "Quick-win register"] },
  { step: "02", code: "DIAGNOSE", title: "Diagnose", lede: "Find the constraints worth solving.", body: "We isolate the few constraints that govern outcomes — using quantitative analysis, frontline observation and benchmark data — and rank them by economic leverage.", out: ["Constraint analysis", "Cost-to-serve teardown", "Benchmark deltas", "Investment hypotheses"] },
  { step: "03", code: "DESIGN", title: "Design", lede: "Architect the target state with optionality intact.", body: "Target operating model, technology architecture and a sequenced roadmap — designed so early phases create real options for later ones rather than locking them out.", out: ["Target operating model", "Technology architecture", "Sequenced roadmap", "Business case"] },
  { step: "04", code: "BUILD", title: "Build", lede: "Run it as a programme, not a deck.", body: "Pods of senior engineers, architects and operating leaders work alongside your teams — building, integrating and deploying in production with defined exit criteria from day one.", out: ["Delivery pods", "Production rollouts", "Operational runbooks", "KPI instrumentation"] },
  { step: "05", code: "OPERATE", title: "Operate", lede: "Make the operation actually run.", body: "We embed alongside your teams to land the system in production — adoption, training, exception handling and continuous improvement until the operating model is yours, not ours.", out: ["Adoption programme", "Operating reviews", "Continuous improvement", "KPI tracking"] },
  { step: "06", code: "SCALE", title: "Scale", lede: "Replicate without reinventing.", body: "Codify what works into platforms, playbooks and partner extensions — so the next region, product line or M&A target inherits the operating advantage rather than rebuilding it.", out: ["Platform productisation", "Playbooks & academy", "Partner ecosystem", "M&A integration kit"] },
];

// ─── Cases ─────────────────────────────────────────────────────────
export type Case = { id: string; tag: string; client: string; title: string; summary: string; metrics: Metric[] };
export const cases: { feature: { tag: string; client: string; summary: string; metrics: Metric[] }; secondary: Case[] } = {
  feature: {
    tag: "Agentic AI · Hyper-Automation",
    client: "Top-10 European bank · 11 countries",
    summary: "Agentic close-the-books across 11 country ledgers — reconciliation, exception triage, regulator-ready exports. Three-day cycle compressed to one overnight window. Manual touches down 92%.",
    metrics: [
      { k: "Close cycle", v: "3d → 5h" },
      { k: "Manual touches", v: "−92%" },
      { k: "Programme length", v: "14 months" },
    ],
  },
  secondary: [
    { id: "proposal", tag: "Agentic AI · Custom Software", client: "Industrial OEM · DACH", title: "Proposals that used to take six weeks now take six hours.", summary: "Agentic proposal-generation built on top of CRM, pricing and engineering data. Six-week cycle to under a day; margin discipline up.", metrics: [{ k: "Cycle time", v: "6w → 6h" }, { k: "Margin uplift", v: "+4pts" }] },
    { id: "edge", tag: "Cloud & Edge · Hyper-Automation", client: "Global retailer · 12 countries", title: "Edge platform that lets 4,200 stores run themselves overnight.", summary: "Edge compute replacing on-prem servers in 4,200 stores. Real-time inventory, AI-assisted ops, lights-out overnight close.", metrics: [{ k: "Edge nodes", v: "4,200" }, { k: "On-prem footprint", v: "−86%" }] },
  ],
};

export const additionalCases: Case[] = [
  { id: "aiops-bank", tag: "Custom Software · Cloud & Edge", client: "European insurer · pan-EU", title: "A claims platform that handles 4× the volume on the same team.", summary: "Custom claims-orchestration platform with embedded AI assistants for adjusters. Same headcount, four times the throughput, faster customer outcomes.", metrics: [{ k: "Claims volume", v: "4×" }, { k: "Cycle time", v: "−58%" }] },
  { id: "edge-mfg", tag: "Cloud & Edge · Hyper-Automation", client: "European industrial OEM", title: "A predictive maintenance loop across 1,800 production machines.", summary: "Edge inference and a closed-loop scheduling system that auto-schedules service windows. Less downtime, fewer service calls.", metrics: [{ k: "Unplanned downtime", v: "−47%" }, { k: "Service-call cost", v: "−31%" }] },
  { id: "portal-saas", tag: "Custom Software · Digital Transformation", client: "Enterprise SaaS · series-D", title: "A customer portal that replaced eight internal tools.", summary: "A unified customer-success portal — billing, support, telemetry, contract management — replacing eight Frankensteined internal tools.", metrics: [{ k: "Tools retired", v: "8 → 1" }, { k: "NPS uplift", v: "+22pts" }] },
];

// ─── Manifesto / About ────────────────────────────────────────────
export type H2Part = string | { text: string; italic?: boolean; lime?: boolean };
export const manifesto: { h2: H2Part[]; body: string[]; stats: { v: string; k: string }[] } = {
  h2: ["A consultancy that brings the ", { italic: true, lime: true, text: "outside" }, " inside."],
  body: [
    "<em>Norton's theorem</em> simplifies complex systems into their essential form. <em>Gauss's theorem</em> connects what surrounds a system to what happens inside it.",
    "Together, they describe our operating philosophy: <strong>we bring external knowledge, methodology and engineering precision into your internal environment</strong> — to reduce complexity into the few variables that actually drive outcomes.",
    "We work as a small senior firm — engineers, architects and operating leaders who have built and run the systems they are asked to redesign. Pyramid leverage produces decks; operator leverage produces production change.",
    "<em>Founded 2019.</em> Offices in EMEA and the Americas. Active across financial services, telecom, retail, manufacturing and platform businesses.",
  ],
  stats: [
    { v: "2019", k: "Founded" },
    { v: "3", k: "Delivery HQs" },
    { v: "120+", k: "Engineers & consultants" },
  ],
};

// ─── Compounding ───────────────────────────────────────────────────
export const compounding = {
  h2A: "The longer you ",
  h2Em: "run it,",
  h2B: " the better it gets.",
  sub: "Every engagement produces durable assets: an integration layer, a workflow library, an AI evaluation harness, a custom-software platform. Each one feeds the next — so the platform you stand up in month one is a fraction of what it becomes by month twelve.",
  milestones: [
    { x: "Month 1", label: "Foundations", kpi: "1.0×", kpiLabel: "Baseline value", bullets: ["Integration layer live", "First automations in production", "Operating model embedded"] },
    { x: "Month 6", label: "Acceleration", kpi: "3.4×", kpiLabel: "Compounding multiplier", bullets: ["Workflow library doubles per quarter", "AI evaluation harness catches drift before incidents", "Custom-software platform covers 80% of operator paths"] },
    { x: "Month 12+", label: "Compounding scale", kpi: "12×", kpiLabel: "Value vs. month one", bullets: ["New regions inherit the platform on day one", "AI agents tuned on your data outperform off-the-shelf", "Marginal cost of the next workflow approaches zero"] },
  ],
  feedbackLoops: [
    { from: "Workflows", to: "AI agents", text: "Patterns from automated workflows train the next AI assistants." },
    { from: "AI agents", to: "Software", text: "Successful agent actions become product surface area in the platform." },
    { from: "Software", to: "Operating model", text: "Internal tools embed the operating model in the daily work." },
    { from: "Operating model", to: "Workflows", text: "A clearer operating model exposes the next automation worth building." },
  ],
};

// ─── Practices in depth ────────────────────────────────────────────
export type PracticeDetailItem = { id: string; code: string; num: string; title: string; category: string; pitch: string; pod: string; stack: string[]; outcomes: string[]; proof: string };
export const practicesDetail: { h2A: string; h2Em: string; h2B: string; sub: string; items: PracticeDetailItem[] } = {
  h2A: "How we ",
  h2Em: "actually",
  h2B: " deliver each practice.",
  sub: "Every practice ships as a pod of senior operators, a delivery model, an evaluation discipline and a contracted outcome. Pick a practice for the full spec.",
  items: [
    { id: "automation", code: "HA", num: "01", title: "Hyper-Automation", category: "Workflows · RPA · Integrations", pitch: "Eliminate repetitive work, connect the systems your operation already runs on, and turn manual handoffs into governed workflows.", pod: "1 automation lead · 2 senior engineers · 1 data engineer · 1 operator-experience lead", stack: ["Process mining", "RPA / IDP", "Integration platform", "Workflow orchestration", "Operator portal"], outcomes: ["Cycle time −60%", "STP +30pts", "Exception cost −40%"], proof: "Active across 2024–2025 mandates · finance, retail, telecom" },
    { id: "agentic", code: "AG", num: "02", title: "Agentic AI", category: "AI agents · Multi-agent workflows", pitch: "AI agents and AI-assisted workflows that reason, act, escalate and support teams — with the evaluations and guardrails to keep them safe in production.", pod: "1 lead architect · 3 senior engineers · 1 evaluation specialist · 1 product designer", stack: ["LLM orchestration", "Tool use / RAG", "Evaluation harness", "Tracing & guardrails", "Operator UX"], outcomes: ["Process time −55%", "Live deployments 20+", "HITL coverage 100%"], proof: "Live in 2025 portfolio · finance, industrial, B2B services" },
    { id: "transformation", code: "DT", num: "03", title: "Digital Transformation", category: "Operating model · Programmes", pitch: "Full programmes — operating model, technology roadmap, sourcing — and the change discipline that makes it stick after the steering committee adjourns.", pod: "1 partner · 1 programme lead · 2 architects · change & adoption squad", stack: ["TOM design", "Tech roadmap", "Vendor strategy", "Programme governance", "Change & adoption"], outcomes: ["OTOB delivery 92%", "Adoption @ +90d 78%", "OPEX −22%"], proof: "30+ transformation programmes since 2019" },
    { id: "software", code: "CS", num: "04", title: "Custom Software", category: "Web · Platforms · APIs", pitch: "Tailored web applications, internal platforms, customer portals, dashboards and APIs — built by senior full-stack pods that ship and run what they build.", pod: "1 product lead · 1 senior designer · 3 senior engineers · 1 quality lead", stack: ["Modern web stack", "Headless APIs", "Design system", "Observability", "CI/CD"], outcomes: ["MVP → prod 8–14 wk", "NPS +20pts (avg.)", "Tool consolidation typical"], proof: "Portals, internal platforms, AI-enabled apps in 2025" },
    { id: "cloud-edge", code: "CE", num: "05", title: "Cloud & Edge", category: "Substrate · Migration · Edge", pitch: "Multi-cloud and edge platforms engineered for elasticity, governance and unit economics that hold at scale.", pod: "1 platform architect · 3 platform engineers · 1 FinOps lead · 1 SRE", stack: ["Multi-cloud landing zones", "Cloud-native engineering", "Edge compute", "FinOps tooling", "DR & resilience"], outcomes: ["Cloud spend −35%", "Migration cadence 8 wk", "Edge fleets to 4,200 nodes"], proof: "Active across AWS · Azure · GCP" },
  ],
};

// ─── Hyper-personalised roadmaps ──────────────────────────────────
export const roadmaps = {
  h2A: "Hyper-personalised roadmaps — ",
  h2Em: "shaped to you,",
  h2B: " not to a template.",
  sub: "No two operators have the same constraint. Our engagements start with a custom roadmap — sequenced around your business priorities, your data estate and your operating maturity. Outputs are concrete, dated and unit-economic.",
  inputs: [
    { icon: "compass", k: "Business priorities", v: "Board-level objectives, P&L targets, market commitments." },
    { icon: "stack", k: "Tech & data estate", v: "Current platforms, data quality, vendor commitments, debt." },
    { icon: "people", k: "Operating maturity", v: "Where your operations sit on the automation-readiness curve." },
    { icon: "risk", k: "Risk & regulatory", v: "Sector regulation, AI risk, data residency, audit cycles." },
  ],
  outputs: [
    { tag: "0 – 30 days", h: "Diagnostic & quick wins", items: ["Operating-model map", "Constraint analysis", "2–3 quick-win automations live"] },
    { tag: "30 – 90 days", h: "Foundations", items: ["Integration layer online", "First AI agents in production", "Custom-software MVP in user hands"] },
    { tag: "3 – 6 months", h: "Acceleration", items: ["Workflow library 80% coverage", "Operating reviews instrumented", "Cloud migration cutover"] },
    { tag: "6 – 12 months", h: "Compounding scale", items: ["Platform productised", "Next region inherits Day-1", "Outcome contract → portfolio"] },
  ],
};

// ─── Innovation / Alpha-tester partner ────────────────────────────
export const innovation = {
  headlineA: "Need an alpha tester or ",
  headlineEm: "innovation partner?",
  headlineB: " Talk to us.",
  sub: "We co-build with research teams, founders and product leaders working on the frontier — agentic systems, automation platforms, edge orchestration. We bring an enterprise design-partner footprint, real production deployments and a senior engineering team that ships.",
  tags: ["Agentic systems", "Automation platforms", "Edge orchestration", "Eval & guardrails", "Operator UX"],
  offerings: [
    { tag: "Design partner", h: "Enterprise design-partner programme", d: "We run validated pilots inside our portfolio mandates with weekly product feedback and joint roadmap sessions." },
    { tag: "Alpha access", h: "Co-build alpha programmes", d: "Early-stage products get real workloads, real users and engineering integration help — not just letters of intent." },
    { tag: "Research lab", h: "Norton-Gauss Labs", d: "Joint research on agent evaluation, automation primitives and operating-model design. White-paper and open-source output." },
  ],
};

// ─── Operations map / footprint ───────────────────────────────────
export type MapLocation = { id: string; name: string; role: string; lon: number; lat: number; hq: boolean; sub?: string };
export const map: { sub: string; locations: MapLocation[]; industries: { num: string; name: string; desc: string }[] } = {
  sub: "Three regional headquarters covering North America, LATAM and EMEA — delivery teams that ship in your timezone.",
  locations: [
    { id: "par", name: "Paris", role: "EMEA HQ", lon: 2.35, lat: 48.85, hq: true },
    { id: "shr", name: "Sheridan", role: "North America HQ", lon: -106.96, lat: 44.8, hq: true, sub: "Wyoming" },
    { id: "sao", name: "São Paulo", role: "LATAM HQ", lon: -46.63, lat: -23.55, hq: true },
  ],
  industries: [
    { num: "01", name: "Financial Services", desc: "Banks, insurers, capital markets, payments." },
    { num: "02", name: "Telecom", desc: "Carriers, MVNOs and infrastructure operators." },
    { num: "03", name: "Retail & Consumer", desc: "Omnichannel, fulfilment and customer operations." },
    { num: "04", name: "Manufacturing & Logistics", desc: "Operations modernisation across the supply chain." },
    { num: "05", name: "Platform Businesses", desc: "SaaS, enterprise software and digital-native scale-ups." },
  ],
};

// ─── Outcomes — instrumented ──────────────────────────────────────
export type ImpactBig = { v: string; sup: string; label: string; desc: string };
export type ImpactDetail = { v: string; unit: string; k: string; d: string };
export const impact: { lede: string; big: ImpactBig[]; detailed: ImpactDetail[] } = {
  lede: "Every engagement is instrumented against the same outcome model — cost, velocity, reliability and adoption. Numbers below are anonymised medians across active 2024–2025 programmes.",
  big: [
    { v: "−35", sup: "%", label: "Operating cost", desc: "Median run-rate cost reduction 12 months post-go-live." },
    { v: "3.4", sup: "×", label: "Decision velocity", desc: "Operating-review cycles after instrumentation." },
    { v: "92", sup: "%", label: "OTOB delivery", desc: "On-time, on-budget programme delivery rate." },
    { v: "78", sup: "%", label: "Adoption at +90 days", desc: "Measured platform adoption post-rollout." },
  ],
  detailed: [
    { v: "−60", unit: "%", k: "Process cycle time", d: "Median across automated workflows." },
    { v: "+30", unit: "pts", k: "Straight-through processing", d: "STP rate improvement on automated paths." },
    { v: "−55", unit: "%", k: "AI-augmented process time", d: "Where AI agents handle reasoning + drafting." },
    { v: "−35", unit: "%", k: "Cloud spend", d: "FinOps, right-sizing and architectural change." },
    { v: "92", unit: "%", k: "OTOB delivery", d: "On-time, on-budget rate, programme portfolio." },
    { v: "78", unit: "%", k: "Adoption at +90 days", d: "Measured platform adoption post-rollout." },
    { v: "8–14", unit: "wk", k: "MVP to production", d: "Typical timeline for custom software builds." },
    { v: "8–12", unit: "wk", k: "Automation programme", d: "First production wave for hyper-automation." },
    { v: "8", unit: "wk", k: "Migration cadence", d: "Reference cadence for cloud migrations." },
    { v: "+4", unit: "pts", k: "Margin uplift", d: "On agentic-pricing & decision-support engagements." },
    { v: "20", unit: "+", k: "Live agent deployments", d: "Across active 2025 agentic AI mandates." },
    { v: "100", unit: "%", k: "Senior-only delivery", d: "Every pod is staffed with senior operators." },
  ],
};
