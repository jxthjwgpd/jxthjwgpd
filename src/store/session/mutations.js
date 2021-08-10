import { LocalStorage } from 'quasar'
import setHeaderAuthorization from './token'

export const LOGIN = (state, user) => {
  state.user = user
  LocalStorage.set('user', user)
  setHeaderAuthorization(state)
}

export const LOGOUT = (state) => {
  state.user = null
  LocalStorage.clear()
  setHeaderAuthorization(state)
}

export function someMutation (/* state */) {
}
