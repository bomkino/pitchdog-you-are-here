import { assessYouAreHere, type YouAreHereInput } from "../engine/you-are-here/index.ts";
import type { Answers, CompassResult } from "./types.ts";

function notes(answers: Answers): string[] {
  const result: string[] = [];
  if (answers.relationship === "cold") result.push("Give this reader just enough orientation to understand relevance. Do not compensate for a cold route with a giant attachment bundle.");
  if (answers.recipientShape === "several_different_decisions") result.push("Split the routes. Reuse facts, but give every decision its own ask, proof, and disclosure boundary.");
  if (answers.delivery === "live") result.push("Rehearse the decision path. The room has you; the pages do not need to become a transcript.");
  if (answers.delivery === "portal") result.push("Current portal fields, limits, eligibility, and file rules outrank generic best practice.");
  if (answers.proof === "none") result.push("Choose one small test that can produce an observation. Do not turn confidence or polish into fake evidence.");
  if (answers.deadline === "today") result.push("Contain the work. Reuse what is true. Cut anything that does not alter the live decision.");
  if (answers.priority === "relationship") result.push("Prefer one clear, well-timed communication over volume, urgency theater, or an unasked attachment.");
  if (answers.priority === "boundary") result.push("Momentum does not outrank consent, authority, credit, use conditions, or the material cost of unpaid work.");
  return result;
}

function base(routeId: string, eyebrow: string, headline: string, where: string, move: string, finishLine: string, extra: Partial<CompassResult> = {}): CompassResult {
  return {
    routeId, eyebrow, headline, where, move, finishLine,
    doNow: extra.doNow ?? [move], park: extra.park ?? ["Park work that does not change this decision."],
    after: extra.after ?? "When the finish line is real, look again at the next live fact.",
    approach: extra.approach ?? "The person who owns the next decision—or nobody, if this is a private learning step.",
    because: extra.because ?? ["The next useful move should change the real situation, not merely make the project look busier."],
    expertNotes: extra.expertNotes ?? [], footing: extra.footing ?? "Best route from the facts you chose",
    limitations: extra.limitations ?? ["This guide does not judge quality, legality, rights, finance, or likelihood of success.", "It uses only the options selected in this browser session."],
  };
}

function filmInput(a: Answers): YouAreHereInput {
  const isFeature = a.lane === "scripted_feature";
  const featureStage = isFeature ? ({ idea: "idea", rough: "partial", complete: "first_draft", tested: "revised", live: "packaged" } as const)[a.stage ?? "complete"] : undefined;
  const episodicStage = !isFeature ? ({ idea: "premise", rough: "partial_pilot", complete: "complete_pilot", tested: "tested_pilot", live: "packaged" } as const)[a.stage ?? "complete"] : undefined;
  const access = a.access as YouAreHereInput["accessRoute"];
  const requirementStatus = a.requirementStatus as YouAreHereInput["requirementStatus"];
  const trigger = a.trigger as YouAreHereInput["trigger"];
  const authority = a.authority as YouAreHereInput["authority"];
  const speculativeWork = a.labour as YouAreHereInput["speculativeWork"];
  const delivery = a.delivery as YouAreHereInput["delivery"];
  const deckIntent = a.deckIntent as YouAreHereInput["deckIntent"];
  const recipientCount = a.recipientShape as YouAreHereInput["recipientCount"];
  return {
    lane: isFeature ? "scripted_feature" : "scripted_episodic", trigger, desiredDecision: a.desiredDecision,
    recipient: a.recipient ? { kind: a.recipient, named: a.recipient !== "not sure yet" } : undefined,
    recipientCount, accessRoute: access, delivery, requirementStatus, authority, featureStage, episodicStage,
    outsideRead: a.proof === "none" ? "none" : a.proof === "observations" ? "revised_once" : "revised_more",
    seriesShape: isFeature ? undefined : a.stage === "idea" ? "forming" : "returning",
    distinctEpisodeEvidence: a.proof === "traction" || a.proof === "qualified",
    deckIntent, speculativeWork,
  };
}

function fromFilm(a: Answers): CompassResult {
  const raw = assessYouAreHere(filmInput(a));
  return base(raw.routeId, raw.primaryAction.family.replaceAll("_", " "), raw.primaryAction.label, raw.youAreHere, raw.nextMove, raw.primaryAction.finishLine, {
    doNow: [raw.nextMove, raw.approach, raw.afterThat], park: raw.parkThis, after: raw.afterThat, approach: raw.approach,
    because: raw.dependsOn.length ? raw.dependsOn : ["This route follows the current project stage, recipient, decision, and access facts."],
    expertNotes: notes(a), footing: raw.footing.replaceAll("_", " "), limitations: raw.limitations,
  });
}

