import request from '@/utils/request'

// storage
import { setTokenInfo } from '@/utils/storage'

// utils
import { removeTokenInfo } from '@/utils/storage'

// Send Code
export const sendCode = (mobile) => {
  return async (dispatch) => {
    const res = await request.get(`/sms/codes/${mobile}`)
    console.log(res)
  }
}

// Store new token
export const saveToken = (payload) => {
  return {
    type: 'login/token',
    payload,
  }
}

/**
 * Login
 * @param {*} data
 * @returns
 */
export const login = (data) => {
  return async (dispatch) => {
    const res = await request({
      method: 'POST',
      url: '/authorizations',
      data,
    })

    setTokenInfo(res.data) // save token info
    dispatch(saveToken(res.data)) // save to Store
  }
}

export const logout = () => {
  return (dispatch) => {
    removeTokenInfo()
    dispatch({
      type: 'login/logout',
    })
  }
}
