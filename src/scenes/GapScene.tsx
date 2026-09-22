import type { CSSProperties } from 'react'
import type { GapSceneContent } from '../content/editions'

export function GapScene({ beat, content }: { beat: number; content: GapSceneContent }) {
  const act = beat <= 2 ? 'maturity' : beat === 3 ? 'gap' : 'north-star'
  const activeCount = beat === 0 ? 1 : beat === 1 ? 2 : 4
  return (
    <section className={`scene gap-scene act-${act}`} aria-labelledby="gap-title">
      <div className="scene-index"><span>{content.number}</span><span>{content.title}</span></div>
      {act === 'maturity' && <div className="maturity-frame">
        <div className="maturity-title"><p className="kicker">{content.kicker}</p><h2 id="gap-title">{content.question}</h2></div>
        <div className="journey" aria-label={`${content.journey.from} to ${content.journey.to}`}><span>{content.journey.from}</span><i><b style={{ width: `${((activeCount - 1) / 3) * 100}%` }} /></i><span>{content.journey.to}</span></div>
        <div className="maturity-positions">
          {content.maturity.map((item, index) => <div className={`maturity-position ${index < activeCount ? 'active' : ''}`} style={{ '--step': index } as CSSProperties} key={item.number}>
            <span className="position-node"><i />{item.number}</span><p>{item.label}</p>
          </div>)}
        </div>
      </div>}
      {act === 'gap' && <div className="gap-statement" aria-label={`${content.gap[0]} is not equal to ${content.gap[1]}`}><p>{content.gap[0]}</p><span>≠</span><p>{content.gap[1]}</p></div>}
      {act === 'north-star' && <blockquote className="north-star"><p>“{content.northStar[0]}<br />{content.northStar[1]}<br /><em>{content.northStar[2]}</em>”</p></blockquote>}
    </section>
  )
}
