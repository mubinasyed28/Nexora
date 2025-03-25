import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:8000"
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Allow .jsx without specifying extension
  },
  plugins: [react(), tailwindcss()],
})
