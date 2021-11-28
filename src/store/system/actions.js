import axios from 'axios'

import setAxiosHeaders from '../session/token'

export function init (state) {
  setAxiosHeaders(state)
}

export function error ({ dispatch, state }, playload) {
  console.log(playload)
}

export function DeleteUser ({ dispatch, state }, id) {
  return axios.post('/admin/users/delete', { id }).then(response => {
    const { code, data } = response.data
    if (code === '200' && data) {
      return data
    } else {
      dispatch('error', { ...response.data })
    }
  }).catch(error => {
    return Promise.reject(error)
  })
}

export function UserDetailInfo ({ dispatch, state }, username) {
  return axios.get('/admin/users/detail/info', { params: { username } }).then(response => {
    const { code, data } = response.data
    if (code === '200' && data) {
      return data
    } else {
      dispatch('error', { ...response.data })
    }
  }).catch(error => {
    return Promise.reject(error)
  })
}

export function UserRoleList ({ dispatch, commit }, params) {
  return axios.get('/admin/users/role', { params }).then(response => {
    const { code, data } = response.data
    if (code === '200' && data) {
      commit('ReceiveUserRoleList', {
        data
      })
    } else {
      dispatch('error', { ...response.data })
    }
  }).catch(error => {
    return Promise.reject(error)
  })
}
