import type { CSSProperties } from 'react'
import { PresenterDecision } from '../components/PresenterDecision'
import type { OnboardingSceneContent } from '../content/editions'

type Props = { beat: number; content: OnboardingSceneContent; selectedChoice: string | null; onSelectChoice: (id: string) => void }

export function OnboardingScene({ beat, content, selectedChoice, onSelectChoice }: Props) {
  const id = content.beats[beat].id
  const moduleState = beat >= 27 ? 3 : beat >= 19 ? 2 : beat >= 9 ? 1 : 0
  const opening = beat <= 1
  const setup = beat >= 2 && beat <= 3
  const culture = beat >= 4 && beat <= 9
  const constitution = beat >= 10 && beat <= 19
  const impact = beat >= 20 && beat <= 26
  const completion = beat >= 27 && beat <= 28

  return (
    <section className={`scene onboarding-scene beat-${id}`} aria-labelledby="onboarding-title">
      <div className="scene-index"><span>{content.number}</span><span>{content.title}</span></div>
      {opening && <div className="onboarding-opening"><p>{content.opening[0]}</p>{beat === 1 && <h2 id="onboarding-title">{content.opening[1]}</h2>}</div>}
      {setup && <div className="readiness-stage">
        <MiniEmployee label={content.entity} active={false} />
        <div className="readiness-copy"><small>{content.readiness.capability}</small><strong>{content.readiness.organization}</strong></div>
        {beat === 3 && <ModuleRail content={content} complete={0} />}
      </div>}
      {culture && <CultureStage beat={beat} content={content} />}
      {constitution && <ConstitutionStage beat={beat} content={content} selectedChoice={selectedChoice} onSelectChoice={onSelectChoice} />}
      {impact && <ImpactStage beat={beat} content={content} />}
      {completion && <CompletionStage beat={beat} content={content} />}
      {beat === 29 && <div className="what-did"><h2>{content.signature.question}</h2></div>}
      {beat === 30 && <div className="workforce-statement"><p>{content.signature.statement[0]}</p><h2>{content.signature.statement[1]}<br /><em>{content.signature.statement[2]}</em></h2><strong>{content.signature.framework}</strong><small>{content.signature.support}</small></div>}
      {beat === 31 && <SignalStage content={content} />}
      {!opening && !setup && beat < 29 && <ModuleRail content={content} complete={moduleState} compact />}
    </section>
  )
}

function MiniEmployee({ label, active, loading = false }: { label: string; active: boolean; loading?: boolean }) {
  return <div className={`mini-employee ${active ? 'active' : ''} ${loading ? 'loading' : ''}`}><div className="mini-rings"><i /><i /><i /></div><div className="mini-core"><small>001</small><strong>{label}</strong><span>{active ? 'READY' : 'CAPABLE'}</span></div></div>
}

function ModuleRail({ content, complete, compact = false }: { content: OnboardingSceneContent; complete: number; compact?: boolean }) {
  return <div className={`module-rail ${compact ? 'compact' : ''}`}>{content.modules.map((module, index) => <div className={index < complete ? 'complete' : index === complete ? 'current' : ''} key={module.id}><span>{module.number}</span><strong>{module.label}</strong><small>{index < complete ? '✓ LOADED' : '[ LOCKED ]'}</small></div>)}</div>
}

function CultureStage({ beat, content }: { beat: number; content: OnboardingSceneContent }) {
  const questionCount = Math.max(0, Math.min(3, beat - 4))
  const loading = beat === 8
  const loaded = beat === 9
  if (beat === 4) return <div className="module-intro"><p className="kicker">01 · CULTURE</p><h2>{content.culture.premise}</h2></div>
  return <div className="culture-stage">
    <div className="culture-questions">{content.culture.questions.map((question, index) => <div className={index < questionCount || loading || loaded ? 'visible' : ''} key={question}><span>0{index + 1}</span><h2>{question}</h2></div>)}</div>
    <div className="context-transfer"><MiniEmployee label={content.entity} active={loaded} loading={loading} /><p>{loaded ? content.culture.loaded : loading ? content.culture.loading : 'PROVIDING ORGANIZATIONAL CONTEXT'}</p></div>
  </div>
}

