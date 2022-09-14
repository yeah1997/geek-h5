// usuall Component
import { useEffect } from 'react'
import ArticleItem from '../ArticleItem'

// store-action
import { getArticleList } from '@/store/actions/home'

// style
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'

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

  if (!currentArticleList) return null

  console.log(currentArticleList)

  const list = currentArticleList.articleList

  return (
    <div className={styles.root}>
      <div className="articles">
        {list.map((item) => (
          <div className="article-item" key={item.art_id}>
            <ArticleItem article={item}></ArticleItem>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArticleList
