import React, { useRef, useEffect } from 'react'

// package
import classNames from 'classnames'

// styles
import style from './index.module.scss'

export default function Input({ extra, autoFocus, className, ...rest }) {
  const InputRef = useRef(null)

  useEffect(() => {
    if (autoFocus) {
      InputRef.current.focus()
    }
  }, [autoFocus])

  return (
    <div className={style.root}>
      <input
        ref={InputRef}
        className={classNames('input', className)}
        type="text"
        {...rest}
      />
      {/* Other */}
      {extra && (
        <div className="extra" onClick={extra.extraClik}>
          {extra.message}
        </div>
      )}
    </div>
  )
}
