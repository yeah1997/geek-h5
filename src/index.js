import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

// Provider
import { Provider } from 'react-redux'

// Store
import store from '@/store'

// style
import '@scss/index.scss'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
