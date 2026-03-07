import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api/polygon': {
        target: 'https://api.polygon.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/polygon/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            const apiKey = process.env.VITE_POLYGON_API_KEY
            if (apiKey) {
              const url = proxyReq.path
              proxyReq.path = url + (url.includes('?') ? '&' : '?') + `apiKey=${apiKey}`
            }
          })
        },
      },
    },
  },
})
