import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

// antd
import { Drawer } from 'antd-mobile'

// usuall Component
import Tabs from '@/components/Tabs'
import Icon from '@/components/Icon'
import Channels from './components/Channels'
import ArticleList from './components/ArticleList'
import MoreAction from './components/MoreAction'

// style
import styles from './index.module.scss'

// Store-aciton
import { getUserChannels, getAllChannels } from '@/store/actions/home'
import { RootState } from '@/store'

export default function Home() {
  // dispatch
  const dispatch = useDispatch()
  // history
  const history = useHistory()

  // Channel list open
  const [open, setOpen] = useState(false)

  // active channel
  const [activeChannel, setActiveChannel] = useState(0)

  // channel list
  const channels = useSelector((state: RootState) => state.home.userChannels)

  useEffect(() => {
    dispatch(getUserChannels())
    dispatch(getAllChannels())
  }, [dispatch])

  // event
  const drawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={styles.root}>
      <Tabs
        tabs={channels}
        index={activeChannel}
        onChange={(i: any) => {
          setActiveChannel(i)
        }}
      >
        {channels.map((item) => (
          <ArticleList
            key={item.id}
            channelId={item.id}
            activeId={channels[activeChannel].id}
          ></ArticleList>
        ))}
      </Tabs>

      <div className="tabs-opration">
        <Icon
          iconName="iconbtn_search"
          onClick={() => history.push('/search')}
        />
        <Icon
          iconName="iconbtn_channel"
          onClick={() => {
            setOpen(true)
          }}
        />
      </div>
      {/* Channel Manager */}
      <Drawer
        className="my-drawer"
        position="left"
        children={''}
        sidebar={
          open && (
            <Channels
              onClose={drawerClose}
              index={activeChannel}
              onChange={(i: any) => {
                setActiveChannel(i)
              }}
            ></Channels>
          )
        }
        open={open}
      ></Drawer>
      {/* Channel Manager */}
      <MoreAction></MoreAction>
    </div>
  )
}
