import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    // optional: dev proxy (so you can call "/api/..." without full URL)
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
})
