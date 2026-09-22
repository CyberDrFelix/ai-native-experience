import type { LeadershipSceneContent } from '../content/editions'

type Props = { beat: number; content: LeadershipSceneContent }

export function LeadershipScene({ beat, content }: Props) {
  const id = content.beats[beat].id
  return <section className={`scene leadership-scene beat-${id}`} aria-labelledby="leadership-title">
    <div className="scene-index"><span>{content.number}</span><span>{content.title}</span></div>
    {id === 'abundance-inherited' && <Statement eyebrow="THE LEADERSHIP QUESTION" lines={content.inheritedQuestion} accent="BECOMES ABUNDANT?" />}
    {id === 'differentiation' && <Differentiation />}
    {id === 'values-two' && <HumanValues content={content} count={2} />}
    {id === 'values-four' && <HumanValues content={content} count={4} />}
    {id === 'values-six' && <HumanValues content={content} count={6} />}
    {id === 'trust-decide-own' && <TrustDecideOwn />}
    {id === 'ai-work' && <WorkShift title="AI / DIGITAL WORKFORCE" words={content.redistribution.ai} direction="INCREASINGLY OWNS" />}
    {id === 'human-work' && <WorkShift title="HUMAN CONTRIBUTION" words={content.redistribution.human} direction="CONCENTRATES AROUND" human />}
    {id === 'work-moves' && <Statement eyebrow="HUMAN WORK MOVES UPWARD" lines={content.redistribution.statement} accent="CREATES VALUE." />}
    {id === 'loop-question' && <Statement eyebrow="THE GOAL IS NOT" lines={[content.command.loop]} muted />}
    {id === 'command-reveal' && <HumanCommand content={content} />}
    {id === 'leader-job' && <LeaderQuestion content={content} />}
    {id === 'leader-build' && <LeadershipBuild content={content} />}
    {id === 'orchestration' && <Statement eyebrow="THE LEADERSHIP SHIFT" lines={content.orchestration} accent="OF CAPABILITY." />}
    {id === 'human-workforce' && <HybridWorkforce content={content} state="human" />}
    {id === 'ai-workforce' && <HybridWorkforce content={content} state="ai" />}
    {id === 'one-workforce' && <HybridWorkforce content={content} state="together" />}
    {id === 'command-plane' && <HybridWorkforce content={content} state="orchestrated" />}
    {id === 'future-leader-one' && <Signature content={content} complete={false} />}
    {id === 'future-leader-two' && <Signature content={content} complete />}
    {id === 'one-team' && <OneTeam content={content} />}
    {id === 'human-plus-ai' && <Equation value={content.multiplication.additive} label="WORKING BESIDE EACH OTHER" />}
    {id === 'human-times-ai' && <Equation value={content.multiplication.multiplicative} label="REDESIGNED TO AMPLIFY" multiply />}
    {id === 'multiplication' && <Equation value={content.multiplication.equation} label="BECOME AI-NATIVE" multiply />}
    {id === 'organization-day-one' && <Statement eyebrow="THE NORTH STAR · EVOLVED" lines={content.dayOne} accent="THE SAME WAY?" />}
    {id === 'theory-informs' && <Philosophy content={content} complete={false} />}
    {id === 'experience-transforms' && <Philosophy content={content} complete />}
    {id === 'monday-cliffhanger' && <Statement eyebrow="FROM LEADERSHIP TO ACTION" lines={[content.transition]} accent={content.transition} />}
  </section>
}

