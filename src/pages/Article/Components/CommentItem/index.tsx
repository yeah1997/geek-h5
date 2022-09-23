import Icon from '@/components/Icon'
import classnames from 'classnames'
import dayjs from 'dayjs'
import styles from './index.module.scss'

import { CommentResult } from '@/store/reducers/article'

type Props = {
  comment: CommentResult
  type?: string
  onReply: (comment: CommentResult) => void
}

const CommentItem = ({ comment, type = 'nrmal', onReply }: Props) => {
  return (
    <div className={styles.root}>
      {/* 评论者头像 */}
      <div className="avatar">
        <img src={comment.aut_photo} alt="" />
      </div>

      <div className="comment-info">
        {/* 评论者名字 */}
        <div className="comment-info-header">
          <span className="name">{comment.aut_name}</span>

          {/* 关注或点赞按钮 */}

          <span className="thumbs-up" onClick={() => {}}>
            {comment.like_count}{' '}
            <Icon
              iconName={
                comment.is_liking ? 'iconbtn_like_sel' : 'iconbtn_like2'
              }
            />
          </span>

          <span
            className={classnames(
              'follow',
              comment.is_followed ? 'followed' : ''
            )}
          >
            {comment.is_followed ? '已关注' : '关注'}
          </span>
        </div>

        {/* 评论内容 */}
        <div className="comment-content">{comment.content}</div>

        <div className="comment-footer">
          {/* 回复按钮 */}
          <span className="replay" onClick={() => onReply(comment)}>
            {comment.reply_count}回复 <Icon iconName="iconbtn_right" />
          </span>

          {/* 评论日期 */}
          <span className="comment-time">{dayjs().from(comment.pubdate)}</span>
        </div>
      </div>
    </div>
  )
}

export default CommentItem
