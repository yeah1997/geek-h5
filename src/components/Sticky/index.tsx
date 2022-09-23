import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'

type Props = {
  children: React.ReactElement | string
  top?: number
}

const Sticky = ({ children, top = 0 }: Props) => {
  const placerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const place = placerRef.current!
    const container = containerRef.current!

    let topValue = (top / 375) * document.documentElement.clientWidth

    const onscroll = () => {
      if (place.getBoundingClientRect().top <= topValue) {
        container.style.position = 'fixed'
        container.style.top = topValue + '0px'
        place.style.height = container.offsetHeight + 'px'
      } else {
        container.style.position = 'static'
        container.style.top = 'auto'
        place.style.height = '0px'
      }
    }

    window.addEventListener('scroll', onscroll)

    return () => window.removeEventListener('scroll', onscroll)
  }, [top])

  return (
    <div className={styles.root}>
      {/* 占位元素 */}
      <div ref={placerRef} className="sticky-placeholder" />

      {/* 吸顶显示的元素 */}
      <div className="sticky-container" ref={containerRef}>
        {children}
      </div>
    </div>
  )
}

export default Sticky
