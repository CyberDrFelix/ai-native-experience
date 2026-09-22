import { spawn } from 'node:child_process'
import { chromium } from '@playwright/test'

const url = 'http://127.0.0.1:4199/?present=1'
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH || '/snap/bin/chromium'
const viewports = [{ width: 1920, height: 1080 }, { width: 1366, height: 768 }]

async function waitForServer() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try { if ((await fetch(url)).ok) return } catch { /* preview is starting */ }
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  throw new Error('Preview server did not start')
}

const server = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4199', '--strictPort'], { stdio: 'ignore', detached: true })
try {
  await waitForServer()
  const browser = await chromium.launch({ executablePath, args: ['--no-sandbox'] })
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport, reducedMotion: 'reduce' })
    const errors = []
    const externalRequests = []
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    page.on('pageerror', error => errors.push(error.message))
    page.on('request', request => { if (!request.url().startsWith('http://127.0.0.1:4199/')) externalRequests.push(request.url()) })
    await page.goto(url)
    let frames = 0
    let previous = ''
    while (frames < 150) {
      const state = await page.locator('.stage').evaluate(stage => {
        const scene = stage.querySelector('.scene')
        const r = scene?.getBoundingClientRect()
        const doc = document.documentElement
        const visible = [...(scene?.querySelectorAll('*') ?? [])].filter(node => {
          const style = getComputedStyle(node); const box = node.getBoundingClientRect()
          return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > .05 && box.width > 1 && box.height > 1
        })
        const violations = r ? visible.filter(node => {
          if (node.closest('.boot-orbit, .entity-rings, .mini-rings, .thought-orbit, .boundary-ring')) return false
          const b = node.getBoundingClientRect()
          return b.left < r.left - 2 || b.right > r.right + 2 || b.top < r.top - 2 || b.bottom > r.bottom + 2
        }).map(node => `${node.tagName}.${node.className}`) : ['missing scene']
        return { key: `${stage.dataset.beat}`, overflow: doc.scrollWidth > innerWidth || doc.scrollHeight > innerHeight, violations: violations.slice(0, 5) }
      })
      if (state.overflow || state.violations.length) throw new Error(`${viewport.width}×${viewport.height} ${state.key}: overflow=${state.overflow}; safe-stage=${state.violations.join(', ')}`)
      frames += 1
      previous = state.key
      await page.keyboard.press('ArrowRight')
      const next = await page.locator('.stage').getAttribute('data-beat')
      if (next === previous) break
    }
    if (frames !== 140) throw new Error(`Expected 140 beats, audited ${frames} at ${viewport.width}×${viewport.height}`)
    await page.keyboard.press('h')
    if (await page.locator('.hud').count()) throw new Error('HUD did not hide')
    await page.keyboard.press('h')
    if (!await page.locator('.hud').count()) throw new Error('HUD did not restore')
    await page.keyboard.press('p')
    if (!await page.locator('.app-bar').count()) throw new Error('Presentation mode did not toggle off')
    await page.keyboard.press('p')
    await page.keyboard.press('r')
    if (await page.locator('.stage').getAttribute('data-beat') !== 'monday-question') throw new Error('Scene reset did not return to the Scene 07 opening')
    for (let index = 0; index < 23; index += 1) await page.keyboard.press('ArrowRight')
    for (let index = 0; index < 139; index += 1) await page.keyboard.press('ArrowLeft')
    if (await page.locator('.stage').getAttribute('data-beat') !== 'signal') throw new Error('Backward traversal did not return to the opening beat')
    if (errors.length) throw new Error(`Browser console errors: ${errors.join('; ')}`)
    if (externalRequests.length) throw new Error(`External requests detected: ${externalRequests.join('; ')}`)
    await page.close()
  }
  const mediaPage = await browser.newPage({ viewport: viewports[0], reducedMotion: 'reduce' })
  await mediaPage.goto(url)
  await mediaPage.locator('main').waitFor()
  await mediaPage.keyboard.press('ArrowRight')
  await mediaPage.keyboard.press('ArrowRight')
  if (await mediaPage.locator('.stage').getAttribute('data-beat') !== 'greeting') throw new Error('Digital Felix beat did not activate')
  const media = mediaPage.locator('video')
  await media.waitFor()
  const dimensions = await media.evaluate(video => ({ width: video.videoWidth, height: video.videoHeight, readyState: video.readyState }))
  if (dimensions.width !== 1920 || dimensions.height !== 1080 || dimensions.readyState < 1) throw new Error(`Digital Felix metadata invalid: ${JSON.stringify(dimensions)}`)
  const playButton = mediaPage.getByRole('button', { name: /PLAY DIGITAL FELIX/ })
  if (await playButton.count()) {
    await playButton.click()
    await mediaPage.waitForTimeout(500)
    const playback = await media.evaluate(video => ({ paused: video.paused, currentTime: video.currentTime, controls: video.controls }))
    if (playback.paused || playback.currentTime <= 0 || playback.controls) throw new Error(`Digital Felix playback failed: ${JSON.stringify(playback)}`)
    await mediaPage.keyboard.press('ArrowRight')
    if (!await media.evaluate(video => video.paused)) throw new Error('Digital Felix did not pause on live handoff')
  } else {
    const passivePlayback = await media.evaluate(video => ({ paused: video.paused, currentTime: video.currentTime, ended: video.ended, error: video.error?.message ?? null }))
    if (!passivePlayback.paused || passivePlayback.currentTime > 0) {
      await mediaPage.keyboard.press('ArrowRight')
      if (!await media.evaluate(video => video.paused)) throw new Error('Digital Felix did not pause on live handoff')
    } else {
      await mediaPage.waitForTimeout(100)
      if (!await mediaPage.getByText('Digital Felix greeting unavailable').count()) throw new Error(`Digital Felix exposed neither playback nor fallback: ${JSON.stringify(passivePlayback)}`)
    }
  }
  await mediaPage.close()
  await browser.close()
  console.log('Acceptance passed: 280 frames, navigation/reset/HUD/presentation, safe stage, offline resources, console, and Digital Felix media/fallback path.')
} finally {
  if (server.pid) { try { process.kill(-server.pid, 'SIGTERM') } catch (error) { if (error.code !== 'ESRCH') throw error } }
}
