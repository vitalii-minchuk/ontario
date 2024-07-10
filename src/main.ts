import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { QuillEditor } from '@vueup/vue-quill'
import routes from 'virtual:generated-pages'

import './styles/main.css'
import 'vue3-toastify/dist/index.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

import App from './App.vue'
import { vuetify } from './modules/vuetify'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

app.component('QuillEditor', QuillEditor)
app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
