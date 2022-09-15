import React, { useRef, useState } from 'react'

// usuall Component
import Icon from '../Icon'

// package
import classNames from 'classnames'

// style
import styles from './index.module.scss'
import { useEffect } from 'react'

export default function Img({ src, className, alt }) {
  // ref
  const imgRef = useRef(null)

  // loading
  const [loading, setLoading] = useState(true)

  // error
  const [error, setError] = useState(false)

  useEffect(() => {
    // img listener
    const observer = new IntersectionObserver((entry) => {
      // on visiable
      if (entry[0].isIntersecting) {
        imgRef.current.src = imgRef.current.dataset.src
        observer.unobserve(imgRef.current)
      }
    })
    // start observing
    observer.observe(imgRef.current)
  }, [])

  // img load successfully
  const onLoad = () => {
    setError(false)
    setLoading(false)
  }

  //  img load faily
  const onError = () => {
    setLoading(false)
    setError(true)
  }

  return (
    <div className={classNames(styles.root, className)}>
      {loading && (
        <div className="image-icon">
          <Icon iconName="iconphoto" />
        </div>
      )}

      {error && (
        <div className="image-icon">
          <Icon iconName="iconphoto-fail" />
        </div>
      )}

      <img
        ref={imgRef}
        alt={alt}
        data-src={src}
        onLoad={onLoad}
        onError={onError}
      />
    </div>
  )
}
