import { createPlugin } from '@areal/pkg_platform'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [],
})
export default createPlugin(
  {
    styleUrl: import.meta.env.VITE_STYLE_URL || 'http://localhost:80/style', //todo <-
    importResolver: (component) => import(`@/${component}.vue`),
  },
  router,
)
