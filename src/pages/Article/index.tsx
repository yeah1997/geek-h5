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
import Sticky from '@/components/Sticky'
import Share from './Components/Share'
import CommentInput from './Components/CommentInput'
import CommentReply from './Components/CommentReply'
import { Drawer } from 'antd-mobile'
import { InfiniteScroll } from 'antd-mobile-v5'
import { CommentResult } from '@/store/reducers/article'

const Article = () => {
  // history
  const history = useHistory()

  // dispatch
  const dispatch = useDispatch()

  // is Author on the top?
  const [isShowAuthor, setShowAuthor] = useState(false)
  //
  const [share, setShare] = useState(false)

  // close show
  const onCloseShare = () => {
    setShare(false)
  }

  const wrapperRef = useRef<HTMLDivElement>(null)

  // show comment
  const [showComment, setShowComment] = useState({
    visible: false,
  })

  // close comment
  const onCloseComment = () => {
    setShowComment({
      visible: false,
    })
  }
  // on show reply
  const onShowReply = (comment: CommentResult) => {
    SetShowReply({
      visible: true,
      originComment: comment,
    })
  }

  const onCloseReply = () => {
    SetShowReply({
      visible: false,
      originComment: {} as CommentResult,
    })
  }

  // show reply
  const [showReply, SetShowReply] = useState({
    visible: false,
    originComment: {} as CommentResult,
  })

  const commentRef = useRef<HTMLDivElement>(null)

  // author element Ref
  const authorRef = useRef<HTMLDivElement>(null)

  // data from redux
  const { detail, comment } = useSelector((state: RootState) => state.article)

  const hasMore = comment.end_id !== comment.last_id
  // load more comment
  const loadMore = async () => {
    await dispatch(getMoreCommentList(id, comment.last_id))
  }

  const goComment = () => {
    wrapperRef.current!.scrollTo(0, commentRef.current!.offsetTop - 46)
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
    const codes = document.querySelectorAll('.dg-html pre code')
    codes.forEach((el) => {
      HiLightJs.highlightElement(el as HTMLElement)
    })
  }, [detail])

  const onscroll = throttle(() => {
    const rect = authorRef.current!.getBoundingClientRect()!
    if (!rect) return
    if (rect.top <= 0) {
      setShowAuthor(true)
    } else {
      setShowAuthor(false)
    }
  }, 300)

  // scroll event
  useEffect(() => {
    wrapperRef.current!.addEventListener('scroll', onscroll)
  }, [onscroll])

  // request
  useEffect(() => {
    dispatch(getCommentList(id))
  }, [dispatch, id])

  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        {/* ??????????????? */}
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
                {detail.is_followed ? '?????????' : '??????'}
              </span>
            </div>
          ) : (
            ''
          )}
        </NavBar>
        <>
          <div className="wrapper" ref={wrapperRef}>
            <div className="article-wrapper">
              {/* ????????????????????? */}
              <div className="header">
                <h1 className="title">{detail.title}</h1>

                <div className="info">
                  <span>{dayjs(detail.pubdate).format('YYYY-MM-DD')}</span>
                  <span>{detail.read_count} ??????</span>
                  <span>{detail.comm_count} ??????</span>
                </div>

                <div className="author" ref={authorRef}>
                  <img src={detail.aut_photo} alt="" />
                  <span className="name">{detail.aut_name}</span>
                  <span
                    className={classNames('follow', {
                      followed: detail.is_followed,
                    })}
                  >
                    {detail.is_followed ? '?????????' : '??????'}
                  </span>
                </div>
              </div>

              {/* ???????????????????????? */}
              <div className="content">
                <div
                  className="content-html dg-html"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(detail.content),
                  }}
                ></div>
                <div className="date">
                  ?????????????????????{dayjs(detail.pubdate).format('YYYY-MM-DD')}
                </div>
              </div>
            </div>
            <div className="comment">
              {/* comment header */}

              <Sticky top={46}>
                <div className="comment-header" ref={commentRef}>
                  <span>????????????({detail.comm_count})</span>
                  <span>{detail.like_count} ??????</span>
                </div>
              </Sticky>
            </div>

            {detail.comm_count === 0 ? (
              <NoComment></NoComment>
            ) : (
              comment.results?.map((item) => (
                <CommentItem
                  key={item.com_id}
                  comment={item}
                  onReply={onShowReply}
                ></CommentItem>
              ))
            )}
            <InfiniteScroll
              loadMore={loadMore}
              hasMore={hasMore}
            ></InfiniteScroll>
          </div>

          <ArticleFooter
            goComment={goComment}
            onShare={() => setShare(true)}
            onComment={() => setShowComment({ visible: true })}
          ></ArticleFooter>
        </>
      </div>
      <div></div>
      <Drawer
        className="drawer-share"
        position="bottom"
        style={{ minHeight: document.documentElement.clientHeight }}
        children={''}
        sidebar={<Share onClose={onCloseShare} />}
        open={share}
        onOpenChange={onCloseShare}
      />
      {/* ???????????? */}
      <Drawer
        className="drawer"
        position="bottom"
        style={{ minHeight: document.documentElement.clientHeight }}
        children={''}
        sidebar={
          <div className="drawer-sidebar-wrapper">
            {showComment.visible && (
              <CommentInput
                onClose={onCloseComment}
                articleId={detail.art_id}
              />
            )}
          </div>
        }
        open={showComment.visible}
        onOpenChange={onCloseComment}
      />

      {/* ???????????? */}
      <Drawer
        className="drawer-right"
        position="right"
        style={{ minHeight: document.documentElement.clientHeight }}
        children={''}
        sidebar={
          <div className="drawer-sidebar-wrapper">
            {showReply.visible && (
              <CommentReply
                originComment={showReply.originComment}
                articleId={detail.art_id}
                onClose={onCloseReply}
              />
            )}
          </div>
        }
        open={showReply.visible}
        onOpenChange={onCloseReply}
      />
    </div>
  )
}

export default Article
