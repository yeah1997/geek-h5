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
export type CommentResult = {
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
  comment: CommentType
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
  | {
      type: 'article/saveMoreComent'
      payload: CommentType
    }
  | {
      type: 'article/saveNewComent'
      payload: CommentResult
    }
  | {
      type: 'article/updateoment'
      payload: CommentResult
    }

const initValue: ArticelDetail = {
  detail: {},
  comment: {},
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
        comment: action.payload,
      }
    case 'article/saveMoreComent':
      return {
        ...state,
        comment: {
          ...action.payload,
          results: [...state.comment.results, ...action.payload.results],
        },
      }
    case 'article/saveNewComent':
      return {
        ...state,
        comment: {
          ...state.comment,
          results: [action.payload, ...state.comment.results],
        },
      }
    case 'article/updateoment':
      return {
        ...state,
        comment: {
          ...state.comment,
          results: state.comment.results.map((item) => {
            if (item.com_id === action.payload.com_id) {
              return {
                ...action.payload,
              }
            } else {
              return {
                ...item,
              }
            }
          }),
        },
      }
    default:
      break
  }
  return state
}
