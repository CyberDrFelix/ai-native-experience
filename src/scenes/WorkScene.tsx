import { PresenterDecision } from '../components/PresenterDecision'
import type { WorkSceneContent } from '../content/editions'

type Props = { beat: number; content: WorkSceneContent; selectedChoice: string | null; onSelectChoice: (id: string) => void }

const progressByBeat = [0,0,0,1,1,1,1,1,1,1,2,2,2,2,3,3,3,3,4,4,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6]

export function WorkScene({ beat, content, selectedChoice, onSelectChoice }: Props) {
  const id = content.beats[beat].id
  const investigation = beat >= 3 && beat <= 22
  return <section className={`scene work-scene beat-${id}`} aria-labelledby="work-title">
    <div className="scene-index"><span>{content.number}</span><span>{content.scenario}</span></div>
    {investigation && <SimulationProgress stages={content.progress} current={progressByBeat[beat]} />}
    {id === 'anomaly' && <Hero eyebrow="EMPLOYEE 001 · MONITORING" lines={['ANOMALY', 'DETECTED']} accent="QUARTER REVENUE OUTLOOK" />}
    {id === 'forecast-gap' && <ForecastGap content={content} />}
    {id === 'team-question' && <Hero eyebrow={`${content.company} · CFO`} lines={['WHAT WOULD', 'YOUR TEAM DO NEXT?']} />}
    {id === 'investigation' && <ThinkingEmployee label={content.entity} state="INVESTIGATION STARTED" />}
    {id.startsWith('evidence-') && id !== 'evidence-incomplete' && <EvidenceStage content={content} count={Math.max(1, beat - 3)} />}
    {id === 'evidence-incomplete' && <Incomplete content={content} />}
    {id === 'additional-required' && <AdditionalEvidence content={content} />}
    {id === 'specialist-connect' && <Specialist content={content} connected={false} />}
    {id === 'specialist-result' && <Specialist content={content} connected />}
    {id === 'hypotheses' && <Hypotheses content={content} tested={0} />}
    {id === 'test-h1' && <Hypotheses content={content} tested={1} />}
    {id === 'test-h3' && <Hypotheses content={content} tested={2} />}
    {id === 'test-h2' && <Hypotheses content={content} tested={3} />}
    {id === 'challenge-question' && <Hero eyebrow="SELF-CHALLENGE" lines={[content.challenge.question]} />}
    {id === 'challenge-results' && <Challenge content={content} />}
    {id === 'synthesis' && <Synthesis content={content} />}
    {id === 'recommendation' && <Recommendation content={content} />}
    {id === 'confidence' && <Confidence content={content} />}
    {id === 'decision-prompt' && <Hero eyebrow="EMPLOYEE 001 · BOUNDARY REACHED" lines={[content.decision.prompt]} accent="AI PREPARES · HUMAN DECIDES" />}
    {(id === 'decision-choices' || id === 'decision-consequence') && <div className="work-decision"><h2>{id === 'decision-choices' ? 'WHAT SHOULD WE DO?' : 'THE TRADEOFF'}</h2><PresenterDecision active choices={content.decision.choices} selectedId={selectedChoice} showConsequence={id === 'decision-consequence'} onSelect={onSelectChoice} />{id === 'decision-consequence' && selectedChoice && <small>DEPENDS ON · {content.decision.nuance}</small>}</div>}
    {id === 'role-boundary' && <RoleBoundary />}
    {id === 'human-command' && <HumanCommand />}
    {id === 'removed-question' && <Hero eyebrow="PROCESS REDESIGN" lines={['WHAT DID EMPLOYEE 001', 'JUST REMOVE FROM THE HUMAN?']} />}
    {id === 'work-removed' && <WordField title="AI NOW CARRIES" words={content.redistribution.removed} />}
    {id === 'work-retained' && <WordField title="WHAT IT DID NOT REMOVE" words={content.redistribution.retained} human />}
    {id === 'old-model' && <WorkModel title="OLD MODEL" label="HUMAN" words={content.redistribution.old} />}
    {id === 'new-model' && <NewModel content={content} />}
    {id === 'finance-statement' && <Hero eyebrow="AI-NATIVE FINANCE" lines={['AI SHOULD NOT GIVE FINANCE', 'MORE ANALYSIS TO DO.', 'IT SHOULD GIVE FINANCE', 'MORE TIME TO LEAD.']} accent="MORE TIME TO LEAD" />}
    {id === 'maturity' && <Maturity content={content} />}
    {id === 'job-question' && <Hero eyebrow={content.leadership.setup.join(' ')} lines={content.leadership.job} />}
    {id === 'abundance' && <Hero eyebrow="THE LEADERSHIP QUESTION" lines={content.leadership.question} accent="BECOMES ABUNDANT?" />}
  </section>
}

