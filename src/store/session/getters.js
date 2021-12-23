export const isAuthenticated = (state) => {
  return !!state.username
}

export const token = (state) => {
  return state.token
}

export const globalLoading = (state) => {
  return state.global.loading
}

export const globalMenuList = (state) => {
  return state.global.menuList
}

export const authorities = (state) => {
  return state.global.permList
}
