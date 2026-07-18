import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/calista-law/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (/gsap|lenis/.test(id)) return 'scroll'
            if (/react-router|react-dom|\/react\//.test(id)) return 'react'
          }
        },
      },
    },
  },
})
