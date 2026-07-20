# Contributing

Useful contributions make You Are Here more grounded, bounded, accessible, or complete across real pitch routes.

## Before coding

Run a real situation through the tool. Name the lane, stage, recipient, route fact, and wrong or missing next move. Open an issue before adding a lane or changing a high-level route.

## Local setup

```bash
git clone https://github.com/bomkino/pitchdog-you-are-here.git
cd pitchdog-you-are-here
npm install
npm run verify
```

Use Node.js 22.18 or newer.

## Product rules

- Return one primary next move before optional detail.
- Preserve the five-choice quick route; expert depth requires explicit consent.
- Use structured choices. Do not add prose boxes the engine cannot interpret.
- Keep visible choices in `src/content.ts` and deterministic routing in `src/decide.ts`.
- Do not force a deck when the live blocker is access, clarity, rights, readiness, evidence, or a current requirement.
- Do not introduce crisis, danger, therapy, personality, or diagnostic language.
- Add a focused test for every changed branch.
- Keep state local. No runtime AI, analytics, accounts, remote fonts, or email gate.
- Preserve keyboard, touch, screen-reader, system-theme, reduced-motion, and question-to-top behavior.
- No noise overlays or decorative motion without a routing reason.

## Pull requests

Include the user problem, route, decision taken, affected branches, screenshots for visible work, tests, `npm run verify` output, and privacy/accessibility/licensing effects.

Contributions use AGPL-3.0-or-later for software and documentation; CC BY-SA 4.0 for original visual assets.
