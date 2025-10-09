import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { initializePlugin } from '@areal/pkg_platform'
import enShowAndCopyLink from './langs/ShowAndCopyLink/en/index'
import ruShowAndCopyLink from './langs/ShowAndCopyLink/ru/index'
import enSecretPhraseResponse from './langs/SecretPhraseResponse/en/index'
import ruSecretPhraseResponse from './langs/SecretPhraseResponse/ru/index'
import enSecretForm from './langs/SecretForm/en/index'
import ruSecretForm from './langs/SecretForm/ru/index'
import enApp from './langs/App/en'
import ruApp from './langs/App/ru'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import Platform from '@/plugins/platform'

const bootstrap = async () => {
  const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'ru',
    messages: {
      en: {
        ...enApp,
        ...enSecretForm,
        ...enShowAndCopyLink,
        ...enSecretPhraseResponse,
      },
      ru: {
        ...ruApp,
        ...ruSecretForm,
        ...ruShowAndCopyLink,
        ...ruSecretPhraseResponse,
      },
    },
  })
  const app = createApp(App)

  app.use(store)
  app.use(i18n)
  app.use(Platform)

  app.use(router)
  app.mount('#app')
}

bootstrap()
