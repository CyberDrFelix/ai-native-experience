import type { ActionSceneContent } from '../content/editions'

type Props = { beat: number; content: ActionSceneContent }

export function ActionScene({ beat, content }: Props) {
  const id = content.beats[beat].id
  if (content.activationQuestions) return <BratislavaAction id={id} content={content} />
  return <section className={`scene action-scene beat-${id}`} aria-labelledby="action-title">
    {id !== 'final-rest' && <div className="scene-index"><span>{content.number}</span><span>{content.title}</span></div>}
    {id === 'monday-question' && <ActionStatement lines={content.opening} />}
    {id === 'pick-process' && <PickProcess content={content} />}
    {id === 'native-question-one' && <ActionStatement eyebrow="THE AI-NATIVE QUESTION" lines={content.nativeQuestion.slice(0,3)} />}
    {id === 'native-question-two' && <ActionStatement eyebrow="THE AI-NATIVE QUESTION" lines={content.nativeQuestion.slice(3)} accent />}
    {id === 'automate-past' && <Legacy content={content} />}
    {id === 'start-outcome' && <Outcome content={content} />}
    {id === 'redistribute' && <Redistribute content={content} />}
    {id === 'real-job' && <RealJob content={content} />}
    {id === 'constitution-return' && <ConstitutionReturn content={content} />}
    {id === 'human-command' && <ActionCommand />}
    {id === 'measure-better' && <Measures content={content} />}
    {id === 'thirty-days' && <Challenge content={content} showWeeks={false} />}
    {id === 'four-weeks' && <Challenge content={content} showWeeks />}
    {id === 'flywheel' && <Flywheel content={content} />}
    {id === 'theory' && <Philosophy content={content} complete={false} />}
    {id === 'experience' && <Philosophy content={content} complete />}
    {id === 'using-callback' && <GapCallback content={content} resolved={false} />}
    {id === 'become-native' && <GapCallback content={content} resolved />}
    {id === 'human-times' && <ActionStatement eyebrow="NOT ADDITION · AMPLIFICATION" lines={[content.equation.first]} accent />}
    {id === 'human-equation' && <ActionStatement eyebrow="BECOME AI-NATIVE" lines={[content.equation.final]} accent compact />}
    {id === 'extraordinary' && <ActionStatement eyebrow="A HUMAN FUTURE" lines={[content.humanClose[0]]} />}
    {id === 'human-purpose' && <HumanClose content={content} />}
    {id === 'final-invitation' && <ActionStatement eyebrow="GIVE AI MEANINGFUL WORK" lines={['BECOME', 'AI-NATIVE.']} accent />}
    {id === 'final-rest' && <FinalRest content={content} />}
  </section>
}

function BratislavaAction({ id, content }: { id: string; content: ActionSceneContent }) {
  const questionIndex = id === 'activation-one' ? 0 : id === 'activation-two' ? 1 : 2
  return <section className={`scene action-scene bratislava-action beat-${id}`} aria-labelledby="action-title">
    {id !== 'final-rest' && <div className="scene-index"><span>{content.number}</span><span>{content.title}</span></div>}
    {id === 'monday-question' && <ActionStatement lines={content.opening} accent />}
    {id.startsWith('activation-') && <div className="activation-question"><small>QUESTION 0{questionIndex + 1} · YOUR AI-NATIVE MONDAY</small><h2>{content.activationQuestions![questionIndex]}</h2><span>PAUSE · REFLECT · DISCUSS</span></div>}
    {id === 'different-work' && <ActionStatement eyebrow="THE INVITATION" lines={content.closingMessage!} accent />}
    {id === 'human-times' && <ActionStatement eyebrow="THE OPERATING MODEL" lines={[content.equation.first]} accent />}
    {id === 'final-invitation' && <ActionStatement eyebrow="START WITH ONE MEANINGFUL RESPONSIBILITY" lines={content.closingMessage!} accent />}
    {id === 'final-rest' && <FinalRest content={content} />}
  </section>
}

