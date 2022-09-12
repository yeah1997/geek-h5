// axios
import { Toast } from 'antd-mobile'
import axios from 'axios'

// Storage
import { getTokenInfo } from '@/utils/storage'

// hsitory
import history from './history'

export const BASE_URL = 'http://geek.itheima.net/v1_0'

const instance = axios.create({
  timeout: 5000,
  baseURL: BASE_URL,
})

// Request interceptors
instance.interceptors.request.use(
  (config) => {
    const token = getTokenInfo().token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
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
    // no Error Response
    if (!error.response) {
      // Toast.info(error.response.data.message)
      Toast.info('Please try again')
      return Promise.reject(error)
    }

    // is not 401
    if (!error.response.status === 401) {
      Toast.info(error.response.data.message)
      return Promise.reject(error)
    }
    // No token
    const { refresh_token } = getTokenInfo()
    if (!refresh_token) {
      history.push({
        pathname: '/login',
        state: { from: history.location },
      })
      return Promise.reject(error)
    }

    // 401
  }
)

export default instance
