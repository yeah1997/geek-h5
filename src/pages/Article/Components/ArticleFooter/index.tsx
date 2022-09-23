import Icon from '@/components/Icon'
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'

import { likeArticle, collectArticle } from '@/store/actions/article'
import { Toast } from 'antd-mobile'

const CommentFooter = ({
  placeholder,
  onComment,
  goComment,
  onShare,
  type = 'normal',
}: any) => {
  const { detail } = useSelector((state: RootState) => state.article)

  // dispatch
  const dispatch = useDispatch()

  // event
  const onLike = async () => {
    await dispatch(likeArticle(detail.art_id, detail.attitude))
    Toast.success('Over!', 500)
  }

  const onCollected = async () => {
    await dispatch(collectArticle(detail.art_id, detail.is_collected))
    Toast.success('Over!', 500)
  }

  return (
    <div className={styles.root}>
      {/* 输入框（是个假的输入框，其实就是个按钮） */}
      <div className="input-btn" onClick={onComment}>
        <Icon iconName="iconbianji" />
        <span>{placeholder}</span>
      </div>

      {type === 'normal' && (
        <>
          {/* 评论按钮 */}
          <div className="action-item" onClick={goComment}>
            <Icon iconName="iconbtn_comment" />
            <p>评论</p>
            {detail.comm_count !== 0 && (
              <span className="bage">{detail.comm_count}</span>
            )}
          </div>

          {/* 点赞按钮 */}
          <div className="action-item" onClick={onLike}>
            <Icon
              iconName={
                detail.attitude === 1 ? 'iconbtn_like_sel' : 'iconbtn_like2'
              }
            />
            <p>点赞</p>
          </div>
        </>
      )}

      {/* 收藏按钮 */}
      <div className="action-item" onClick={onCollected}>
        <Icon
          iconName={
            detail.is_collected ? 'iconbtn_collect_sel' : 'iconbtn_collect'
          }
        />
        <p>收藏</p>
      </div>

      {/* 分享按钮 */}
      <div className="action-item" onClick={onShare}>
        <Icon iconName="iconbtn_share" />
        <p>分享</p>
      </div>
    </div>
  )
}

export default CommentFooter
