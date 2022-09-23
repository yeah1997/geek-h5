import NavBar from '@/components/NavBar'

import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './index.module.scss'

import { addComment } from '@/store/actions/article'

const CommentInput = ({
  name,
  onClose,
  onAddReply,

  articleId,
}: any) => {
  // 输入框内容
  const [value, setValue] = useState('')

  // 输入框引用
  const txtRef = useRef(null)

  const dispatch = useDispatch()

  useEffect(() => {
    // 输入框自动聚焦
    setTimeout(() => {
      //   txtRef.current.focus()
    }, 600)
  }, [])

  // 发表评论
  const onSendComment = async () => {
    if (!value) return
    if (name) {
      await onAddReply(value)
      onClose()
    } else {
      await dispatch(addComment(articleId, value))
      onClose()
    }
  }

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar
        onLeftClick={onClose}
        extra={
          <span className="publish" onClick={onSendComment}>
            发表
          </span>
        }
      >
        {name ? '回复评论' : '评论文章'}
      </NavBar>

      <div className="input-area">
        {/* 回复别人的评论时显示：@某某 */}
        {name && <div className="at">@{name}:</div>}

        {/* 评论内容输入框 */}
        <textarea
          ref={txtRef}
          placeholder="说点什么~"
          value={value}
          onChange={(e) => setValue(e.target.value.trim())}
        />
      </div>
    </div>
  )
}

export default CommentInput
