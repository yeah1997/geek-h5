type Detail = {
  art_id: string
  attitude: number
  aut_id: string
  aut_name: string
  aut_photo: string
  comm_count: number
  content: string
  is_collected: boolean
  is_followed: boolean
  like_count: number
  pubdate: string
  read_count: number
  title: string
}
type CommentResult = {
  aut_id: string
  aut_name: string
  aut_photo: string
  com_id: string
  content: string
  is_followed: boolean
  is_liking: boolean
  like_count: number
  pubdate: string
  reply_count: number
}

type CommentType = {
  end_id: string
  last_id: string
  results: CommentResult[]
  total_count: number
}

type ArticelDetail = {
  detail: Detail
  coment: CommentType
}

export type ArticleAction =
  | {
      type: 'article/saveDetail'
      payload: Detail
    }
  | {
      type: 'article/saveComent'
      payload: CommentType
    }

const initValue: ArticelDetail = {
  detail: {},
} as ArticelDetail

export default function article(state = initValue, action: ArticleAction) {
  switch (action.type) {
    case 'article/saveDetail':
      return {
        ...state,
        detail: action.payload,
      }
    case 'article/saveComent':
      return {
        ...state,
        coment: action.payload,
      }
    default:
      break
  }
  return state
}