function ConstitutionStage({ beat, content, selectedChoice, onSelectChoice }: { beat: number; content: OnboardingSceneContent; selectedChoice: string | null; onSelectChoice: (id: string) => void }) {
  if (beat === 10) return <div className="module-intro constitution-intro"><p className="kicker">02 · CONSTITUTION</p><h2>{content.constitution.premise}</h2><span>{content.constitution.principle}</span></div>
  if (beat >= 11 && beat <= 15) {
    const count = beat - 10
    return <div className="boundary-stage"><MiniEmployee label={content.entity} active /><div className="boundary-ring" />
      <div className="operating-rules">{content.constitution.rules.map((rule, index) => <div className={index < count ? 'visible' : ''} key={rule.label} style={{ '--rule': index } as CSSProperties}><strong>{rule.label}</strong><span>{rule.question}</span></div>)}</div>
      <p>{content.constitution.premise}</p>
    </div>
  }
  if (beat === 16) return <div className="decision-prompt">{content.constitution.decision.prompt.map((line, index) => index === 2 ? <h2 key={line}>{line}</h2> : <p key={line}>{line}</p>)}</div>
  if (beat === 17 || beat === 18) return <div className="decision-stage">
    {beat === 17 && <h2>CHOOSE THE BOUNDARY.</h2>}
    <PresenterDecision active choices={content.constitution.decision.choices} selectedId={selectedChoice} showConsequence={beat === 18} onSelect={onSelectChoice} />
    {beat === 18 && selectedChoice && <small className="decision-nuance">DEPENDS ON · {content.constitution.decision.nuance}</small>}
  </div>
  return <div className="module-loaded"><MiniEmployee label={content.entity} active /><h2>{content.constitution.loaded}</h2><p>AUTONOMY BOUNDARY: DEFINED</p></div>
}

function ImpactStage({ beat, content }: { beat: number; content: OnboardingSceneContent }) {
  if (beat === 20) return <div className="impact-question">{content.impact.question.map((line, index) => <h2 key={line} className={`line-${index}`}>{line}</h2>)}</div>
  if (beat >= 21 && beat <= 23) { const quality = content.impact.qualities[beat - 21]; return <div className="quality-stage"><small>AN EXCELLENT AI EMPLOYEE IS</small><h2>{quality.label}</h2><p>{quality.statement[0]}<br />{quality.statement[1]}</p></div> }
  if (beat === 24) return <blockquote className="north-star-return"><p>“{content.impact.northStar[0]}<br />{content.impact.northStar[1]}<br /><em>{content.impact.northStar[2]}</em>”</p></blockquote>
  if (beat === 25) return <div className="time-saved"><small>DO NOT MEASURE THE AI EMPLOYEE ONLY BY</small><h2>{content.impact.performance.insufficient}</h2><span>INSUFFICIENT ON ITS OWN</span></div>
  return <div className="performance-stage"><div className="performance-measures">{content.impact.performance.measures.map(item => <span key={item}>{item}</span>)}</div><p>THE BETTER QUESTION</p><h2>“{content.impact.performance.betterQuestion}”</h2></div>
}

function CompletionStage({ beat, content }: { beat: number; content: OnboardingSceneContent }) {
  return <div className="completion-stage"><MiniEmployee label={content.entity} active={beat === 28} />
    <div className="completion-copy">{content.activation.checks.map(item => <p key={item}><span>✓</span>{item}</p>)}<h2>{beat === 28 ? content.activation.complete : 'READINESS CHECK'}</h2><strong>{beat === 28 ? content.activation.active : 'STATUS: CAPABLE'}</strong></div>
  </div>
}

function SignalStage({ content }: { content: OnboardingSceneContent }) {
  return <div className="signal-stage"><MiniEmployee label={content.entity} active /><div className="maturity-states">{content.signal.states.map(state => <span key={state}>✓ {state}</span>)}</div><p>MONITORING<span className="signal-dots">…</span></p><strong>{content.signal.final}</strong></div>
}
