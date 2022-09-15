import {
  SAVE_CHANNELS,
  SAVE_ALL_CHANNELS,
  SAVE_ARTICLE_LIST,
  FEEDBACK_TO_ARTICLE,
} from '@/store/action_types/home'

const initValue = {
  userChannels: [],
  allChannels: [],
  articles: {},
  moreAction: {
    visible: false,
    articleId: '',
  },
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
      const { channelId, timestamp, articleList, loadMore } = payload

      return {
        ...state,
        articles: {
          ...state.articles,
          [channelId]: {
            timestamp,
            articleList: loadMore
              ? [...state.articles[channelId].articleList, ...articleList]
              : articleList,
          },
        },
      }

    case FEEDBACK_TO_ARTICLE:
      return {
        ...state,
        moreAction: payload,
      }

    default:
      return state
  }
}
