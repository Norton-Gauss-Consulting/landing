"use client";

// Norton-Gauss · Book-a-call page (ported from src/book.jsx)
// A 45-minute working-session wizard: Context → Operating → Schedule → Confirm.
// NOTE: slot availability and submission are STUBS (deterministic fake data +
// a generated confirmation id) — backend wiring comes later.
import { useState, useMemo, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Arr } from "./icons";
import SubpageMesh from "./SubpageMesh";

// ─── Static content ─────────────────────────────────────────────
const BOOK = {
  eyebrow: "13 · Book a working session",
  h1A: "Forty-five minutes ",
  h1Em: "with a partner.",
  h1B: "",
  sub: "You bring an operating constraint. We bring a perspective and the engineering judgment behind it. You leave with a sharper question and a concrete next move — not a follow-up brochure. Confidential by default; NDA available on request.",
  practices: [
    { id: "hyper", label: "Hyper-Automation", code: "P01" },
    { id: "agent", label: "Agentic AI", code: "P02" },
    { id: "transform", label: "Digital Transformation", code: "P03" },
    { id: "custom", label: "Custom Software", code: "P04" },
    { id: "cloud", label: "Cloud & Edge", code: "P05" },
    { id: "unsure", label: "I'm not sure yet", code: "·" },
  ],
  stages: [
    { id: "scoping", label: "Scoping a new programme", desc: "You have a brief; you want a perspective before you go to market." },
    { id: "stuck", label: "A programme is stalled", desc: "AI pilot, automation rollout or platform build that has lost momentum." },
    { id: "rfx", label: "Active RFP / shortlist", desc: "You are evaluating senior partners against a defined scope." },
    { id: "open", label: "Exploratory conversation", desc: "No specific mandate yet — you want to compare your thinking against ours." },
  ],
  sizes: ["1–50", "51–500", "501–5,000", "5,001–25,000", "25,000+"],
  expect: [
    { k: "00:00", v: "Two-minute frame — your question, in your words." },
    { k: "00:02", v: "Operating context — what the system around it looks like today." },
    { k: "00:15", v: "Our read — where we think the leverage is, and where it isn't." },
    { k: "00:30", v: "A concrete next move — a 2-week diagnostic, an architecture review, or nothing." },
    { k: "00:45", v: "Written follow-up within one working day. No deck, no pitch." },
  ],
  faq: [
    { q: "Who is on the call?", a: "A senior partner from the relevant practice. If your topic spans practices we add a second partner — never juniors, never sales." },
    { q: "Is this a sales call?", a: "No. We do not have a sales team. The people on the call are the people who would run the engagement. They get paid to be useful, on or off the clock." },
    { q: "Do you sign NDAs before the call?", a: "Yes — mutual, two-page, sent within an hour of booking. We can also work to your paper." },
    { q: "What if I just want to think out loud?", a: "That is the most common kind of call we take. Bring a problem; we will help you frame it." },
    { q: "What timezones do you cover?", a: "Three HQs — Paris, Sheridan (Wyoming) and São Paulo. Slots are offered in your local timezone, detected from your browser." },
  ],
  partners: [
    { name: "Sofia Vidal", role: "Partner · Hyper-Automation", hq: "Paris", since: "2019" },
    { name: "Marcus Holloway", role: "Partner · Agentic AI & Research", hq: "Sheridan", since: "2020" },
    { name: "Renata Pires", role: "Partner · Digital Transformation", hq: "São Paulo", since: "2019" },
  ],
};

const PARTNER_FOR: Record<string, number> = {
  hyper: 0, agent: 1, transform: 2, custom: 0, cloud: 1, unsure: 1, "": 1,
};

type Form = {
  name: string; email: string; company: string; role: string; size: string;
  practice: string; stage: string; challenge: string; nda: boolean; notes?: string;
};
type Slot = { hour: number; label: string; taken: boolean };

