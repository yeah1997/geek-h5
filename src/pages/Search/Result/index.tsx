import ArticleItem from '@/pages/Home/components/ArticleItem'
import NavBar from '@/components/NavBar'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import styles from './index.module.scss'

const SearchResult = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar onLeftClick={() => history.go(-1)}>搜索结果</NavBar>

      <div className="article-list">
        <div></div>
      </div>
    </div>
  )
}

export default SearchResult
