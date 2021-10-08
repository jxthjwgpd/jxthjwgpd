import axios from 'axios'

import setAxiosHeaders from './token'

export function init (state) {
  setAxiosHeaders(state)
}

export function login ({ commit, dispatch, getters }, form) {
  if (getters.isAuthenticated) { return dispatch('validate') }
  return axios.post('/login/token', form).then(response => {
    const user = response.data.user
    commit('LOGIN', user)
    // Add token to cookie
    commit('TOKEN', response.data.access_token, (response.data.expires_in / 3600) + 'h')
    return user
  })
}

export function validate ({ commit, state }) {
  if (!state.user) return Promise.resolve(null)
  return axios.get('/v1/user')
    .then(response => {
      const user = response.data.user
      commit('LOGIN', user)
      return user
    }).catch(error => {
      if (error.response && error.response.status === 401) {
        commit('LOGOUT')
      }
      return null
    })
}

export function logout ({ commit }) {
  commit('LOGOUT')
}
