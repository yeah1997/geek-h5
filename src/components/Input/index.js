import React from 'react'

// styles
import style from './index.module.scss'

export default function Input({ extra, ...rest }) {
  return (
    <div className={style.root}>
      <input className="input" type="text" {...rest} />
      {/* Other */}
      {extra && (
        <div className="extra" onClick={extra.extraClik}>
          {extra.message}
        </div>
      )}
    </div>
  )
}
