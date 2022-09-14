import {
  SAVE_CHANNELS,
  SAVE_ALL_CHANNELS,
  SAVE_ARTICLE_LIST,
} from '@/store/action_types/home'

const initValue = {
  userChannels: [],
  allChannels: [],
  articles: {},
}

export default function home(state = initValue, aciton) {
  const { type, payload } = aciton

  switch (type) {
    case SAVE_CHANNELS:
      return {
        ...state,
        userChannels: payload,
      }

    case SAVE_ALL_CHANNELS:
      return {
        ...state,
        allChannels: payload,
      }

    case SAVE_ARTICLE_LIST:
      return {
        ...state,
        articles: {
          ...state.articles,
          [payload.channelId]: {
            timeStamp: payload.timeStamp,
            articleList: payload.articleList,
          },
        },
      }

    default:
      return state
  }
}
