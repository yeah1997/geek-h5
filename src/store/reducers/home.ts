// aciton
export type HomeAction =
  | {
      type: 'home/saveChannels'
      payload: Channel[] //userChannels
    }
  | {
      type: 'home/saveAllCHannels'
      payload: Channel[]
    }
  | {
      type: 'home/saveArticleList'
      payload: ArticlPayload
    }
  | {
      type: 'home/feedbackToArticle'
      payload: MoreAction
    }

export type Channel = {
  id: number
  name: string
}

export type ArticlPayload = {
  channelId: number
  timestamp: string
  articleList: Article[]
  loadMore?: any
}

export type MoreAction = {
  visible: boolean
  articleId: string
  channelId: number
}
type Article = {
  art_id: string
  title: string
  aut_id: string
  comm_count: number
  pubdate: string
  aut_name: string
  is_top?: boolean
  cover: {
    type: string
    images?: string
  }
}

type Articles = {
  [index: number]: {
    timestamp: string
    articleList: Article[]
  }
}

type HomeType = {
  userChannels: Channel[]
  allChannels: Channel[]
  articles: Articles
  moreAction: MoreAction
}

const initValue: HomeType = {
  userChannels: [],
  allChannels: [],
  articles: {},
  moreAction: {
    visible: false,
    articleId: '',
    channelId: -1,
  },
} as HomeType

export default function home(state = initValue, aciton: HomeAction) {
  const { type, payload } = aciton

  switch (type) {
    case 'home/saveChannels':
      return {
        ...state,
        userChannels: payload,
      }

    case 'home/saveAllCHannels':
      return {
        ...state,
        allChannels: payload,
      }

    case 'home/saveArticleList':
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

    case 'home/feedbackToArticle':
      return {
        ...state,
        moreAction: payload,
      }

    default:
      return state
  }
}
