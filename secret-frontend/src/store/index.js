import { createStore } from 'vuex'

import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'
import state from './state.js'
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
