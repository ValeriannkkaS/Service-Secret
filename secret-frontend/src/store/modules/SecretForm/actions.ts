import SecretServices from '@/services/secret-services.js'

export default {
  async setSecretPhrase({ commit, getters }) {
    commit('setLink', null, { root: true })
    commit('setLoading', true)
    commit('setError', false)
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
      commit('setError', true)
      setTimeout(() => commit('setError', false), 3000)
      return false
    } finally {
      commit('setLoading', false)
    }
  },
  async deleteSecretPhrase({ commit, getters }, link) {
    try {
      const response = await SecretServices.deleteSecretPhrase(link)
      commit('setLink', null, { root: true })
      commit('deletePasswordInfo', response.id, { root: true })
    } catch (err) {
      commit('setError', 'что-то пошло не так') // todo поправить -> сейчас эта ошибка летит в форму
      setTimeout(() => commit('setError', null), 3000)
    }
  },
  async generateSecretPhrase({ state, commit }) {
    commit('setLoading', true)
    try {
      const response = await SecretServices.generateSecretPhrase(state.countOfSymbols)
      commit('setSecretPhrase', response.secretPhrase)
    } catch (err) {
      commit('setError', 'ошибка генерации пароля')
    } finally {
      commit('setLoading', false)
    }
  },
}
