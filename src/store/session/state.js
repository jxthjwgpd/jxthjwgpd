import { SessionStorage, Cookies } from 'quasar'

export default function () {
  return {
    user: SessionStorage.getItem('user'),
    token: Cookies.get('access_token')
  }
}
