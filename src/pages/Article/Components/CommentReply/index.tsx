import NavBar from '@/components/NavBar'
import NoComment from '../NoComent'

import { Drawer } from 'antd-mobile'
import { useEffect, useState } from 'react'
import ArticleFooter from '..//ArticleFooter'
import CommentInput from '../CommentInput'
import CommentItem from '../CommentItem'
import styles from './index.module.scss'

type Props = {
  articleId: string
  onClose: () => void
  originComment: any
}

const CommentReply = ({ originComment, articleId, onClose }: Props) => {
  // 评论相关数据
  const [comment, setComment] = useState({})

  // 抽屉表单状态
  const [drawerStatus, setDrawerStatus] = useState({
    visible: false,
    id: originComment.com_id,
  })

  useEffect(() => {
    // 加载回复评论的列表数据
    const loadData = async () => {
      //   const res = await http.get('/comments', {
      //     params: {
      //       type: 'c',
      //       source: originComment.com_id,
      //     },
      //   })
      //   setComment(res.data.data)
    }

    // 只有当原评论数据的 com_id 字段有值才开始加载数据
    if (originComment?.com_id) {
      loadData()
    }
  }, [originComment.com_id])

  // 展示评论窗口
  const onComment = () => {
    setDrawerStatus({
      visible: true,
      id: originComment.com_id,
    })
  }

  // 关闭评论窗口
  const onCloseComment = () => {
    setDrawerStatus({
      visible: false,
      id: 0,
    })
  }

  // 发表评论后，插入到数据中
  const onInsertComment = (newItem: any) => {
    // setComment({
    //   ...comment,
    //   total_count: comment.total_count + 1,
    //   results: [newItem, ...comment.results],
    // })
  }

  return (
    <div className={styles.root}>
      <div className="reply-wrapper">
        {/* 顶部导航栏 */}
        <NavBar className="transparent-navbar" onLeftClick={onClose}>
          条回复
        </NavBar>

        {/* 原评论信息 */}
        <div className="origin-comment">
          {/* <CommentItem
            type="origin"
            commentId={originComment.com_id}
            authorPhoto={originComment.aut_photo}
            authorName={originComment.aut_name}
            likeCount={originComment.like_count}
            isFollowed={originComment.is_followed}
            isLiking={originComment.is_liking}
            content={originComment.content}
            replyCount={originComment.reply_count}
            publishDate={originComment.pubdate}
          /> */}
        </div>

        {/* 回复评论的列表 */}
        <div className="reply-list">
          <div className="reply-header">全部回复</div>

          {<NoComment />}
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
                id={drawerStatus.id}
                name={originComment.aut_name}
                articleId={articleId}
                onClose={onCloseComment}
                onComment={onInsertComment}
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