// ─── Helpers ────────────────────────────────────────────────────
function pad(n: number) { return String(n).padStart(2, "0"); }
function shortDow(d: Date) { return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()]; }
function fullDow(d: Date) { return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d.getDay()]; }
function shortMonth(d: Date) { return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getMonth()]; }
function isSameDay(a: Date, b: Date) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
function addDays(d: Date, n: number) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
function startOfMonth(d: Date) { return new Date(d.getFullYear(), d.getMonth(), 1); }
function monthGrid(month: Date) {
  const first = startOfMonth(month);
  const offset = (first.getDay() + 6) % 7;
  const start = addDays(first, -offset);
  return Array.from({ length: 42 }, (_, i) => addDays(start, i));
}
function getTz() {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch { return "UTC"; }
}
// STUB: deterministic "available" mask + slot list (no backend).
function isAvailable(d: Date, today: Date) {
  const dow = d.getDay();
  if (dow === 0 || dow === 6) return false;
  if (d < today) return false;
  const seed = d.getDate() * 31 + d.getMonth() * 7;
  if (seed % 13 === 0) return false;
  return true;
}
function slotsFor(d: Date): Slot[] {
  const base = [9, 11, 13, 14, 16, 17];
  const seed = d.getDate() + d.getMonth() * 5;
  return base.map((h, i) => ({ hour: h, label: `${pad(h)}:00 – ${pad(h)}:45`, taken: (seed + i * 3) % 7 === 0 }));
}

// ─── Page ───────────────────────────────────────────────────────
export default function BookCallPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Form>({
    name: "", email: "", company: "", role: "", size: "51–500", practice: "", stage: "", challenge: "", nda: false,
  });
  const [pickedDate, setPickedDate] = useState<Date | null>(null);
  const [pickedSlot, setPickedSlot] = useState<number | null>(null);
  const [viewMonth, setViewMonth] = useState(() => { const t = new Date(); return new Date(t.getFullYear(), t.getMonth(), 1); });
  const [confirmedId, setConfirmedId] = useState<string | null>(null);
  const today = useMemo(() => { const t = new Date(); t.setHours(0, 0, 0, 0); return t; }, []);

  const partner = useMemo(() => BOOK.partners[PARTNER_FOR[form.practice] ?? 1], [form.practice]);
  const tz = useMemo(() => getTz(), []);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const canNext1 = !!(form.name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && form.company.trim());
  const canNext2 = !!(form.practice && form.stage && form.challenge.trim().length >= 20);
  const canNext3 = !!(pickedDate && pickedSlot != null);
  const canSubmit = form.nda;

  const go = (n: number) => {
    if (n < step) { setStep(n); return; }
    if (n === 2 && !canNext1) return;
    if (n === 3 && !canNext2) return;
    if (n === 4 && !canNext3) return;
    setStep(n);
  };

  // STUB: generate a confirmation id instead of hitting a backend.
  const submit = () => {
    const id = `NG-${Date.now().toString(36).slice(-4).toUpperCase()}-${Math.floor(Math.random() * 9000 + 1000)}`;
    setConfirmedId(id);
    setStep(5);
  };

  return (
    <div className="page-enter book-page">
      <section className="book-hero">
        <SubpageMesh side="right" size="md" />
        <div className="container">
          <span className="eyebrow">{BOOK.eyebrow}</span>
          <h1 style={{ marginTop: 24 }}>
            {BOOK.h1A}<em className="serif-em">{BOOK.h1Em}</em>{BOOK.h1B}
          </h1>
          <p className="lede big" style={{ marginTop: 32 }}>{BOOK.sub}</p>

          <div className="book-hero-meta">
            <div><div className="k">Format</div><div className="v">45-minute working session</div></div>
            <div><div className="k">Cost</div><div className="v">Complimentary</div></div>
            <div><div className="k">Follow-up</div><div className="v">Written brief · 24h</div></div>
            <div><div className="k">Confidentiality</div><div className="v">Confidential by default</div></div>
          </div>
        </div>
      </section>

      <section className="book-flow">
        <div className="container">
          <div className="book-grid">
            <div className="book-form">
              <BookStepper step={step} setStep={go} confirmed={!!confirmedId} />

              {step === 1 && <BookStep1 form={form} set={set} onNext={() => go(2)} canNext={canNext1} />}
              {step === 2 && <BookStep2 form={form} set={set} onBack={() => go(1)} onNext={() => go(3)} canNext={canNext2} />}
              {step === 3 && (
                <BookStep3
                  today={today} viewMonth={viewMonth} setViewMonth={setViewMonth}
                  pickedDate={pickedDate} setPickedDate={setPickedDate}
                  pickedSlot={pickedSlot} setPickedSlot={setPickedSlot}
                  tz={tz} onBack={() => go(2)} onNext={() => go(4)} canNext={canNext3}
                />
              )}
              {step === 4 && (
                <BookStep4
                  form={form} set={set} partner={partner}
                  pickedDate={pickedDate} pickedSlot={pickedSlot} tz={tz}
                  onBack={() => go(3)} onSubmit={submit} canSubmit={canSubmit}
                />
              )}
              {step === 5 && (
                <BookConfirmation
                  confirmedId={confirmedId} form={form} partner={partner}
                  pickedDate={pickedDate} pickedSlot={pickedSlot} tz={tz}
                  onHome={() => router.push("/")}
                />
              )}
            </div>

            <aside className="book-rail">
              <BookExpectCard />
              <BookAltContact />
            </aside>
          </div>
        </div>
      </section>

      <section className="book-faq">
        <div className="container">
          <div className="section-head" style={{ marginBottom: 56 }}>
            <h2 className="display-lg">Common <em className="serif-em" style={{ color: "var(--ng-lime)" }}>questions.</em></h2>
            <p className="right">
              Five things people usually ask before booking. If yours is missing, email{" "}
              <a href="mailto:partners@nortongauss.com" style={{ color: "var(--ng-lime)" }}>partners@nortongauss.com</a>.
            </p>
          </div>
          <BookFAQ items={BOOK.faq} />
        </div>
      </section>
    </div>
  );
}

