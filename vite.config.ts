/* eslint-disable camelcase -- Manifest naming convention */

import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(process.env.npm_package_version),
  },
  plugins: [react(), legacy(), VitePWA({
    devOptions: {
      enabled: true
    },
    manifest: {
      description: 'Job Search Portal',
      icons: [
        {
          sizes: '192x192',
          src: 'android-chrome-192x192.png',
          type: 'image/png'
        },
        {
          sizes: '512x512',
          src: 'android-chrome-512x512.png',
          type: 'image/png'
        }
      ],
      name: 'Jobber',
      short_name: 'Jobber',
      theme_color: '#038260'
    },
    registerType: 'autoUpdate'
  })],
});
