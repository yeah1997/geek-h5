// usuall Component
import { useEffect, useState } from 'react'
import ArticleItem from '../ArticleItem'

// request
import request from '@/utils/request'

// store-action
import { getArticleList } from '@/store/actions/home'

// style
import styles from './index.module.scss'
import { useDispatch } from 'react-redux'

/**
 * 文章列表组件
 * @param {String} props.channelId 当前文章列表所对应的频道ID
 * @param {String} props.aid 当前 Tab 栏选中的频道ID
 */
const ArticleList = ({ channelId, activeId }) => {
  // dispatch
  const dispatch = useDispatch()

  // article list
  const list = []

  useEffect(() => {
    if (channelId === activeId) {
      dispatch(getArticleList(channelId, Date.now()))
    }
  }, [channelId, activeId, dispatch])

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
