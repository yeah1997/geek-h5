import React from 'react'

// package
import classNames from 'classnames'

// styles
import style from './index.module.scss'

export default function Input({ extra, className, ...rest }) {
  return (
    <div className={style.root}>
      <input className={classNames('input', className)} type="text" {...rest} />
      {/* Other */}
      {extra && (
        <div className="extra" onClick={extra.extraClik}>
          {extra.message}
        </div>
      )}
    </div>
  )
}