export function decide(a: Answers): CompassResult {
  const expertNotes = notes(a);
  if (["scripted_feature", "scripted_episodic"].includes(a.lane ?? "")) return fromFilm(a);

  if (a.authority === "shared_unclear" || a.authority === "third_party_unclear") return base("authority-first", "protect the work", "Clarify authority before it travels.", "The work may be moving, but the intended external use is not clearly yours or authorized yet.", "Name who controls the material and ask one precise question about this intended use.", "The authorized next use is known—or circulation stays paused.", { doNow: ["Keep working privately inside the real permission boundary.", "Ask the rights holder or collaborator about this exact next use.", "Record the answer without upgrading interest into permission."], park: ["Park public circulation.", "Park names, rights, or partnership claims that are not supportable."], expertNotes });

  if (a.labour === "substantial_terms_unclear") return base("scope-the-work", "labor before prestige", "Clarify the work before donating it.", "Substantial custom work is being requested without a clear process, use, competition, ownership, or compensation basis.", "Ask for scope, stage, deliverable, deadline, use, competition, ownership, compensation, and what happens to the work.", "You can accept, reduce, negotiate, or decline from material facts.", { doNow: ["Write the unanswered terms as a short list.", "Send one scoped clarification to the requester.", "Do not start the substantial custom work until the process is clear enough to choose."], park: ["Park the unpaid treatment, pitch, prototype, or take.", "Park urgency manufactured from prestige."], expertNotes });

  if (a.requirementStatus === "conflicted") return base("resolve-request", "the instruction", "Resolve the conflicting instructions.", "Two current-looking instructions describe different work. Averaging them creates a third request nobody made.", "Ask the process owner which dated instruction controls this exact stage.", "One instruction is confirmed—or two conditional paths remain explicit.", { doNow: ["Keep both instructions visible.", "Ask which source and date controls.", "Build only the confirmed path."], park: ["Park the hybrid pack."], expertNotes });
  if (a.requirementStatus === "remembered" || a.requirementStatus === "stale") return base("verify-request", "the instruction", "Check what they actually asked for.", "A remembered or old request may be right. It is not strong enough to order expensive work.", "Check the current message, official page, portal, or process owner.", "Item, status, limit, source, and date are current.", { doNow: ["Find the current source.", "Record only the item, status, limits, source, and date.", "Let the current instruction control the artifact."], park: ["Park rebuilding from memory."], expertNotes });

  if (a.trigger === "sent_waiting") return base("wait", "the honest stage", "Wait—with one follow-up point.", "The material is already in the room. More packaging will not make waiting less like waiting.", "Set one reasonable follow-up date or condition. Do no replacement work before it arrives.", "The follow-up point is recorded; anxiety work is not on the schedule.", { doNow: ["Write the follow-up date.", "Save the sent version and route.", "Return to other work until the date or a reply changes the facts."], park: ["Park the new deck.", "Park the apology disguised as an update."], expertNotes, footing: "Specific to material already sent" });
  if (a.trigger === "sent_followup_due") return base("follow-up", "the live communication", "Send one bounded follow-up.", "The follow-up point has arrived. This is a communication task, not a new-document task.", "Send one brief message tied to the prior exchange through the same route.", "One concise follow-up is sent; no unasked attachment is resent.", { doNow: ["Name the prior exchange.", "Ask one clear status or next-step question.", "Close without apology theater or pressure."], park: ["Park the replacement package."], expertNotes, footing: "Specific to a due follow-up" });
  if (a.trigger === "rejected_passed") return base("debrief", "facts before diagnosis", "Debrief the pass without inventing a cause.", "A route closed. Unless a reason was given, the cause remains unknown; one pass cannot diagnose the whole project or person.", "Record recipient, decision, material, timing, and any actual reason. Choose the next test only from known evidence.", "Known facts and imagined explanations are separated.", { doNow: ["Write what happened in one factual paragraph.", "Keep the stated reason verbatim if one exists.", "Choose one bounded next test—or close the route."], park: ["Park the total rebrand.", "Park the imaginary post-mortem."], expertNotes, footing: "Specific to a closed route" });
  if (a.trigger === "stuck_polishing") return base("learning-loop", "evidence over sheen", "Replace polishing with one learning loop.", "The work is being polished without a new decision or new evidence. More sheen is now hiding the question.", "Choose one reader question, timed rehearsal, small user test, or route check—and name the stop point first.", "One observation exists and only the evidenced problem gets revised.", { doNow: ["Choose one thing you need to learn.", "Choose the smallest test that can reveal it.", "Stop when the named observation exists."], park: ["Park the ecosystem-wide redesign."], expertNotes });

  if (a.access === "none" || a.access === "unknown") return base("access-first", "route before attachment", "Find a real door before building the suitcase.", "The target does not yet have a verified route for this material. That is an access fact—not a quality verdict.", "Verify an accepted route, use a legitimate intermediary, or choose another recipient category that can own the decision.", "One legitimate route is named—or the target is parked.", { doNow: ["Check the recipient’s stated route and current policy.", "Ask a real intermediary only if that relationship exists.", "Choose another decision owner when the door is closed."], park: ["Park private-email hunting.", "Park the target-branded deck."], expertNotes });

  if (a.recipientShape === "several_different_decisions") return base("split-routes", "shared facts, separate asks", "Split the routes.", "Several people are being asked to make different decisions. One universal pitch would hide those differences inside a handsome compromise.", "Create one route per decision and recipient. Share verified facts; split the ask, proof, delivery, and disclosure.", "The first decision owner and their exact ask are chosen.", { doNow: ["List each recipient beside the decision they can actually own.", "Choose which decision happens first.", "Build only that route; keep a shared factual spine."], park: ["Park the omnibus deck."], expertNotes });

  if (a.trigger === "meeting") return base("rehearse", "the room is real", "Stop adding. Rehearse the decision.", "A real meeting exists. The work now is to make the decision path speakable, memorable, and honest.", "Freeze the structure and rehearse the opening, three retained ideas, explicit ask, likely questions, and close against the real time.", "The run fits; the ask is explicit; the material can fail without sinking the conversation.", { doNow: ["Say the opening without slides.", "Time the middle and remove one optional detour.", "Practice the ask and the close in plain English."], park: ["Park optional pages.", "Park paragraphs you plan to read aloud."], expertNotes, footing: "Specific to a booked meeting" });

  if ((a.trigger === "material_requested" || a.trigger === "formal_process") && a.requirementStatus === "current") return base("exact-request", "the current brief wins", "Make exactly what they asked for.", "A current instruction controls this route. It is stronger than folklore, famous examples, and our preferences.", "Make the mandatory item in the stated form and limits. Keep prohibited and unaccepted extras out.", "Every mandatory item is present; no prohibited extra has slipped in.", { doNow: ["Turn every current requirement into a checklist.", "Build the smallest compliant version.", "Run a final compliance pass before style polish."], park: ["Park useful extras until the required pack is secure."], expertNotes, footing: "Current instruction" });

  if (a.stage === "idea" || a.stage === "rough") return base("smallest-proof", "make it testable", "Make the smallest proof somebody can react to.", "The central proposition is still becoming concrete. A maximal pitch would explain around the thing instead of letting it exist.", "Choose one bounded artifact that exposes the key promise to useful outside eyes.", "A complete, reviewable unit exists and one specific question can be asked about it.", { doNow: ["Name the assumption the pitch currently asks people to imagine.", "Make one artifact that makes that assumption inspectable.", "Give it to one relevant person with one bounded question."], park: ["Park the full brand system.", "Park scale claims without use."], expertNotes });

  if (a.trigger === "offered_introduction") return base("use-introduction", "the route is alive", "Use the introduction before building a bundle.", "A real introduction exists, but the recipient has not necessarily requested a suitcase of material.", "Ask the introducer what they want to carry and how this person prefers to meet new work.", "The introducer has only the clean, truthful material they want to send.", { doNow: ["Ask what the introducer wants from you.", "Prepare only that item.", "Make the next decision clear without manufacturing attachment."], park: ["Park the all-assets bundle."], expertNotes });

  return base("smallest-useful-packet", "one move, not an ecosystem", "Make the smallest truthful packet.", `A real recipient and decision can now exist: ${a.recipient ?? "the next decision owner"} needs to ${a.desiredDecision ?? "choose whether to continue"}.`, "Prepare only the material that helps this person make this decision through the route they actually accept.", "The recipient can understand the proposition and make the next bounded decision.", { doNow: ["Write the decision sentence: who needs to do what next?", "Choose the minimum proof that helps that decision.", "Make, rehearse, or send only that version."], park: ["Park the universal deck.", "Park anything whose only job is to look serious."], expertNotes });
}
