import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// antd
import { Drawer } from 'antd-mobile'

// usuall Component
import Tabs from '@/components/Tabs'
import Icon from '@/components/Icon'
import Channels from './components/Channels'

// style
import styles from './index.module.scss'

// Store-aciton
import { getUserChannels, getAllChannels } from '@/store/actions/home'

export default function Home() {
  // dispatch
  const dispatch = useDispatch()
  // Channel list open
  const [open, setOpen] = useState(false)

  // channel list
  const channels = useSelector((state) => state.home.userChannels)

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
      <Tabs tabs={channels}></Tabs>
      <div className="tabs-opration">
        <Icon iconName="iconbtn_search" />
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
        sidebar={open && <Channels onClose={drawerClose}></Channels>}
        open={open}
      ></Drawer>
      {/* Channel Manager */}
    </div>
  )
}
