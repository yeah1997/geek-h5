import Icon from '@/components/Icon'
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'

// lodash
import $differenceBy from 'lodash/differenceBy'

/**
 * 频道管理组件
 * @param {Number} props.tabActiveIndex 用户选中的频道的索引
 * @param {Function} props.onClose 关闭频道管理抽屉时的回调函数
 * @param {Function} props.onChannelClick 当点击频道列表中的某个频道时的会带哦函数
 */
const Channels = ({ tabActiveIndex, onClose, onChannelClick }) => {
  // dispatch
  const dispatch = useDispatch()

  // channel list
  const userChannels = useSelector((state) => state.home.userChannels)

  const recomendChannels = useSelector((state) => {
    const { userChannels, allChannels } = state.home
    return $differenceBy(allChannels, userChannels, 'id')
    // new List
    // return allChannels.filter((item) => {
    //   return userChannels.findIndex((aItem) => aItem.id === item.id) === -1
    // })
  })

  console.log(recomendChannels)
  // useEffect(() => {

  // }, [dispatch])

  return (
    <div className={styles.root}>
      {/* 顶部栏：带关闭按钮 */}
      <div className="channel-header">
        <Icon iconName="iconbtn_channel_close" onClick={onClose} />
      </div>

      {/* 频道列表 */}
      <div className="channel-content">
        {/* 当前已选择的频道列表 */}
        <div className="channel-item edit">
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">点击删除频道</span>
            <span className="channel-item-edit">保存</span>
          </div>

          <div className="channel-list">
            {userChannels.map((item) => (
              <span className="channel-list-item" key={item.id}>
                {item.name}
                <Icon iconName="iconbtn_tag_close" />
              </span>
            ))}
          </div>
        </div>

        {/* 推荐的频道列表 */}
        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {recomendChannels.map((item) => (
              <span key={item.id} className="channel-list-item">
                + {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
