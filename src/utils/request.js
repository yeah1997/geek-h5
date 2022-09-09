// axios
import { Toast } from 'antd-mobile'
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
    if (error.response) {
      Toast.info(error.response.data.message)
    } else {
      Toast.info('Please try again')
    }
    return Promise.reject(error)
  }
)

export default instance
