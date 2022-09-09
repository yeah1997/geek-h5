const initValue = {
  refresh_token: '',
  token: '',
}

export default function login(state = initValue, action) {
  const { type, payload } = action

  switch (type) {
    case 'login/token':
      return payload
    default:
      break
  }

  return state
}
