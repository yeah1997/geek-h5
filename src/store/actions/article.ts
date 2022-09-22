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
 *
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
