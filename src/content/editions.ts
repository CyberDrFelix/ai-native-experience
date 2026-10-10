import { fifteenMinuteCompany, type Company15Config } from '../lib/company15'

export type BeatContent = { id: string; cue: string; notes?: string; seconds: number }
type SceneBase = { id: string; number: string; title: string; hudTitle: string; beats: BeatContent[] }
export type BootSceneContent = SceneBase & { id: 'boot'; eyebrow: string; eventLabel: string; headline: [string, string]; answer: string; greeting: string; greetingCaption: string; liveLabel: string; video: { src: string; label: string; state: string; fallbackTitle: string; fallbackStatus: string } }
export type GapSceneContent = SceneBase & { id: 'gap'; kicker: string; question: string; journey: { from: string; to: string }; maturity: { number: string; label: string }[]; gap: [string, string]; northStar: [string, string, string] }
export type EmployeeSceneContent = SceneBase & { id: 'employee'; entity: string; initializing: string; stages: { label: string; promise: string }[]; groups: { id: string; label: string; capabilities: string[] }[]; finalQuestion: [string, string] }
export type DecisionChoice = { id: string; label: string; metrics?: { label: string; value: string }[]; risk?: string; ai?: string[]; human?: string[]; outcome: string }
export type OnboardingSceneContent = SceneBase & {
  id: 'onboarding'; opening: [string, string]; entity: string; readiness: { capability: string; organization: string }
  modules: { number: string; id: 'culture' | 'constitution' | 'impact'; label: string }[]
  culture: { premise: string; questions: string[]; loading: string; loaded: string }
  constitution: { premise: string; principle: string; rules: { label: string; question: string }[]; decision: { prompt: string[]; choices: DecisionChoice[]; nuance: string }; loaded: string }
  impact: { question: string[]; qualities: { label: string; statement: string[] }[]; northStar: string[]; performance: { insufficient: string; measures: string[]; betterQuestion: string } }
  activation: { checks: string[]; complete: string; active: string }
  signature: { question: string; statement: string[]; framework: string; support: string }
  signal: { states: string[]; final: string }
}
export type SimulationEvidence = { source: string; finding: string }
export type SimulationHypothesis = { id: string; label: string; result: string; evidence: string[] }
export type WorkSceneContent = SceneBase & {
  id: 'work'; entity: string; company: string; scenario: string
  mode?: 'cfo' | 'ceo' | 'company15'
  company15?: Company15Config
  ceo?: {
    opening: string[]; tensions: string[]; hypotheses: DecisionChoice[]
    assessments: { label: string; hypothesis: string; confidence: string; qualifier: string }[]
    evidenceTrail: SimulationEvidence[]
    evidenceModel: { observed: string[]; inferred: string[]; uncertain: string[] }
    exposure: string; recommendation: string
    twist: { commitment: string; missed: string; resolution: string[] }
  }
  trigger: { label: string; baseline: string; current: string; change: string; gap: string }
  progress: string[]; evidence: SimulationEvidence[]; missingEvidence: string[]
  specialist: { id: string; name: string; request: string; findings: string[]; conclusion: string }
  hypotheses: SimulationHypothesis[]; challenge: { question: string; tests: { label: string; result: string }[]; conclusion: string }
  synthesis: { question: string; answer: string }[]; explained: string; unexplained: string
  recommendations: { horizon: string; action: string }[]; confidence: string
  decision: { prompt: string; choices: DecisionChoice[]; nuance: string }
  redistribution: { removed: string[]; retained: string[]; old: string[]; ai: string[]; human: string[] }
  maturity: string[]; leadership: { setup: string[]; job: string[]; question: string[] }
}
export type LeadershipSceneContent = SceneBase & {
  id: 'leadership'; entity: string; inheritedQuestion: string[]
  humanValues: { word: string; meaning: string }[]
  redistribution: { ai: string[]; human: string[]; statement: string[] }
  command: { loop: string; command: string; establishes: string[] }
  leadershipCapabilities: string[]; orchestration: string[]
  workforce: { human: string[]; ai: string[]; specialist: string; relationships: { human: string; ai: string }[] }
  signature: string[]; team: string
  multiplication: { additive: string; multiplicative: string; equation: string }
  dayOne: string[]; philosophy: string[]; transition: string
}
export type ActionSceneContent = SceneBase & {
  id: 'action'; opening: string[]; processExamples: string[]; nativeQuestion: string[]
  activationQuestions?: string[]; closingMessage?: string[]
  legacyFlow: string[]; outcome: { question: string[]; not: string; but: string[] }
  redistribution: { ai: string[]; human: string[] }
  employee: { label: string; status: string; foundations: string[]; modules: string[] }
  measures: string[]; challenge: { title: string; promise: string[]; weeks: { label: string; action: string }[] }
  flywheel: string[]; philosophy: string[]; callback: { using: string; native: string }
  equation: { first: string; final: string }; humanClose: string[]
  final: { title: string; philosophy: string[]; presenter: string }
}
export type SceneContent = BootSceneContent | GapSceneContent | EmployeeSceneContent | OnboardingSceneContent | WorkSceneContent | LeadershipSceneContent | ActionSceneContent
export type Edition = { id: string; durationMinutes: number; presenter: string; scenes: SceneContent[] }

export function validateEdition(edition: Edition): Edition {
  if (!edition.id || !edition.presenter || edition.durationMinutes <= 0) throw new Error('Edition metadata is incomplete')
  const sceneIds = new Set<string>()
  for (const scene of edition.scenes) {
    if (sceneIds.has(scene.id)) throw new Error(`Duplicate scene: ${scene.id}`)
    sceneIds.add(scene.id)
    if (!scene.beats.length) throw new Error(`Scene ${scene.id} has no beats`)
    const beatIds = new Set<string>()
    for (const beat of scene.beats) {
      if (!beat.id || !beat.cue || beat.seconds <= 0) throw new Error(`Invalid beat in ${scene.id}`)
      if (beatIds.has(beat.id)) throw new Error(`Duplicate beat ${beat.id} in ${scene.id}`)
      beatIds.add(beat.id)
    }
  }
  return edition
}

