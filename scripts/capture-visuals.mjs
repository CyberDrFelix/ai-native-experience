import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import { chromium } from '@playwright/test'

const url = 'http://127.0.0.1:4199/?present=1'
const output = new URL('../visual-baselines/', import.meta.url)
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH || '/snap/bin/chromium'
const states = [
  { name: '01-boot-opening', advances: 0 },
  { name: '01-digital-felix-video', advances: 2 },
  { name: '01-live-handoff', advances: 3 },
  { name: '02-gap-maturity', advances: 6 },
  { name: '02-gap-statement', advances: 7 },
  { name: '02-gap-north-star', advances: 8 },
  { name: '03-employee-dormant', advances: 9 },
  { name: '03-employee-transformation', advances: 13 },
  { name: '03-employee-capable', advances: 17 },
  { name: '03-onboarding-question', advances: 18 },
  { name: '04-onboard-statement', advances: 20 },
  { name: '04-readiness', advances: 21 },
  { name: '04-modules-locked', advances: 22 },
  { name: '04-culture-context', advances: 26 },
  { name: '04-culture-loaded', advances: 28 },
  { name: '04-constitution-boundary', advances: 34 },
  { name: '04-constitution-decision', advances: 36 },
  { name: '04-constitution-consequence-b', advances: 37, choice: 'b' },
  { name: '04-constitution-consequence-a', advances: 37, choice: 'a' },
  { name: '04-constitution-consequence-c', advances: 37, choice: 'c' },
  { name: '04-constitution-perimeter-corrected', advances: 34 },
  { name: '04-impact-first-30-days', advances: 39 },
  { name: '04-impact-outside-box', advances: 42 },
  { name: '04-performance', advances: 45 },
  { name: '04-activation', advances: 47 },
  { name: '04-workforce-statement', advances: 49 },
  { name: '04-incoming-signal', advances: 50 },
  { name: '05-anomaly-detected', advances: 51 },
  { name: '05-forecast-gap', advances: 52 },
  { name: '05-investigation-started', advances: 54 },
  { name: '05-evidence-gathering', advances: 58 },
  { name: '05-evidence-incomplete', advances: 61 },
  { name: '05-additional-evidence', advances: 62 },
  { name: '05-specialist-collaboration', advances: 64 },
  { name: '05-working-hypotheses', advances: 65 },
  { name: '05-h1-rejected', advances: 66 },
  { name: '05-h2-supported', advances: 68 },
  { name: '05-self-challenge', advances: 70 },
  { name: '05-synthesis', advances: 71 },
  { name: '05-recommendation', advances: 72 },
  { name: '05-confidence-unknown', advances: 73 },
  { name: '05-human-decision', advances: 75 },
  { name: '05-decision-consequence', advances: 76, choice: 'b' },
  { name: '05-human-in-command', advances: 78 },
  { name: '05-work-redistribution', advances: 80 },
  { name: '05-ai-native-finance', advances: 84 },
  { name: '05-leadership-question', advances: 87 },
  { name: '06-abundance-inherited', advances: 88 },
  { name: '06-human-value-reveal', advances: 92 },
  { name: '06-work-redistribution', advances: 95 },
  { name: '06-human-in-command', advances: 98 },
  { name: '06-leadership-question', advances: 99 },
  { name: '06-orchestration-statement', advances: 101 },
  { name: '06-hybrid-workforce', advances: 104 },
  { name: '06-employee-001-ai-workforce', advances: 103 },
  { name: '06-leader-orchestration-architecture', advances: 105 },
  { name: '06-future-leader-statement', advances: 107 },
  { name: '06-human-plus-ai', advances: 109 },
  { name: '06-human-times-ai', advances: 110 },
  { name: '06-multiplication-equation', advances: 111 },
  { name: '06-organization-day-one', advances: 112 },
  { name: '06-theory-experience', advances: 114 },
  { name: '06-scene-07-cliffhanger', advances: 115 },
  { name: '07-monday-question', advances: 116 },
  { name: '07-pick-one-process', advances: 117 },
  { name: '07-ai-native-question', advances: 119 },
  { name: '07-dont-automate-past', advances: 120 },
  { name: '07-start-with-outcome', advances: 121 },
  { name: '07-redistribute-work', advances: 122 },
  { name: '07-give-ai-real-job', advances: 123 },
  { name: '07-constitution-return', advances: 124 },
  { name: '07-human-in-command', advances: 125 },
  { name: '07-measure-better', advances: 126 },
  { name: '07-thirty-day-challenge', advances: 128 },
  { name: '07-flywheel', advances: 129 },
  { name: '07-theory-experience', advances: 131 },
  { name: '07-become-ai-native', advances: 133 },
  { name: '07-human-equation', advances: 135 },
  { name: '07-human-close', advances: 137 },
  { name: '07-final-invitation', advances: 138 },
  { name: '07-final-rest', advances: 139 },
]
const selectedStates = process.env.VISUAL_FILTER ? states.filter(state => state.name.includes(process.env.VISUAL_FILTER)) : states
const requestedViewport = process.env.VISUAL_VIEWPORT?.match(/^(\d+)x(\d+)$/)
const viewport = requestedViewport ? { width: Number(requestedViewport[1]), height: Number(requestedViewport[2]) } : { width: 1920, height: 1080 }
const viewportSuffix = requestedViewport ? `-${viewport.width}x${viewport.height}` : ''

async function waitForServer() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try { if ((await fetch(url)).ok) return } catch { /* preview is still starting */ }
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  throw new Error('Preview server did not start')
}

await mkdir(output, { recursive: true })
const server = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4199', '--strictPort'], { stdio: 'ignore', detached: true })
try {
  await waitForServer()
  const browser = await chromium.launch({ executablePath, args: ['--no-sandbox'] })
  const context = await browser.newContext({ viewport, colorScheme: 'dark', reducedMotion: 'reduce', deviceScaleFactor: 1 })
  const page = await context.newPage()
  for (const state of selectedStates) {
    await page.goto(url)
    await page.locator('main').waitFor()
    for (let index = 0; index < state.advances; index += 1) {
      await page.keyboard.press('ArrowRight')
      await page.waitForTimeout(50)
    }
    if (state.choice) { await page.keyboard.press(state.choice); await page.waitForTimeout(50) }
    await page.screenshot({ path: new URL(`${state.name}${viewportSuffix}.png`, output).pathname, animations: 'disabled' })
  }
  await browser.close()
  console.log(`Captured ${selectedStates.length} deterministic baselines in visual-baselines/`)
} finally {
  if (server.pid) { try { process.kill(-server.pid, 'SIGTERM') } catch (error) { if (error.code !== 'ESRCH') throw error } }
}
