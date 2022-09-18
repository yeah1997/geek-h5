// axios
import { Toast } from 'antd-mobile'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

// Storage
import { getTokenInfo, setTokenInfo, removeTokenInfo } from '@/utils/storage'

// hsitory
import history from './history'

// store
import store from '@/store'
import { saveToken, logout } from '@/store/actions/login'

export const BASE_URL = 'http://geek.itheima.net/v1_0'

const instance = axios.create({
  timeout: 5000,
  baseURL: BASE_URL,
})

// Request interceptors
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getTokenInfo().token

    if (token) {
      config.headers!.Authorization = `Bearer ${token}`
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
  async (error: AxiosError<{ message: string }>) => {
    // no Error Response
    if (!error.response) {
      // Toast.info(error.response.data.message)
      Toast.info('Please try again')
      return Promise.reject(error)
    }

    // is not 401
    if (error.response.status !== 401) {
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
    try {
      if (error.response.status === 401) {
        const res = await axios({
          method: 'PUT',
          url: BASE_URL + '/authorizations',
          headers: {
            Authorization: 'Bearer ' + refresh_token,
          },
        })

        // Set token infomation
        const tokenInfo = {
          token: res.data.data.token,
          refresh_token,
        }
        // Save to redux & storage
        store.dispatch(saveToken, tokenInfo)
        setTokenInfo(tokenInfo)

        // update instance by new token
        return instance(error.config)
      }
    } catch (err) {
      // remove token
      removeTokenInfo()
      store.dispatch(logout())

      history.push({
        pathname: '/login',
        state: { from: history.location },
      })
      Toast.info('token is overdate')
      return Promise.reject(err)
    }
  }
)

export default instance
