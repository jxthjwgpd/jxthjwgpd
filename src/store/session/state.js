// import { SessionStorage, Cookies } from 'quasar'

export default function () {
  return {
    // user: SessionStorage.getItem('user'),
    // token: Cookies.get('access_token')
    user: {
      username: 'admin',
      id: 1
    },
    token: 'admin'
  }
}
