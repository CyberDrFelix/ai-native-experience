# Working agreement

## Product boundaries

This repository is a reusable commercial executive-education product. Keep core logic and shared content generic. Employer-, event-, or audience-specific changes belong in edition configuration under `src/content/`. Do not add proprietary data, confidential processes, employer trademarks, or unlicensed assets.

## Experience rules

- This is a cinematic keynote, not a conventional website or slide deck.
- Content stays separate from state/navigation logic.
- Every narrative beat must be deterministic, reversible, and restartable.
- Core presentation mode must work offline with no backend or API key.
- Motion must honor `prefers-reduced-motion`; meaning must never depend on color or animation alone.
- Preserve legibility at 1920×1080 and common laptop viewports.
- Favor reliability, large typography, whitespace, contrast, and restrained motion.
- Treat every beat as one complete thought inside the shared presentation-safe zone.
- Reserve the bottom control rail for HUD/navigation; meaningful audience content must never enter or overlap it.
- If a composition does not fit comfortably, simplify it or add beats. Do not solve overflow by indiscriminately shrinking everything.

## Engineering rules

- Use TypeScript in strict mode and functional React components.
- Add content through typed edition data; do not fork scene logic for an event.
- Keep optional integrations behind adapters with deterministic local fallbacks.
- Run `npm run check` before handoff.
- Do not commit or push unless the user explicitly approves it.

## Scope status

Sprints 1–6 implement the complete seven-scene experience. Final polish remains separate.
