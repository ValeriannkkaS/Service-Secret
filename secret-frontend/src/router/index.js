import { createRouter, createWebHistory } from 'vue-router'

import SecretForm from '@/modules/SecretForm/SecretForm.vue'
import SecretPhraseResponse from '@/modules/SecretPhraseResponse/SecretPhraseResponse.vue'
import ShowAndCopyLink from '@/modules/ShowAndCopyLink/ShowAndCopyLink.vue'

//todo сделать третий маршрут
const routes = [
  { path: '/', component: SecretForm },
  { path: '/show/:link', component: ShowAndCopyLink },
  { path: '/:link', component: SecretPhraseResponse },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
