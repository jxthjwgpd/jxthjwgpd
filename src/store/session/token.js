import axios from 'axios'

export default function setHeaderAuthorization (state) {
  axios.defaults.headers.common.Authorization = state.user
    ? 'Bearer ' + state.user.token
    : ''
}
