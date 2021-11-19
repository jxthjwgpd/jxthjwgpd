import axios from 'axios'
import { Cookies } from 'quasar'

export default function setAxiosHeaders (state) {
  let token = state.token || Cookies.get('token')
  if (token) {
    axios.defaults.headers.common.Authorization = 'Bearer ' + token
  }
}
