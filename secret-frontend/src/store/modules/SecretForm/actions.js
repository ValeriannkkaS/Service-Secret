import SecretServices from '@/services/secret-services.js'

export default {
  async setSecretPhrase({ commit, getters }) {
    commit('setLink', null, { root: true })
    commit('setLoading', true, { root: true })
    commit('setError', false, { root: true })
    try {
      const response = await SecretServices.createSecret(getters.secretDto)
      commit('setLink', response.link, { root: true })
      commit(
        'setPasswordInfo',
        {
          link: response.link,
          passwordInfo: {
            allowDeletions: response.allowDeletions,
            expiresAt: response.expiresAt,
            remainingViewsCount: response.remainingViewsCount,
            link: response.link,
          },
        },
        { root: true },
      )
      return true
    } catch (err) {
      commit('setError', true, { root: true })
      setTimeout(() => commit('setError', false, { root: true }), 3000)
      return false
    } finally {
      commit('setLoading', false, { root: true })
    }
  },
  async deleteSecretPhrase({ commit }, link) {
    commit('setLoading', true, { root: true })
    commit('setError', false, { root: true })
    try {
      const response = await SecretServices.deleteSecretPhrase(link)
      commit('setLink', null, { root: true })
      commit('deletePasswordInfo', response.id, { root: true })
    } catch (err) {
      commit('setError', true, { root: true })
      setTimeout(() => commit('setError', false, { root: true }), 3000)
    } finally {
      commit('setLoading', false, { root: true })
    }
  },
  async generateSecretPhrase({ state, commit }) {
    commit('setLoading', true, { root: true })
    commit('setError', false, { root: true })
    try {
      const response = await SecretServices.generateSecretPhrase(state.countOfSymbols)
      return response
    } catch (err) {
      commit('setError', true, { root: true })
      setTimeout(() => commit('setError', false, { root: true }), 3000)
    } finally {
      commit('setLoading', false, { root: true })
    }
  },
}
