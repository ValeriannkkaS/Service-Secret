import { createRouter, createWebHistory } from 'vue-router'

import SecretForm from '@/components/pages/SecretForm.vue'
import SecretPhraseResponse from '../components/pages/SecretPhraseResponse.vue'

const routes = [
  { path: '/', component: SecretForm },
  { path: '/:link', component: SecretPhraseResponse },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
