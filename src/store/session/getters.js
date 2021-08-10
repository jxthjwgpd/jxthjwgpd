export const isAuthenticated = (state) => {
  return !!state.user
}

export const token = (state) => {
  return state.user.token
}

export function someGetter (/* state */) {
}
