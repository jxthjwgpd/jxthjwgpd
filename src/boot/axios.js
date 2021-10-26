import axios from 'axios'
import { Notify } from 'quasar'
export default ({ app, router, Vue }) => {
    axios.defaults.baseURL = process.env.API_HOST
    axios.defaults.timeout = 15000
    // axios.defaults.withCredentials = false
    axios.interceptors.response.use(function (response) {
        return response
    }, function (error) {
        if (error + '' === 'Error: Network Error') {
            Notify.create({
                color: 'negative',
                textColor: 'white',
                icon: 'highlight_off',
                message: 'Error: Network Error！'
            })
            return null
        }
        // console.info(router.mode)
        return Promise.reject(error)
    })
    Vue.prototype.$axios = axios
}
