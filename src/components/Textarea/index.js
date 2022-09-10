import React, { useState, useRef, useEffect } from 'react'

// package
import classNames from 'classnames'

// style
import styles from './index.module.scss'

export default function Textarea({
  maxLength = 100,
  className,
  value,
  onChange,
  ...rest
}) {
  const [content, setContent] = useState(value || '')

  const textRef = useRef(null)

  useEffect(() => {
    textRef.current.focus()
    textRef.current.setSelectionRange(-1, -1)
  }, [])

  const textChange = (e) => {
    setContent(e.target.value)

    onChange?.(e)
  }

  return (
    <div className={styles.root}>
      <textarea
        ref={textRef}
        {...rest}
        className={classNames('textarea', className)}
        maxLength={maxLength}
        value={content}
        onChange={textChange}
      />
      <div className="count">
        {content.length}/{maxLength}
      </div>
    </div>
  )
}
