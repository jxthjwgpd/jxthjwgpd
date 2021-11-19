import axios from 'axios'
import { restfulUrl } from '../utils'

import setAxiosHeaders from '../session/token'

export function init (state) {
  setAxiosHeaders(state)
}

export function getUserList ({ commit, state }, config) {
  return axios.get('/admin/users', { params: { ...config } }).then(response => {
    const { code, data } = response.data
    if (code === '200' && data) {
      commit('receiveUserList', {
        ...data,
        ...config
      })
    }
    return data
  })
}

export function getUser ({ dispatch, state }, config) {
  let url = restfulUrl('/v1/users/{userId}', config)
  return axios.get(url).then(response => {
    return response.data
  })
}

export function getGroupsForUser ({ dispatch, state }, config) {
  let url = restfulUrl('/v1/users/{userId}/groups', config)
  return axios.get(url).then(response => {
    return response.data
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

export function getRoleList ({ commit, state }, config) {
  return axios.get('/v1/roles', { params: { ...config } }).then(response => {
    const { data, status } = response
    if (data && status === 200) {
      commit('receiveRoleList', {
        ...data,
        ...config
      })
    }
    return data
  })
}

export function saveRole ({ dispatch, state }, config) {
  return axios.post('/v1/roles', { ...config }).then(response => {
    return response.data
  })
}

export function getPolicyList ({ commit, state }, config) {
  return axios.get('/v1/policies', { params: { ...config } }).then(response => {
    const { data, status } = response
    if (data && status === 200) {
      commit('receivePolicyList', {
        ...data,
        ...config
      })
    }
    return data
  })
}

export function savePolicy ({ dispatch, state }, config) {
  return axios.post('/v1/policies', { ...config }).then(response => {
    return response.data
  })
}

export function getApplicationList ({ commit, state }, config) {
  return axios.get('/v1/applications', { params: { ...config } }).then(response => {
    const { data, status } = response
    if (data && status === 200) {
      commit('receiveApplicationList', {
        ...data,
        ...config
      })
    }
    return data
  })
}