export const indiaCfo = validateEdition({
  id: 'india-cfo', durationMinutes: 60, presenter: 'Felix Burcea',
  scenes: [
    {
      id: 'boot', number: '01', title: 'BOOT', hudTitle: 'BOOT', eyebrow: 'AI NATIVE — THE EXPERIENCE', eventLabel: 'Executive Experience · India',
      headline: ['Your next employee', 'might be AI.'], answer: 'Your next leader must be ready.', greeting: 'Namaskāra. Namaste. Welcome.', greetingCaption: 'A DIGITAL WELCOME · THEN LIVE IN ENGLISH', liveLabel: 'LIVE · FELIX BURCEA',
      video: { src: './video/digital-felix-india-greeting.mp4', label: 'DIGITAL FELIX', state: 'PRODUCTION VIDEO · LOCAL', fallbackTitle: 'Digital Felix greeting unavailable', fallbackStatus: 'CONTINUE LIVE WITH FELIX' },
      beats: [
        { id: 'signal', cue: 'Open on the signal.', notes: 'Let the room settle before speaking.', seconds: 20 },
        { id: 'identity', cue: 'Your next employee might be AI.', notes: 'Pause after AI.', seconds: 45 },
        { id: 'greeting', cue: 'Play the Digital Felix opening.', notes: 'Select Play Digital Felix. The local production video contains the complete Kannada → Hindi → English opening. Let it play straight, without narration.', seconds: 95 },
        { id: 'handover', cue: 'Take the room live.', notes: 'Optional live beat: “Well… that’s a slightly uncomfortable way to start my own presentation.” Acknowledge that the twin uses more hand gestures than Felix normally would: the training direction asked for expressiveness, and the twin learned it too aggressively. Land: “AI learns from what we give it — including our mistakes.” Connect that insight to context, training, demonstrated behavior, governance, and later onboarding.', seconds: 75 },
      ],
    },
    {
      id: 'gap', number: '02', title: 'THE GAP', hudTitle: 'THE GAP', kicker: 'A QUICK READ OF THE ROOM', question: 'Where are you right now?', journey: { from: 'USE AI', to: 'AI-NATIVE' },
      maturity: [{ number: '01', label: 'I occasionally use AI' }, { number: '02', label: 'AI assists me every day' }, { number: '03', label: 'AI owns parts of my workflow' }, { number: '04', label: "I've redesigned work around AI" }],
      gap: ['USING AI', 'BEING AI-NATIVE'], northStar: ['If AI existed on Day 1,', 'would we design this process', 'the same way?'],
      beats: [
        { id: 'question', cue: 'Ask for a quick read of the room.', notes: 'Invite a show of hands or reactions.', seconds: 40 },
        { id: 'journey-middle', cue: 'Move from occasional use to daily assistance.', notes: 'Acknowledge the first half of the maturity journey.', seconds: 45 },
        { id: 'journey-native', cue: 'Who has redesigned the work?', notes: 'Let all four positions remain visible.', seconds: 50 },
        { id: 'gap-statement', cue: 'Using AI is not being AI-native.', notes: 'Allow the statement to stand without explanation.', seconds: 40 },
        { id: 'north-star', cue: 'Introduce the North Star.', notes: 'Read slowly, then pause on “the same way?”', seconds: 55 },
      ],
    },
    {
      id: 'employee', number: '03', title: 'CREATE EMPLOYEE 001', hudTitle: 'EMPLOYEE 001', entity: 'EMPLOYEE 001', initializing: 'STATUS: INITIALIZING',
      stages: [{ label: 'CHATBOT', promise: 'Can answer' }, { label: 'COPILOT', promise: 'Can assist' }, { label: 'AGENT', promise: 'Can pursue an objective' }, { label: 'AI EMPLOYEE', promise: 'A member of the workforce' }],
      groups: [
        { id: 'understand', label: 'UNDERSTAND', capabilities: ['READ', 'RESEARCH', 'REMEMBER'] },
        { id: 'think', label: 'THINK', capabilities: ['REASON', 'ANALYSE', 'PLAN'] },
        { id: 'create-act', label: 'CREATE + ACT', capabilities: ['CREATE', 'ACT', 'COMMUNICATE'] },
        { id: 'operate', label: 'OPERATE', capabilities: ['MONITOR', 'COLLABORATE'] },
      ],
      finalQuestion: ['If this really is an employee,', 'why do we onboard it like software?'],
      beats: [
        { id: 'dormant', cue: 'Meet Employee 001.', notes: 'Frame it as organizational capability, not a person.', seconds: 35 },
        { id: 'chatbot', cue: 'A chatbot can answer.', notes: 'Start with the familiar.', seconds: 30 },
        { id: 'copilot', cue: 'A copilot can assist.', notes: 'Emphasize proximity to human work.', seconds: 30 },
        { id: 'agent', cue: 'An agent pursues an objective.', notes: 'This is the autonomy threshold.', seconds: 40 },
        { id: 'ai-employee', cue: 'Now make it a member of the workforce.', notes: 'Pause through the visual transformation.', seconds: 50 },
        { id: 'understand', cue: 'First, it can understand.', notes: 'Read, research, and remember establish context.', seconds: 35 },
        { id: 'think', cue: 'Then, it can think.', notes: 'Reason, analyse, and plan turn context into judgment support.', seconds: 35 },
        { id: 'create-act', cue: 'It can create and act.', notes: 'Execution moves it beyond an assistant.', seconds: 35 },
        { id: 'operate', cue: 'It can operate with others.', notes: 'Monitoring and collaboration make it persistent.', seconds: 40 },
        { id: 'onboarding-question', cue: 'So why onboard it like software?', notes: 'Clear the screen. Bridge directly into Scene 04.', seconds: 55 },
      ],
    },
    {
      id: 'onboarding', number: '04', title: 'ONBOARD EMPLOYEE 001', hudTitle: 'ONBOARDING', entity: 'EMPLOYEE 001',
      opening: ['IF AI IS AN EMPLOYEE…', 'ONBOARD IT LIKE ONE.'], readiness: { capability: 'CAPABILITY: READY', organization: 'ORGANIZATIONAL READINESS: NOT READY' },
      modules: [{ number: '01', id: 'culture', label: 'CULTURE' }, { number: '02', id: 'constitution', label: 'CONSTITUTION' }, { number: '03', id: 'impact', label: 'IMPACT' }],
      culture: {
        premise: 'Before Employee 001 can work effectively, it needs to understand where it works.',
        questions: ['WHO ARE WE?', 'WHAT ARE WE TRYING TO ACHIEVE?', 'WHAT DOES GOOD LOOK LIKE HERE?'],
        loading: 'ORGANIZATIONAL CONTEXT · LOADING…', loaded: 'CULTURE · LOADED',
      },
      constitution: {
        premise: 'AUTONOMY WITHIN BOUNDARIES', principle: 'Good governance defines where AI may act.',
        rules: [{ label: 'PERMISSION', question: 'What may I do?' }, { label: 'APPROVAL', question: 'What requires a human?' }, { label: 'PROHIBITION', question: 'What must I never do?' }, { label: 'ESCALATION', question: 'When must I stop and escalate?' }, { label: 'DATA', question: 'How must I handle sensitive information?' }],
        decision: {
          prompt: ['EMPLOYEE 001 DETECTS', 'A POTENTIALLY MATERIAL ISSUE.', 'WHAT SHOULD IT DO?'], nuance: 'Materiality · risk · reversibility · confidence · policy',
          choices: [
            { id: 'a', label: 'FIX IT AUTONOMOUSLY', metrics: [{ label: 'SPEED', value: 'HIGH' }, { label: 'AUTONOMY', value: 'HIGH' }, { label: 'CONTROL', value: 'LOWER' }], risk: 'AI acts before materiality, context and accountability are validated.', outcome: 'BOUNDARY EXCEEDED' },
            { id: 'b', label: 'INVESTIGATE + RECOMMEND', ai: ['INVESTIGATES', 'ANALYSES', 'BUILDS HYPOTHESES', 'RECOMMENDS'], human: ['JUDGES', 'APPROVES', 'TAKES ACCOUNTABILITY'], outcome: 'AUTONOMY WITHIN BOUNDARIES' },
            { id: 'c', label: 'STOP AND WAIT FOR A HUMAN', metrics: [{ label: 'CONTROL', value: 'HIGH' }, { label: 'AUTONOMY', value: 'LOW' }, { label: 'HUMAN BOTTLENECK', value: 'HIGH' }], risk: 'We bought intelligence and turned it into a waiting room.', outcome: 'CAPABILITY CONSTRAINED' },
          ],
        }, loaded: 'CONSTITUTION · LOADED',
      },
      impact: {
        question: ['WHAT DO YOU EXPECT', 'FROM YOUR NEW EMPLOYEE', 'IN ITS FIRST 30 DAYS?'],
        qualities: [
          { label: 'HELPFUL', statement: ['DOES IT MAKE', 'THE TEAM BETTER?'] },
          { label: 'KNOWLEDGEABLE', statement: ['KNOWLEDGE → CONTEXT', '→ BETTER DECISIONS'] },
          { label: 'THINKS OUTSIDE THE BOX', statement: ['CAN IT HELP US IMAGINE', 'A BETTER PROCESS?'] },
        ],
        northStar: ['If AI existed on Day 1,', 'would we design this process', 'the same way?'],
        performance: { insufficient: 'TIME SAVED', measures: ['QUALITY ↑', 'SPEED ↑', 'INSIGHT ↑', 'CREATIVITY ↑', 'DECISION QUALITY ↑', 'HUMAN CAPACITY ↑'], betterQuestion: 'Did the organization become more capable?' },
      },
      activation: { checks: ['ORGANIZATIONAL CONTEXT', 'OPERATING BOUNDARIES', 'PURPOSE + EXPECTATIONS'], complete: 'ONBOARDING COMPLETE', active: 'STATUS: ACTIVE' },
      signature: { question: 'WHAT DID WE JUST DO?', statement: ["WE DIDN'T CONFIGURE SOFTWARE.", 'WE ONBOARDED', 'A MEMBER OF THE WORKFORCE.'], framework: 'CULTURE. CONSTITUTION. IMPACT.', support: 'If AI is an employee, onboard it like one.' },
      signal: { states: ['CAPABLE', 'CONTEXTUALIZED', 'GOVERNED', 'PURPOSEFUL', 'ACTIVE'], final: 'ANOMALY DETECTED' },
      beats: [
        { id: 'employee-statement', cue: 'If AI is an employee…', notes: 'Let the question from Scene 03 hang for a moment. The answer begins simply.', seconds: 16 },
        { id: 'onboard-statement', cue: 'Onboard it like one.', notes: 'This is the central framework. Do not rush past it.', seconds: 20 },
        { id: 'readiness', cue: 'Capability is not readiness.', notes: 'Humans receive onboarding because capability without context is not enough. The same is true here.', seconds: 23 },
        { id: 'modules-locked', cue: 'Three things are missing.', notes: 'Introduce Culture, Constitution and Impact as parts of the operating architecture.', seconds: 20 },
        { id: 'culture-premise', cue: 'Begin with Culture.', notes: 'Values and expected behavior cannot be assumed simply because a system is intelligent.', seconds: 23 },
        { id: 'culture-who', cue: 'Who are we?', notes: 'Provide identity and institutional context—not slogans.', seconds: 16 },
        { id: 'culture-goal', cue: 'What are we trying to achieve?', notes: 'Connect the employee to organizational direction.', seconds: 16 },
        { id: 'culture-good', cue: 'What does good look like here?', notes: 'Quality is cultural and contextual, not merely technical.', seconds: 20 },
        { id: 'culture-loading', cue: 'Load organizational context.', notes: 'We spend weeks teaching people how an organization works, yet often give AI one prompt and expect understanding.', seconds: 20 },
        { id: 'culture-loaded', cue: 'Culture is loaded.', notes: 'Capability now has context. Trust still requires boundaries.', seconds: 16 },
        { id: 'constitution-premise', cue: 'Now define the Constitution.', notes: 'Governance should enable useful autonomy rather than eliminate autonomy.', seconds: 23 },
        { id: 'rule-permission', cue: 'Define permission.', notes: 'Start with what the employee may do—not only what it cannot do.', seconds: 15 },
        { id: 'rule-approval', cue: 'Define approval.', notes: 'Different work deserves different autonomy levels.', seconds: 15 },
        { id: 'rule-prohibition', cue: 'Define prohibition.', notes: 'Some boundaries should be absolute and explicit.', seconds: 15 },
        { id: 'rule-escalation', cue: 'Define escalation.', notes: 'Good escalation preserves speed until judgment is genuinely needed.', seconds: 15 },
        { id: 'rule-data', cue: 'Define sensitive-data behavior.', notes: 'Authority over information is part of authority to act.', seconds: 18 },
        { id: 'decision-prompt', cue: 'Put the Constitution to work.', notes: 'Introduce the fictional material issue. Ask the room before showing options.', seconds: 23 },
        { id: 'decision-choices', cue: 'Choose A, B, or C.', notes: 'Use a show of hands, Teams reactions, or verbal responses. Select with A/B/C or click.', seconds: 40 },
        { id: 'decision-consequence', cue: 'Examine the consequence.', notes: 'Do not frame autonomy as bad. The boundary depends on materiality, risk, reversibility, confidence, governance and policy.', seconds: 45 },
        { id: 'constitution-loaded', cue: 'Lock in the boundary.', notes: 'Good governance defines where AI may act. It does not prevent action everywhere.', seconds: 20 },
        { id: 'impact-question', cue: 'Give Employee 001 a job to do.', notes: 'Pause for the audience to consider the first 30 days.', seconds: 30 },
        { id: 'helpful', cue: 'Helpful means making the team better.', notes: 'The best employee increases the capability of people around them.', seconds: 23 },
        { id: 'knowledgeable', cue: 'Knowledge needs context.', notes: 'Knowledge requires evidence, context, validation and appropriate sources.', seconds: 23 },
        { id: 'outside-box', cue: 'Ask for a better process.', notes: 'The objective is not to reproduce old processes faster.', seconds: 30 },
        { id: 'north-star-return', cue: 'Return to the North Star.', notes: 'Reconnect this framework directly to Scene 02.', seconds: 23 },
        { id: 'time-saved', cue: 'Time saved is insufficient.', notes: 'Efficiency matters, but it is not the complete performance model.', seconds: 20 },
        { id: 'capability-measures', cue: 'Measure organizational capability.', notes: 'AI should be measured by organizational impact, not merely hours saved.', seconds: 35 },
        { id: 'modules-complete', cue: 'Bring the framework together.', notes: 'Context, boundaries and expectations are now part of Employee 001.', seconds: 23 },
        { id: 'activation', cue: 'Activate Employee 001.', notes: 'Mark the emotional progression from capability to readiness.', seconds: 23 },
        { id: 'what-did-we-do', cue: 'What did we just do?', notes: 'Ask, then pause. Let the room formulate the answer.', seconds: 16 },
        { id: 'workforce-statement', cue: 'We onboarded a workforce member.', notes: 'This is the signature statement. Land it with confidence, not fear.', seconds: 35 },
        { id: 'incoming-signal', cue: 'Employee 001 begins monitoring.', notes: 'Create anticipation. Do not reveal the CFO simulation yet.', seconds: 20 },
      ],
    },
    {
      id: 'work', number: '05', title: 'EMPLOYEE 001 AT WORK', hudTitle: 'AT WORK', entity: 'EMPLOYEE 001', company: 'NOVA INDUSTRIES', scenario: 'CFO · QUARTER REVENUE OUTLOOK',
      trigger: { label: 'REVENUE OUTLOOK', baseline: '€1.00B', current: '€940M', change: '−6.0%', gap: '€60M' },
      progress: ['DETECT', 'GATHER', 'ANALYSE', 'HYPOTHESIZE', 'CHALLENGE', 'SYNTHESIZE', 'RECOMMEND'],
      evidence: [
        { source: 'FORECAST SYSTEM', finding: 'OUTLOOK REVISED · €940M' }, { source: 'SALES PIPELINE', finding: 'LATE-STAGE CONVERSION ↓' },
        { source: 'ORDER BACKLOG', finding: 'NO MATERIAL CHANGE' }, { source: 'PRICING + MARGIN', finding: 'WITHIN EXPECTED RANGE' },
        { source: 'SUPPLY SIGNALS', finding: 'CONSTRAINT RISK LOW' }, { source: 'MARKET CONTEXT', finding: 'SPECIALIST REVIEW REQUIRED' },
      ],
      missingEvidence: ['PIPELINE MOVEMENT', 'DEAL SLIPPAGE REASONS', 'DEMAND SIGNAL'],
      specialist: { id: '014', name: 'MARKET CONTEXT', request: 'VALIDATE EXTERNAL-DEMAND HYPOTHESIS', findings: ['DEMAND · STABLE', 'COMPETITOR PRICING · NO MATERIAL CHANGE', 'INDUSTRY OUTLOOK · UNCHANGED'], conclusion: 'WEAK HYPOTHESIS ELIMINATED' },
      hypotheses: [
        { id: 'H1', label: 'MARKET DEMAND WEAKENED', result: 'LOW SUPPORT', evidence: ['DEMAND STABLE', 'INDUSTRY UNCHANGED'] },
        { id: 'H3', label: 'SUPPLY CONSTRAINT', result: 'LOW SUPPORT', evidence: ['BACKLOG STABLE', 'CONSTRAINT RISK LOW'] },
        { id: 'H2', label: 'CONVERSION DETERIORATED', result: 'STRONG SUPPORT', evidence: ['CONVERSION ↓', 'SLIPPAGE ↑', 'SOUTH CONCENTRATION', 'SALES CYCLE ↑'] },
      ],
      challenge: { question: 'WHAT EVIDENCE WOULD PROVE ME WRONG?', tests: [{ label: 'DATA FRESHNESS', result: 'PASS' }, { label: 'SEASONALITY', result: 'NONE DETECTED' }, { label: 'SUPPLY INTERACTION', result: 'LOW' }, { label: 'REGIONAL CONCENTRATION', result: 'CONFIRMED' }], conclusion: 'PRIMARY HYPOTHESIS RETAINS SUPPORT' },
      synthesis: [{ question: 'WHAT CHANGED?', answer: 'LATE-STAGE CONVERSION DETERIORATED' }, { question: 'WHY?', answer: 'SLIPPAGE CONCENTRATED IN REGION SOUTH' }, { question: 'WHAT DID NOT CHANGE?', answer: 'DEMAND + SUPPLY REMAIN STABLE' }],
      explained: '€42M', unexplained: '€18M', confidence: '78%',
      recommendations: [{ horizon: 'IMMEDIATE', action: 'REVIEW SLIPPED SOUTH OPPORTUNITIES' }, { horizon: '48 HOURS', action: 'VALIDATE CLOSE DATES + PROBABILITY' }, { horizon: 'FORECAST ACTION', action: 'REASSESS €42M EXPOSURE' }, { horizon: 'CONTINUE', action: 'INVESTIGATE REMAINING €18M' }],
      decision: { prompt: 'HUMAN DECISION REQUIRED', nuance: 'materiality · reversibility · timing · risk appetite · business context', choices: [
        { id: 'a', label: 'ADJUST FORECAST NOW', metrics: [{ label: 'BENEFIT', value: 'FAST RESPONSE' }], risk: 'Acts while €18M remains unexplained.', outcome: 'SPEED OVER COMPLETENESS' },
        { id: 'b', label: 'INVESTIGATE €18M FIRST', metrics: [{ label: 'BENEFIT', value: 'HIGHER CONFIDENCE' }], risk: 'Adds latency before forecast action.', outcome: 'CONFIDENCE OVER SPEED' },
        { id: 'c', label: 'KEEP FORECAST + WATCH', metrics: [{ label: 'BENEFIT', value: 'AVOIDS PREMATURE ACTION' }], risk: 'May delay a genuine response.', outcome: 'OPTIONALITY OVER EARLY ACTION' },
      ] },
      redistribution: { removed: ['DATA GATHERING', 'FIRST-PASS ANALYSIS', 'ANOMALY DETECTION', 'HYPOTHESIS GENERATION', 'EVIDENCE SYNTHESIS', 'REPETITIVE INVESTIGATION'], retained: ['JUDGMENT', 'ACCOUNTABILITY', 'RELATIONSHIPS', 'COURAGE', 'BUSINESS LEADERSHIP'], old: ['downloads', 'cleans', 'reconciles', 'analyses', 'builds', 'explains', 'decides'], ai: ['MONITORS', 'INVESTIGATES', 'SYNTHESIZES', 'PREPARES'], human: ['QUESTIONS', 'JUDGES', 'INFLUENCES', 'DECIDES'] },
      maturity: ['CAPABLE', 'CONTEXTUALIZED', 'GOVERNED', 'PURPOSEFUL', 'ACTIVE', 'WORKING'],
      leadership: { setup: ['IF EMPLOYEE 001', 'CAN DO ALL OF THIS…'], job: ['WHAT EXACTLY', 'IS MY JOB NOW?'], question: ['WHAT BECOMES MORE VALUABLE', 'WHEN INTELLIGENCE', 'BECOMES ABUNDANT?'] },
      beats: [
        ['anomaly','Employee 001 detected a deviation.','Continue without a new title. The employee was monitoring and has now found something.',22],
        ['forecast-gap','Make the €60M gap tangible.','The number is fictional. Establish prior outlook, current outlook and the size of the deviation.',28],
        ['team-question','Ask what the team would do next.','Pause. Traditional Finance often downloads, reconciles and prepares before judgment can begin.',35],
        ['investigation','Employee 001 begins investigating.','AI-native Finance changes where humans enter the workflow. We are watching tactical autonomy within a defined boundary.',22],
        ['evidence-forecast','Start with the forecast system.','Evidence gathering is cognitive work, not a decorative loading sequence.',20], ['evidence-pipeline','Inspect the sales pipeline.','Conversion has deteriorated, but this is not yet a root cause.',20],
        ['evidence-backlog','Test the order backlog.','A useful investigation checks evidence that could contradict the first signal.',18], ['evidence-pricing','Check pricing and margin.','Do not confuse correlated movement with an explanation.',18],
        ['evidence-supply','Check supply signals.','Supply constraints receive low initial support.',18], ['evidence-market','Reach the edge of current evidence.','The employee can identify when its own available evidence is insufficient.',20],
        ['evidence-incomplete','Evidence is useful, but incomplete.','Region South is concentrated, yet root-cause confidence is only 41 percent.',22],
        ['additional-required','Show that useful AI identifies uncertainty.','AI should identify uncertainty rather than hide it. It actively requests the evidence needed next.',28],
        ['specialist-connect','Employee 001 seeks specialist capability.','Multiple AI capabilities can collaborate. Employee 014 is a bounded specialist, not an oracle.',25],
        ['specialist-result','Market Context returns evidence.','Demand, competitor pricing and the industry outlook do not support the market-demand explanation.',30],
        ['hypotheses','Form competing explanations.','Reasoning means maintaining alternatives rather than locking onto the first plausible story.',28],
        ['test-h1','Test market demand.','External demand receives low support from current evidence.',24], ['test-h3','Test supply constraint.','Stable backlog and low constraint risk weaken the supply hypothesis.',24],
        ['test-h2','Conversion deterioration retains support.','Conversion, slippage, cycle length and regional concentration align. Say current evidence—not truth.',35],
        ['challenge-question','Challenge the leading hypothesis.','A credible reasoning system asks what evidence would prove it wrong.',32],
        ['challenge-results','Run the falsification checks.','Freshness passes; seasonality and supply interaction remain weak; South concentration is confirmed.',34],
        ['synthesis','Synthesize the decision context.','Separate what changed, why it likely changed and what did not change.',40],
        ['recommendation','Prepare a recommendation.','AI can prepare a decision: immediate review, a 48-hour validation and continued investigation.',38],
        ['confidence','Communicate the known and unknown.','Seventy-eight percent is an uncertainty signal, not scientific certainty. €42M is likely explained; €18M is not.',35],
        ['decision-prompt','Stop at the human boundary.','Employee 001 has reached the constitutional boundary defined in Scene 04.',25],
        ['decision-choices','Ask the room to judge.','Select A, B or C. There is no universal answer because materiality, reversibility, timing and risk appetite differ.',45],
        ['decision-consequence','Examine the chosen tradeoff.','AI prepares the choice; the human owns the judgment, accountability and business context.',50],
        ['role-boundary','Separate machine contribution from human responsibility.','The objective is placing human intelligence where it creates the greatest value.',35],
        ['human-command','Move from human in the loop to Human in Command.','Human in the loop is too passive for the philosophy. The human judges, decides and owns the outcome.',32],
        ['removed-question','Ask what Employee 001 removed.','Invite the audience to name the work before revealing it.',20],
        ['work-removed','Reveal the repetitive cognitive work.','This is more than faster Excel: gathering, first-pass analysis and repetitive investigation move upstream.',35],
        ['work-retained','Reveal what remains profoundly human.','Judgment, accountability, relationships, courage and leadership become more—not less—important.',35],
        ['old-model','Show the old allocation of work.','Traditional Finance spends human capacity preparing information before deciding.',30],
        ['new-model','Transform into the AI-native allocation.','AI monitors and prepares; humans question, influence and decide.',35],
        ['finance-statement','Land the Finance leadership statement.','AI should not give Finance more analysis to do. It should give Finance more time to lead.',38],
        ['maturity','Employee 001 returns, now working.','Capability became contextualized, governed, purposeful, active—and now working.',28],
        ['job-question','Ask the uncomfortable leadership question.','Use a little humor. Pause after asking what exactly my job is now.',35],
        ['abundance','Open the leadership chapter—then cut.','The more capable Employee 001 becomes, the more valuable the human leadership question becomes.',38],
      ].map(([id, cue, notes, seconds]) => ({ id: id as string, cue: cue as string, notes: notes as string, seconds: Math.round(seconds as number * .78) })),
    },
    {
      id: 'leadership', number: '06', title: 'THE AI-NATIVE LEADER', hudTitle: 'AI-NATIVE LEADER', entity: 'EMPLOYEE 001',
      inheritedQuestion: ['WHAT BECOMES MORE VALUABLE', 'WHEN INTELLIGENCE', 'BECOMES ABUNDANT?'],
      humanValues: [
        { word: 'JUDGMENT', meaning: 'DECIDE WHAT MATTERS' }, { word: 'CURIOSITY', meaning: 'ASK BETTER QUESTIONS' },
        { word: 'EMPATHY', meaning: 'UNDERSTAND PEOPLE + CONTEXT' }, { word: 'COURAGE', meaning: 'ACT UNDER UNCERTAINTY' },
        { word: 'ETHICS', meaning: 'CHOOSE WHAT SHOULD BE DONE' }, { word: 'IMAGINATION', meaning: 'CREATE NEW POSSIBILITIES' },
      ],
      redistribution: {
        ai: ['RESEARCH', 'MONITORING', 'SYNTHESIS', 'ANALYSIS', 'REPETITIVE COGNITIVE WORK', 'SCENARIO GENERATION', 'COORDINATION', 'EXECUTION WITHIN BOUNDARIES'],
        human: ['INTENT', 'JUDGMENT', 'PURPOSE', 'ETHICS', 'RELATIONSHIPS', 'ACCOUNTABILITY', 'STRATEGIC DECISIONS'],
        statement: ["AI DOESN'T REMOVE THE HUMAN.", 'IT CHANGES WHERE THE HUMAN', 'CREATES VALUE.'],
      },
      command: { loop: 'HUMAN IN THE LOOP', command: 'HUMAN IN COMMAND', establishes: ['INTENT', 'BOUNDARIES', 'ACCOUNTABILITY', 'PURPOSE', 'STRATEGIC JUDGMENT'] },
      leadershipCapabilities: ['DIRECTION', 'DESIGN', 'JUDGMENT', 'TRUST', 'ORCHESTRATION'],
      orchestration: ['LEADERSHIP IS BECOMING', 'THE ORCHESTRATION', 'OF CAPABILITY.'],
      workforce: { human: ['EMPATHY', 'RELATIONSHIPS', 'CONTEXT', 'JUDGMENT', 'PURPOSE', 'ACCOUNTABILITY', 'CREATIVITY'], ai: ['SCALE', 'MEMORY', 'MONITORING', 'ANALYSIS', 'SPEED', 'SYNTHESIS', 'EXECUTION'], specialist: 'EMPLOYEE 014 · MARKET CONTEXT', relationships: [{ human: 'JUDGMENT', ai: 'ANALYSIS' }, { human: 'CREATIVITY', ai: 'SCENARIO GENERATION' }, { human: 'CONTEXT', ai: 'SYNTHESIS' }, { human: 'ACCOUNTABILITY', ai: 'EXECUTION' }] },
      signature: ['THE FUTURE LEADER', 'MUST UNDERSTAND', 'BOTH HUMAN EMPLOYEES', 'AND AI EMPLOYEES —', 'AND SUCCESSFULLY', 'BLEND THEM TOGETHER.'], team: 'ONE TEAM.',
      multiplication: { additive: 'HUMAN + AI', multiplicative: 'HUMAN × AI', equation: 'HUMAN × AI > HUMAN + AI' },
      dayOne: ['IF AI WERE PART OF YOUR WORKFORCE ON DAY 1,', 'WOULD YOU DESIGN YOUR ORGANIZATION', 'THE SAME WAY?'],
      philosophy: ['THEORY INFORMS.', 'EXPERIENCE TRANSFORMS.'], transition: 'SO WHAT DO WE DO ON MONDAY MORNING?',
      beats: [
        ['abundance-inherited','Hold the abundance question.','Preserve the final frame of Scene 05. Say nothing at first; the consequence deserves silence.',24],
        ['differentiation','Name the shift in differentiation.','Access to analysis and generated knowledge becomes less differentiating. What we do with it becomes more valuable.',24],
        ['values-two','Begin the human-value answer.','Judgment decides what matters; curiosity asks a better question. Do not claim AI is incapable of either.',24],
        ['values-four','Deepen the answer.','Empathy brings people and context; courage accepts action under uncertainty.',24],
        ['values-six','Complete the human-value constellation.','Ethics chooses what should be done; imagination creates possibilities. Human differentiation shifts, it does not retreat.',26],
        ['trust-decide-own','Compress the argument.','The scarce capability is knowing which answer to trust, what decision to make, and what responsibility to accept.',28],
        ['ai-work','Return to the work Employee 001 performed.','The digital workforce increasingly carries research, monitoring, synthesis, scenarios and bounded execution.',26],
        ['human-work','Move human contribution upward.','This is an operating-model distinction, not a rigid claim about what either intelligence can technically do.',26],
        ['work-moves','Land the redistribution thesis.','AI does not remove the human. It changes where the human creates value. Pause on creates value.',26],
        ['loop-question','Challenge Human in the Loop.','A checkpoint inside a machine workflow is too small a philosophy for human leadership.',22],
        ['command-reveal','Reveal Human in Command.','Humans establish intent, boundaries, purpose and accountability while AI performs more work between them.',30],
        ['leader-job','Ask the leadership question.','Keep Employee 001 present. Hold silence before offering any answer.',26],
        ['leader-build','Construct the leadership capability system.','Leaders need not outperform AI at every task or become the best prompt engineer. Their work shifts.',30],
        ['orchestration','Name the new leadership work.','Leadership is becoming the orchestration of capability: direction, design, judgment and trust made coherent.',30],
        ['human-workforce','Introduce the human capability domain.','These are comparative strengths, not claims of technical exclusivity.',24],
        ['ai-workforce','Introduce the AI capability domain.','Employee 001 and specialist 014 make the AI workforce concrete rather than theoretical.',24],
        ['one-workforce','Converge the two domains.','The opportunity is not parallel teams. It is two forms of capability becoming one workforce.',28],
        ['command-plane','Introduce the orchestration layer.','The leader does not sit above AI as an avatar. Leadership creates coherence across the whole system.',30],
        ['future-leader-one','Begin Felix’s signature statement.','Understanding technology alone is insufficient. The leader must understand both kinds of employee.',26],
        ['future-leader-two','Complete the signature statement.','Human intelligence brings motivation, emotion, values and meaning; AI brings scale, memory and autonomous capability.',34],
        ['one-team','Resolve the workforce architecture.','Blend both forms of intelligence deliberately around a shared outcome: one team.',22],
        ['human-plus-ai','Show the additive model.','Working beside one another produces useful, incremental productivity.',22],
        ['human-times-ai','Transform addition into multiplication.','Redesign allows each form of intelligence to change what the other can do.',26],
        ['multiplication','Land the equation.','Do not over-explain. This is the difference between using AI and becoming AI-native.',26],
        ['organization-day-one','Bring the North Star full circle.','Ask slowly, then allow silence. Move from redesigning a process to redesigning the organization.',34],
        ['theory-informs','Name the limit of theory.','We do not become AI-native by reading another hundred pages. Theory can orient us, but it cannot substitute for practice.',24],
        ['experience-transforms','Complete the education philosophy.','We become AI-native by working with AI, giving it real problems, learning where it surprises and fails us, then redesigning.',32],
        ['monday-cliffhanger','Hand forward to Scene 07.','Ask with energy: So what do we do on Monday morning? Stop before answering.',28],
      ].map(([id, cue, notes, seconds]) => ({ id: id as string, cue: cue as string, notes: notes as string, seconds: Math.round(seconds as number * .78) })),
    },
    {
      id: 'action', number: '07', title: 'BECOME AI-NATIVE', hudTitle: 'BECOME AI-NATIVE',
      opening: ['SO WHAT DO WE DO', 'ON MONDAY MORNING?'],
      processExamples: ['FORECASTING', 'REPORTING', 'BUSINESS PARTNERING', 'PLANNING', 'CONTROLLERSHIP', 'DECISION SUPPORT'],
      nativeQuestion: ['IF AI HAD EXISTED', 'WHEN WE DESIGNED', 'THIS PROCESS…', 'WOULD WE HAVE', 'DESIGNED IT', 'THE SAME WAY?'],
      legacyFlow: ['DATA', 'HUMAN DOWNLOADS', 'HUMAN CLEANS', 'HUMAN ANALYSES', 'HUMAN BUILDS REPORT', 'HUMAN WRITES COMMENTARY', 'LEADER REVIEWS'],
      outcome: { question: ['WHAT ARE WE ACTUALLY', 'TRYING TO ACHIEVE?'], not: 'PRODUCE THE MONTHLY REPORT', but: ['UNDERSTAND WHAT CHANGED', 'WHY IT CHANGED', 'WHAT MAY HAPPEN NEXT', 'WHAT DECISION IS REQUIRED'] },
      redistribution: { ai: ['RESEARCH', 'MONITORING', 'SYNTHESIS', 'ANALYSIS', 'REPETITIVE COGNITIVE WORK', 'SCENARIO GENERATION', 'EXECUTION WITHIN BOUNDARIES'], human: ['PURPOSE', 'JUDGMENT', 'RELATIONSHIPS', 'CONTEXT', 'ETHICS', 'ACCOUNTABILITY', 'DECISIONS'] },
      employee: { label: 'EMPLOYEE 001', status: 'STATUS: ACTIVE', foundations: ['PURPOSE', 'CONTEXT', 'CONSTITUTION', 'TOOLS', 'AUTONOMY', 'PERFORMANCE'], modules: ['CULTURE', 'CONSTITUTION', 'IMPACT'] },
      measures: ['QUALITY ↑', 'SPEED ↑', 'INSIGHT ↑', 'CREATIVITY ↑', 'DECISION QUALITY ↑', 'HUMAN CAPACITY ↑'],
      challenge: { title: 'YOUR NEXT 30 DAYS', promise: ['ONE PROCESS.', 'ONE AI EMPLOYEE.', 'ONE MEASURABLE OUTCOME.'], weeks: [{ label: 'WEEK 1', action: 'UNDERSTAND' }, { label: 'WEEK 2', action: 'REDESIGN' }, { label: 'WEEK 3', action: 'EXPERIMENT' }, { label: 'WEEK 4', action: 'MEASURE + LEARN' }] },
      flywheel: ['EXPERIENCE', 'LEARNING', 'REDESIGN', 'MORE CAPABILITY', 'EXPERIENCE'],
      philosophy: ['THEORY INFORMS.', 'EXPERIENCE TRANSFORMS.'], callback: { using: 'USING AI', native: 'BEING AI-NATIVE' },
      equation: { first: 'HUMAN × AI', final: 'HUMAN × AI > HUMAN + AI' },
      humanClose: ['WE ARE LIVING THROUGH AN EXTRAORDINARY MOMENT.', 'AI CAN EXPAND WHAT PEOPLE ARE CAPABLE OF ACHIEVING.', 'PURPOSE.', 'VALUES.', 'JUDGMENT.', 'LEADERSHIP.'],
      final: { title: 'AI NATIVE', philosophy: ['THEORY INFORMS.', 'EXPERIENCE TRANSFORMS.'], presenter: 'FELIX BURCEA' },
      beats: [
        ['monday-question','Answer the Monday-morning question.','We have seen AI employees, autonomy, governance, judgment, and leadership. None of it matters if tomorrow we return to yesterday’s processes.',24],
        ['pick-process','Choose one meaningful process.','Do not begin with an AI strategy. Choose one process that matters—not necessarily the easiest or largest.',28],
        ['native-question-one','Ask the first half of the AI-native question.','Most organizations ask where they can add AI. That is useful, but it preserves the existing design by default.',22],
        ['native-question-two','Complete the AI-native question.','If intelligence had been available from Day 1, would we have designed the work this way at all? Let the discomfort remain.',30],
        ['automate-past','Reject automation of the past.','A faster legacy chain can still be the wrong chain. Briefly trace the human preparation burden, then let it collapse.',28],
        ['start-outcome','Start with the outcome.','Do not preserve “produce the report.” Begin with understanding change, causality, the future, and the decision required.',32],
        ['redistribute','Redistribute the work.','The better question is not simply what AI can do. Ask how work should now be distributed across both capability domains.',34],
        ['real-job','Give AI a real job.','If AI joins the workforce, give it responsibility, context, boundaries, tools, an outcome, and a performance expectation—not only a prompt.',30],
        ['constitution-return','Recall Culture, Constitution, and Impact.','We already know how to begin: teach it how we work, how it must behave, and why it is here. Do not reteach the framework.',24],
        ['human-command','Keep the human in command.','Autonomy never means absent accountability. Deliberately decide where AI may act, where it must ask, and where humans decide.',28],
        ['measure-better','Measure organizational capability.','Hours saved matter, but a faster old process may remain an old process. Ask whether quality, insight, decisions, and human capacity improved.',34],
        ['thirty-days','Issue the 30-day challenge.','Do not transform the whole company on Monday. Choose one process, give AI meaningful work, and define one measurable outcome.',30],
        ['four-weeks','Make action feel achievable.','Understand, redesign, experiment, then measure and learn. This is a challenge and learning rhythm, not a certification method.',28],
        ['flywheel','Show how capability compounds.','Experience produces learning; learning enables redesign; redesign creates capability; capability enables better experience.',24],
        ['theory','Introduce the closing belief.','We will not become AI-native by reading another hundred pages. Theory informs and gives us language.',22],
        ['experience','Complete the closing belief.','We become AI-native by working with AI, giving it real problems, learning where it surprises and fails us, then redesigning.',30],
        ['using-callback','Return to the original gap.','Using AI is valuable, but it is not the destination. Recall the opening provocation without labeling the callback.',20],
        ['become-native','Resolve the provocation.','Let Using AI recede. The invitation is active and optimistic: become AI-native.',24],
        ['human-times','Return to multiplication.','Pause on Human × AI. The point is mutual amplification, not people merely operating a tool.',20],
        ['human-equation','Complete the multiplication equation.','When work is redesigned, human and artificial capability change what each other can achieve. Do not over-explain.',24],
        ['extraordinary','Begin the human close.','We are living through extraordinary technological progress. Approach it with curiosity, not fear.',30],
        ['human-purpose','Return responsibility to people.','AI expands what people can achieve. As AI becomes more capable, leadership responsibility grows: purpose, values, judgment, and leadership remain clear.',38],
        ['final-invitation','Invite action.','Closing script: “We are living through one of the most extraordinary periods of technological progress in our lifetime. And I do not think we should approach it with fear. I think we should approach it with curiosity. AI can augment our work in ways we are only beginning to understand. But becoming AI-native is not about replacing the people in our organizations. It is about expanding what those people are capable of achieving. Our AI employees will become more knowledgeable, more autonomous, and more capable. And that means our responsibility as leaders becomes greater, not smaller. Because someone still needs to provide the purpose. Someone still needs to define the values. Someone still needs to exercise judgment. And someone needs to bring human and artificial intelligence together into one extraordinary team. Theory informs. Experience transforms. So do not leave here and simply learn more about AI. Give it meaningful work. Start becoming AI-native. Thank you.”',34],
        ['final-rest','Hold the final resting screen.','The human has closed. Leave this quiet screen visible for applause, transition, or Q&A.',90],
      ].map(([id, cue, notes, seconds]) => ({ id: id as string, cue: cue as string, notes: notes as string, seconds: id === 'final-rest' ? 90 : Math.round(seconds as number * .72) })),
    },
  ],
} satisfies Edition)

