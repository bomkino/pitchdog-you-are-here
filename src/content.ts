import type { Choice } from "./ui.ts";

export const LANES = [
  { value: "scripted_feature", label: "A scripted feature", detail: "A film project moving through writing, reads, packaging, and people." },
  { value: "scripted_episodic", label: "A scripted series", detail: "A pilot and a form that must live beyond it." },
  { value: "advertising", label: "An advertising pitch", detail: "A brief, client, agency, brand, or production decision." },
  { value: "startup", label: "A startup or venture", detail: "A customer, partner, investor, or internal decision." },
  { value: "education", label: "Education or civic work", detail: "A program, institution, community, or public decision." },
  { value: "other", label: "Something else with a pitch", detail: "We’ll stay with route logic and avoid borrowed industry certainty." },
] as const satisfies readonly Choice[];

export const TRIGGERS = [
  { value: "exploring", label: "I’m figuring out where to begin", detail: "No active route yet." },
  { value: "starting_outreach", label: "I’m about to approach people", detail: "The recipient and route need to become concrete." },
  { value: "offered_introduction", label: "Someone offered an introduction", detail: "A live route exists; use it carefully." },
  { value: "material_requested", label: "They asked me to send something", detail: "The current request may control the next move." },
  { value: "meeting", label: "A meeting is booked", detail: "Rehearsal may now beat expansion." },
  { value: "formal_process", label: "I’m entering a formal process", detail: "Current rules, eligibility, and limits matter." },
  { value: "sent_waiting", label: "I sent it and I’m waiting", detail: "Waiting is a real stage. Anxiety work is optional." },
  { value: "sent_followup_due", label: "A follow-up is genuinely due", detail: "Communication task—not a whole new deck." },
  { value: "rejected_passed", label: "They passed or said no", detail: "Debrief facts without inventing a diagnosis." },
  { value: "stuck_polishing", label: "I keep polishing instead of moving", detail: "Replace sheen with one learning loop." },
] as const satisfies readonly Choice[];

export const DECISIONS = [
  { value: "read and respond", label: "Read it and respond", detail: "Earn one serious read." },
  { value: "take a meeting", label: "Take a meeting", detail: "Create enough interest for a useful conversation." },
  { value: "approve the direction", label: "Approve a direction", detail: "Make a bounded choice visible." },
  { value: "join or partner", label: "Join or partner", detail: "A producing, creative, commercial, or delivery relationship." },
  { value: "fund or commission", label: "Fund or commission it", detail: "Requires evidence the decision actually needs." },
  { value: "buy or choose it", label: "Buy, shortlist, or choose it", detail: "A client, customer, buyer, or selection decision." },
  { value: "align the team", label: "Align the team", detail: "An internal working decision." },
  { value: "answer their request", label: "Answer their exact request", detail: "The requested item outranks generic advice." },
  { value: "choose whether to continue", label: "I’m not sure—help me choose", detail: "Find the smallest move that creates useful evidence." },
] as const satisfies readonly Choice[];

export const RECIPIENTS = [
  { value: "producer or development executive", label: "Producer or development executive", detail: "Film and television development." },
  { value: "client or brand team", label: "Client or brand team", detail: "An advertising or commissioned-work decision." },
  { value: "agency or creative partner", label: "Agency or creative partner", detail: "A collaborative pitch or production route." },
  { value: "investor or funder", label: "Investor or funder", detail: "Capital, grant, or institutional support." },
  { value: "customer or buyer", label: "Customer or buyer", detail: "A commercial adoption decision." },
  { value: "programme or institution", label: "Program or institution", detail: "A formal selection, education, civic, or public route." },
  { value: "collaborator or talent", label: "Collaborator or talent", detail: "A creative, technical, or delivery partnership." },
  { value: "my own team", label: "My own team", detail: "An internal decision with uncertainty allowed." },
  { value: "not sure yet", label: "I’m not sure yet", detail: "The next move may be choosing the decision owner." },
] as const satisfies readonly Choice[];

export const ACCESS = [
  { value: "direct_request", label: "They asked me directly", detail: "A legitimate open route." },
  { value: "existing_relationship", label: "An existing relationship", detail: "The relationship already carries contact." },
  { value: "offered_introduction", label: "A real introduction", detail: "Someone has offered to connect you." },
  { value: "representative_producer", label: "Through an intermediary", detail: "A rep, producer, partner, or colleague owns the route." },
  { value: "open_process", label: "An open call or process", detail: "Current rules and eligibility apply." },
  { value: "accepted_cold", label: "They publicly accept approaches", detail: "Use the stated channel and limits." },
  { value: "none", label: "No route yet", detail: "A target name is not the same as access." },
  { value: "unknown", label: "I haven’t checked", detail: "Verify before building around an imaginary door." },
] as const satisfies readonly Choice[];

