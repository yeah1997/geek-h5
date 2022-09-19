import request from '@/utils/request'

// Type
import { User, Profile, ProfileAction } from '../reducers/profile'

import { RootThunkAction } from '../'

/**
 * Save user infomation to store
 * @param {*} payload
 * @returns
 */
export const saveUserProfile = (payload: User): ProfileAction => {
  return {
    type: 'profile/saveUser',
    payload,
  }
}

/**
 * get User Profile
 * @returns
 */
export const getUserProfile = (): RootThunkAction => {
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
export const saveUserDetail = (payload: Profile): ProfileAction => {
  return {
    type: 'profile/saveUserDetail',
    payload,
  }
}

/**
 * get User Detail
 * @returns
 */
export const getUserDetail = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await request({
      method: 'GET',
      url: '/user/profile',
    })

    dispatch(saveUserDetail(res.data))
  }
}

type PartialProfile = Partial<Profile>
/**
 * updata User Profile
 * @param {*} data
 * @returns
 */
export const updateProfile = (data: PartialProfile): RootThunkAction => {
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
export const updatePhoto = (formData: FormData): RootThunkAction => {
  return async (dispatch) => {
    await request.patch('/user/photo', formData)
    dispatch(getUserDetail())
  }
}