function Hero({ eyebrow, lines, accent }: { eyebrow: string; lines: string[]; accent?: string }) {
  return <div className="work-hero"><small>{eyebrow}</small><h2>{lines.map(line => <span className={line === accent ? 'accent' : ''} key={line}>{line}</span>)}</h2></div>
}
function SimulationProgress({ stages, current }: { stages: string[]; current: number }) {
  return <div className="simulation-progress" aria-label={`Investigation stage: ${stages[current]}`}>{stages.map((stage, index) => <div className={index < current ? 'done' : index === current ? 'current' : ''} key={stage}><i /><span>{stage}</span></div>)}</div>
}
function ThinkingEmployee({ label, state }: { label: string; state: string }) { return <div className="thinking-employee"><div className="thought-orbit"><i /><i /><i /></div><div><small>001</small><h2>{label}</h2><strong>{state}</strong></div></div> }
function ForecastGap({ content }: { content: WorkSceneContent }) { return <div className="forecast-gap"><small>{content.company} · {content.trigger.label}</small><div><p><span>PRIOR</span>{content.trigger.baseline}</p><i>→</i><p className="current"><span>CURRENT</span>{content.trigger.current}</p></div><strong>{content.trigger.change}</strong><h2>{content.trigger.gap} GAP</h2></div> }
function EvidenceStage({ content, count }: { content: WorkSceneContent; count: number }) { return <div className="evidence-stage"><ThinkingEmployee label={content.entity} state="GATHERING EVIDENCE" /><div className="evidence-list">{content.evidence.map((item,index)=><div className={index < count ? 'ingested' : ''} key={item.source}><small>0{index+1}</small><p>{item.source}<strong>{index < count ? item.finding : 'PENDING'}</strong></p></div>)}</div></div> }
function Incomplete({ content }: { content: WorkSceneContent }) { return <div className="incomplete"><small>CURRENT FINDING</small><h2>REGION SOUTH<br/>CONVERSION DETERIORATION</h2><div><span>ROOT-CAUSE CONFIDENCE</span><strong>41%</strong></div><p>EVIDENCE INCOMPLETE</p></div> }
function AdditionalEvidence({ content }: { content: WorkSceneContent }) { return <div className="additional"><small>EMPLOYEE 001 · UNCERTAINTY RECOGNIZED</small><h2>ADDITIONAL EVIDENCE<br/><em>REQUIRED</em></h2><div>{content.missingEvidence.map(item=><span key={item}>+ {item}</span>)}</div></div> }
function Specialist({ content, connected }: { content: WorkSceneContent; connected: boolean }) { return <div className={`specialist ${connected?'connected':''}`}><div><small>001</small><strong>EMPLOYEE 001</strong><span>INVESTIGATING</span></div><i/><div><small>{content.specialist.id}</small><strong>{content.specialist.name}</strong><span>{connected?'EVIDENCE RETURNED':'CONNECTING'}</span></div><p>{connected ? content.specialist.findings.map(x=><b key={x}>✓ {x}</b>) : content.specialist.request}</p>{connected&&<em>{content.specialist.conclusion}</em>}</div> }
function Hypotheses({ content, tested }: { content: WorkSceneContent; tested: number }) { return <div className="hypotheses"><small>WORKING HYPOTHESES · CURRENT EVIDENCE</small>{content.hypotheses.map((h,index)=><div className={index < tested ? (h.result.startsWith('LOW')?'weak':'strong') : ''} key={h.id}><b>{h.id}</b><h2>{h.label}</h2><span>{index < tested ? h.result : 'TESTING'}</span>{index < tested && <p>{h.evidence.join(' · ')}</p>}</div>)}</div> }
function Challenge({ content }: { content: WorkSceneContent }) { return <div className="challenge"><small>SELF-CHALLENGE · FALSIFICATION CHECK</small><div>{content.challenge.tests.map(test=><p key={test.label}><span>{test.label}</span><strong>{test.result}</strong></p>)}</div><h2>{content.challenge.conclusion}</h2></div> }
function Synthesis({ content }: { content: WorkSceneContent }) { return <div className="synthesis"><small>DECISION SYNTHESIS</small>{content.synthesis.map(item=><div key={item.question}><span>{item.question}</span><strong>{item.answer}</strong></div>)}<footer><b>{content.explained} <span>OF €60M LIKELY EXPLAINED</span></b><b>{content.unexplained} <span>REMAINS UNEXPLAINED</span></b></footer></div> }
function Recommendation({ content }: { content: WorkSceneContent }) { return <div className="recommendation"><small>RECOMMENDATION · EMPLOYEE 001</small><h2>RECOMMENDATION READY</h2>{content.recommendations.map((item,index)=><p key={item.horizon}><b>0{index+1} · {item.horizon}</b><span>{item.action}</span></p>)}</div> }
function Confidence({ content }: { content: WorkSceneContent }) { return <div className="confidence"><small>DECISION READINESS · UNCERTAINTY VISIBLE</small><h2>{content.confidence}</h2><p>CONFIDENCE</p><div><strong>{content.explained}<span>KNOWN · LIKELY EXPLAINED</span></strong><strong>{content.unexplained}<span>UNKNOWN · INVESTIGATION CONTINUES</span></strong></div></div> }
function RoleBoundary(){return <div className="role-boundary"><div><small>AI</small>{['INVESTIGATES','ANALYSES','CHALLENGES','RECOMMENDS'].map(x=><strong key={x}>{x}</strong>)}</div><i>→</i><div className="human"><small>HUMAN</small>{['JUDGES','DECIDES','OWNS THE OUTCOME'].map(x=><strong key={x}>{x}</strong>)}</div></div>}
function HumanCommand(){return <div className="human-command"><p>HUMAN <s>IN THE LOOP</s></p><h2>HUMAN<br/><em>IN COMMAND</em></h2></div>}
function WordField({title,words,human=false}:{title:string;words:string[];human?:boolean}){return <div className={`word-field ${human?'human':''}`}><small>{title}</small>{words.map((word,index)=><strong key={word}><span>0{index+1}</span>{word}</strong>)}</div>}
function WorkModel({title,label,words}:{title:string;label:string;words:string[]}){return <div className="work-model"><small>{title}</small><h2>{label}</h2><div>{words.map(x=><span key={x}>{x}</span>)}</div></div>}
function NewModel({content}:{content:WorkSceneContent}){return <div className="new-model"><small>AI-NATIVE MODEL</small><div><b>AI</b>{content.redistribution.ai.map(x=><span key={x}>{x}</span>)}</div><i>→</i><div className="human"><b>HUMAN</b>{content.redistribution.human.map(x=><span key={x}>{x}</span>)}</div></div>}
function Maturity({content}:{content:WorkSceneContent}){return <div className="work-maturity"><ThinkingEmployee label={content.entity} state="WORKING"/><div>{content.maturity.map(x=><p key={x}>✓ <strong>{x}</strong></p>)}</div></div>}
