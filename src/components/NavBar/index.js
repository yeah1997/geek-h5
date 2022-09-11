import React from 'react'

// Router
import { useHistory } from 'react-router'

// package
import classNames from 'classnames'

import style from './index.module.scss'
import Icon from '@/components/Icon'

/** Navigation */
export default function NavBar({ children, extra, onLeftClick, className }) {
  // Use histrory obj of Router
  const history = useHistory()

  const back = () => {
    if (onLeftClick) {
      onLeftClick()
      return
    }
    history.go(-1)
  }

  return (
    <div className={classNames(style.root, className)}>
      {/* 后退按钮 */}
      <div className="left">
        <Icon iconName="iconfanhui" onClick={back} />
      </div>
      {/* 居中标题 */}
      <div className="title">{children}</div>

      {/* 右侧内容 */}
      <div className="right">{extra}</div>
    </div>
  )
}