function ActionStatement({lines,eyebrow,accent=false,compact=false}:{lines:string[];eyebrow?:string;accent?:boolean;compact?:boolean}){return <div className={`action-statement ${compact?'compact':''}`} >{eyebrow&&<small>{eyebrow}</small>}<h2>{lines.map((line,index)=><span className={accent&&index===lines.length-1?'accent':''} key={line}>{line}</span>)}</h2></div>}
function PickProcess({content}:{content:ActionSceneContent}){return <div className="pick-process"><h2><span>PICK</span><span>ONE</span><span>PROCESS.</span></h2><p>CHOOSE ONE THAT MATTERS.</p><div>{content.processExamples.map(x=><span key={x}>{x}</span>)}</div></div>}
function Legacy({content}:{content:ActionSceneContent}){return <div className="legacy"><h2>DON'T AUTOMATE<br/><em>THE PAST.</em></h2><div>{content.legacyFlow.map((x,index)=><span key={x}>{x}{index<content.legacyFlow.length-1&&<i>→</i>}</span>)}</div><strong>REDESIGN THE FUTURE.</strong></div>}
function Outcome({content}:{content:ActionSceneContent}){return <div className="action-outcome"><small>START WITH THE OUTCOME</small><h2>{content.outcome.question.map(x=><span key={x}>{x}</span>)}</h2><div><p><b>NOT</b><s>{content.outcome.not}</s></p><p><b>BUT</b>{content.outcome.but.map(x=><span key={x}>{x}</span>)}</p></div></div>}
function Redistribute({content}:{content:ActionSceneContent}){return <div className="action-redistribute"><h2>THE OUTCOME</h2><i/><div><section><small>AI / DIGITAL WORKFORCE</small>{content.redistribution.ai.map(x=><span key={x}>{x}</span>)}</section><section><small>HUMAN WORKFORCE</small>{content.redistribution.human.map(x=><span key={x}>{x}</span>)}</section></div></div>}
function ActiveEmployee({content}:{content:ActionSceneContent}){return <div className="action-employee"><div/><small>001</small><strong>{content.employee.label}</strong><span>{content.employee.status}</span></div>}
function RealJob({content}:{content:ActionSceneContent}){return <div className="real-job"><div><h2>GIVE AI<br/><em>A REAL JOB.</em></h2><p>NOT JUST A PROMPT.</p><section>{content.employee.foundations.map(x=><span key={x}>{x}</span>)}</section></div><ActiveEmployee content={content}/></div>}
function ConstitutionReturn({content}:{content:ActionSceneContent}){return <div className="constitution-return"><ActiveEmployee content={content}/><div>{content.employee.modules.map((x,index)=><section key={x}><small>0{index+1}</small><h2>{x}</h2><span>{index===0?'HOW WE WORK':index===1?'HOW IT MUST BEHAVE':'WHY IT IS HERE'}</span></section>)}</div></div>}
function ActionCommand(){return <div className="action-command"><div><strong>AI</strong><span>WORKS.</span></div><i>→</i><div><strong>HUMANS</strong><span>DECIDE.</span></div><h2>HUMAN<br/><em>IN COMMAND.</em></h2></div>}
function Measures({content}:{content:ActionSceneContent}){return <div className="action-measures"><small>HOW WILL YOU KNOW IT WORKED?</small><div>{content.measures.map(x=><strong key={x}>{x}</strong>)}</div><p>TIME SAVED <span>IS NOT ENOUGH</span></p><h2>DID THE ORGANIZATION<br/>BECOME MORE CAPABLE?</h2></div>}
function Challenge({content,showWeeks}:{content:ActionSceneContent;showWeeks:boolean}){return <div className="action-challenge"><small>THE CHALLENGE</small><h2>{content.challenge.title}</h2><div className="challenge-promise">{content.challenge.promise.map(x=><strong key={x}>{x}</strong>)}</div>{showWeeks&&<div className="challenge-weeks">{content.challenge.weeks.map(x=><p key={x.label}><span>{x.label}</span><strong>{x.action}</strong></p>)}</div>}</div>}
function Flywheel({content}:{content:ActionSceneContent}){return <div className="action-flywheel"><small>CAPABILITY COMPOUNDS</small><div>{content.flywheel.map((x,index)=><span key={`${x}-${index}`}>{x}{index<content.flywheel.length-1&&<i>→</i>}</span>)}</div></div>}
function Philosophy({content,complete}:{content:ActionSceneContent;complete:boolean}){return <div className="action-philosophy"><p>{content.philosophy[0]}</p>{complete&&<h2>{content.philosophy[1]}</h2>}</div>}
function GapCallback({content,resolved}:{content:ActionSceneContent;resolved:boolean}){return <div className={`action-gap ${resolved?'resolved':''}`}><p>{resolved?'USING AI':content.callback.using}</p>{!resolved&&<i>≠</i>}<h2>{resolved?'BECOME AI-NATIVE':content.callback.native}</h2></div>}
function HumanClose({content}:{content:ActionSceneContent}){return <div className="human-close"><p>{content.humanClose[1]}</p><div>{content.humanClose.slice(2).map(x=><strong key={x}>{x}</strong>)}</div></div>}
function FinalRest({content}:{content:ActionSceneContent}){return <div className="final-rest"><h2>{content.final.title}</h2><div>{content.final.philosophy.map(x=><p key={x}>{x}</p>)}</div><small>{content.final.presenter}</small></div>}
