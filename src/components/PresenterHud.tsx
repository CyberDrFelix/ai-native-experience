import { useEffect, useState } from 'react'

type Props = { visible: boolean; durationMinutes: number; scene: string; beat: number; beatTotal: number; cue: string }

export function PresenterHud({ visible, durationMinutes, scene, beat, beatTotal, cue }: Props) {
  const [seconds, setSeconds] = useState(0)
  useEffect(() => { const id = window.setInterval(() => setSeconds(value => value + 1), 1000); return () => clearInterval(id) }, [])
  const elapsed = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')} / ${durationMinutes}:00`
  if (!visible) return null
  return (
    <aside className="hud" aria-label="Presenter information">
      <div><small>SESSION</small><strong>{elapsed}</strong></div>
      <div><small>SCENE</small><strong>{scene}</strong></div>
      <div><small>BEAT</small><strong>{beat + 1} / {beatTotal}</strong></div>
      <div className="hud-cue"><small>NEXT</small><strong>{cue}</strong></div>
    </aside>
  )
}
