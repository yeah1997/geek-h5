import { useEffect } from 'react'
// usuall Component
import ArticleItem from '../ArticleItem'

// store-action
import { getArticleList } from '@/store/actions/home'

// antd
import { PullToRefresh, InfiniteScroll } from 'antd-mobile-v5'

// style
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

/**
 * 文章列表组件
 * @param {String} props.channelId 当前文章列表所对应的频道ID
 * @param {String} props.aid 当前 Tab 栏选中的频道ID
 */
const ArticleList = ({ channelId, activeId }) => {
  // dispatch
  const dispatch = useDispatch()

  // article list
  const currentArticleList = useSelector(
    (state) => state.home.articles[channelId]
  )

  useEffect(() => {
    // article list of current page
    if (currentArticleList) return

    // is current page?
    if (channelId === activeId) {
      dispatch(getArticleList(channelId, Date.now()))
    }
  }, [channelId, activeId, dispatch, currentArticleList])

  const onRefresh = async () => {
    // update data
    setHasMore(true)
    await dispatch(getArticleList(channelId, Date.now()))
  }

  // hasMore?
  const [hasMore, setHasMore] = useState(true)
  // is loading
  const [loading, setLoading] = useState(false)

  // Event
  // load more
  const loadMore = async () => {
    // is loading?
    if (loading) return
    // if there is no more article list
    if (!currentArticleList.timestamp) {
      setHasMore(false)
      return
    }

    // active ID only load
    if (channelId !== activeId) {
      return
    }

    setLoading(true)

    try {
      await dispatch(
        getArticleList(channelId, currentArticleList.timestamp, true)
      )
    } finally {
      setLoading(false)
    }

    if (!currentArticleList.timestamp) {
      setHasMore(false)
    }
  }

  if (!currentArticleList) return null
  return (
    <div className={styles.root}>
      <div className="articles">
        <PullToRefresh onRefresh={onRefresh}>
          {currentArticleList.articleList.map((item) => (
            <div className="article-item" key={item.art_id}>
              <ArticleItem channelId={channelId} article={item}></ArticleItem>
            </div>
          ))}
        </PullToRefresh>
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore}></InfiniteScroll>
      </div>
    </div>
  )
}

export default ArticleList
