import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // Proxy dla backendu
      '/api/pracownicy': 'http://localhost:3000',
      '/api/maszyny': 'http://localhost:3000',
      '/api/planowanie': 'http://localhost:3000',
    },
  },
})
