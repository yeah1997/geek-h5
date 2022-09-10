import request from '@/utils/request'

// Action type
import { PROFILE_USER, PROFILE_DETAIL } from '@/store/action_types/profile'

/**
 * Save user infomation to store
 * @param {*} payload
 * @returns
 */
export const saveUserProfile = (payload) => {
  return {
    type: PROFILE_USER,
    payload,
  }
}

/**
 * get User Profile
 * @returns
 */
export const getUserProfile = () => {
  return async (dispatch) => {
    const res = await request({
      method: 'GET',
      url: '/user',
    })

    dispatch(saveUserProfile(res.data))
  }
}

/**
 * save User detail to store
 * @param {*} payload
 * @returns
 */
export const saveUserDetail = (payload) => {
  return {
    type: PROFILE_DETAIL,
    payload,
  }
}

/**
 * get User Detail
 * @returns
 */
export const getUserDetail = () => {
  return async (dispatch) => {
    const res = await request({
      method: 'GET',
      url: '/user/profile',
    })

    dispatch(saveUserDetail(res.data))
  }
}

/**
 * updata User Profile
 * @param {*} data
 * @returns
 */
export const updateProfile = (data) => {
  return async (dispatch) => {
    await request({
      method: 'PATCH',
      url: '/user/profile',
      data,
    })
    dispatch(getUserDetail())
  }
}

/**
 * Photo update
 * @param {*} formData
 * @returns
 */
export const updatePhoto = (formData) => {
  return async (dispatch) => {
    await request({
      method: 'PATCH',
      url: '/user/photo',
      formData,
    })
    dispatch(getUserDetail())
  }
}
