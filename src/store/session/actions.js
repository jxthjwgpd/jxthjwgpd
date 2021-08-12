// import axios from 'axios'

import setHeaderAuthorization from './token'

export function init (state) {
  setHeaderAuthorization(state)
}

const user = { token: 'Abcd1234', username: 'root' }

export function login ({ commit, dispatch, getters }, form) {
  if (getters.isAuthenticated) return dispatch('validate')
  commit('LOGIN', user)
  return { user: user }
}

export function validate ({ commit, state }) {
  if (!state.user) return Promise.resolve(null)
  commit('LOGIN', user)
  return { user: user }
//   return axios.get('uaa/users')
//     .then(response => {
//       const user = response.data.user
//       commit('LOGIN', user)
//       return user
//     }).catch(error => {
//       if (error.response.status === 401) {
//         commit('LOGOUT')
//       }
//       return null
//     })
}

export function logout (commit) {
  commit('LOGOUT')
}

export function someAction (/* context */) {

}
