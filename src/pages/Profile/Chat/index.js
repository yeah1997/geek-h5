import { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
// compo
import Icon from '@/components/Icon'
import Input from '@/components/Input'
import NavBar from '@/components/NavBar'

// package
import sokectIO from 'socket.io-client'

// style
import styles from './index.module.scss'

// storage
import { getTokenInfo } from '@/utils/storage'

// store-action
import { getUserProfile } from '@/store/actions/profile'

export default function Chat() {
  const history = useHistory()
  // dispatch
  const dispatch = useDispatch()

  // message
  const [messageList, setMessageList] = useState([
    { type: 'robot', text: '亲爱的用户您好，小智同学为您服务。' },
    { type: 'user', text: '你好' },
  ])
  // user message
  const [msg, setMsg] = useState('')

  //  user Photo
  const photo = useSelector((state) => state.profile.user.photo)

  // normal Ref
  const listRef = useRef(null)

  // Ref - socket
  const clientRef = useRef('')

  // Init
  useEffect(() => {
    dispatch(getUserProfile())
    // Init socket connection
    const client = sokectIO('http://geek.itheima.net', {
      query: {
        token: getTokenInfo().token,
      },
      transports: ['websocket'],
    })
    client.on('connect', () => {
      //   Toast.success('Conneted to server')
      setMessageList((messageList) => [
        ...messageList,
        { type: 'robot', text: '链接成功!!!' },
      ])
    })
    clientRef.current = client

    client.on('message', (res) => {
      setMessageList((messageList) => [
        ...messageList,
        { type: 'robot', text: res.msg },
      ])
    })
    // close socket
    return () => client.close()
  }, [dispatch])

  // when MessageList changed
  useEffect(() => {
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messageList])

  // send Msg(onKeyUO)
  const onKeyUp = (e) => {
    if (e.keyCode !== 13) return

    clientRef.current.emit('message', {
      msg,
      timestamp: new Date(),
    })

    setMessageList((messageList) => [
      ...messageList,
      { type: 'user', text: msg },
    ])
    setMsg('')
  }

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="fixed-header" onLeftClick={() => history.go(-1)}>
        小智同学
      </NavBar>

      {/* 聊天记录列表 */}
      <div ref={listRef} className="chat-list">
        {messageList.map((item, index) => {
          if (item.type === 'robot') {
            return (
              <div key={index} className="chat-item">
                <Icon iconName="iconbtn_xiaozhitongxue" />
                <div className="message">{item.text}</div>
              </div>
            )
          } else {
            return (
              <div key={index} className="chat-item user">
                {/* 用户的消息 */}
                <img
                  src={
                    photo || 'http://toutiao.itheima.net/images/user_head.jpg'
                  }
                  alt=""
                />
                <div className="message">{item.text}</div>
              </div>
            )
          }
        })}
      </div>

      {/* 底部消息输入框 */}

      <div className="input-footer">
        <Input
          className="no-border"
          placeholder="请描述您的问题"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value)
          }}
          onKeyUp={onKeyUp}
        />
        <Icon iconName={'iconbianji'} />
      </div>
    </div>
  )
}
