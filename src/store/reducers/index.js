// Combine Reducers
import { combineReducers } from 'redux'

// Reducer
import login from './login'
import profile from './profile'
import home from './home'

export default combineReducers({
  login,
  profile,
  home,
})
