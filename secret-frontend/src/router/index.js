import { createRouter, createWebHistory } from 'vue-router'

import SecretForm from '@/modules/SecretForm/SecretForm.vue'
import SecretPhraseResponse from '@/modules/SecretPhraseResponse/SecretPhraseResponse.vue'

//todo сделать третий маршрут
const routes = [
  { path: '/', component: SecretForm },
  { path: '/:link', component: SecretPhraseResponse },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
