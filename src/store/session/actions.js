import axios from 'axios'

import setAxiosHeaders from './token'

export function init (state) {
  setAxiosHeaders(state)
}

export function login ({ commit, dispatch, getters }, form) {
  if (getters.isAuthenticated) { return dispatch('validate') }
  delete axios.defaults.headers.common.Authorization
  return axios.post('/v1/auth/login', form).then(response => {
    const username = response.data.username
    commit('LOGIN', username)
    // Add token to cookie
    commit('TOKEN', response.data.access_token, '1h')
    return username
  })
}

export function validate ({ commit, state }) {
  if (!state.user) return Promise.resolve(null)
  return state.user
  // return axios.get('/v1/user')
  //   .then(response => {
  //     const user = response.data.user
  //     commit('LOGIN', user)
  //     return user
  //   }).catch(error => {
  //     if (error.response && error.response.status === 401) {
  //       commit('LOGOUT')
  //     }
  //     return null
  //   })
}

export function logout ({ commit }) {
  commit('LOGOUT')
}
