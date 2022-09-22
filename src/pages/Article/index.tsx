import Icon from '@/components/Icon'
import NavBar from '@/components/NavBar'
import { useEffect, useRef, useState } from 'react'
// import ContentLoader from 'react-content-loader'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import styles from './index.module.scss'

import {
  getArticleDetail,
  getCommentList,
  getMoreCommentList,
} from '@/store/actions/article'
import { RootState } from '@/store'
import classNames from 'classnames'
import dayjs from 'dayjs'
import DOMPurify from 'dompurify'
import { throttle } from 'lodash'

import HiLightJs from 'highlight.js'
import 'highlight.js/styles/vs2015.css'

import NoComment from './Components/NoComent'
import CommentItem from './Components/CommentItem'
import ArticleFooter from './Components/ArticleFooter'
import { InfiniteScroll } from 'antd-mobile-v5'

const Article = () => {
  // history
  const history = useHistory()

  // dispatch
  const dispatch = useDispatch()

  // is Author on the top?
  const [isShowAuthor, setShowAuthor] = useState(false)

  // author element Ref
  const authorRef = useRef<HTMLDivElement>(null)

  // data from redux
  const { detail, comment } = useSelector((state: RootState) => state.article)

  const hasMore = comment.end_id !== comment.last_id
  // load more comment
  const loadMore = async () => {
    await dispatch(getMoreCommentList(id, comment.last_id))
  }

  const { id } = useParams<{ id: string }>()

  // get article detail
  useEffect(() => {
    dispatch(getArticleDetail(id))
  }, [dispatch, id])

  // render code element
  useEffect(() => {
    HiLightJs.configure({
      ignoreUnescapedHTML: true,
    })
    const codes = document.querySelectorAll('.dg-html code')
    codes.forEach((el) => {
      HiLightJs.highlightElement(el as HTMLElement)
    })
  }, [detail])

  const onscroll = throttle(() => {
    const rect = authorRef.current!.getBoundingClientRect()
    if (rect.top <= 0) {
      setShowAuthor(true)
    } else {
      setShowAuthor(false)
    }
  }, 300)

  // scroll event
  useEffect(() => {
    document.addEventListener('scroll', onscroll)
    return () => document.removeEventListener('scroll', onscroll)
  }, [onscroll])

  // request
  useEffect(() => {
    dispatch(getCommentList(id))
  }, [dispatch, id])

  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        {/* 顶部导航栏 */}
        <NavBar
          className="navBar"
          onLeftClick={() => history.go(-1)}
          extra={
            <span>
              <Icon iconName="icongengduo" />
            </span>
          }
        >
          {isShowAuthor ? (
            <div className="nav-author">
              <img src={detail.aut_photo} alt="" />
              <span className="name">{detail.aut_name}</span>
              <span
                className={classNames(
                  'follow',
                  detail.is_followed ? 'followed' : ''
                )}
              >
                {detail.is_followed ? '已关注' : '关注'}
              </span>
            </div>
          ) : (
            ''
          )}
        </NavBar>
        <>
          <div className="wrapper">
            <div className="article-wrapper">
              {/* 文章描述信息栏 */}
              <div className="header">
                <h1 className="title">{detail.title}</h1>

                <div className="info">
                  <span>{dayjs(detail.pubdate).format('YYYY-MM-DD')}</span>
                  <span>{detail.read_count} 阅读</span>
                  <span>{detail.comm_count} 评论</span>
                </div>

                <div className="author" ref={authorRef}>
                  <img src={detail.aut_photo} alt="" />
                  <span className="name">{detail.aut_name}</span>
                  <span
                    className={classNames('follow', {
                      followed: detail.is_followed,
                    })}
                  >
                    {detail.is_followed ? '已关注' : '关注'}
                  </span>
                </div>
              </div>

              {/* 文章正文内容区域 */}
              <div className="content">
                <div
                  className="content-html dg-html"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(detail.content),
                  }}
                ></div>
                <div className="date">
                  发布文章时间：{dayjs(detail.pubdate).format('YYYY-MM-DD')}
                </div>
              </div>
            </div>
            <div className="comment">
              <div className="comment-header">
                <span>全部评论({detail.comm_count})</span>
                <span>{detail.like_count} 点赞</span>
              </div>
            </div>

            {detail.comm_count === 0 ? (
              <NoComment></NoComment>
            ) : (
              comment.results?.map((item) => (
                <CommentItem key={item.com_id} comment={item}></CommentItem>
              ))
            )}
            <InfiniteScroll
              loadMore={loadMore}
              hasMore={hasMore}
            ></InfiniteScroll>
            <ArticleFooter></ArticleFooter>
          </div>
        </>
      </div>
    </div>
  )
}

export default Article
