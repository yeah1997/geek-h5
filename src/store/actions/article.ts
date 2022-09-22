import { RootThunkAction } from '..'
import request from '@/utils/request'

export const getArticleDetail = (id: string): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get(`/articles/${id}`)
    console.log(res.data)
    dispatch({
      type: 'article/saveDetail',
      payload: res.data,
    })
  }
}
