import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: process.env.VERCEL ? '/' : '/crc-lockouttagout/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'data/machines.json'],
      manifest: {
        name: 'LOTO RTG CRC',
        short_name: 'LOTO',
        description: 'دليل العزل الكهربائي LOTO لمعدات RTG CRC',
        theme_color: '#0f1117',
        background_color: '#0f1117',
        display: 'standalone',
        dir: 'rtl',
        lang: 'ar',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,json}'],
        runtimeCaching: [
          {
            urlPattern: /\/data\/machines\.json$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'loto-data',
              expiration: { maxEntries: 5, maxAgeSeconds: 60 * 60 * 24 * 7 }
            }
          }
        ]
      }
    })
  ]
})
