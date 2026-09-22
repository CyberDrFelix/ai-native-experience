import { useCallback, useEffect, useState } from 'react'
import { PresenterHud } from './components/PresenterHud'
import { editions } from './content/editions'
import { move, type Position } from './lib/navigation'
import { BootScene } from './scenes/BootScene'
import { GapScene } from './scenes/GapScene'
import { EmployeeScene } from './scenes/EmployeeScene'
import { OnboardingScene } from './scenes/OnboardingScene'
import { WorkScene } from './scenes/WorkScene'
import { LeadershipScene } from './scenes/LeadershipScene'
import { ActionScene } from './scenes/ActionScene'

export function App() {
  const edition = editions['india-cfo']
  const [position, setPosition] = useState<Position>({ scene: 0, beat: 0 })
  const [hudVisible, setHudVisible] = useState(true)
  const [presenting, setPresenting] = useState(new URLSearchParams(location.search).has('present'))
  const [constitutionChoice, setConstitutionChoice] = useState<string | null>(null)
  const [workChoice, setWorkChoice] = useState<string | null>(null)
  const beatCounts = edition.scenes.map(scene => scene.beats.length)
  const scene = edition.scenes[position.scene]
  const currentBeat = scene.beats[position.beat]
  const nextBeat = scene.beats[position.beat + 1] ?? edition.scenes[position.scene + 1]?.beats[0]

  const navigate = useCallback((direction: 1 | -1) => setPosition(current => move(current, direction, beatCounts)), [beatCounts])
  const toggleFullscreen = useCallback(async () => {
    try { if (!document.fullscreenElement) await document.documentElement.requestFullscreen(); else await document.exitFullscreen() } catch { /* browser can deny fullscreen safely */ }
  }, [])
  const togglePresentation = useCallback(() => {
    setPresenting(value => {
      const next = !value
      const url = new URL(location.href)
      next ? url.searchParams.set('present', '1') : url.searchParams.delete('present')
      history.replaceState({}, '', url)
      return next
    })
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (['ArrowRight', ' ', 'ArrowLeft', 'f', 'F', 'r', 'R', 'h', 'H', 'p', 'P'].includes(event.key)) event.preventDefault()
      if (event.key === 'ArrowRight' || event.key === ' ') navigate(1)
      if (event.key === 'ArrowLeft') navigate(-1)
      if (event.key.toLowerCase() === 'f') void toggleFullscreen()
      if (event.key.toLowerCase() === 'r') { setPosition(current => ({ ...current, beat: 0 })); setConstitutionChoice(null); setWorkChoice(null) }
      if (event.key.toLowerCase() === 'h') setHudVisible(value => !value)
      if (event.key.toLowerCase() === 'p') togglePresentation()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate, toggleFullscreen, togglePresentation])

  return (
    <main className={`experience ${presenting ? 'presenting' : ''}`} data-scene={scene.id}>
      <div className="ambient" aria-hidden="true" />
      {!presenting && <header className="app-bar"><div className="brand">AI NATIVE <span>—</span> THE EXPERIENCE</div><button onClick={togglePresentation}>ENTER PRESENTATION <kbd>P</kbd></button></header>}
      <div className="stage" aria-live="polite" data-beat={currentBeat.id}>
        {scene.id === 'boot' && <BootScene beat={position.beat} content={scene} />}
        {scene.id === 'gap' && <GapScene beat={position.beat} content={scene} />}
        {scene.id === 'employee' && <EmployeeScene beat={position.beat} content={scene} />}
        {scene.id === 'onboarding' && <OnboardingScene beat={position.beat} content={scene} selectedChoice={constitutionChoice} onSelectChoice={setConstitutionChoice} />}
        {scene.id === 'work' && <WorkScene beat={position.beat} content={scene} selectedChoice={workChoice} onSelectChoice={setWorkChoice} />}
        {scene.id === 'leadership' && <LeadershipScene beat={position.beat} content={scene} />}
        {scene.id === 'action' && <ActionScene beat={position.beat} content={scene} />}
      </div>
      <nav className="transport" aria-label="Presentation controls">
        <button onClick={() => navigate(-1)} aria-label="Previous beat">←</button>
        <div>{edition.scenes.map((item, index) => <span key={item.id} className={index === position.scene ? 'active' : ''} />)}</div>
        <button onClick={() => navigate(1)} aria-label="Next beat">→</button>
      </nav>
      <PresenterHud visible={hudVisible} durationMinutes={edition.durationMinutes} scene={`${scene.number} · ${scene.hudTitle}`} beat={position.beat} beatTotal={scene.beats.length} cue={nextBeat?.cue ?? 'Close the experience.'} />
      {!presenting && <footer className="help">← / → / SPACE &nbsp; NAVIGATE <span>F &nbsp; FULLSCREEN</span><span>H &nbsp; HUD</span><span>R &nbsp; RESET SCENE</span></footer>}
    </main>
  )
}
