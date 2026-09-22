import { VideoPlaceholder } from '../components/VideoPlaceholder'
import type { BootSceneContent } from '../content/editions'

export function BootScene({ beat, content }: { beat: number; content: BootSceneContent }) {
  const id = content.beats[beat].id
  return (
    <section className={`scene boot-scene beat-${id}`} aria-labelledby="boot-title">
      <div className="boot-orbit" aria-hidden="true"><span /><span /><span /></div>
      <div className={`eyebrow reveal ${beat >= 0 ? 'shown' : ''}`}>{content.eyebrow}</div>
      <div className="boot-layout">
        <div className="boot-copy">
          <p className={`kicker reveal ${beat >= 1 ? 'shown' : ''}`}>{content.eventLabel}</p>
          <h1 id="boot-title" className={`reveal ${beat >= 1 ? 'shown' : ''}`}>{content.headline[0]}<br />{content.headline[1].replace('AI.', '')}<em>AI.</em></h1>
          <p className={`boot-answer reveal ${beat >= 1 ? 'shown' : ''}`}>{content.answer}</p>
          <div className={`greeting reveal ${beat >= 2 ? 'shown' : ''}`}>
            <span>{content.greeting}</span><small>{content.greetingCaption}</small>
          </div>
          <div className={`handover reveal ${beat >= 3 ? 'shown' : ''}`}><i /> {content.liveLabel}</div>
        </div>
        <div className={`video-wrap reveal ${beat >= 2 ? 'shown' : ''}`}><VideoPlaceholder active={beat === 2} handover={beat === 3} copy={content.video} /></div>
      </div>
    </section>
  )
}
