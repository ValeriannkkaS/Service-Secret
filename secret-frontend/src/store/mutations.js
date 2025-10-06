export default {
  setLink(state, link) {
    state.link = link
  },
  setPasswordInfo(state, { link, passwordInfo }) {
    state.passwordInfo = { ...state.passwordInfo, [link]: passwordInfo }
  },
  deletePasswordInfo(state, link) {
    state.passwordInfo = { ...state.passwordInfo, [link]: null }
  },
  setError(state, error) {
    state.error = error
  },
  setLoading(state, loading) {
    state.loading = loading
  },
}
