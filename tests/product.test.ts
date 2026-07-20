import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { decide } from "../src/decide.ts";
import * as content from "../src/content.ts";
test("expert compass is deep but entirely structured", () => { const groups = Object.values(content).filter(Array.isArray) as unknown as Array<ReadonlyArray<{ value: string }>>; assert.ok(groups.length >= 15); assert.ok(groups.flat().length >= 80); });
test("waiting, closed access, and unclear labour produce different moves", () => { assert.equal(decide({ lane: "startup", trigger: "sent_waiting", desiredDecision: "take a meeting", recipient: "investor", access: "existing_relationship" }).routeId, "wait"); assert.equal(decide({ lane: "advertising", trigger: "starting_outreach", desiredDecision: "buy", recipient: "client", access: "none" }).routeId, "access-first"); assert.equal(decide({ lane: "other", trigger: "material_requested", labour: "substantial_terms_unclear" }).routeId, "scope-the-work"); });
test("visible product removes the disowned safety and shared-device journey", () => { const visible = ["src/main.ts", "src/content.ts", "src/styles.css", "src/base.css", "index.html"].map((path) => readFileSync(path, "utf8")).join("\n"); assert.doesNotMatch(visible, /Are you in danger|immediate danger|shared device|grain-canvas|scanline/i); assert.doesNotMatch(readFileSync("src/main.ts", "utf8"), /textarea|Keep this answer/i); assert.match(readFileSync("src/ui.ts", "utf8"), /history\.scrollRestoration = "manual"/); });
