export default {
  setSecretPhrase(state, secretPhrase) {
    state.secretPhrase = secretPhrase
  },
  setError(state, error) {
    state.error = error
  },
  setCountOfSymbols(state, countOfSymbols) {
    state.countOfSymbols = countOfSymbols
  },
  setExpiresIn(state, expiresIn) {
    state.expiresIn = expiresIn
  },
  setCountOfViews(state, countOfViews) {
    state.countOfViews = countOfViews
  },
  setAllowDeletions(state, allowDeletions) {
    state.allowDeletions = allowDeletions
    console.log(state.allowDeletions)
  },
}