// ─── Stepper ────────────────────────────────────────────────────
function BookStepper({ step, setStep, confirmed }: { step: number; setStep: (n: number) => void; confirmed: boolean }) {
  const items = [
    { n: "01", k: "Context" },
    { n: "02", k: "Operating" },
    { n: "03", k: "Schedule" },
    { n: "04", k: "Confirm" },
  ];
  return (
    <ol className="book-stepper" aria-label="Booking progress">
      {items.map((it, i) => {
        const idx = i + 1;
        const state = confirmed ? "done" : step === idx ? "active" : step > idx ? "done" : "idle";
        return (
          <li key={it.n} className={`book-stepper__item is-${state}`}>
            <button type="button" onClick={() => state !== "idle" && setStep(idx)} disabled={state === "idle"}>
              <span className="n">{it.n}</span>
              <span className="k">{it.k}</span>
              <span className="bar" />
            </button>
          </li>
        );
      })}
    </ol>
  );
}

// ─── Step 1 · Context ───────────────────────────────────────────
function BookStep1({ form, set, onNext, canNext }: { form: Form; set: <K extends keyof Form>(k: K, v: Form[K]) => void; onNext: () => void; canNext: boolean }) {
  return (
    <div className="book-card">
      <div className="book-card__head">
        <span className="ix">01 / 04</span>
        <h3>Tell us who you are.</h3>
        <p>We staff every call with a partner who has run the kind of system you want to talk about. Three fields below — that is what we need to match.</p>
      </div>

      <div className="book-fields">
        <div className="book-fields__row">
          <Field label="Full name" required>
            <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Alexandra Kowalski" autoComplete="name" />
          </Field>
          <Field label="Work email" required hint="We only contact this address.">
            <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="alex@yourcompany.com" autoComplete="email" />
          </Field>
        </div>

        <div className="book-fields__row">
          <Field label="Company" required>
            <input type="text" value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Brunswick Capital" autoComplete="organization" />
          </Field>
          <Field label="Role">
            <input type="text" value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="Chief Operating Officer" autoComplete="organization-title" />
          </Field>
        </div>
      </div>

      <BookActions primary={{ label: "Continue · Operating context", onClick: onNext, disabled: !canNext }} meta={canNext ? null : "Name, email and company are required."} />
    </div>
  );
}

