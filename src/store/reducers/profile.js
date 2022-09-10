// Action type
import { PROFILE_USER, PROFILE_DETAIL } from '@/store/action_types/profile'

const initValue = {
  user: {},
  profile: {},
}

export default function profile(state = initValue, action) {
  const { type, payload } = action

  switch (type) {
    case PROFILE_USER:
      return { ...state, user: payload }
    case PROFILE_DETAIL:
      return { ...state, profile: payload }
    default:
      break
  }

  return state
}
