// React
import React, { Suspense } from 'react'
// Router
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

// Components
const Login = React.lazy(() => import('@/pages/Login'))

const Home = React.lazy(() => import('@/pages/Home'))

function App() {
  return (
    <Router>
      <div className="app">
        <Suspense fallback={<div>loading</div>}>
          <Switch>
            <Redirect exact from="/" to="/home"></Redirect>
            <Route path="/login" component={Login}></Route>
            <Route path="/home" component={Home}></Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}

export default App
