import axios from 'axios'
export default ({ app, router, Vue }) => {
    axios.defaults.baseURL = process.env.API_HOST
    axios.defaults.timeout = 5000
    axios.interceptors.response.use(function (response) {
        return response
    }, function (error) {
        console.error(error)
        return Promise.reject(error)
    })
    Vue.prototype.$axios = axios
}
