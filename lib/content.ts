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
  sub: "Most firms hand over recommendations. We hand over production systems.",
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
    { k: "Cycle-time reduction", v: "40–60%" },
    { k: "Straight-through processing", v: "20–30pts" },
    { k: "Programme delivery cadence", v: "8–12 weeks" },
  ] as Kpi[],
};

// ─── Five practices ───────────────────────────────────────────────
export type Service = { num: string; id: string; title: string; meta: string; summary: string; bullets: string[]; kpi: Kpi[] };
export const services: Service[] = [
  {
    num: "01", id: "automation", title: "Hyper-Automation",
    meta: "Workflows · RPA · Integrations · Process orchestration",
    summary: "Manual handoffs, re-keyed data and tools that do not talk slow your operation down and bury it in errors. We remove that work and connect the systems you already run — workflow orchestration, RPA, document and data automation, and the API integrations (REST, GraphQL, MCP) that make twenty systems behave like one. Built on platforms such as Power Platform, Azure and Python, and run in production rather than piloted.",
    bullets: ["Workflow automation & orchestration", "RPA & robotic process automation", "API & systems integration", "Document and data automation", "Process intelligence & re-engineering", "Business-process optimisation"],
    kpi: [{ k: "Cycle-time reduction", v: "40–60%" }, { k: "Straight-through processing", v: "20–30pts" }],
  },
  {
    num: "02", id: "agentic", title: "Agentic AI",
    meta: "AI agents · Multi-agent workflows · Human-in-the-loop",
    summary: "Most AI pilots prove value in a demo and stall before production. We design AI agents and AI-assisted workflows that reason, draft and act inside controlled business environments — always with human approval where it matters. Built with frameworks like LangGraph and models from OpenAI and Anthropic over an MCP tool layer, wrapped in the evaluations, guardrails, tracing and audit trails that keep them safe and accountable in production.",
    bullets: ["AI agents for internal operations", "Multi-agent workflows", "AI assistants & copilots", "Human-in-the-loop automation", "AI-powered decision support", "Evals, guardrails & monitoring"],
    kpi: [{ k: "Manual process time saved", v: "40–55%" }, { k: "Agentic systems in production", v: "Live" }],
  },
  {
    num: "03", id: "transformation", title: "Digital Transformation",
    meta: "Operating model · Technology roadmap · Programme delivery",
    summary: "Transformation programmes that produce slide decks rarely change how the business actually runs. We align operating model, technology roadmap and execution into one programme — diagnosis through delivery — with the change discipline and adoption work that make it stick after the steering committee adjourns.",
    bullets: ["Operating-model redesign", "Process modernisation", "Business-technology roadmap", "Transformation programme execution", "Change enablement & adoption", "Outcome instrumentation"],
    kpi: [{ k: "On time & on budget", v: "92%" }, { k: "User adoption at 90 days", v: "70–80%" }],
  },
  {
    num: "04", id: "software", title: "Custom Software Development",
    meta: "Web apps · Portals · Internal platforms · APIs",
    summary: "When off-the-shelf systems do not fit the way you work, the workarounds become the operation. We build the software that fits — internal platforms, customer portals, workflow tools, dashboards, APIs and AI-enabled applications — engineered by senior full-stack pods (TypeScript, React, Python, cloud-native) that ship and run what they build.",
    bullets: ["Web & internal applications", "Customer portals", "Workflow & operations tools", "Dashboards & analytics surfaces", "API & integration products", "AI-enabled applications"],
    kpi: [{ k: "Experienced delivery teams", v: "Senior-led" }, { k: "Typical MVP to production", v: "8–14 weeks" }],
  },
  {
    num: "05", id: "cloud-edge", title: "Cloud & Edge",
    meta: "Architecture · Migration · Cloud-native · Edge compute",
    summary: "Infrastructure that cannot scale — or whose cost scales faster than the business — caps everything built on top of it. We modernise architecture, deployment and distributed systems across AWS, Azure and GCP, plus edge compute, with Kubernetes, Terraform and FinOps discipline — engineered for elasticity, governance and unit economics that hold at scale.",
    bullets: ["Cloud architecture & landing zones", "Cloud migration", "Cloud-native application engineering", "Edge computing", "Infrastructure modernisation", "Scalable, secure deployment foundations"],
    kpi: [{ k: "Cloud cost reduction", v: "20–35%" }, { k: "Typical migration wave", v: "6–10 weeks" }],
  },
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
    summary: "Agentic close-the-books across 11 country ledgers — reconciliation, exception triage, regulator-ready exports. An approximately three-day cycle compressed to a single overnight window, with manual touches down 92%, measured during post-go-live operating reviews.",
    metrics: [
      { k: "Close cycle", v: "3d → 5h" },
      { k: "Manual touches", v: "−92%" },
      { k: "Programme length", v: "14 months" },
    ],
  },
  secondary: [
    { id: "proposal", tag: "Agentic AI · Custom Software", client: "Industrial OEM · DACH", title: "Proposals that used to take six weeks now take six hours.", summary: "Agentic proposal-generation built on top of CRM, pricing and engineering data. Six-week cycle to under a day; margin discipline up.", metrics: [{ k: "Cycle time", v: "6w → 6h" }, { k: "Margin uplift", v: "+4pts" }] },
    { id: "edge", tag: "Cloud & Edge · Hyper-Automation", client: "Global retailer · 12 countries", title: "Edge platform that keeps 4,200 stores running overnight, unattended.", summary: "Edge compute replacing on-prem servers in 4,200 stores. Real-time inventory, AI-assisted ops and a lights-out overnight close.", metrics: [{ k: "Edge nodes", v: "4,200" }, { k: "On-prem footprint", v: "−86%" }] },
  ],
};

