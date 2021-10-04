import axios from 'axios'

import setHeaderAuthorization from './token'

export function init (state) {
  setHeaderAuthorization(state)
}

// const user = { token: 'Abcd1234', username: 'system' }
export function login ({ commit, dispatch, getters }, form) {
  console.log(form)
  if (getters.isAuthenticated) return dispatch('validate')

  return axios.post('/login/token', form).then(response => {
    console.info(response)
    // commit('LOGIN', user)
  }).catch(error => {
    console.error(error)
    return null
  })

  // return { user: user }
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
