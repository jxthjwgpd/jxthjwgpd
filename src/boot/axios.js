import axios from 'axios'
export default ({ app, router, Vue }) => {
    axios.defaults.baseURL = process.env.API_HOST
    axios.defaults.timeout = 15000
    // axios.defaults.withCredentials = false
    axios.interceptors.response.use(function (response) {
        const { code, message } = response.data
        if (code === '401') {
            console.warn(message + '[' + code + ']')
            router.push({ path: '/user/login', query: { 'redirect': router.history.current.path } })
        }
        return response
    }, function (error) {
        if (error.response.status === 404) {
            router.push({ path: '/404' })
        }
        return Promise.reject(error)
    })
    Vue.prototype.$axios = axios
}