export const additionalCases: Case[] = [
  { id: "aiops-bank", tag: "Custom Software · Cloud & Edge", client: "European insurer · pan-EU", title: "A claims platform that handles 4× the volume on the same team.", summary: "Custom claims-orchestration platform with embedded AI assistants for adjusters. Same headcount, four times the throughput, faster customer outcomes.", metrics: [{ k: "Claims volume", v: "4×" }, { k: "Cycle time", v: "−58%" }] },
  { id: "edge-mfg", tag: "Cloud & Edge · Hyper-Automation", client: "European industrial OEM", title: "A predictive maintenance loop across 1,800 production machines.", summary: "Edge inference and a closed-loop scheduling system that auto-schedules service windows. Less downtime, fewer service calls.", metrics: [{ k: "Unplanned downtime", v: "−47%" }, { k: "Service-call cost", v: "−31%" }] },
  { id: "portal-saas", tag: "Custom Software · Digital Transformation", client: "Enterprise SaaS · series-D", title: "A customer portal that replaced eight internal tools.", summary: "A unified customer-success portal — billing, support, telemetry, contract management — replacing eight Frankensteined internal tools.", metrics: [{ k: "Tools retired", v: "8 → 1" }, { k: "User adoption", v: "+22pts" }] },
];

// ─── Manifesto / About ────────────────────────────────────────────
export type H2Part = string | { text: string; italic?: boolean; lime?: boolean };
export const manifesto: { h2: H2Part[]; body: string[]; stats: { v: string; k: string }[] } = {
  h2: ["A firm that brings the ", { italic: true, lime: true, text: "outside" }, " inside."],
  body: [
    "<em>Norton's theorem</em> simplifies complex systems into their essential form. <em>Gauss's theorem</em> connects what surrounds a system to what happens inside it.",
    "Together, they describe our operating philosophy: <strong>we bring external knowledge, methodology and engineering precision into your internal environment</strong> — to reduce complexity into the few variables that actually drive outcomes.",
    "We work as a small senior firm — engineers, architects and operating leaders who have built and run the systems they are asked to redesign. Most firms staff engagements with large junior teams and deliver recommendations; we staff senior people who deliver production systems and stay accountable for the outcome.",
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
    { id: "automation", code: "HA", num: "01", title: "Hyper-Automation", category: "Workflows · RPA · Integrations", pitch: "Eliminate repetitive work, connect the systems your operation already runs on, and turn manual handoffs into governed workflows.", pod: "1 automation lead · 2 senior engineers · 1 data engineer · 1 operator-experience lead", stack: ["Process mining", "RPA / IDP", "Integration platform", "Workflow orchestration", "Operator portal"], outcomes: ["Cycle-time reduction 40–60%", "Straight-through processing 20–30pts", "Exception cost 25–40%"], proof: "Representative outcomes · finance, retail, telecom · 2024–2026" },
    { id: "agentic", code: "AG", num: "02", title: "Agentic AI", category: "AI agents · Multi-agent workflows", pitch: "AI agents and AI-assisted workflows that reason, act, escalate and support teams — with the evaluations and guardrails to keep them safe in production.", pod: "1 lead architect · 3 senior engineers · 1 evaluation specialist · 1 product designer", stack: ["LLM orchestration", "Tool use / RAG", "Evaluation harness", "Tracing & guardrails", "Operator UX"], outcomes: ["Manual process time 40–55%", "Agentic systems live", "Human oversight built-in"], proof: "Representative outcomes · finance, industrial, B2B services · 2024–2026" },
    { id: "transformation", code: "DT", num: "03", title: "Digital Transformation", category: "Operating model · Programmes", pitch: "Full programmes — operating model, technology roadmap, sourcing — and the change discipline that makes it stick after the steering committee adjourns.", pod: "1 partner · 1 programme lead · 2 architects · change & adoption squad", stack: ["TOM design", "Tech roadmap", "Vendor strategy", "Programme governance", "Change & adoption"], outcomes: ["On-time on-budget 92%", "User adoption at 90d 70–80%", "Operating cost 15–22%"], proof: "Representative outcomes from transformation programmes since 2019" },
    { id: "software", code: "CS", num: "04", title: "Custom Software", category: "Web · Platforms · APIs", pitch: "Tailored web applications, internal platforms, customer portals, dashboards and APIs — built by senior full-stack pods that ship and run what they build.", pod: "1 product lead · 1 senior designer · 3 senior engineers · 1 quality lead", stack: ["Modern web stack", "Headless APIs", "Design system", "Observability", "CI/CD"], outcomes: ["MVP to production 8–14wk", "User adoption 70–80%", "Tool consolidation typical"], proof: "Portals, internal platforms and AI-enabled apps · 2024–2026" },
    { id: "cloud-edge", code: "CE", num: "05", title: "Cloud & Edge", category: "Substrate · Migration · Edge", pitch: "Multi-cloud and edge platforms engineered for elasticity, governance and unit economics that hold at scale.", pod: "1 platform architect · 3 platform engineers · 1 FinOps lead · 1 SRE", stack: ["Multi-cloud landing zones", "Cloud-native engineering", "Edge compute", "FinOps tooling", "DR & resilience"], outcomes: ["Cloud cost reduction 20–35%", "Migration wave 6–10wk", "Edge fleets to 4,200 nodes"], proof: "Representative outcomes · AWS · Azure · GCP" },
  ],
};

