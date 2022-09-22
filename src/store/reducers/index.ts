// Combine Reducers
import { combineReducers } from 'redux' // es6

// Reducer
import login from './login'
import profile from './profile'
import home from './home'
import search from './search'

export default combineReducers({
  login,
  profile,
  home,
  search,
})
