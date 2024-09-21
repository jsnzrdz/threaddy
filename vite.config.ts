/// <reference types="vitest/config" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
  
  },
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles : './src/test/setup.ts'
  }
})
