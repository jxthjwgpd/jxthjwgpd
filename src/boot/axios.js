import axios from 'axios'
export default ({ app, router, Vue }) => {
    axios.defaults.baseURL = process.env.API_HOST
    axios.defaults.timeout = 15000
    // axios.defaults.withCredentials = false
    axios.interceptors.response.use(function (response) {
        const { code, message } = response.data
        if (code === '401' || code === '1007') {
            console.warn(message + '[' + code + ']')
            Vue.prototype.$q.dialog({
                title: '提示',
                message: message,
                ok: '确认',
                cancel: false,
                persistent: true
            }).onOk(() => {
                // router.push({ path: '/user/login', query: { 'redirect': router.history.current.path } })
            })
            return Promise.reject(null)
        }
        return response
    }, function (error) {
        if (error + '' === 'Error: Network Error') {
            router.push({ path: '/503' })
        } else if (error.response && error.response.status === 404) {
            Vue.prototype.$q.notify({
                message: '请求地址不存在 [' + error.response.request.responseURL + ']'
            })
        }
        return Promise.reject(error)
    })
}
