import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'

const app = createApp(App)

app.use(router)

// todo снести лишнее пакеты и папки и файлы
// todo axios -> fetch
app.mount('#app')
