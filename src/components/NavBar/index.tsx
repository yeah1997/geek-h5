// Router
import { useHistory } from 'react-router-dom'

// package
import classNames from 'classnames'

import style from './index.module.scss'
import Icon from '@/components/Icon'

/** type */
type Props = {
  children?: string | JSX.Element
  extra?: string | JSX.Element
  onLeftClick?: () => void
  className?: string
}

/** Navigation */
function NavBar({ children, extra, onLeftClick, className }: Props) {
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

export default NavBar
