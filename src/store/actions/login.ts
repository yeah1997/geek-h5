import request from '@/utils/request'

// storage
import { setTokenInfo } from '@/utils/storage'

// utils
import { removeTokenInfo } from '@/utils/storage'

import { Dispatch } from 'redux'

/** Type */
// Token
type Token = {
  refresh_token: string
  token: string
}

// Send Code
export const sendCode = (mobile: string) => {
  return async (dispatch: Dispatch) => {
    const res = await request.get(`/sms/codes/${mobile}`)
    console.log(res)
  }
}

// Store new token
export const saveToken = (payload: Token) => {
  return {
    type: 'login/token' as const,
    payload,
  }
}

/**
 * Login
 * @param {*} data
 * @returns
 */
export const login = (data: { mobile: string; code: string }) => {
  return async (dispatch: Dispatch) => {
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
  return (dispatch: Dispatch) => {
    removeTokenInfo()
    dispatch({
      type: 'login/logout',
    })
  }
}
