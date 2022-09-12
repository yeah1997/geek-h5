import request from '@/utils/request'

import { SAVE_CHANNELS } from '@/store/action_types/home'

/**
 * get User Channels
 * @returns
 */
export const getUserChannels = () => {
  return async (dispatch) => {
    const res = await request({
      method: 'GET',
      url: '/user/channels',
    })
    dispatch(saveUserChaneels(res.data.channels))
  }
}

export const saveUserChaneels = (payload) => {
  return {
    type: SAVE_CHANNELS,
    payload,
  }
}
