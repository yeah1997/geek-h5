import NavBar from '@/components/NavBar'
import NoComment from '../NoComent'

import { Drawer } from 'antd-mobile'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ArticleFooter from '..//ArticleFooter'
import CommentInput from '../CommentInput'
import CommentItem from '../CommentItem'
import styles from './index.module.scss'
import { CommentResult } from '@/store/reducers/article'
import request from '@/utils/request'
import { InfiniteScroll } from 'antd-mobile-v5'

import { updateComment } from '@/store/actions/article'

type Props = {
  articleId: string
  onClose: () => void
  originComment: CommentResult
}

const CommentReply = ({ originComment, articleId, onClose }: Props) => {
  const [replyList, setReplyList] = useState({
    end_id: '',
    last_id: '',
    results: [] as CommentResult[],
    total_count: 0,
  })

  // dispatch
  const dispatch = useDispatch()

  // 抽屉表单状态
  const [drawerStatus, setDrawerStatus] = useState({
    visible: false,
  })

  useEffect(() => {
    const fetchData = async () => {
      const res = await request.get('/comments', {
        params: {
          type: 'c',
          source: originComment.com_id,
        },
      })

      setReplyList(res.data)
    }
    fetchData()
  }, [originComment])

  // hasmore
  let hasMore = replyList.end_id !== replyList.last_id
  console.log(hasMore)

  // 展示评论窗口
  const onComment = () => {
    setDrawerStatus({
      visible: true,
    })
  }

  // 关闭评论窗口
  const onCloseComment = () => {
    setDrawerStatus({
      visible: false,
    })
  }

  const loadMore = async () => {
    const res = await request.get('/comments', {
      params: {
        type: 'c',
        source: originComment.com_id,
        offset: replyList.last_id,
      },
    })

    setReplyList({
      ...res.data,
      results: [...replyList.results, ...res.data.results],
    })
  }

  // 发表评论后，插入到数据中
  const onAddReply = async (content: string) => {
    const res = await request.post('/comments', {
      target: originComment.com_id,
      content,
      art_id: articleId,
    })
    setReplyList({
      ...replyList,
      total_count: replyList.total_count + 1,
      results: [res.data.new_obj, ...replyList.results],
    })

    // update reply number
    dispatch(
      updateComment({
        ...originComment,
        reply_count: originComment.reply_count + 1,
      })
    )
  }

  console.log(originComment.reply_count)
  console.log(replyList.results)
  return (
    <div className={styles.root}>
      <div className="reply-wrapper">
        {/* 顶部导航栏 */}
        <NavBar className="transparent-navbar" onLeftClick={onClose}>
          <div>{replyList.total_count}条回复</div>
        </NavBar>

        {/* 原评论信息 */}
        <div className="origin-comment">
          <CommentItem
            comment={originComment}
            onReply={() => {}}
            type="reply"
          />
        </div>

        {/* 回复评论的列表 */}
        <div className="reply-list">
          <div className="reply-header">全部回复</div>
          {originComment.reply_count === 0 ? (
            <NoComment />
          ) : (
            replyList.results.map((item, index) => (
              <CommentItem
                key={index}
                comment={item}
                onReply={() => {}}
                type="reply"
              ></CommentItem>
            ))
          )}
          <InfiniteScroll
            loadMore={loadMore}
            hasMore={hasMore}
          ></InfiniteScroll>
        </div>

        {/* 评论工具栏，设置 type="reply" 不显示评论和点赞按钮 */}
        <ArticleFooter
          type="reply"
          placeholder="去评论"
          onComment={onComment}
        />
      </div>

      {/* 评论表单抽屉 */}
      <Drawer
        className="drawer"
        position="bottom"
        style={{ minHeight: document.documentElement.clientHeight }}
        children={''}
        sidebar={
          <div className="drawer-sidebar-wrapper">
            {drawerStatus.visible && (
              <CommentInput
                name={originComment.aut_name}
                articleId={articleId}
                onClose={onCloseComment}
                onAddReply={onAddReply}
              />
            )}
          </div>
        }
        open={drawerStatus.visible}
        onOpenChange={onCloseComment}
      />
    </div>
  )
}

export default CommentReply
