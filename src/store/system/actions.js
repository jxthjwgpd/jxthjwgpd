import axios from 'axios'

import setAxiosHeaders from '../session/token'

export function init (state) {
  setAxiosHeaders(state)
}

export function getUserList ({ commit, state }, config) {
  if (state.user.lists.records.length > 0 && config.path === state.user.lists.path && config.current === 1) {
    return state.user.lists
  }
  return axios.get('/v1/users', { ...config }).then(response => {
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
