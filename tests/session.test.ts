import assert from "node:assert/strict";
import test from "node:test";

const storage = new Map<string, string>();

Object.defineProperty(globalThis, "window", {
  configurable: true,
  value: {
    matchMedia: () => ({
      matches: false,
      addEventListener() {},
    }),
  },
});
Object.defineProperty(globalThis, "history", {
  configurable: true,
  value: { scrollRestoration: "auto" },
});
Object.defineProperty(globalThis, "sessionStorage", {
  configurable: true,
  value: {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value),
    removeItem: (key: string) => storage.delete(key),
  },
});

const { readSession } = await import("../src/ui.ts");

test("an empty session receives a deep clone of the fallback", () => {
  const fallback: { phase: string; answers: Record<string, string> } = { phase: "landing", answers: {} };
  const first = readSession("empty-first", fallback);
  first.phase = "result";
  first.answers.route = "mutated";

  const second = readSession("empty-second", fallback);
  assert.deepEqual(second, { phase: "landing", answers: {} });
  assert.notStrictEqual(second, fallback);
  assert.notStrictEqual(second.answers, fallback.answers);
});

test("a malformed session recovers with a fresh fallback", () => {
  const fallback = { phase: "landing", answers: { lane: "film" } };
  storage.set("broken", "{not-json");
  const recovered = readSession("broken", fallback);

  assert.deepEqual(recovered, fallback);
  assert.notStrictEqual(recovered, fallback);
  assert.notStrictEqual(recovered.answers, fallback.answers);
});
