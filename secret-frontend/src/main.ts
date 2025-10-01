import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(router)
app.use(store)

// todo снести лишнее пакеты и папки и файлы и импорты
// todo axios -> fetch
app.mount('#app')
