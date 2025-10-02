import { createStore } from 'vuex'

import actions from './actions.ts'
import mutations from './mutations'
import getters from './getters.ts'
import state from './state.ts'
import secretForm from '@/store/modules/SecretForm/index.ts'
import secretPhraseResponse from '@/store/modules/SecretPhraseResponse/index.ts'
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
