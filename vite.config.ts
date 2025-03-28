import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Web-Portfolio/',
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  server: {
    port: 3002,
    open: true
  }
}) 