export default {
  setSecretPhrase(state, payload) {
    state.secretPhrase = payload
  },
  setShow(state, payload) {
    state.show = payload
  },
  setNotFound(state, payload) {
    state.notFound = payload
  },
  setPasswordIsLive(state, payload) {
    state.passwordIsLive = payload
  },
}
