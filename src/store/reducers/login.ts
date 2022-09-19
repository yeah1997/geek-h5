// aciton
export type LoginAction = {
  type: 'login/token' | 'login/logout'
  payload: Token
}

type Token = {
  refresh_token: string
  token: string
}

const initValue: Token = {
  refresh_token: '',
  token: '',
}

export default function login(state = initValue, action: LoginAction) {
  const { type, payload } = action

  switch (type) {
    case 'login/token':
      return payload
    case 'login/logout':
      return {} as Token
    default:
      break
  }

  return state
}
