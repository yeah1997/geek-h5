import React, { Suspense } from 'react'
// Router
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import AuthRoute from '@/components/AuthRouter'

// Style
import style from './index.module.scss'
// usuall Component
import Icon from '@/components/Icon'

// package
import classNames from 'classnames'

// Components
const Home = React.lazy(() => import('@/pages/Home'))
const QA = React.lazy(() => import('@/pages/QA'))
const Video = React.lazy(() => import('@/pages/Video'))
const Profile = React.lazy(() => import('@/pages/Profile'))

export default function Layout() {
  // History
  const history = useHistory()
  // Loaction
  const location = useLocation()

  const tabButton = [
    { id: 1, title: 'Home', path: '/home', icon: 'iconbtn_home' },
    { id: 2, title: 'Q&A', path: '/home/qa', icon: 'iconbtn_qa' },
    { id: 3, title: 'Video', path: '/home/video', icon: 'iconbtn_video' },
    { id: 4, title: 'Mine', path: '/home/profile', icon: 'iconbtn_mine' },
  ]

  return (
    <div className={style.root}>
      {/* 区域一：点击按钮切换显示内容的区域 */}
      <div className="tab-content"></div>

      {/* Router Setting  --- Router lazy loading(Suspense)*/}
      <Suspense fallback={<div>loading</div>}>
        <Switch>
          <Route exact path="/home" component={Home}></Route>
          <Route path="/home/qa" component={QA}></Route>
          <Route path="/home/video" component={Video}></Route>
          <AuthRoute path="/home/profile" component={Profile}></AuthRoute>
        </Switch>
      </Suspense>
      {/* Router Setting */}

      {/* 区域二：按钮区域，会使用固定定位显示在页面底部 */}
      <div className="tabbar">
        {tabButton.map((item) => (
          <div
            key={item.id}
            className={classNames(
              'tabbar-item',
              item.path === location.pathname ? 'tabbar-item-active' : ''
            )}
            onClick={() => history.push(item.path)}
          >
            <Icon
              iconName={
                item.path === location.pathname ? item.icon + '_sel' : item.icon
              }
            ></Icon>
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