// ─── Hyper-personalised roadmaps ──────────────────────────────────
export const roadmaps = {
  h2A: "Hyper-personalised roadmaps — ",
  h2Em: "shaped to you,",
  h2B: " not to a template.",
  sub: "No two operations have the same constraints. Every engagement starts with a custom roadmap — sequenced around your business priorities, your data estate and your operating maturity. Outputs are concrete, dated and tied to unit economics.",
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
  lede: "Every engagement is instrumented against the same outcome model — cost, cycle time, reliability and adoption. Figures below are representative portfolio medians from completed client engagements between 2024 and 2026, not best-case results. Outcomes vary with scope, starting point and operating environment.",
  big: [
    { v: "25–35", sup: "%", label: "Operating cost reduction", desc: "Median run-rate reduction, measured ~12 months after go-live." },
    { v: "3.4", sup: "×", label: "Faster operating reviews", desc: "Issue identification to executive decision, after instrumentation." },
    { v: "92", sup: "%", label: "On time & on budget", desc: "Portfolio average across recent programmes." },
    { v: "70–80", sup: "%", label: "User adoption at 90 days", desc: "Measured across platform deployments post-rollout." },
  ],
  detailed: [
    { v: "40–60", unit: "%", k: "Cycle time reduction", d: "Across automated operational workflows." },
    { v: "20–30", unit: "pts", k: "Straight-through processing", d: "Improvement measured on redesigned process paths." },
    { v: "40–55", unit: "%", k: "Manual process time", d: "Where AI-assisted workflows support drafting, routing and analysis." },
    { v: "20–35", unit: "%", k: "Cloud cost reduction", d: "Through FinOps, right-sizing and architecture optimization." },
    { v: "92", unit: "%", k: "On time & on budget", d: "Portfolio average across recent programmes." },
    { v: "70–80", unit: "%", k: "User adoption at 90 days", d: "Measured across platform deployments." },
    { v: "8–14", unit: "wk", k: "MVP to production", d: "Typical delivery timeline for operational software initiatives." },
    { v: "8–12", unit: "wk", k: "Automation programme", d: "Typical timeline to first production automation wave." },
    { v: "6–10", unit: "wk", k: "Migration wave", d: "Reference cadence for cloud modernization programmes." },
    { v: "3–5", unit: "pts", k: "Margin uplift", d: "On pricing and decision-support engagements." },
    { v: "Live", unit: "", k: "AI systems in production", d: "Agentic and AI-assisted workflows running in real client environments." },
    { v: "Senior", unit: "", k: "Senior-led delivery", d: "Experienced engineers and operators on every engagement." },
  ],
};

