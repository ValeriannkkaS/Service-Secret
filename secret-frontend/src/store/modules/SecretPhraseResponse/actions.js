import SecretServices from '@/services/secret-services.js'

export default {
  async getSecretPhraseByLink({ commit }, link) {
    commit('setError', false, { root: true })
    commit('setLoading', true, { root: true })
    commit('setSecretPhrase', null)
    commit('setShow', false)
    try {
      const response = await SecretServices.getSecretPhrase(link)
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
    } catch (err) {
      commit('deletePasswordInfo', link, { root: true })
    } finally {
      commit('setLoading', false, { root: true })
    }
  },
}
