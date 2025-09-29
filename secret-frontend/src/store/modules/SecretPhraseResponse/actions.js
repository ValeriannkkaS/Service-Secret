import SecretServices from '@/services/secret-services.js'

export default {
  async getSecretPhraseByLink({ state, commit, rootState, getters }, link) {
    commit('setError', null)
    commit('setSecretPhrase', null)
    commit('setLoading', true)
    commit('setShow', false)
    try {
      const response = await SecretServices.getSecretPhrase(link)
      console.log(response)
      commit('setSecretPhrase', response.decryptedPhrase)
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
      console.log({ ...rootState.passwordInfo })
    } catch (err) {
      commit('setError', true)
      //todo сделать вывод ошибок
    } finally {
      commit('setLoading', false)
    }
  },
}
