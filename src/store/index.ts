import { createStore, applyMiddleware } from 'redux'

// Dev tools package
import { composeWithDevTools } from 'redux-devtools-extension'

// asyn react package
import thunk, { ThunkAction } from 'redux-thunk'

// storage
import { getTokenInfo } from '@/utils/storage'

import reduer from '@/store/reducers'

// aciton
import { HomeAction } from './reducers/home'
import { LoginAction } from './reducers/login'
import { ProfileAction } from './reducers/profile'

const store = createStore(
  reduer,
  { login: getTokenInfo() },
  composeWithDevTools(applyMiddleware(thunk))
)

type RootAction = HomeAction | LoginAction | ProfileAction

export type RootState = ReturnType<typeof store.getState>

export type RootThunkAction = ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  RootAction
>

export default store
