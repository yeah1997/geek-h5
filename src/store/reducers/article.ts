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

type ArticelDetail = {
  detail: Detail
}

export type ArticleAction = {
  type: 'article/saveDetail'
  payload: Detail
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

    default:
      break
  }
  return state
}