// ─── Step 2 · Operating ─────────────────────────────────────────
function BookStep2({ form, set, onBack, onNext, canNext }: { form: Form; set: <K extends keyof Form>(k: K, v: Form[K]) => void; onBack: () => void; onNext: () => void; canNext: boolean }) {
  return (
    <div className="book-card">
      <div className="book-card__head">
        <span className="ix">02 / 04</span>
        <h3>What do you want to <em className="serif-em">work on</em>?</h3>
        <p>The clearer the framing, the better the partner match — and the less of the 45 minutes you spend orienting us.</p>
      </div>

      <div className="book-fields">
        <Field label="Closest practice" required hint="Pick the closest fit. We will route correctly.">
          <div className="book-practice-grid">
            {BOOK.practices.map((p) => (
              <button key={p.id} type="button" className={`book-practice ${form.practice === p.id ? "is-on" : ""}`} onClick={() => set("practice", p.id)}>
                <span className="code">{p.code}</span>
                <span className="lbl">{p.label}</span>
                <span className="dot" />
              </button>
            ))}
          </div>
        </Field>

        <Field label="Where you are" required>
          <div className="book-stages">
            {BOOK.stages.map((s) => (
              <button key={s.id} type="button" className={`book-stage ${form.stage === s.id ? "is-on" : ""}`} onClick={() => set("stage", s.id)}>
                <span className="lbl">{s.label}</span>
                <span className="desc">{s.desc}</span>
                <span className="mark"><svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M2 6.5l3 3 5-6" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg></span>
              </button>
            ))}
          </div>
        </Field>

        <Field label="What's the question?" required hint={`Two or three sentences is plenty. ${form.challenge.length}/600`}>
          <textarea
            rows={5} maxLength={600} value={form.challenge} onChange={(e) => set("challenge", e.target.value)}
            placeholder="e.g. We have an automation backlog of ~40 finance workflows. Our internal team has shipped six in 18 months. We need to know whether to staff a senior pod, buy a platform, or do both."
          />
        </Field>

        <Field label="Company size" hint="Headcount, approximate.">
          <div className="book-chips">
            {BOOK.sizes.map((s) => (
              <button key={s} type="button" className={`book-chip ${form.size === s ? "is-on" : ""}`} onClick={() => set("size", s)}>{s}</button>
            ))}
          </div>
        </Field>
      </div>

      <BookActions
        secondary={{ label: "Back", onClick: onBack }}
        primary={{ label: "Continue · Pick a time", onClick: onNext, disabled: !canNext }}
        meta={canNext ? null : "Pick a practice, a stage, and write a sentence or two."}
      />
    </div>
  );
}

