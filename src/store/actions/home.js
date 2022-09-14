import request from '@/utils/request'

import {
  SAVE_CHANNELS,
  SAVE_ALL_CHANNELS,
  SAVE_ARTICLE_LIST,
} from '@/store/action_types/home'

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

/**
 * Save channel list
 * @param {*} payload
 * @returns
 */
export const saveAllChannels = (payload) => {
  return {
    type: SAVE_ALL_CHANNELS,
    payload,
  }
}

/**
 * delete channel
 * @param {*} channel
 * @returns
 */
export const deleteChannel = (channel) => {
  return async (dispatch, getState) => {
    const userChannels = getState().home.userChannels

    // is login
    if (hasToken()) {
      await request({
        method: 'DELETE',
        url: `/user/channels/${channel.id}`,
      })
      // Set channel list after deleted
      dispatch(
        saveUserChaneels(userChannels.filter((item) => item.id !== channel.id))
      )
    } else {
      const restChannels = userChannels.filter((item) => item.id !== channel.id)
      // save to redux
      dispatch(saveUserChaneels(restChannels))
      // save to storage
      setLocalChannels(restChannels)
    }
  }
}

/**
 * add channel
 * @param {*} channel
 * @returns
 */
export const addChannel = (channel) => {
  return async (dispatch, getState) => {
    if (hasToken()) {
      await request({
        method: 'PATCH',
        url: '/user/channels',
        data: { channels: [channel] },
      })

      dispatch(saveUserChaneels([...getState().home.userChannels, channel]))
    } else {
      const addedList = [...getState().home.userChannels, channel]
      dispatch(saveUserChaneels(addedList))
      setLocalChannels(addedList)
    }
  }
}

/**
 * Get article list(request)
 * @param {*} channelId
 * @param {*} timeStamp
 * @returns
 */
export const getArticleList = (channelId, timeStamp) => {
  return async (dispatch) => {
    const res = await request({
      method: 'GET',
      url: '/articles',
      params: {
        channel_id: channelId,
        timestamp: Date.now(),
      },
    })
    dispatch(
      setArticleList({
        channelId,
        timeStamp: res.data.pre_timestamp,
        articleList: res.data.results,
      })
    )
  }
}

/**
 * Save article list to redux
 * @param {*} payload
 * @returns
 */
export const setArticleList = (payload) => {
  return {
    type: SAVE_ARTICLE_LIST,
    payload,
  }
}
