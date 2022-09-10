// Combine Reducers
import { combineReducers } from 'redux'

// Reducer
import login from './login'
import profile from './profile'

export default combineReducers({
  login,
  profile,
})