export const STAGES = [
  { value: "idea", label: "An idea", detail: "The central proposition is still being made concrete." },
  { value: "rough", label: "A rough working version", detail: "Something exists, but it has not met useful outside eyes." },
  { value: "complete", label: "A complete version", detail: "The core artifact, prototype, script, or proposal exists." },
  { value: "tested", label: "Tested and revised", detail: "Real observations or use have shaped the current version." },
  { value: "live", label: "Already in the world", detail: "The next move follows actual response, not imagined response." },
] as const satisfies readonly Choice[];

export const REQUIREMENTS = [
  { value: "none", label: "Nothing exact was requested", detail: "Build for the decision, not a document reflex." },
  { value: "current", label: "A current written request", detail: "The live fields, status, and limits control." },
  { value: "remembered", label: "I remember what they said", detail: "Memory is not strong enough for expensive work." },
  { value: "stale", label: "I have an old instruction", detail: "Check the current stage and date." },
  { value: "conflicted", label: "Two instructions disagree", detail: "Do not average them into a third request." },
] as const satisfies readonly Choice[];

export const DELIVERIES = [
  { value: "read_alone", label: "They read it alone", detail: "The material carries its own context." },
  { value: "before_meeting", label: "Before a meeting", detail: "It opens the room; it does not need to finish everything." },
  { value: "live", label: "Presented live", detail: "Your voice is part of the experience." },
  { value: "after_conversation", label: "After a conversation", detail: "A useful leave-behind for what already happened." },
  { value: "portal", label: "Through a portal or formal process", detail: "Compliance and limits matter." },
  { value: "internal", label: "Inside the team", detail: "Working truth can outrank sales polish." },
] as const satisfies readonly Choice[];

export const RECIPIENT_SHAPES = [
  { value: "one", label: "One decision owner", detail: "A clean route." },
  { value: "several_same_decision", label: "Several people, one decision", detail: "One version may still hold." },
  { value: "several_different_decisions", label: "Several different decisions", detail: "Share facts, split routes." },
] as const satisfies readonly Choice[];

export const RELATIONSHIPS = [
  { value: "cold", label: "They don’t know me", detail: "Orientation and relevance matter." },
  { value: "warm", label: "A warm route", detail: "The route opens a door; it does not answer the decision." },
  { value: "known", label: "We know each other", detail: "Less ceremony. More useful specificity." },
  { value: "active", label: "We are already talking", detail: "Answer the live fact, not the imagined funnel." },
] as const satisfies readonly Choice[];

export const PROOF = [
  { value: "none", label: "No outside evidence yet", detail: "Choose one small test before a large pitch." },
  { value: "observations", label: "Useful outside observations", detail: "Specific behaviors or responses, not just praise." },
  { value: "traction", label: "Real use, traction, or demand", detail: "Current, relevant evidence exists." },
  { value: "qualified", label: "Qualified domain evidence", detail: "The claims have an appropriate current basis." },
] as const satisfies readonly Choice[];

export const AUTHORITIES = [
  { value: "owns_controls", label: "I control the material", detail: "The intended next use is yours to make." },
  { value: "authorised", label: "I’m authorized for this use", detail: "Permission exists for the next step." },
  { value: "shared_unclear", label: "It’s shared and unclear", detail: "Private work can continue; external use needs clarity." },
  { value: "third_party_unclear", label: "Someone else may control it", detail: "Do not let visual polish impersonate authority." },
] as const satisfies readonly Choice[];

export const LABOUR = [
  { value: "none", label: "No unusual free work", detail: "Ordinary self-directed or paid work." },
  { value: "small", label: "A small bounded sample", detail: "The use, deadline, and stage are clear enough." },
  { value: "substantial_terms_clear", label: "Substantial work; terms are clear", detail: "You can decide from material facts." },
  { value: "substantial_terms_unclear", label: "Substantial work; terms are unclear", detail: "Clarify scope, use, competition, pay, and ownership first." },
] as const satisfies readonly Choice[];

export const DECK_INTENT = [
  { value: "none", label: "Nobody needs a deck yet", detail: "Good. The next move may be smaller." },
  { value: "considering", label: "I’m considering one", detail: "The deck still needs to earn its job." },
  { value: "requested", label: "A deck was requested", detail: "Current request plus real reader and decision." },
  { value: "exists", label: "A deck already exists", detail: "Reuse and rehearse before expanding." },
] as const satisfies readonly Choice[];

export const DEADLINES = [
  { value: "today", label: "Today or tomorrow", detail: "Do the smallest move that changes the real situation." },
  { value: "week", label: "Within a week", detail: "Reuse first; contain the work." },
  { value: "month", label: "Within a month", detail: "Enough time for one proper learning loop." },
  { value: "none", label: "No hard date", detail: "Use a stop condition so polish does not become weather." },
] as const satisfies readonly Choice[];

export const PRIORITIES = [
  { value: "speed", label: "Move the live route", detail: "Do the smallest action that changes the situation." },
  { value: "learning", label: "Learn one real thing", detail: "Choose a bounded test with a finish line." },
  { value: "relationship", label: "Protect the relationship", detail: "Clarity and timing before volume." },
  { value: "boundary", label: "Protect a boundary", detail: "Do not trade consent, credit, rights, or unpaid labor for momentum." },
] as const satisfies readonly Choice[];
