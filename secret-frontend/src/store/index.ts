import { createStore } from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import state from './state'
import secretForm from '@/store/modules/SecretForm/index.js'
import secretPhraseResponse from '@/store/modules/SecretPhraseResponse/index.js'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  state,
  mutations,
  getters,
  actions,
  modules: {
    secretForm,
    secretPhraseResponse,
  },
  plugins: [createPersistedState()],
})

export default store
