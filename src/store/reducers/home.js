import { SAVE_CHANNELS } from '@/store/action_types/home'

const initValue = {
  userChannels: [],
}

export default function home(state = initValue, aciton) {
  const { type, payload } = aciton

  switch (type) {
    case SAVE_CHANNELS:
      return {
        ...state,
        userChannels: payload,
      }

    default:
      return state
  }
}
