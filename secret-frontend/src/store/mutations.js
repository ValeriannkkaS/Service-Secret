export default {
  setLink(state, link) {
    state.link = link
  },
  setPasswordInfo(state, { link, passwordInfo }) {
    state.passwordInfo = { ...state.passwordInfo, [link]: passwordInfo }
  },
  deletePasswordInfo(state, link) {
    const passwordInfo = { ...state.passwordInfo }
    delete passwordInfo[link]
    state.passwordInfo = {}
    console.log(state.passwordInfo)
  },
  setError(state, error) {
    state.error = error
  },
  setLoading(state, loading) {
    state.loading = loading
  },
}
