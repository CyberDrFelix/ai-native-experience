import { useEffect, useRef, useState } from 'react'
import type { BootSceneContent } from '../content/editions'
type Props = { active: boolean; handover: boolean; copy: BootSceneContent['video'] }

export function VideoPlaceholder({ active, handover, copy }: Props) {
  const video = useRef<HTMLVideoElement>(null)
  const [state, setState] = useState<'ready' | 'playing' | 'ended' | 'error'>('ready')

  useEffect(() => {
    const media = video.current
    if (!media) return
    media.pause()
    if (!active) return
    media.currentTime = 0
    const reset = window.setTimeout(() => setState('ready'), 0)
    return () => window.clearTimeout(reset)
  }, [active])

  const play = async () => {
    try { await video.current?.play(); setState('playing') }
    catch { setState('error') }
  }

  return (
    <div className={`video-frame production-video ${active ? 'is-active' : ''} ${handover ? 'is-handover' : ''} state-${state}`} aria-label="Digital Felix production video">
      <video ref={video} src={copy.src} preload="metadata" playsInline controls={false} onPlay={() => setState('playing')} onEnded={() => setState('ended')} onError={() => setState('error')} />
      {state === 'error' && <div className="video-fallback"><div className="video-monogram" aria-hidden="true">FB</div><p className="fallback-copy">{copy.fallbackTitle}<br /><span>{copy.fallbackStatus}</span></p></div>}
      {active && state !== 'playing' && state !== 'error' && <button className="video-play" onClick={() => void play()}>{state === 'ended' ? 'REPLAY DIGITAL FELIX' : 'PLAY DIGITAL FELIX'}<span>▶</span></button>}
    </div>
  )
}
