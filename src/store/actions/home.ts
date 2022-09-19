import request from '@/utils/request'

import { hasToken, getLocalChannels, setLocalChannels } from '@/utils/storage'
import { Dispatch } from 'redux'
import {
  ArticlPayload,
  Channel,
  HomeAction,
  MoreAction,
} from '../reducers/home'
import { RootThunkAction } from '@/store'

/**
 * get User Channels
 * @returns
 */
export const getUserChannels = (): RootThunkAction => {
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
export const saveUserChaneels = (payload: Channel[]): HomeAction => {
  return {
    type: 'home/saveChannels',
    payload,
  }
}

/**
 * get All Channels
 * @returns
 */
export const getAllChannels = (): RootThunkAction => {
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
export const saveAllChannels = (payload: Channel[]): HomeAction => {
  return {
    type: 'home/saveAllCHannels',
    payload,
  }
}

/**
 * delete channel
 * @param {*} channel
 * @returns
 */
export const deleteChannel = (channel: Channel): RootThunkAction => {
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
export const addChannel = (channel: Channel): RootThunkAction => {
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
export const getArticleList = (
  channelId: number,
  timestamp: string,
  loadMore = false
): RootThunkAction => {
  return async (dispatch) => {
    const res = await request({
      method: 'GET',
      url: '/articles',
      params: {
        channel_id: channelId,
        timestamp,
      },
    })

    dispatch(
      setArticleList({
        channelId,
        timestamp: res.data.pre_timestamp,
        articleList: res.data.results,
        loadMore,
      })
    )
  }
}

/**
 * Save article list to redux
 * @param {*} payload
 * @returns
 */
export const setArticleList = (payload: ArticlPayload): HomeAction => {
  return {
    type: 'home/saveArticleList',
    payload,
  }
}

/**
 * Feedback article information
 * @param {*} payload
 * @returns
 */
export const setMoreAction = (payload: MoreAction): HomeAction => {
  return {
    type: 'home/feedbackToArticle',
    payload,
  }
}

/**
 *
 * @param {*} articleId
 * @returns
 */
export const unLikeArticle = (articleId: string): RootThunkAction => {
  return async (dispatch, getState) => {
    await request({
      url: '/article/dislikes',
      method: 'POST',
      data: {
        target: articleId,
      },
    })

    const channelId = getState().home.moreAction.channelId
    const articles = getState().home.articles[channelId]

    console.log(articles)
    dispatch(
      setArticleList({
        channelId,
        timestamp: articles.timestamp,
        articleList: articles.articleList.filter(
          (item) => item.art_id !== articleId
        ),
      })
    )
  }
}

export const reportArticle = (
  articleId: string,
  reportId: string
): RootThunkAction => {
  return async (dispatch: Dispatch, getState) => {
    await request({
      url: '/article/dislikes',
      method: 'POST',
      data: {
        target: articleId,
        type: reportId,
      },
    })

    const channelId = getState().home.moreAction.channelId
    const articles = getState().home.articles[channelId]

    console.log(articles)
    dispatch(
      setArticleList({
        channelId,
        timestamp: articles.timestamp,
        articleList: articles.articleList.filter(
          (item) => item.art_id !== articleId
        ),
      })
    )
  }
}
