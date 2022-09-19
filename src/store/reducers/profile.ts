// Action type
export type User = {
  id: string
  name: string
  photo: string
  art_count: number
  follow_count: number
  fans_count: number
  like_count: number
}

export type Profile = {
  id: string
  photo: string
  name: string
  mobile: string
  gender: number
  birthday: string
}

type InitType = {
  user: User
  profile: Profile
}

const initValue: InitType = {
  user: {},
  profile: {},
} as InitType

export type ProfileAction =
  | {
      type: 'profile/saveUser'
      payload: User
    }
  | {
      type: 'profile/saveUserDetail'
      payload: Profile
    }

export default function profile(state = initValue, action: ProfileAction) {
  // const { type, payload } = action

  switch (action.type) {
    case 'profile/saveUser':
      return { ...state, user: action.payload }
    case 'profile/saveUserDetail':
      return { ...state, profile: action.payload }
    default:
      break
  }

  return state
}
