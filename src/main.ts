import "./styles.css";
import { decide } from "./decide.ts";
import { ACCESS, AUTHORITIES, DEADLINES, DECISIONS, DECK_INTENT, DELIVERIES, LABOUR, LANES, PRIORITIES, PROOF, RECIPIENTS, RECIPIENT_SHAPES, RELATIONSHIPS, REQUIREMENTS, STAGES, TRIGGERS } from "./content.ts";
import type { Answers, AppState, Ride } from "./types.ts";
import { attachReveal, attachTilt, bindTheme, choiceGrid, clearSession, downloadText, escapeHTML, footer, header, initialiseThreadCursor, landAtTop, progress, readSession, writeSession, type Choice, type ProductMeta } from "./ui.ts";

const META: ProductMeta = { name: "You Are Here!", eyebrow: "A next-move compass", storageKey: "you-are-here.theme" };
const SESSION_KEY = "you-are-here.session.v2";
const app = document.querySelector<HTMLDivElement>("#app")!;
if (!app) throw new Error("You Are Here could not find its stage.");
document.body.dataset.product = "you-are-here";
const fallback: AppState = { phase: "landing", step: 0, answers: {} };
const state = readSession<AppState>(SESSION_KEY, fallback);

interface Step { key: keyof Answers; kicker: string; question: string; note: string; choices: readonly Choice[]; rides: readonly Ride[]; when?: (a: Answers) => boolean; }
const STEPS: readonly Step[] = [
  { key: "lane", kicker: "The work", question: "What are you trying to move?", note: "Choose the closest world. Deep craft details change; route, consent, and decision logic still travel.", choices: LANES, rides: ["quick", "expert"] },
  { key: "trigger", kicker: "The live situation", question: "What is actually happening now?", note: "Not your five-year dream. The live fact this next move must answer.", choices: TRIGGERS, rides: ["quick", "expert"] },
  { key: "desiredDecision", kicker: "The next decision", question: "What should somebody do next?", note: "Choose the closest bounded action. The pitch follows this—not the other way round.", choices: DECISIONS, rides: ["quick", "expert"] },
  { key: "recipient", kicker: "The owner", question: "Who can make that decision?", note: "A target audience cannot answer an email. Choose the real decision owner.", choices: RECIPIENTS, rides: ["quick", "expert"] },
  { key: "access", kicker: "The route", question: "How can this honestly reach them?", note: "A name on a dream list is not access. No judgement; just useful physics.", choices: ACCESS, rides: ["quick", "expert"] },
  { key: "stage", kicker: "The proof", question: "How real is the core thing today?", note: "Packaging cannot quietly do the prototype, proposal, script, pilot, or use-test’s job.", choices: STAGES, rides: ["expert"] },
  { key: "requirementStatus", kicker: "The instruction", question: "How current is what they asked for?", note: "Current instructions beat folklore. Old screenshots do not acquire authority with age.", choices: REQUIREMENTS, rides: ["expert"], when: (a) => ["material_requested", "formal_process"].includes(a.trigger ?? "") },
  { key: "delivery", kicker: "The encounter", question: "How will they meet the material?", note: "A room, inbox, portal, and internal table need different objects.", choices: DELIVERIES, rides: ["expert"] },
  { key: "recipientShape", kicker: "The room", question: "How many decisions are hiding here?", note: "Several people can share one decision. Several decisions should not share one blurry ask.", choices: RECIPIENT_SHAPES, rides: ["expert"] },
  { key: "relationship", kicker: "The relationship", question: "How well do they know you?", note: "This changes orientation and ceremony—not whether you deserve to be heard.", choices: RELATIONSHIPS, rides: ["expert"] },
  { key: "proof", kicker: "The evidence", question: "What has met the real world?", note: "Praise, polish, confidence, and traction are not interchangeable facts.", choices: PROOF, rides: ["expert"] },
  { key: "authority", kicker: "The permission", question: "Can this material honestly travel?", note: "Private development can continue while external use gets clarified.", choices: AUTHORITIES, rides: ["expert"] },
  { key: "labour", kicker: "The material cost", question: "What work are you being asked to do?", note: "Chosen practice and undefined speculative labor are not the same thing.", choices: LABOUR, rides: ["expert"] },
  { key: "deckIntent", kicker: "The deck instinct", question: "Does a deck already have a job?", note: "A deck can be useful. It is not the compulsory costume of seriousness.", choices: DECK_INTENT, rides: ["expert"] },
  { key: "deadline", kicker: "The clock", question: "When must the situation change?", note: "Time changes scope. It does not turn an unsupported claim into a fact.", choices: DEADLINES, rides: ["expert"] },
  { key: "priority", kicker: "What matters", question: "What should this next move protect?", note: "Choose the value that should win when the route gets noisy.", choices: PRIORITIES, rides: ["expert"] },
];