const indiaScene = <T extends SceneContent['id']>(id: T) => indiaCfo.scenes.find(scene => scene.id === id) as Extract<SceneContent, { id: T }>

export const bratislavaV2 = validateEdition({
  id: 'bratislava-v2', durationMinutes: 50, presenter: 'Felix Burcea',
  scenes: [
    {
      ...indiaScene('boot'), eventLabel: 'Executive Experience · Bratislava',
      greeting: 'Dobrý deň. Welcome.', greetingCaption: 'SLOVAK WELCOME · ENGLISH CONTINUATION · DIGITAL FELIX',
      video: { src: '../video/AI_Native_Bratislava_Digital_Felix_Opening.mp4', label: 'DIGITAL FELIX', state: 'BRATISLAVA VIDEO · LOCAL', fallbackTitle: 'Digital Felix greeting unavailable', fallbackStatus: 'CONTINUE LIVE WITH FELIX' },
      beats: [
        { id: 'signal', cue: 'Open on the signal.', notes: 'Let the room settle.', seconds: 15 },
        { id: 'identity', cue: 'Your next employee might be AI.', notes: 'Pause after AI.', seconds: 25 },
        { id: 'greeting', cue: 'Play the Bratislava Digital Felix opening.', notes: 'Select Play Digital Felix. Let the Slovak → English opening play without narration.', seconds: 65 },
        { id: 'handover', cue: 'Take the room live.', notes: 'Digital Felix reveals the twin, introduces AI-native work, then hands to the real Felix.', seconds: 25 },
      ],
    },
    {
      ...indiaScene('gap'), question: 'Where are you with AI?',
      maturity: [{ number: '01', label: 'Individual experiments' }, { number: '02', label: 'AI assists daily work' }, { number: '03', label: 'AI owns workflow steps' }, { number: '04', label: 'Work is redesigned around AI' }],
      gap: ['USING AI TOOLS', 'BECOMING AI-NATIVE'], northStar: ['If AI existed on Day 1,', 'would we design how work gets done', 'the same way?'],
    },
    { ...indiaScene('employee'), finalQuestion: ['If this is an AI-native employee,', 'what does it need before it can work?'] },
    { ...indiaScene('onboarding'), signal: { ...indiaScene('onboarding').signal, final: 'MARKET OPPORTUNITY DETECTED' } },
    {
      ...indiaScene('work'), mode: 'company15', company15: fifteenMinuteCompany, title: 'THE 15-MINUTE COMPANY', hudTitle: '15-MINUTE COMPANY', scenario: 'NOVA · NEW BUSINESS MISSION',
      beats: [
        ['mission','Open the 15-minute company.','Five AI employees. One human leader. Thirty days to market.',35],
        ['opportunity','Make the opportunity immediately relatable.','NOVA ONE helps small businesses answer, schedule and follow up.',40],
        ['board-role','Make the audience the Board.','Their decisions shape the simulated strategy.',30],
        ['market-decision','Ask who NOVA should serve first.','Reveal all three choices, then vote.',100],
        ['market-result','Show the selected strategic implications.','The choice changes economics, product and route to market.',45],
        ['mission-accepted','Employee 001 accepts the mission.','Activate the AI-native organization.',30],
        ['organization-activate','Bring five employees online.','Give every employee a stable identity, task and deliverable.',45],
        ['orchestration','Decompose and distribute the work.','The center of the experience is coordinated work, not five parallel cards.',45],
        ['collaboration','Show dependencies changing the work.','Market insight changes product; product changes economics and risk.',55],
        ['market-brief','Deliver the market opportunity brief.','Clearly mark every number as a fictional scenario input.',45],
        ['financial-model','Reveal the compact financial model.','Pricing, CAC, margin and scenarios follow the selected segment.',55],
        ['financial-scenarios','Compare conservative, base and ambitious scenarios.','Keep formulas correct and the chart legible.',50],
        ['product-shell','Reveal NOVA ONE as a real product.','This is the first product wow moment.',45],
        ['product-activity','Bring the product prototype to life.','Show inquiry, availability, draft response and human approval.',55],
        ['campaign','Deliver the segment-specific launch campaign.','Make the positioning tangible, not generic.',45],
        ['roadmap','Build the controlled 30-day roadmap.','A plan and prototype are not a production-ready system.',55],
        ['consolidate','Return completed deliverables to Employee 001.','Make collaboration converge visibly.',45],
        ['executive-brief','Present the board recommendation.','Assessments are fictional simulation judgments.',55],
        ['launch-decision','Ask the Board to approve, pivot or stop.','Retain the selection for the governance reveal.',100],
        ['launch-result','Show the consequence of the Board decision.','Every choice has a credible strategic cost.',45],
        ['governance-alert','Detect the secondary-data-use dependency.','Employee 045 interrupts the recommendation.',45],
        ['privacy-detail','Explain the issue precisely.','The proposed secondary use lacks an established lawful basis, notices or permissions.',55],
        ['authority','Land the authority lesson.','High confidence is not authority.',40],
        ['governance-decision','Ask the Board what to do.','Cancel, ignore, or redesign with governance built in.',100],
        ['governance-result','Show the selected consequence.','Do not turn the choice into a simplistic quiz.',50],
        ['redesign','Coordinate the privacy-by-design response.','Product, risk, finance and growth update the business together.',55],
        ['revised-plan','Show the revised executive recommendation.','Higher cost, narrower scope, reduced exposure, review still required.',55],
        ['human-direction','Return direction and authorization to people.','AI generated options. Humans chose direction.',40],
        ['human-times','Resolve with Human × AI.','Together, they redesigned the business.',40],
      ].map(([id, cue, notes, seconds]) => ({ id: id as string, cue: cue as string, notes: notes as string, seconds: seconds as number })),
    },
    {
      ...indiaScene('leadership'),
      redistribution: { ...indiaScene('leadership').redistribution, ai: ['RESEARCH', 'MONITORING', 'CUSTOMER SIGNALS', 'ANALYSIS', 'SCENARIO GENERATION', 'COORDINATION', 'EXECUTION WITHIN BOUNDARIES'] },
      workforce: { ...indiaScene('leadership').workforce, specialist: 'EMPLOYEES 014 · 021 · 032 · 045' },
    },
    {
      ...indiaScene('action'), title: 'YOUR AI-NATIVE MONDAY', hudTitle: 'YOUR MONDAY', opening: ['YOUR', 'AI-NATIVE MONDAY'],
      activationQuestions: ['WHAT REPETITIVE PROCESS WOULD YOU REDESIGN WITH AI?', 'WHAT RESPONSIBILITY WOULD YOU GIVE ONE AI EMPLOYEE TOMORROW?', 'WHICH DECISION WOULD YOU IMPROVE WITH AI INTELLIGENCE — WHILE KEEPING HUMAN ACCOUNTABILITY?'],
      closingMessage: ["DON'T JUST USE AI.", 'BUILD A DIFFERENT WAY OF WORKING.'],
      final: { ...indiaScene('action').final, philosophy: ['THE EXPERIENCE', 'HUMAN × AI'] },
      beats: [
        { id: 'monday-question', cue: 'Introduce Your AI-Native Monday.', notes: 'Move from leadership to personal action.', seconds: 25 },
        { id: 'activation-one', cue: 'Ask which repetitive process to redesign.', notes: 'Pause for reflection.', seconds: 55 },
        { id: 'activation-two', cue: 'Ask what responsibility an AI employee should own.', notes: 'Responsibility is more meaningful than a tool use case.', seconds: 55 },
        { id: 'activation-three', cue: 'Ask which decision should improve.', notes: 'Keep human accountability explicit.', seconds: 60 },
        { id: 'different-work', cue: 'Close the practical activation.', notes: 'Do not just use AI. Build a different way of working.', seconds: 45 },
        { id: 'human-times', cue: 'Resolve with Human × AI.', notes: 'The multiplication is the operating model.', seconds: 30 },
        { id: 'final-invitation', cue: 'Invite the room to begin.', notes: 'Close live, then advance once more.', seconds: 35 },
        { id: 'final-rest', cue: 'Hold the final resting screen.', notes: 'Leave visible for applause or Q&A.', seconds: 90 },
      ],
    },
  ],
} satisfies Edition)

export const editions = { 'india-cfo': indiaCfo, 'bratislava-v2': bratislavaV2 }
