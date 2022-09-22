import ArticleItem from '@/pages/Home/components/ArticleItem'
import NavBar from '@/components/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import { getSearchResult } from '@/store/actions/search'
import { RootState } from '@/store'
import { InfiniteScroll } from 'antd-mobile-v5'

let page = 1
const SearchResult = () => {
  const history = useHistory()
  const location = useLocation()
  const search = new URLSearchParams(location.search)
  const key = search.get('key')

  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const resultList = useSelector(
    (state: RootState) => state.search.searchResults
  )

  useEffect(() => {}, [dispatch, key])

  // event
  const loadMore = async () => {
    // console.log('-1')
    if (loading) return
    console.log('object')
    setLoading(true)
    try {
      await dispatch(getSearchResult(key!, page))
      page = page + 1
    } finally {
      setLoading(false)
    }

    if (page > 5) {
      setHasMore(false)
    }
  }

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="navBar" onLeftClick={() => history.go(-1)}>
        搜索结果
      </NavBar>

      <div className="article-list">
        {resultList.map((item) => (
          <ArticleItem
            key={item.art_id}
            article={item}
            channelId={-1}
          ></ArticleItem>
        ))}
      </div>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore}></InfiniteScroll>
    </div>
  )
}

export default SearchResult
