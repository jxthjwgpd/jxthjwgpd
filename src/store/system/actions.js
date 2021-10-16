import axios from 'axios'

import setAxiosHeaders from '../session/token'

export function init (state) {
  setAxiosHeaders(state)
}

export function getUserList ({ commit, state }, config) {
  return axios.get('/v1/users', { params: { ...config } }).then(response => {
    const { data, status } = response
    if (data && status === 200) {
      commit('receiveUserList', {
        ...data,
        ...config
      })
    }
    return data
  })
}

export function saveUser ({ dispatch, state }, config) {
  return axios.post('/v1/users', { ...config }).then(response => {
    return response.data
  })
}

export function getGroupList ({ commit, state }, config) {
  return axios.get('/v1/groups', { params: { ...config } }).then(response => {
    const { data, status } = response
    if (data && status === 200) {
      commit('receiveGroupList', {
        ...data,
        ...config
      })
    }
    return data
  })
}

export function saveGroup ({ dispatch, state }, config) {
  return axios.post('/v1/groups', { ...config }).then(response => {
    return response.data
  })
}
