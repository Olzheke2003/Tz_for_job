import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5137,  // Указываем порт 5137 для Vite
    proxy: {
      '/api': 'http://backend:8000',  // Прокси API-запросов на backend
    },
  },
})
