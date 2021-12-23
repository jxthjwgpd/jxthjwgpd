import axios from 'axios'
import qs from 'Qs'
import menu from './menu.js'

import setAxiosHeaders from './token'

export function init (state) {
  setAxiosHeaders(state)
}

export function login ({ commit, dispatch, getters }, form) {
  if (getters.isAuthenticated) { return dispatch('validate') }
  delete axios.defaults.headers.common.Authorization
  return axios.post('/admin/login', qs.stringify(form)).then(response => {
    const { code, data } = response.data
    if (code === '200' && data) {
      commit('LOGIN', data.username)
      commit('TOKEN', data.access_token, '24h')

      dispatch('navs')
      return data
    }
    return Promise.reject(response.data)
  })
}

export function validate ({ commit, dispatch, state }) {
  if (!state.username) return Promise.resolve(null)
  return axios.get('/admin/check_token')
    .then(response => {
      const { code, data } = response.data
      if (code === '200' && data) {
        commit('LOGIN', data.username)
        commit('TOKEN', data.access_token, '24h')

        return data
      } else {
        commit('LOGOUT')
        return null
      }
    })
}

export function logout ({ commit }) {
  commit('LOGOUT')
}

export function navs ({ commit }) {
  commit('GLOBALLOADING', true)
  commit('AUTHORITY', { menu })

  axios.get('/admin/authority').then(response => {
    const { code, data: { menuList, permList } } = response.data
    if (code === '200' && menuList) {
      commit('AUTHORITY', { menu, menuList, permList })
    }
    commit('GLOBALLOADING', false)
  }).catch(() => {
    commit('GLOBALLOADING', false)
  })
}
