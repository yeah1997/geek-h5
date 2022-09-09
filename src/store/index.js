import { createStore, applyMiddleware } from 'redux'

// Dev tools package
import { composeWithDevTools } from 'redux-devtools-extension'

// asyn react package
import thunk from 'redux-thunk'

// storage
import { getTokenInfo } from '@/utils/storage'

import reduer from '@/store/reducers'

const store = createStore(
  reduer,
  { login: getTokenInfo() },
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
