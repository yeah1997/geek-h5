import { RootThunkAction } from '..'
import request from '@/utils/request'
import { ArticleAction, CommentResult } from '../reducers/article'

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

/**
 * collect article
 * @param artId
 * @param isCollected
 * @returns
 */
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

/**
 * add comment
 * @param artId
 * @param text
 * @returns
 */
export const addComment = (artId: string, text: string): RootThunkAction => {
  return async (dispatch, getState) => {
    const res = await request.post('/comments', {
      target: artId,
      content: text,
    })

    dispatch({
      type: 'article/saveNewComent',
      payload: res.data.new_obj,
    })
    dispatch(getArticleDetail(getState().article.detail.art_id))
  }
}

export const updateComment = (comment: CommentResult): ArticleAction => {
  return {
    type: 'article/updateoment',
    payload: comment,
  }
}
