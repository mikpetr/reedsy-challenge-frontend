import path from 'path'
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [Vue({
    template: {
      compilerOptions: {
        isCustomElement: (elm) => ['router-link'].includes(elm),
      }
    }
  })],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  root: '.',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
