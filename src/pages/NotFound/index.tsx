import React from 'react'

import { useState, useEffect, useRef } from 'react'

import { Link, useHistory } from 'react-router-dom'

export default function NotFuond() {
  // 倒计时秒数
  const [second, setSecond] = useState(3)

  const history = useHistory()

  const timerRef = useRef(-1)

  useEffect(() => {
    timerRef.current = window.setTimeout(() => {
      setSecond((second) => second - 1)
      if (second === 0) {
        clearInterval(timerRef.current)
        history.push('/home')
      }
      console.log(123)
    }, 1000)

    return () => {
      clearTimeout(timerRef.current)
    }
  }, [second, history])

  return (
    <div>
      <h1>对不起，你访问的内容不存在...</h1>
      <p>
        {second} 秒后，返回<Link to="/home/index">首页</Link>
      </p>
    </div>
  )
}
