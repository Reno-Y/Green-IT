import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// Initialize theme
const html = document.documentElement
const saved = localStorage.getItem('et-theme') || 'dark'
if (saved === 'light') html.dataset.theme = 'light'

const app = createApp(App)
app.use(router)
app.mount('#app')
