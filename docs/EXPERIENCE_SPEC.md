# Experience specification

## Product behavior

The application is a static React/TypeScript/Vite experience. Presentation is a sequence of scenes, each composed of reversible narrative beats. Keyboard input changes a deterministic `{scene, beat}` position; it does not depend on animation completion, timers, a network, or external state.

Scene 01 uses `public/video/digital-felix-india-greeting.mp4` through the existing local-media component. Playback requires an explicit presenter click, avoiding unsafe autoplay assumptions. Native controls remain hidden; the component exposes a replay state after completion, pauses on handoff/navigation, preserves 16:9 aspect ratio, and renders the established static fallback if the media fails.

## Component architecture

```text
App / ExperienceController
├── EditionProvider (typed content + customization)
├── SceneStage
│   ├── BootScene
│   │   └── DigitalTwinVideo (media adapter + fallback)
│   ├── GapScene
│   ├── EmployeeScene
│   ├── OnboardingScene
│   │   └── PresenterDecision
│   └── future scene renderers
├── PresenterHUD
├── TransportControls
└── optional adapters
    ├── LiveAIAdapter → deterministic local simulation
    └── AudienceVotingAdapter → presenter-controlled local input
```

## Content schema

`Edition` carries an ID, target duration, presenter, and ordered `SceneContent[]`. Scene data is a discriminated union keyed by scene ID. All visible copy—maturity states, terminology, stage promises, capability groups, questions, and media labels—lives in typed content. Every beat carries a unique ID, short cue, optional private notes, and expected seconds. Runtime validation rejects incomplete metadata, duplicate scene/beat IDs, missing cues, and invalid timings; TypeScript checks scene-specific fields at build time. Future edition overrides should merge into generic master content rather than duplicating components.

## Safe-stage contract

`.scene` is the audience-safe rectangle. It excludes the persistent bottom control rail and responsive outer margins. The presenter HUD and transport controls render outside this rectangle. Narrative renderers must keep all meaningful visible descendants within it at every beat. No presentation route scrolls. Visual verification treats clipped content, content outside the safe rectangle, or overlap with the control rail as a test failure. When information cannot fit with deliberate whitespace, the content is divided into another beat.

## Presentation contract

- Right arrow / Space advances one beat; Left arrow reverses one beat.
- F requests fullscreen; browser denial is harmless. Escape uses native browser behavior.
- R returns the current scene to beat zero.
- H hides/shows HUD; P toggles presentation chrome.
- Query `?present=1` supports a direct presentation entry point.
- Boundary input is idempotent. Repeated back/forward input cannot corrupt state.
- On-screen arrows provide a non-keyboard fallback.

The HUD includes elapsed and target session time, scene, beat count, and the next beat’s cue. Speaker notes remain edition data and never enter audience DOM. The HUD can be hidden. A future presenter view can expose notes in a second window without altering scene state.

## Presenter-controlled decisions

`PresenterDecision` is a controlled, edition-configurable primitive supporting two to four choices. Choices can define metrics, risk language, divided AI/human responsibilities, and an outcome. It supports mouse activation, A–D keyboard selection, accessible pressed state, a separate consequence state, preserved selection during backward navigation, and reset through the experience controller. The Constitution scenario is content configuration, not component logic. Future autonomy scenes, simulations, and workshop editions should reuse it.

## Employee 001 maturity model

Employee 001 matures cumulatively: **Capability** in Scene 03; **Context, Boundaries, and Purpose** in Scene 04; then future Work, Autonomy, Learning, and Collaboration. The central entity and orbital topology evolve instead of being replaced.

Scene 04 content structures allow future workshop editions to supply organization context, an AI employee role, operating rules, desired impact, KPIs, and autonomy choices. Sprint 3 deliberately adds no forms, accounts, or participant-input infrastructure.

## Reliability and accessibility

The first render contains meaningful content before any transition. Media placeholders explain their state. Every color-coded status also has text or shape. CSS clamps typography and responds at laptop/mobile breakpoints. Reduced-motion preferences shorten all transitions effectively to zero. Core assets are local/data-URI; web fonts are optional enhancements with system fallbacks.

## Future capability seams

Live AI and voting are ports, not direct component dependencies. Both must expose readiness/error state and local fixtures. Presentation mode always remains operable with the fixture provider. A future remote-control/QR channel should submit events into the same reducer used by keyboard navigation.
## Scene 05 — Employee 001 at Work

Scene 05 is a 37-beat, approximately 14-minute deterministic CFO simulation for fictional Nova Industries. It begins as a continuation of Scene 04 monitoring—without a conventional title card—and moves from a €60M revenue-outlook anomaly through evidence gathering, uncertainty, specialist collaboration, competing hypotheses, self-challenge, synthesis, recommendation, and a human decision boundary.

The maturity arc is now:

- Scene 03: capability
- Scene 04: context, governance, and purpose
- Scene 05: work, reasoning, and collaboration
- Scene 06 (not implemented): human + AI leadership

Every beat has argument-focused speaker notes in typed edition content. The scenario remains fictional, local, and offline. Confidence is explicitly presented as an uncertainty signal rather than scientific certainty.

The closing sequence redistributes work rather than erasing the human: AI monitors, investigates, synthesizes, and prepares; humans question, judge, influence, decide, and own the outcome. The final philosophy is **Human in Command**, followed by the unanswered leadership question: “What becomes more valuable when intelligence becomes abundant?”

## Scene 06 — The AI-Native Leader

Scene 06 is a 28-beat, approximately 9.5-minute leadership consequence. `LeadershipSceneContent` carries human values, work redistribution, command concepts, leadership capabilities, comparative workforce strengths, signature language, multiplication, the evolved Day-1 question, and the education-philosophy transition. The renderer remains edition-agnostic.

The visual metaphor is orchestration rather than hierarchy: two capability domains converge through an intent/coherence layer. Employee 001 remains active inside the AI workforce, with Employee 014 as a subtle specialist reference. No humanoid leader is introduced. Human and AI strengths are presented as comparative operating domains, never rigid claims of exclusivity.

Scene 06 ends with forward energy on “So what do we do on Monday morning?” Scene 07 answers it with action.

## Scene 07 — Become AI-Native

Scene 07 is the action and human-closing chapter: 24 deliberate beats paced to approximately 7.1 minutes, followed by an indefinite final resting state. It answers the Monday-morning question with one meaningful process, the Day-1 redesign question, outcome-first design, deliberate human/AI work distribution, a real job for an AI employee, broader measures of value, and a practical 30-day challenge.

The visual language moves from structured and operational toward sparse, typographic, and human. Employee 001 appears only as evidence during the action section and disappears before the signature belief and final close. The experience resolves through “Theory informs. Experience transforms.”, “Become AI-Native”, Human × AI, and Felix’s optimistic human invitation. The final resting screen contains no digital speaker or AI voice.

Scene 07 content is defined by `ActionSceneContent`; navigation remains generic and deterministic. The final close’s full suggested speaker language is stored privately in the `final-invitation` beat notes.

### Deferred final-polish item

Strengthen the Scene 06 Human Workforce + AI Workforce → Leadership / Orchestration → unified workforce transition after full-experience acceptance. This sprint deliberately does not redesign that approved sequence.
