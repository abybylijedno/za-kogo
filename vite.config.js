import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// Change the base to '/' if you deploy to a custom domain or a user/org GitHub Pages repo
// For a project repo (github.com/<user>/za-kogo), keep '/za-kogo/'
export default defineConfig({
  base: '/za-kogo/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'Za Kogo?',
        short_name: 'Za Kogo',
        description: 'Modlitwa wstawiennicza',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/za-kogo/',
        icons: [
          {
            src: 'icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})