// ─── Case study detail (Case page) ────────────────────────────────
export const caseDetail = {
  tag: "Agentic AI · Hyper-Automation · Custom Software",
  client: "Top-10 European bank (anonymized)",
  region: "EMEA · 11 countries",
  duration: "14 months",
  team: "9 engineers · 2 architects · 1 partner",
  titleA: "A treasury close that",
  titleEm: "runs overnight,",
  titleB: "not over three days.",
  subtitle:
    "How a top-10 European bank compressed an 11-country month-end close from three days to a single overnight window — and gave the treasury team five days back per cycle. Client details have been anonymized for confidentiality.",
  sections: [
    {
      h: "The situation",
      body: [
        "A top-10 European bank closed the books across <strong>11 country ledgers</strong> on a 3-day cycle that consumed treasury, finance ops and IT every month. The work was a series of manual handoffs across ten systems, with a long tail of exceptions handled in spreadsheets.",
        "Adding regulators, acquisitions and a thinning back-office made the run untenable. The CFO needed a close that scaled with the business — and a finance team that did not lose a working week to it every month. Identifying details have been anonymized at the client's request.",
      ],
    },
    {
      h: "The diagnosis",
      body: [
        "Six weeks of frontline diagnostics found that <strong>74% of close work was repeatable reconciliation</strong>, and another 18% was exception handling that followed predictable patterns. The root constraint was not the GLs — it was the absence of an orchestration layer that could drive them all to one regulator-ready state.",
        "We sized the prize, scoped the platform and contracted against measurable outcomes: cycle time, manual touches, and adoption at +90 days.",
      ],
    },
    {
      h: "What we built",
      body: [
        "A close-orchestration platform built on top of the existing GLs, integrating with ERP, treasury and reporting. An <strong>agent fleet for reconciliation and exception triage</strong> with policy-bound actions, segregation-of-duties controls and human approval for anything above defined thresholds. A custom finance-ops portal for the treasury team to monitor the close, approve exceptions and export regulator-ready packages.",
        "Governance was built in, not bolted on: every automated action writes to an <strong>immutable audit trail</strong>, an evaluation harness checks every agent path before release, and integration tests run across the ledger network. An adoption programme took the treasury team from sceptics to confident owners in a single cycle.",
      ],
    },
  ],
  results: [
    { v: "3d → 5h", k: "Close cycle", d: "Approx. three days to a single overnight window, all eleven ledgers." },
    { v: "−92%", k: "Manual touches", d: "Per close cycle, after the second wave." },
    { v: "78%", k: "Adoption at +90d", d: "Of the treasury team using the platform daily at 90 days." },
    { v: "5 days", k: "Recovered per cycle", d: "Returned to higher-value treasury work." },
  ],
  quote: {
    text: "Norton-Gauss did not bring us a product. They brought us a way of running the close that we could own — and a small team that built it with us.",
    who: "Group CFO · European Bank",
  },
  timeline: [
    { phase: "Phase 01", h: "Discover", d: "Close-process map across 11 ledgers and 10 systems.", dur: "6 weeks" },
    { phase: "Phase 02", h: "Diagnose", d: "Constraint analysis, exception-pattern catalogue, business case.", dur: "4 weeks" },
    { phase: "Phase 03", h: "Design", d: "Orchestration architecture, agent design, ops-portal product spec.", dur: "8 weeks" },
    { phase: "Phase 04", h: "Build", d: "Platform build-out, agent factory, portal, ledger integrations.", dur: "7 months" },
    { phase: "Phase 05", h: "Operate", d: "First close wave, adoption programme, exception triage live.", dur: "3 months" },
  ],
};

