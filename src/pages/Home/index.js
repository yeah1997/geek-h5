import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// usuall Component
import Tabs from '@/components/Tabs'

// style
import styles from './index.module.scss'

// Store-aciton
import { getUserChannels } from '@/store/actions/home'

export default function Home() {
  // dispatch
  const dispatch = useDispatch()

  const channels = useSelector((state) => state.home.userChannels)

  useEffect(() => {
    dispatch(getUserChannels())
  }, [dispatch])

  console.log(channels)

  return (
    <div className={styles.root}>
      <Tabs tabs={channels}></Tabs>
    </div>
  )
}
