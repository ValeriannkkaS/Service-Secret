export default {
  setLink(state, link) {
    state.link = link
  },
  setPasswordInfo(state, { link, passwordInfo }) {
    state.passwordInfo = { ...state.passwordInfo, [link]: passwordInfo }
  },
}
