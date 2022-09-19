import { AnyAction } from 'redux'

const initValue = {
  refresh_token: '',
  token: '',
}

export default function login(state = initValue, action: AnyAction) {
  const { type, payload } = action

  switch (type) {
    case 'login/token':
      return payload
    case 'login/logout':
      return initValue
    default:
      break
  }

  return state
}
