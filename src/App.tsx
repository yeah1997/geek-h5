// React
import React, { Suspense } from 'react'
// Router
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import AuthRoute from '@/components/AuthRouter'

//history
import history from '@/utils/history'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import KeepAlive from './components/KeepAlive'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

// Components
const Login = React.lazy(() => import('@/pages/Login'))
const Layout = React.lazy(() => import('@/pages/Layout'))
const ProfileEdit = React.lazy(() => import('@/pages/Profile/Edit'))
const ProfileChat = React.lazy(() => import('@/pages/Profile/Chat'))
const NotFound = React.lazy(() => import('@/pages/NotFound'))
const Feedback = React.lazy(() => import('@/pages/Profile/Feedback'))
const Search = React.lazy(() => import('@/pages/Search'))
const SearchResult = React.lazy(() => import('@/pages/Search/Result'))
const Article = React.lazy(() => import('@/pages/Article'))

function App() {
  return (
    <Router history={history}>
      <div className="app">
        <Suspense fallback={<div>loading</div>}>
          <KeepAlive
            exact
            alivePath="/home"
            path="/home"
            component={Layout}
          ></KeepAlive>
          <Switch>
            <Redirect exact from="/" to="/home/index"></Redirect>
            <Route path="/login" component={Login}></Route>

            <Route exact path="/search" component={Search}></Route>

            <Route
              exact
              path={'/search/result'}
              component={SearchResult}
            ></Route>

            <Route exact path="/article/:id" component={Article}></Route>

            <AuthRoute path="/profile/edit" component={ProfileEdit}></AuthRoute>
            <AuthRoute path="/profile/chat" component={ProfileChat}></AuthRoute>
            <AuthRoute
              path="/profile/feedback"
              component={Feedback}
            ></AuthRoute>
            {/* Not Found */}
            <Route
              render={(props) => {
                if (!props.location.pathname.startsWith('/home')) {
                  return <NotFound />
                }
              }}
            ></Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}

export default App
