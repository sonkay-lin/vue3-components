import { defineConfig } from 'vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import vuejsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [DefineOptions(), vuejsx()],
  server: {
    port: 3300
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
