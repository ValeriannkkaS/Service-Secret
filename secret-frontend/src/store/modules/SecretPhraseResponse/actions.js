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
      commit('setError', true, { root: true })
    } finally {
      commit('setLoading', false, { root: true })
    }
  },

  async checkSecretPhrase({ commit }, link) {
    commit('setError', false, { root: true })
    commit('setLoading', true, { root: true })
    commit('setSecretPhrase', null)
    commit('setNotFound', false)
    commit('setPasswordIsLive', false)
    commit('setShow', false)
    try {
      const response = await SecretServices.checkSecretPhrase(link)
      if (response.passwordIsLive) {
        commit('setPasswordIsLive', true)
      } else if (!response.passwordIsLive) {
        commit('setPasswordIsLive', false)
        commit('deletePasswordInfo', link, { root: true })
      }
    } catch (err) {
      commit('setNotFound', true)
      console.error(err)
    } finally {
      commit('setLoading', false, { root: true })
    }
  },
}
