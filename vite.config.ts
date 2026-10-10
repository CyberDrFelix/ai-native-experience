import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: { rollupOptions: { input: { main: 'index.html', v2: 'v2/index.html' } } },
  test: { environment: 'jsdom', setupFiles: './src/test/setup.ts' },
})