function steps(): Step[] { return STEPS.filter((step) => step.rides.includes(state.ride ?? "quick") && (!step.when || step.when(state.answers))); }
function save(): void { writeSession(SESSION_KEY, state); }
function render(top = true): void {
  const active = steps(); if (state.phase === "flow") state.step = Math.max(0, Math.min(state.step, Math.max(0, active.length - 1)));
  const trail = state.phase === "flow" ? `${state.ride === "expert" ? "Expert" : "Quick"} compass · ${state.step + 1} of ${active.length}` : undefined;
  document.title = state.phase === "result" ? `${state.result?.headline ?? "Your next move"} — You Are Here` : "You Are Here! — find the next useful move";
  app.innerHTML = `${header(META, trail)}<main id="main">${page()}</main>${state.phase === "landing" || state.phase === "result" ? footer("You Are Here!") : ""}`;
  bindTheme(META.storageKey); bindEvents(); attachReveal(); attachTilt(); if (top) landAtTop();
}
function page(): string { return state.phase === "flow" ? flowPage() : state.phase === "result" && state.result ? resultPage() : landingPage(); }

function landingPage(): string {
  return `<section class="landing compass-landing">
    <div class="landing-copy"><p class="scope-tag">Film · advertising · startups · education · more</p><p class="kicker">When another deck may not be the answer.</p><h1 data-page-heading tabindex="-1">Find the next move.</h1><p class="landing-lede">Choose what is actually happening. Get one bounded next move, with a finish line. No confidence score. No ecosystem rebuild.</p><div class="landing-proof"><span>One primary move</span><span>No typing</span><span>Nothing leaves the browser</span></div><a class="primary-action" href="#choose-a-compass">Choose your route <span aria-hidden="true">↓</span></a></div>
    <div class="landing-art" data-tilt="1.5" aria-hidden="true"><img src="/assets/hero.webp" alt=""><p class="landing-art__note">The next move should change the situation. Looking busier does not count.</p></div>
  </section>
  <section class="ride-section" id="choose-a-compass"><div class="section-heading"><p class="kicker">Choose how far we go</p><h2>Five live facts—or the full route.</h2><p>The quick compass names the move. Expert mode asks about proof, permission, delivery, labor, current instructions, and what the move must protect.</p></div><div class="ride-grid">
    <button class="ride-card" data-ride="quick" type="button"><span class="ride-number">01</span><small>About 45 seconds · 5 choices</small><strong>Tell me what to do next.</strong><p>Work, live situation, decision, recipient, and access. Enough to stop thrashing.</p><em>Start quick compass ↗</em></button>
    <button class="ride-card ride-card--expert" data-ride="expert" type="button"><span class="ride-number">02</span><small>About 3 minutes · up to 16 choices</small><strong>Map the real route.</strong><p>Consent-led depth for people who want it: evidence, power, permission, time, delivery, and boundaries.</p><em>Take the longer ride ↗</em></button>
  </div></section>`;
}

function flowPage(): string {
  const active = steps(); const step = active[state.step]!; const selected = state.answers[step.key];
  return `<section class="question-page">${progress(`${state.ride === "expert" ? "Expert" : "Quick"} next-move compass`, state.step, active.length)}<div class="question-layout"><div class="question-copy"><button class="question-back" id="flow-back" type="button">← ${state.step ? "Previous question" : "Choose another route"}</button><div class="question-art" aria-hidden="true"><img src="/assets/hero.webp" alt=""></div><p class="scope-tag">You Are Here · ${state.ride === "expert" ? "expert" : "quick"} route</p><p class="kicker">${step.kicker}</p><h1 data-page-heading tabindex="-1">${step.question}</h1><p>${step.note}</p></div><div class="answers-panel"><div class="answers-inner">${choiceGrid(step.choices, "flow-choice", typeof selected === "string" ? selected : undefined)}</div></div></div></section>`;
}

