import { SessionStorage, Cookies } from 'quasar'

export default function () {
  return {
    username: SessionStorage.getItem('username'),
    token: Cookies.get('token'),
    global: {
      loading: false,
      menuList: [],
      permList: []
    }
  }
}
