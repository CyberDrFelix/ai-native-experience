import type { CSSProperties } from 'react'
import type { EmployeeSceneContent } from '../content/editions'

export function EmployeeScene({ beat, content }: { beat: number; content: EmployeeSceneContent }) {
  const final = beat === content.beats.length - 1
  const employeeReached = beat >= 4
  const groupCount = Math.max(0, Math.min(content.groups.length, beat - 4))
  const stageIndex = beat === 0 ? -1 : Math.min(beat - 1, content.stages.length - 1)
  const activeStage = stageIndex >= 0 ? content.stages[stageIndex] : null

  return (
    <section className={`scene employee-scene ${employeeReached ? 'employee-active' : ''} ${final ? 'employee-final' : ''}`} aria-labelledby="employee-title">
      <div className="scene-index"><span>{content.number}</span><span>{content.title}</span></div>
      {!final && <div className="employee-stage">
        <div className="evolution" aria-label="Evolution to AI Employee">
          {content.stages.map((stage, index) => <div key={stage.label} className={`${index === stageIndex ? 'current' : ''} ${index < stageIndex ? 'passed' : ''}`}><i /><span>{stage.label}</span></div>)}
        </div>
        <div className="entity-system">
          <div className="entity-rings" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="entity-core">
            <span className="entity-sequence">001</span>
            <h2 id="employee-title">{content.entity}</h2>
            <p>{activeStage ? activeStage.promise : content.initializing}</p>
          </div>
          <div className="capability-system">
            {content.groups.map((group, groupIndex) => <div key={group.id} className={`capability-group group-${groupIndex} ${groupIndex < groupCount ? 'active' : ''}`} style={{ '--group': groupIndex } as CSSProperties}>
              <small>{group.label}</small>
              {group.capabilities.map(capability => <span key={capability}>{capability}</span>)}
            </div>)}
          </div>
        </div>
        <div className="stage-promise"><span>{activeStage?.label ?? 'SYSTEM'}</span><p>{activeStage?.promise ?? 'Dormant / uninitialized state'}</p></div>
      </div>}
      {final && <blockquote className="employee-question"><p>“{content.finalQuestion[0]}<br /><em>{content.finalQuestion[1]}</em>”</p></blockquote>}
    </section>
  )
}
