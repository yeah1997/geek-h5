import request from '@/utils/request'
import { RootThunkAction } from '@/store'
import { SearchAction } from '../reducers/search'
import { removeLocalHistories, setLocalHistories } from '@/utils/storage'

type suggestListRes = {
  options: string[]
}

export const getSuggestedList = (keyWord: string): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get<suggestListRes>('/suggestion?q=' + keyWord)
    // const res = await request({
    //   url: '/suggestion',
    //   method: 'GET',
    //   params: {
    //     q: keyWord,
    //   },
    // })

    let options = res.data.options

    if (!options[0]) {
      options = []
    }

    dispatch({
      type: 'search/saveSuggustions',
      payload: res.data.options,
    })
  }
}

/**
 * Clear Suggestion list of redux
 * @returns
 */
export const clearSuggestions = (): SearchAction => {
  return {
    type: 'search/clearSuggustions',
  }
}

/**
 * add search list
 * @param keyWord
 * @returns
 */
export const addSearchList = (keyWord: string): RootThunkAction => {
  return async (dispatch, getState) => {
    let historyList = getState().search.searchHistory
    historyList = historyList.filter((item) => item !== keyWord)

    historyList = [keyWord, ...historyList]

    if (historyList.length >= 10) historyList.slice(0, 10)

    dispatch({
      type: 'search/saveHitoryList',
      payload: historyList,
    })
    setLocalHistories(historyList)
  }
}

/**
 * clear history list
 */
export const clearHistoryList = (): RootThunkAction => {
  return async (dispatch) => {
    removeLocalHistories()
    dispatch({
      type: 'search/clearitoryList',
    })
  }
}
