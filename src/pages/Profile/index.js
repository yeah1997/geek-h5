import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Router
import { Link, useHistory } from 'react-router-dom'

// usuall Component
import Icon from '@/components/Icon'

// style
import styles from './index.module.scss'

// Store-aciton
import { getUserProfile } from '@/store/actions/profile'

export default function Profile() {
  // history
  const history = useHistory()
  // dispatch
  const dispatch = useDispatch()

  // Get user information from store
  const user = useSelector((state) => state.profile.user)
  console.log(user)

  useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])

  return (
    <div>
      <div className={styles.root}>
        <div className="profile">
          {/* 顶部个人信息区域 */}
          <div className="user-info">
            <div className="avatar">
              <img src={user.photo} alt="" />
            </div>
            <div className="user-name">{user.name}</div>
            <Link to="/profile/edit">
              个人信息 <Icon iconName="iconbtn_right" />
            </Link>
          </div>

          {/* 今日阅读区域 */}
          <div className="read-info">
            <Icon iconName="iconbtn_readingtime" />
            今日阅读 <span>10</span> 分钟
          </div>

          {/* 统计信息区域 */}
          <div className="count-list">
            <div className="count-item">
              <p>{user.art_count}</p>
              <p>动态</p>
            </div>
            <div className="count-item">
              <p>{user.follow_count}</p>
              <p>关注</p>
            </div>
            <div className="count-item">
              <p>{user.fans_count}</p>
              <p>粉丝</p>
            </div>
            <div className="count-item">
              <p>{user.like_count}</p>
              <p>被赞</p>
            </div>
          </div>

          {/* 主功能菜单区域 */}
          <div className="user-links">
            <div className="link-item">
              <Icon iconName="iconbtn_mymessages" />
              <div>消息通知</div>
            </div>
            <div className="link-item">
              <Icon iconName="iconbtn_mycollect" />
              <div>收藏</div>
            </div>
            <div className="link-item">
              <Icon iconName="iconbtn_history1" />
              <div>浏览历史</div>
            </div>
            <div className="link-item">
              <Icon iconName="iconbtn_myworks" />
              <div>我的作品</div>
            </div>
          </div>
        </div>

        {/* 更多服务菜单区域 */}
        <div className="more-service">
          <h3>More Service</h3>
          <div className="service-list">
            <div
              className="service-item"
              onClick={() => history.push('/profile/feedback')}
            >
              <Icon iconName="iconbtn_feedback" />
              <div>Feedback</div>
            </div>
            <div
              className="service-item"
              onClick={() => history.push('/profile/chat')}
            >
              <Icon iconName="iconbtn_xiaozhitongxue" />
              <div>AI-Lee</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
