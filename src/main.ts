import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'

import './styles/main.css'

import App from './App.vue'
import { vuetify } from './modules/vuetify'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
