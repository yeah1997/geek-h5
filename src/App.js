// React
import React, { Suspense } from 'react'
// Router
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import AuthRoute from '@/components/AuthRouter'

//

// Components
const Login = React.lazy(() => import('@/pages/Login'))
const Layout = React.lazy(() => import('@/pages/Layout'))
const ProfileEdit = React.lazy(() => import('@/pages/Profile/Edit'))
const ProfileChat = React.lazy(() => import('@/pages/Profile/Chat'))

function App() {
  return (
    <Router>
      <div className="app">
        <Suspense fallback={<div>loading</div>}>
          <Switch>
            <Redirect exact from="/" to="/home"></Redirect>
            <Route path="/login" component={Login}></Route>
            <Route path="/home" component={Layout}></Route>
            <AuthRoute path="/profile/edit" component={ProfileEdit}></AuthRoute>
            <AuthRoute path="/profile/chat" component={ProfileChat}></AuthRoute>
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}

export default App
