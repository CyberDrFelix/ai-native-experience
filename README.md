# AI NATIVE — The Experience

A cinematic, browser-based keynote and executive education experience by Felix Burcea. The complete seven-scene experience is implemented locally, from **BOOT** through **BECOME AI-NATIVE**.

## Run locally

Requirements: Node.js 22+ and npm.

```bash
npm install
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`). For presenter mode, press `P` or open `http://localhost:5173/?present=1`.

## Production and static preview

```bash
npm run check
npm run preview
```

The static bundle is written to `dist/`. Vite uses a relative asset base, so the bundle is suitable for GitHub Pages and other static hosts. To verify independently:

```bash
npx serve dist
```

Pushes to `main` deploy the checked production bundle through GitHub Actions once GitHub Pages is configured to use **GitHub Actions** as its source. The repository workflow does not require secrets beyond the standard Pages token supplied by GitHub.

Create the Windows-ready offline fallback with:

```bash
npm run offline:package
```

The generated folder and ZIP are written under `release/` and contain only the production application and a self-contained Windows PowerShell launcher. Node.js is not required on the presentation laptop. See `offline/README_OFFLINE.md` for presenter instructions.

Capture deterministic key-state visual baselines at 1920×1080:

```bash
npm run visual:capture
```

The workflow uses reduced motion and the locally installed Chromium executable. Override its path with `PLAYWRIGHT_CHROMIUM_PATH` when necessary. Baselines are written to `visual-baselines/`.

## Presenter controls

- `RIGHT` / `SPACE`: next narrative beat
- `LEFT`: previous narrative beat
- `F`: enter or exit fullscreen
- `R`: reset the current scene to its opening beat
- `H`: toggle the presenter HUD
- `P`: toggle presentation mode
- `A`–`D`: select an available presenter-controlled decision option
- `ESC`: browser-native fullscreen exit

On-screen arrow controls remain available as a fallback. Presentation mode hides website chrome. The HUD is intentionally discreet and may be hidden with `H`.

## Architecture

- `src/content/`: edition-specific wording and sequence data
- `src/scenes/`: scene renderers (Scenes 01–07)
- `src/components/`: reusable presentation primitives
- `src/lib/`: deterministic experience logic
- `docs/`: narrative, interaction, simulation, and design source of truth

No API, backend, external font, network connection, or media autoplay is required. Digital Felix uses the approved local production asset and explicit presenter playback, with a static failure fallback. Future live-AI and audience-voting capabilities should be adapters, never presentation dependencies. See `public/video/README.md` for the media contract.
