export type Ride = "quick" | "expert";
export type Phase = "landing" | "flow" | "result";
export interface Answers {
  lane?: string; trigger?: string; desiredDecision?: string; recipient?: string; access?: string; stage?: string;
  requirementStatus?: string; delivery?: string; recipientShape?: string; relationship?: string; proof?: string;
  authority?: string; labour?: string; deckIntent?: string; deadline?: string; priority?: string;
}
export interface CompassResult {
  routeId: string; eyebrow: string; headline: string; where: string; move: string; finishLine: string;
  doNow: string[]; park: string[]; after: string; approach: string; because: string[]; expertNotes: string[];
  footing: string; limitations: string[];
}
export interface AppState { phase: Phase; ride?: Ride; step: number; answers: Answers; result?: CompassResult; }