// ─── Careers ───────────────────────────────────────────────────────
export type Job = {
  id: string; title: string; dept: string; location: string; type: string; comp: string;
  teaser: string; about: string; you: string[]; do: string[];
};
export const careers: {
  eyebrow: string; h1A: string; h1Em: string; h1B: string; sub: string;
  perks: { k: string; v: string }[]; departments: string[]; jobs: Job[];
} = {
  eyebrow: "Careers · Build with us",
  h1A: "Build the ",
  h1Em: "systems behind",
  h1B: " modern operations.",
  sub: "We hire senior people — engineers, architects and consultants who have run the systems they now re-architect. No large junior pyramids: every engagement is staffed by people who can take a system to production and own the outcome.",
  perks: [
    { k: "Senior-only firm", v: "No staffing pyramids — every engagement is run by people who have shipped to production." },
    { k: "Outcome contracts", v: "You ship into operations, not into slide decks. Outcomes are instrumented and contracted." },
    { k: "Compensation", v: "Above-market base + outcome-linked variable + meaningful equity in Norton-Gauss Labs." },
    { k: "Time & remote", v: "Async-first across three HQs (Paris · Sheridan · São Paulo). Four weeks of protected focus time per year." },
  ],
  departments: ["All", "Partnerships"],
  jobs: [
    {
      id: "sales-referral-partner", title: "Sales Referral Partner · Automation and AI", dept: "Partnerships",
      location: "Worldwide · Fully remote", type: "Commission-based", comp: "Commission",
      teaser: "Introduce us to organizations that need automation, agentic AI or custom software. When an introduction becomes an engagement, you earn commission on the revenue it creates.",
      about: "This is a commission-based referral role for well-connected operators, advisors and consultants anywhere in the world. You bring qualified introductions to companies with real automation, AI or software needs; our partners run the conversation, scope the work and deliver it. You stay informed, your contact gets a senior team, and you earn a share of the revenue your introduction generates. No base, no quota, no territory limits — work it as much or as little as your network allows.",
      you: ["An active network of executives, operators or founders who buy technology services", "Credibility in one or more of our sectors — financial services, telecom, retail, manufacturing or platform businesses", "Enough fluency in automation, AI or software to recognise a real need and make a relevant, warm introduction", "A reputation you protect — you only introduce people to work you would stand behind", "Self-directed: comfortable owning your own pipeline without day-to-day management"],
      do: ["Identify organizations with automation, agentic AI, custom software or cloud needs", "Make warm introductions to the relevant Norton-Gauss partner", "Stay looped in through scoping so the hand-off stays clean and your contact is well served", "Earn commission on every introduction that converts to a paid engagement", "Build a repeatable referral pipeline at whatever pace suits you"],
    },
  ],
};
