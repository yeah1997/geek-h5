import React from 'react'

// style
import styles from './index.module.scss'

export default function EditList({ config, openList }) {
  const list = config[openList.title]

  return (
    <div className={styles.root}>
      {list.map((item) => (
        <div key={item.title} className="list-item" onClick={item.onClick}>
          {item.title}
        </div>
      ))}

      <div className="list-item">Back</div>
    </div>
  )
}
