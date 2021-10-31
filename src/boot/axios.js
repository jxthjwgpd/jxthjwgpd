import axios from 'axios'
export default ({ app, router, Vue }) => {
    axios.defaults.baseURL = process.env.API_HOST
    axios.defaults.timeout = 15000
    // axios.defaults.withCredentials = false
    axios.interceptors.response.use(function (response) {
        return response
    }, function (error) {
        return Promise.reject(error)
    })
    Vue.prototype.$axios = axios
}
