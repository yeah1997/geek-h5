// axios
import axios from 'axios'

export const BASE_URL = 'http://geek.itheima.net/v1_0'

const instance = axios.create({
  timeout: 5000,
  baseURL: BASE_URL,
})

// Request interceptors
instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptors
instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
