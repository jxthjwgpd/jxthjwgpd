import axios from 'axios'
const baseUrl = axios.defaults.baseURL
const apiServer = baseUrl + '/api'
const adminServer = baseUrl + '/admin'
const uploaderServer = baseUrl + '/uploader'

export {
  baseUrl,
  apiServer,
  adminServer,
  uploaderServer
}
