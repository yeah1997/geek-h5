import Icon from '@/components/Icon'
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'

// lodash
import $differenceBy from 'lodash/differenceBy'

// store-action
import { deleteChannel, addChannel } from '@/store/actions/home'

// package
import classNames from 'classnames'
import { useState } from 'react'
import { Toast } from 'antd-mobile'
import { RootState } from '@/store'

/**
 * 频道管理组件
 * @param {Number} props.tabActiveIndex 用户选中的频道的索引
 * @param {Function} props.onClose 关闭频道管理抽屉时的回调函数
 * @param {Function} props.onChannelClick 当点击频道列表中的某个频道时的会带哦函数
 */
const Channels = ({
  tabActiveIndex,
  onClose,
  onChannelClick,
  index,
  onChange,
}: any) => {
  // dispatch
  const dispatch = useDispatch()

  // edit mode
  const [edit, setEdit] = useState(false)

  // channel list
  const userChannels = useSelector(
    (state: RootState) => state.home.userChannels
  )

  const recomendChannels = useSelector((state: RootState) => {
    const { userChannels, allChannels } = state.home
    return $differenceBy(allChannels, userChannels, 'id')
    // new List
    // return allChannels.filter((item) => {
    //   return userChannels.findIndex((aItem) => aItem.id === item.id) === -1
    // })
  })

  // useEffect(() => {

  // }, [dispatch])

  // event
  // change channel
  const changeChannel = (i: any) => {
    // is edit mode?
    if (edit) return
    onChange(i)
    onClose()
  }
  //delete channel
  const deleteItem = (channel: any, i: any) => {
    // is smaller than 4?
    if (userChannels.length <= 4) {
      Toast.info('4 channels at least')
      return
    }
    dispatch(deleteChannel(channel))
    // set Active Index
    if (i < index) {
      onChange(i + 1)
    }
    if (i === index) {
      onChange(0)
    }
  }

  const addItem = (channel: any) => {
    dispatch(addChannel(channel))
  }

  return (
    <div className={styles.root}>
      {/* 顶部栏：带关闭按钮 */}
      <div className="channel-header">
        <Icon iconName="iconbtn_channel_close" onClick={onClose} />
      </div>

      {/* 频道列表 */}
      <div className="channel-content">
        {/* 当前已选择的频道列表 */}
        <div className={classNames('channel-item', { edit: edit })}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">
              {edit ? 'Click for delete' : 'Click for edit'}
            </span>
            <span
              className="channel-item-edit"
              onClick={() => {
                setEdit(!edit)
              }}
            >
              {edit ? 'Save' : 'delete'}
            </span>
          </div>

          <div className="channel-list">
            {userChannels.map((item, i) => (
              <span
                className={classNames('channel-list-item', {
                  selected: index === i,
                })}
                key={item.id}
                onClick={() => changeChannel(i)}
              >
                {item.name}
                {item.id !== 0 && (
                  <Icon
                    iconName="iconbtn_tag_close"
                    onClick={() => {
                      deleteItem(item, i)
                    }}
                  />
                )}
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
              <span
                key={item.id}
                className="channel-list-item"
                onClick={() => {
                  addItem(item)
                }}
              >
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
