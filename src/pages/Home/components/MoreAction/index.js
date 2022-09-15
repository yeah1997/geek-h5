import Icon from '@/components/Icon'
import { Modal } from 'antd-mobile'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './index.module.scss'

// store-action
import {
  setMoreAction,
  unLikeArticle,
  reportArticle,
} from '@/store/actions/home'
import { Toast } from 'antd-mobile'

/**
 * 举报反馈菜单
 */
const FeedbackActionMenu = () => {
  const adviceList = [
    { id: 0, title: '其他问题' },
    { id: 1, title: '标题夸张' },
    { id: 2, title: '低俗色情' },
    { id: 3, title: '错别字多' },
    { id: 4, title: '旧闻重复' },
    { id: 5, title: '广告软文' },
    { id: 6, title: '内容不实' },
    { id: 7, title: '涉嫌违法犯罪' },
    { id: 8, title: '侵权' },
  ]

  // 举报类型：normal 不感兴趣或拉黑作者 | junk 垃圾内容
  const [type, setType] = useState('normal')

  // dispatch
  const dispatch = useDispatch()

  // MoreAction obj from redux
  const moreAction = useSelector((state) => state.home.moreAction)

  // 关闭弹框时的事件监听函数
  const onClose = () => {
    dispatch(
      setMoreAction({
        visible: false,
        articleId: moreAction.articleId,
      })
    )
    setType('normal')
  }
  // Click 不感兴趣
  const unLike = async () => {
    await dispatch(unLikeArticle(moreAction.articleId))
    onClose()
    Toast.info('remove to unlike List')
  }

  // report article
  const report = async (id) => {
    await dispatch(reportArticle(moreAction.articleId, id))
    onClose()
    Toast.info('remove to unlike List')
  }

  return (
    <div className={styles.root}>
      <Modal
        className="more-action-modal"
        title=""
        transparent
        maskClosable
        footer={[]}
        onClose={onClose}
        visible={moreAction.visible}
      >
        <div className="more-action">
          {/* normal 类型时的菜单内容 */}
          {type === 'normal' && (
            <>
              <div className="action-item" onClick={unLike}>
                <Icon iconName="iconicon_unenjoy1" /> 不感兴趣
              </div>
              <div className="action-item" onClick={() => setType('junk')}>
                <Icon iconName="iconicon_feedback1" />
                <span className="text">反馈垃圾内容</span>
                <Icon iconName="iconbtn_right" />
              </div>
              <div className="action-item">
                <Icon iconName="iconicon_blacklist" /> 拉黑作者
              </div>
            </>
          )}

          {/* junk 类型时的菜单内容 */}
          {type === 'junk' && (
            <>
              <div className="action-item" onClick={() => setType('normal')}>
                <Icon iconName="iconfanhui" />
                <span className="back-text">反馈垃圾内容</span>
              </div>
              {adviceList.map((item) => (
                <div
                  key={item.id}
                  className="action-item"
                  onClick={() => report(item.id)}
                >
                  {item.title}
                </div>
              ))}
            </>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default FeedbackActionMenu
