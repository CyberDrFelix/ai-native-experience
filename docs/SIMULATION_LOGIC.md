# CFO simulation logic

Scene 05 is deliberately fictional and deterministic. It must never imply access to a real employer system, forecast, customer, or proprietary process.

## State sequence

```text
monitoring → deviation_detected → investigating → patterns → drivers
→ hypotheses_3 → testing → specialist → materiality
→ result(confidence 82%) → recommendation → human_decision
```

Each state is a presenter-controlled beat. A local fixture supplies all values. Optional live-AI enrichment may later generate wording, but timeout, error, or offline status immediately selects the fixture without breaking navigation.

## Illustrative fixture

- Trigger: forecast deviation detected, −6.2%.
- Candidate drivers: timing shift in two large renewals; unfavorable mix in a fictional region; accelerated logistics cost.
- Confidence: 82% (illustrative, not a calibrated model probability).
- Recommendation: validate renewal timing with the commercial owner; model mix sensitivity; hold any external action for human approval.
- Final state: **HUMAN DECISION REQUIRED**.

## Guardrails

No Dell name, marks, internal data, real forecasts, customer names, actual systems, or proprietary workflow. Label scenario data as fictional/illustrative. The AI never executes an external action in this scene. Back navigation restores the exact prior state; reset returns to normal monitoring.
## Reusable investigation simulation

`WorkSceneContent` defines scenario identity, company, trigger, baseline/current signal, evidence sources, missing evidence, specialist capability, hypotheses and evidence, self-challenge tests, synthesis, explained/unexplained amounts, recommendations, confidence, human choices, consequences, work redistribution, maturity, and the leadership bridge. The React scene interprets this data; it contains no Nova-specific business logic.

The reusable `SimulationProgress` primitive represents cognitive state as a quiet topology of seven modes: DETECT, GATHER, ANALYSE, HYPOTHESIZE, CHALLENGE, SYNTHESIZE, and RECOMMEND. It is neither a completion percentage nor a wizard. Current state is communicated through label, position, shape, and contrast, and remains legible with reduced motion.

The current simulation is deterministic and uses no model, API, backend, network resource, or live company data. A future edition can replace the CFO scenario with Sales, Operations, HR, Supply Chain, Marketing, Technology, or Public Sector content without forking navigation or scene logic.

### Uncertainty and collaboration

Employee 001 does not infer truth from the first correlation. It exposes root-cause confidence at 41%, requests pipeline movement, slippage reasons, and demand evidence, then calls fictional specialist Employee 014 for market context. The specialist rules out a weak external-demand hypothesis. Hypotheses remain visibly provisional and are tested against contradictory evidence.

The leading conversion hypothesis is then challenged through data freshness, seasonality, supply interaction, and regional concentration. Only after that falsification pass does the simulation synthesize €42M likely explained and €18M unexplained. The recommendation preserves investigation of the unknown.

### Human boundary

Employee 001 stops at a governed decision boundary. A, B, and C each expose a legitimate benefit and tradeoff; none is encoded as universally correct. Materiality, reversibility, timing, risk appetite, and business context belong to human judgment and accountability.
