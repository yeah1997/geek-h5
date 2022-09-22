import { RootThunkAction } from '..'
import request from '@/utils/request'

/**
 * get article detail
 * @param id
 * @returns
 */
export const getArticleDetail = (id: string): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get(`/articles/${id}`)

    dispatch({
      type: 'article/saveDetail',
      payload: res.data,
    })
  }
}

/**
 * get comment list
 */
export const getCommentList = (id: string, type = 'a'): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get('/comments', { params: { source: id, type } })

    dispatch({
      type: 'article/saveComent',
      payload: res.data,
    })
  }
}

/**
 * get More Commnet List
 * @returns
 */
export const getMoreCommentList = (
  id: string,
  offset: string,
  type = 'a'
): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get('/comments', {
      params: { source: id, type, offset },
    })
    dispatch({
      type: 'article/saveMoreComent',
      payload: res.data,
    })
  }
}

/**
 * like a article
 */
export const likeArticle = (
  artId: string,
  attitude: number
): RootThunkAction => {
  return async (dispatch) => {
    if (attitude === 1) {
      await request({
        method: 'DELETE',
        url: `/article/likings/${artId}`,
      })
    } else {
      await request({
        method: 'POST',
        url: '/article/likings',
        data: {
          target: artId,
        },
      })
    }

    // update
    await dispatch(getArticleDetail(artId))
  }
}

export const collectArticle = (
  artId: string,
  isCollected: boolean
): RootThunkAction => {
  return async (dispatch) => {
    if (isCollected) {
      await request.delete(`article/collections/${artId}`)
    } else {
      await request({
        method: 'POST',
        url: '/article/collections',
        data: {
          target: artId,
        },
      })
    }
    // update
    await dispatch(getArticleDetail(artId))
  }
}
