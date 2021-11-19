import { SessionStorage, Cookies } from 'quasar'
import setHeaderAuthorization from './token'

export const LOGIN = (state, username) => {
  state.username = username
  SessionStorage.set('username', username)
  setHeaderAuthorization(state)
}

export const TOKEN = (state, token, expires) => {
  state.token = token
  Cookies.set('token', token, { expires })
  setHeaderAuthorization(state)
}

export const LOGOUT = (state) => {
  state.token = null
  state.username = null
  SessionStorage.clear()
  Cookies.remove('token')
  setHeaderAuthorization(state)
}
