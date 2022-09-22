// 用户 Token 的本地缓存键名
const TOKEN_KEY = 'geek-token'
const CHANNEL_LIST_KEY = 'geek_channel_list'
const SEARCH_KEY = 'geek_h5_search_list'

/** Type */
// Token
type Token = {
  refresh_token: string
  token: string
}

type Channles = Array<{ id: number; name: string }>

/**
 * 从本地缓存中获取 Token 信息
 */
export const getTokenInfo = (): Token => {
  // return JSON.parse(localStorage.getItem(TOKEN_KEY)) || {}
  return JSON.parse(localStorage.getItem(TOKEN_KEY)!) || {}
}

/**
 * 将 Token 信息存入缓存
 * @param {Object} tokenInfo 从后端获取到的 Token 信息
 */
export const setTokenInfo = (tokenInfo: Token): void => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenInfo))
}

/**
 * 删除本地缓存中的 Token 信息
 */
export const removeTokenInfo = () => {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * 判断本地缓存中是否存在 Token 信息
 */
export const hasToken = () => {
  return !!getTokenInfo().token
}

/**
 * set Chaneels
 * @param {*} channels
 */
export const setLocalChannels = (channels: Channles) => {
  localStorage.setItem(CHANNEL_LIST_KEY, JSON.stringify(channels))
}

/**
 * get channels
 * @returns
 */
export const getLocalChannels = () => {
  return JSON.parse(localStorage.getItem(CHANNEL_LIST_KEY)!)
}

/**
 * remove channels
 */
export const removeLocalChannels = () => {
  localStorage.removeItem(CHANNEL_LIST_KEY)
}

/**
 * 从缓存获取搜索历史关键字
 */
export const getLocalHistories = (): string[] => {
  return JSON.parse(localStorage.getItem(SEARCH_KEY)!) || []
}

/**
 * 将搜索历史关键字存入本地缓存
 * @param {Array} histories
 */
export const setLocalHistories = (histories: string[]) => {
  localStorage.setItem(SEARCH_KEY, JSON.stringify(histories))
}

/**
 * 删除本地缓存中的搜索历史关键字
 */
export const removeLocalHistories = () => {
  localStorage.removeItem(SEARCH_KEY)
}
