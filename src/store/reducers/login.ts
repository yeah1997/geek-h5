type Type = {
  refresh_token: string
  token: string
}

const initValue: Type = {
  refresh_token: '',
  token: '',
}

export default function login(state = initValue, action: any) {
  const { type, payload } = action

  switch (type) {
    case 'login/token':
      return payload
    case 'login/logout':
      return {} as Type
    default:
      break
  }

  return state
}
