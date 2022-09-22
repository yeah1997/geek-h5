import Icon from '@/components/Icon'
import NavBar from '@/components/NavBar'
// import ContentLoader from 'react-content-loader'
import { useHistory } from 'react-router'
import styles from './index.module.scss'

const Article = () => {
  const history = useHistory()

  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        {/* 顶部导航栏 */}
        <NavBar
          onLeftClick={() => history.go(-1)}
          extra={
            <span>
              <Icon iconName="icongengduo" />
            </span>
          }
        >
          div
        </NavBar>
      </div>
    </div>
  )
}

export default Article