// ─── Step 3 · Schedule ──────────────────────────────────────────
function BookStep3({
  today, viewMonth, setViewMonth, pickedDate, setPickedDate, pickedSlot, setPickedSlot, tz, onBack, onNext, canNext,
}: {
  today: Date; viewMonth: Date; setViewMonth: (d: Date) => void;
  pickedDate: Date | null; setPickedDate: (d: Date) => void;
  pickedSlot: number | null; setPickedSlot: (n: number | null) => void;
  tz: string; onBack: () => void; onNext: () => void; canNext: boolean;
}) {
  const days = useMemo(() => monthGrid(viewMonth), [viewMonth]);
  const monthLabel = `${viewMonth.toLocaleString("en", { month: "long" })} ${viewMonth.getFullYear()}`;
  const canGoBack = (() => {
    const prev = new Date(viewMonth); prev.setMonth(prev.getMonth() - 1);
    return (prev.getMonth() >= today.getMonth() && prev.getFullYear() >= today.getFullYear()) || prev.getFullYear() > today.getFullYear();
  })();
  const slots = pickedDate ? slotsFor(pickedDate) : [];

  return (
    <div className="book-card">
      <div className="book-card__head">
        <span className="ix">03 / 04</span>
        <h3>Pick a time.</h3>
        <p>Times shown in <span className="lime">{tz.replace("_", " ")}</span>. Slots are 45 minutes. We hold a 15-minute buffer after every call so the next one starts on time.</p>
      </div>

      <div className="book-sched">
        <div className="book-cal">
          <div className="book-cal__head">
            <button type="button" className="nav" onClick={() => { const p = new Date(viewMonth); p.setMonth(p.getMonth() - 1); setViewMonth(p); }} disabled={!canGoBack} aria-label="Previous month">‹</button>
            <span className="mo">{monthLabel}</span>
            <button type="button" className="nav" onClick={() => { const n = new Date(viewMonth); n.setMonth(n.getMonth() + 1); setViewMonth(n); }} aria-label="Next month">›</button>
          </div>
          <div className="book-cal__dow">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <span key={d}>{d}</span>)}
          </div>
          <div className="book-cal__grid">
            {days.map((d, i) => {
              const inMonth = d.getMonth() === viewMonth.getMonth();
              const avail = isAvailable(d, today);
              const isSel = pickedDate && isSameDay(d, pickedDate);
              const isToday = isSameDay(d, new Date());
              const cls = ["cal-cell", inMonth ? "" : "out", avail ? "avail" : "unavail", isSel ? "sel" : "", isToday ? "today" : ""].filter(Boolean).join(" ");
              return (
                <button key={i} type="button" className={cls} disabled={!avail || !inMonth} onClick={() => { setPickedDate(d); setPickedSlot(null); }}>
                  <span className="num">{d.getDate()}</span>
                  <span className="ind" aria-hidden="true" />
                </button>
              );
            })}
          </div>
          <div className="book-cal__legend">
            <span><i className="lg-dot avail" /> Available</span>
            <span><i className="lg-dot sel" /> Selected</span>
            <span><i className="lg-dot unavail" /> Full</span>
          </div>
        </div>

        <div className="book-slots">
          <div className="book-slots__head">
            <span className="ix">Time</span>
            <span className="day">{pickedDate ? `${fullDow(pickedDate)} · ${shortMonth(pickedDate)} ${pickedDate.getDate()}` : "Select a date"}</span>
          </div>
          {pickedDate ? (
            <ul className="book-slots__list">
              {slots.map((s, i) => (
                <li key={i}>
                  <button type="button" className={`book-slot ${s.taken ? "is-taken" : ""} ${pickedSlot === i ? "is-on" : ""}`} disabled={s.taken} onClick={() => setPickedSlot(i)}>
                    <span className="t">{s.label}</span>
                    <span className="tag">{s.taken ? "Booked" : "Open"}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="book-slots__empty">
              <div className="ix">No date selected</div>
              <p>Pick a day from the calendar to see the six daily working-session slots. Mornings tend to go first.</p>
            </div>
          )}
        </div>
      </div>

      <BookActions
        secondary={{ label: "Back", onClick: onBack }}
        primary={{ label: "Continue · Review", onClick: onNext, disabled: !canNext }}
        meta={canNext ? null : "Pick a day and a slot to continue."}
      />
    </div>
  );
}

// ─── Step 4 · Confirm ───────────────────────────────────────────
function BookStep4({
  form, set, partner, pickedDate, pickedSlot, tz, onBack, onSubmit, canSubmit,
}: {
  form: Form; set: <K extends keyof Form>(k: K, v: Form[K]) => void;
  partner: (typeof BOOK.partners)[number]; pickedDate: Date | null; pickedSlot: number | null; tz: string;
  onBack: () => void; onSubmit: () => void; canSubmit: boolean;
}) {
  const slot = pickedDate && pickedSlot != null ? slotsFor(pickedDate)[pickedSlot] : null;
  const practiceLabel = BOOK.practices.find((p) => p.id === form.practice)?.label || "—";
  const stageLabel = BOOK.stages.find((s) => s.id === form.stage)?.label || "—";
  return (
    <div className="book-card">
      <div className="book-card__head">
        <span className="ix">04 / 04</span>
        <h3>Last check.</h3>
        <p>Review what we have. If anything is off, step back and edit. Otherwise, lock it in — you will get the calendar invite within sixty seconds.</p>
      </div>

      <div className="book-review">
        <div className="book-review__col">
          <h5>Who&apos;s joining</h5>
          <dl>
            <div><dt>You</dt><dd>{form.name || "—"}<span>{form.role || "No role specified"}</span></dd></div>
            <div><dt>Company</dt><dd>{form.company || "—"}<span>{form.size} employees</span></dd></div>
            <div><dt>Email</dt><dd>{form.email || "—"}<span>Invite + brief sent here</span></dd></div>
            <div><dt>Partner</dt><dd>{partner.name}<span>{partner.role}</span></dd></div>
          </dl>
        </div>

        <div className="book-review__col">
          <h5>What we&apos;ll discuss</h5>
          <dl>
            <div><dt>Practice</dt><dd>{practiceLabel}<span>Closest fit · we can pivot in-call</span></dd></div>
            <div><dt>Stage</dt><dd>{stageLabel}<span>Where you are today</span></dd></div>
          </dl>
          <div className="book-review__quote">
            <span className="q">“</span>
            <p>{form.challenge}</p>
          </div>
        </div>

        <div className="book-review__col">
          <h5>When &amp; where</h5>
          <dl>
            <div>
              <dt>Date</dt>
              <dd>
                {pickedDate ? `${fullDow(pickedDate)}, ${shortMonth(pickedDate)} ${pickedDate.getDate()}, ${pickedDate.getFullYear()}` : "—"}
                <span>{tz.replace("_", " ")}</span>
              </dd>
            </div>
            <div><dt>Time</dt><dd className="lime-dd">{slot ? slot.label : "—"}<span>45 minutes · video link in invite</span></dd></div>
            <div><dt>From our side</dt><dd>{partner.hq}<span>{partner.role.split(" · ")[1] || "Partner"} since {partner.since}</span></dd></div>
          </dl>
        </div>
      </div>

      <Field label="Anything else? (optional)">
        <textarea rows={2} value={form.notes || ""} onChange={(e) => set("notes", e.target.value)} placeholder="A link to your brief, names of others joining, accessibility needs." />
      </Field>

      <label className="book-checkbox">
        <input type="checkbox" checked={form.nda} onChange={(e) => set("nda", e.target.checked)} />
        <span className="box" aria-hidden="true"><svg viewBox="0 0 12 12" width="12" height="12"><path d="M2 6.5l3 3 5-6" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg></span>
        <span className="lbl">
          Send me a mutual two-page NDA in advance.
          <span className="dim">Optional. We can also work to your paper.</span>
        </span>
      </label>

      <BookActions
        secondary={{ label: "Back", onClick: onBack }}
        primary={{ label: "Schedule call", onClick: onSubmit, disabled: !canSubmit, accent: true }}
        meta={canSubmit ? "60-second confirmation by email. No spam, no follow-up unless you ask." : "Tick the NDA box to lock the session."}
      />
    </div>
  );
}

// ─── Confirmation ───────────────────────────────────────────────
function BookConfirmation({
  confirmedId, form, partner, pickedDate, pickedSlot, tz, onHome,
}: {
  confirmedId: string | null; form: Form; partner: (typeof BOOK.partners)[number];
  pickedDate: Date | null; pickedSlot: number | null; tz: string; onHome: () => void;
}) {
  const slot = pickedDate && pickedSlot != null ? slotsFor(pickedDate)[pickedSlot] : null;
  return (
    <div className="book-card book-card--confirm">
      <div className="book-confirm__head">
        <div className="seal" aria-hidden="true">
          <svg viewBox="0 0 80 80" width="80" height="80">
            <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="40" cy="40" r="28" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 4" />
            <path d="M26 42l9 9 19-22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="ix">Session locked · {confirmedId}</span>
        <h3>You&apos;re on the calendar.</h3>
        <p>An invite, a written brief and (if you asked for it) the mutual NDA are on their way to <strong>{form.email}</strong>. {partner.name.split(" ")[0]} will read your context before the call. Nothing else from us until then.</p>
      </div>

      <div className="book-confirm__grid">
        <div>
          <div className="k">When</div>
          <div className="v">
            {pickedDate ? `${shortDow(pickedDate)}, ${shortMonth(pickedDate)} ${pickedDate.getDate()}` : "—"}
            <br /><span className="lime">{slot ? slot.label : "—"}</span>
          </div>
          <div className="sub">{tz.replace("_", " ")}</div>
        </div>
        <div>
          <div className="k">Who</div>
          <div className="v">{partner.name}</div>
          <div className="sub">{partner.role} · {partner.hq}</div>
        </div>
        <div>
          <div className="k">Format</div>
          <div className="v">Working session · 45m</div>
          <div className="sub">Video · link in the invite</div>
        </div>
        <div>
          <div className="k">Brief</div>
          <div className="v">Sent within 24h</div>
          <div className="sub">PDF · written by partner</div>
        </div>
      </div>

      <div className="book-confirm__actions">
        <a className="btn primary" href="#" onClick={(e) => e.preventDefault()}><Arr />Add to calendar (.ics)</a>
        <a className="btn ghost" href="#" onClick={(e) => { e.preventDefault(); onHome(); }}><Arr />Back to home</a>
      </div>

      <p className="book-confirm__foot">
        Need to move the call? Reply to the invite or email <a href="mailto:partners@nortongauss.com">partners@nortongauss.com</a> — we keep buffer slots open every week.
      </p>
    </div>
  );
}

// ─── Form primitives ────────────────────────────────────────────
function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: ReactNode }) {
  return (
    <label className="book-field">
      <span className="book-field__label">
        {label}{required && <em>*</em>}
        {hint && <span className="hint">{hint}</span>}
      </span>
      <span className="book-field__ctrl">{children}</span>
    </label>
  );
}

