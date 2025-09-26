export default {
  secretDto(state) {
    return {
      secretPhrase: state.secretPhrase,
      expiresInTimestamp: state.expiresIn,
      availableViews: state.countOfViews,
    }
  },
}