function resultPage(): string {
  const r = state.result!;
  return `<section class="result-page compass-result"><div class="result-hero"><div class="result-art" data-tilt="1.2" aria-hidden="true"><img src="/assets/hero.webp" alt=""></div><p class="scope-tag">${escapeHTML(r.eyebrow)} · ${escapeHTML(r.footing)}</p><h1 data-page-heading tabindex="-1">${escapeHTML(r.headline)}</h1><p>${escapeHTML(r.where)}</p><div class="result-actions"><a class="primary-action" href="#the-move">See the move <span aria-hidden="true">↓</span></a><button class="text-action" id="download-result" type="button">Download this route</button><button class="text-action" id="change-answers" type="button">Change answers</button>${state.ride === "quick" ? '<button class="text-action" id="go-expert" type="button">Map this more deeply</button>' : ""}<button class="text-action" id="start-over" type="button">Start over</button></div></div>
    <section class="move-stage" id="the-move" data-reveal><div class="move-number">01</div><div><p class="kicker">Your next move</p><h2>${escapeHTML(r.move)}</h2><p class="finish-line"><strong>Done when:</strong> ${escapeHTML(r.finishLine)}</p></div></section>
    <section class="move-sequence" data-reveal>${r.doNow.slice(0, 3).map((item, index) => `<article><span>0${index + 1}</span><p>${escapeHTML(item)}</p></article>`).join("")}</section>
    <section class="route-after" data-reveal><article><p class="kicker">Who to approach</p><h3>${escapeHTML(r.approach)}</h3></article><article><p class="kicker">After that</p><h3>${escapeHTML(r.after)}</h3></article></section>
    <section class="result-details"><details open><summary>Why this move</summary><ul>${r.because.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul></details>${r.expertNotes.length ? `<details open><summary>What your expert answers changed</summary><ul>${r.expertNotes.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul></details>` : ""}<details><summary>Park this for now</summary><ul>${r.park.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul></details><details><summary>Assumptions and limits</summary><ul>${r.limitations.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul></details></section>
  </section>`;
}

function advance(): void { const active = steps(); if (state.step < active.length - 1) state.step += 1; else { state.result = decide(state.answers); state.phase = "result"; } save(); render(true); }
function bindEvents(): void {
  document.querySelectorAll<HTMLButtonElement>("[data-ride]").forEach((button) => button.addEventListener("click", () => { state.ride = button.dataset.ride as Ride; state.phase = "flow"; state.step = 0; state.answers = {}; save(); render(true); }));
  document.querySelectorAll<HTMLButtonElement>("[data-flow-choice]").forEach((button) => button.addEventListener("click", () => { const step = steps()[state.step]!; (state.answers as unknown as Record<string, unknown>)[step.key] = button.dataset.flowChoice ?? ""; advance(); }));
  document.querySelector("#flow-back")?.addEventListener("click", () => { if (state.step > 0) state.step -= 1; else state.phase = "landing"; save(); render(true); });
  document.querySelector("#change-answers")?.addEventListener("click", () => { state.phase = "flow"; state.step = Math.max(0, steps().length - 1); save(); render(true); });
  document.querySelector("#go-expert")?.addEventListener("click", () => { state.ride = "expert"; state.phase = "flow"; state.step = 0; state.result = undefined; save(); render(true); });
  document.querySelector("#start-over")?.addEventListener("click", () => { clearSession(SESSION_KEY); Object.assign(state, fallback, { answers: {} }); render(true); });
  document.querySelector("#download-result")?.addEventListener("click", () => { const r = state.result!; downloadText("you-are-here-next-move.md", `# ${r.headline}\n\n${r.where}\n\n## Your next move\n${r.move}\n\n**Done when:** ${r.finishLine}\n\n## Do now\n${r.doNow.map((item) => `- ${item}`).join("\n")}\n\n## Who to approach\n${r.approach}\n\n## After that\n${r.after}\n\n## Park\n${r.park.map((item) => `- ${item}`).join("\n")}\n\nGenerated locally by You Are Here! from pitch.dog.\n`); });
}
history.scrollRestoration = "manual"; initialiseThreadCursor(); render(true);
