import { createStore, applyMiddleware, AnyAction } from 'redux'

// Dev tools package
import { composeWithDevTools } from 'redux-devtools-extension'

// asyn react package
import thunk, { ThunkAction } from 'redux-thunk'

// storage
import { getTokenInfo } from '@/utils/storage'

import reduer from '@/store/reducers'

const store = createStore(
  reduer,
  { login: getTokenInfo() },
  composeWithDevTools(applyMiddleware(thunk))
)

export type RootState = ReturnType<typeof store.getState>

export type RootThunkAction = ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  AnyAction
>

export default store
