import { SessionStorage, Cookies } from 'quasar'
import setHeaderAuthorization from './token'

export const LOGIN = (state, user) => {
  state.user = user
  SessionStorage.set('user', user)
  setHeaderAuthorization(state)
}

export const TOKEN = (state, token, expires) => {
  state.token = token
  Cookies.set(ACCESS_TOKEN_KEY, token, { expires })
  setHeaderAuthorization(state)
}

export const LOGOUT = (state) => {
  state.user = null
  SessionStorage.clear()
  setHeaderAuthorization(state)
}

let ACCESS_TOKEN_KEY = 'access_token'
