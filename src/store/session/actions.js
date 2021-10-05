import axios from 'axios'

import setAxiosHeaders from './token'

export function init (state) {
  setAxiosHeaders(state)
}

export function login ({ commit, dispatch, getters }, form) {
  if (getters.isAuthenticated) { return dispatch('validate') }
  // return axios.post('/login/token', JSON.stringify(form), { headers: { 'Content-Type': 'application/json' } }).then(response => {
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  console.log(axios.defaults.headers)
  return axios.post('/login/token', form).then(response => {
    console.info(response)
    // commit('LOGIN', user)
  }).catch(error => {
    console.error(error)
    return null
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
      if (error.response.status === 401) {
        commit('LOGOUT')
      }
      return null
    })
}

export function logout ({ commit }) {
  commit('LOGOUT')
}

export function someAction (/* context */) {

}
