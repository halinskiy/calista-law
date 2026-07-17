import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/calista-law/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // WebGL живёт в своём чанке. Инфо-страницы не должны его тянуть.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (/three|@react-three|postprocessing/.test(id)) return 'webgl'
            if (/gsap/.test(id)) return 'gsap'
            if (/react-router|react-dom|\/react\//.test(id)) return 'react'
          }
        },
      },
    },
  },
})