type Action = { label: string; onClick: () => void; disabled?: boolean; accent?: boolean };
function BookActions({ primary, secondary, meta }: { primary: Action; secondary?: Action; meta?: string | null }) {
  return (
    <div className="book-actions">
      <div className="book-actions__left">
        {secondary && (
          <button type="button" className="btn ghost" onClick={secondary.onClick}>
            <span className="arr-wrap" style={{ transform: "rotate(180deg)" }}><Arr /></span>
            {secondary.label}
          </button>
        )}
        {meta && <span className="book-actions__meta">{meta}</span>}
      </div>
      <div className="book-actions__right">
        <button type="button" className={`btn primary ${primary.accent ? "is-accent" : ""}`} onClick={primary.onClick} disabled={primary.disabled}>
          <Arr />{primary.label}
        </button>
      </div>
    </div>
  );
}

// ─── Side rail components ───────────────────────────────────────
function BookExpectCard() {
  return (
    <div className="book-rail-card">
      <div className="ix">What 45 minutes looks like</div>
      <ul className="book-timeline">
        {BOOK.expect.map((e, i) => (
          <li key={i}>
            <span className="t">{e.k}</span>
            <span className="d">{e.v}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BookAltContact() {
  return (
    <div className="book-rail-card book-alt">
      <div className="ix">Other ways in</div>
      <ul className="book-alt__list">
        <li><span className="k">Procurement / RFP</span><a href="mailto:rfp@nortongauss.com">rfp@nortongauss.com</a></li>
        <li><span className="k">Press</span><a href="mailto:press@nortongauss.com">press@nortongauss.com</a></li>
        <li><span className="k">Capability deck (PDF)</span><a href="#" onClick={(e) => e.preventDefault()}>Request a copy →</a></li>
      </ul>
    </div>
  );
}

// ─── FAQ ────────────────────────────────────────────────────────
function BookFAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <ol className="book-faq__list">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <li key={i} className={`book-faq__item ${isOpen ? "is-open" : ""}`}>
            <button type="button" className="book-faq__q" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
              <span className="ix">{pad(i + 1)}</span>
              <span className="q">{it.q}</span>
              <span className="ic" aria-hidden="true">
                <svg viewBox="0 0 14 14" width="14" height="14">
                  <line x1="2" y1="7" x2="12" y2="7" stroke="currentColor" strokeWidth="1.6" />
                  <line x1="7" y1="2" x2="7" y2="12" stroke="currentColor" strokeWidth="1.6" className="v" />
                </svg>
              </span>
            </button>
            <div className="book-faq__a"><p>{it.a}</p></div>
          </li>
        );
      })}
    </ol>
  );
}
