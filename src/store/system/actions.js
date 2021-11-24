import axios from 'axios'

import setAxiosHeaders from '../session/token'

export function init (state) {
  setAxiosHeaders(state)
}

export function deleteUser ({ dispatch, state }, id) {
  return axios.post('/admin/users/delete', { id }).then(response => {
    return response.data
  }).catch(error => {
    return Promise.reject(error)
  })
}
