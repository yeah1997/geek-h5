import request from '@/utils/request'

import { SAVE_CHANNELS, SAVE_ALL_CHANNELS } from '@/store/action_types/home'

import { hasToken, getLocalChannels, setLocalChannels } from '@/utils/storage'

/**
 * get User Channels
 * @returns
 */
export const getUserChannels = () => {
  return async (dispatch) => {
    // there is token
    if (hasToken()) {
      const res = await request({
        method: 'GET',
        url: '/user/channels',
      })
      dispatch(saveUserChaneels(res.data.channels))
    } else {
      const channels = getLocalChannels()
      // there is local channels data
      if (channels) {
        dispatch(saveUserChaneels(channels))
      } else {
        const res = await request({
          method: 'GET',
          url: '/user/channels',
        })
        dispatch(saveUserChaneels(res.data.channels))
        setLocalChannels(res.data.channels)
      }
    }
  }
}

/**
 * save User Channels
 * @param {*} payload
 * @returns
 */
export const saveUserChaneels = (payload) => {
  return {
    type: SAVE_CHANNELS,
    payload,
  }
}

/**
 * get All Channels
 * @returns
 */
export const getAllChannels = () => {
  return async (dispatch) => {
    const res = await request({
      method: 'GET',
      url: '/channels',
    })
    dispatch(saveAllChannels(res.data.channels))
  }
}

export const saveAllChannels = (payload) => {
  return {
    type: SAVE_ALL_CHANNELS,
    payload,
  }
}