function Statement({ eyebrow, lines, accent, muted=false }: { eyebrow:string; lines:string[]; accent?:string; muted?:boolean }) {
  return <div className={`lead-statement ${muted?'muted':''}`}><small>{eyebrow}</small><h2>{lines.map(line=><span className={line===accent?'accent':''} key={line}>{line}</span>)}</h2></div>
}
function Differentiation(){return <div className="differentiation"><p>ACCESS TO INTELLIGENCE</p><h2>BECOMES LESS<br/><span>DIFFERENTIATING.</span></h2><strong>WHAT WE DO WITH IT BECOMES MORE VALUABLE.</strong></div>}
function HumanValues({content,count}:{content:LeadershipSceneContent;count:number}){return <div className="human-values"><small>WHEN INTELLIGENCE BECOMES ABUNDANT</small><div className="value-orbit" aria-hidden="true"/><div>{content.humanValues.map((value,index)=><p className={index<count?'visible':''} key={value.word}><strong>{value.word}</strong><span>{value.meaning}</span></p>)}</div></div>}
function TrustDecideOwn(){return <div className="trust-decide"><small>HUMAN DIFFERENTIATION</small><p>WHICH ANSWER TO <em>TRUST</em></p><p>WHAT DECISION TO <em>MAKE</em></p><p>WHAT RESPONSIBILITY TO <em>ACCEPT</em></p></div>}
function WorkShift({title,words,direction,human=false}:{title:string;words:string[];direction:string;human?:boolean}){return <div className={`lead-work-shift ${human?'human':''}`}><small>{direction}</small><h2>{title}</h2><div>{words.map((word,index)=><span key={word}><i>{String(index+1).padStart(2,'0')}</i>{word}</span>)}</div></div>}
function HumanCommand({content}:{content:LeadershipSceneContent}){return <div className="lead-command"><small>{content.command.loop}?</small><h2>{content.command.command}</h2><div>{content.command.establishes.map(x=><span key={x}>{x}</span>)}</div></div>}
function EmployeeNode({content}:{content:LeadershipSceneContent}){return <div className="lead-employee"><div/><small>001</small><strong>{content.entity}</strong><span>ACTIVE · WORKING</span></div>}
function LeaderQuestion({content}:{content:LeadershipSceneContent}){return <div className="leader-question"><EmployeeNode content={content}/><h2>SO WHAT IS<br/>THE LEADER'S JOB?</h2></div>}
function LeadershipBuild({content}:{content:LeadershipSceneContent}){return <div className="leadership-build"><small>THE LEADER DESIGNS THE SYSTEM</small><div>{content.leadershipCapabilities.map((word,index)=><p key={word}><i>0{index+1}</i><strong>{word}</strong></p>)}</div><EmployeeNode content={content}/></div>}
function HybridWorkforce({content,state}:{content:LeadershipSceneContent;state:'human'|'ai'|'together'|'orchestrated'}){const ai=state!=='human';const together=state==='together'||state==='orchestrated';const relationCount=state==='orchestrated'?4:2;return <div className={`hybrid-workforce state-${state}`}><div className="workforce-domain human"><small>HUMAN WORKFORCE</small>{content.workforce.human.map(x=><span key={x}>{x}</span>)}</div>{together&&<><div className="orchestration-layer"><strong>{state==='orchestrated'?'LEADERSHIP / ORCHESTRATION':'TWO FORMS OF CAPABILITY'}</strong><span>{state==='orchestrated'?'ONE WORKFORCE · DIFFERENT CAPABILITIES · SHARED OUTCOME':'BECOMING ONE WORKFORCE'}</span></div><div className="capability-relationships">{content.workforce.relationships.slice(0,relationCount).map(pair=><p key={pair.human}><strong>{pair.human}</strong><i>↔</i><span>{pair.ai}</span></p>)}</div></>}<div className={`workforce-domain ai ${ai?'visible':''}`}><small>AI WORKFORCE</small>{content.workforce.ai.map(x=><span key={x}>{x}</span>)}<EmployeeNode content={content}/><em>{content.workforce.specialist}</em></div></div>}
function Signature({content,complete}:{content:LeadershipSceneContent;complete:boolean}){return <div className="lead-signature"><small>THE AI-NATIVE LEADER</small><h2>{content.signature.slice(0,complete?6:3).map((line,index)=><span className={index>=2?'accent':''} key={line}>{line}</span>)}</h2></div>}
function OneTeam({content}:{content:LeadershipSceneContent}){return <div className="one-team"><div><span>HUMAN CAPABILITY</span><span>AI CAPABILITY</span></div><h2>{content.team}</h2><p>SHARED INTENT · SHARED OUTCOME</p></div>}
function Equation({value,label,multiply=false}:{value:string;label:string;multiply?:boolean}){return <div className={`lead-equation ${multiply?'multiply':''}`}><small>{label}</small><h2>{value}</h2></div>}
function Philosophy({content,complete}:{content:LeadershipSceneContent;complete:boolean}){return <div className="philosophy"><p>{content.philosophy[0]}</p>{complete&&<h2>{content.philosophy[1]}</h2>}</div>}
