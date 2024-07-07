import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Vuetify from 'vite-plugin-vuetify'
import Pages from 'vite-plugin-pages'
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '~/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  plugins: [
    Vue(),
    Pages(),
    Components({
      dts: 'src/components.d.ts'
    }),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core'],
      dts: true,
      dirs: [
        'src/composables',
        'src/composables/**/',
        'src/stores',
        'src/stores/**/',
        'src/constants',
        'src/constants/**/'
      ],
      vueTemplate: true
    }),
    Vuetify({
      autoImport: true
    })
  ]
})
