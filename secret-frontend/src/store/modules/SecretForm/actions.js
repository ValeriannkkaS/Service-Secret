import SecretServices from '@/services/secret-services.js'

export default {
  async setSecretPhrase({ state, commit, rootState, getters }) {
    try {
      const response = await SecretServices.createSecret(getters.secretDto)
      commit('setLink', response.data.link, { root: true })
      commit(
        'setPasswordInfo',
        {
          link: response.data.link,
          passwordInfo: {
            allowDeletions: response.data.allowDeletions,
            expiresAt: response.data.expiresAt,
            remainingViewsCount: response.data.remainingViewsCount,
          },
        },
        { root: true },
      )
    } catch (err) {
      commit('setError', 'что-то пошло не так')
      setTimeout(() => commit('setError', null), 3000)
      //todo сделать кастомный вывод ошибки
    }
  },
  async generateSecretPhrase({ state, commit }) {
    try {
      const response = await SecretServices.generateSecretPhrase(state.countOfSymbols)
      commit('setSecretPhrase', response)
    } catch (err) {
      commit('setError', 'ошибка генерации пароля')
    }
  },
}
