export const isAuthenticated = (state) => {
  return !!state.username
}

export const token = (state) => {
  return state.token
}
