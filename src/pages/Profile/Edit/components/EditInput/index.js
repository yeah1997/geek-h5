import React, { useState } from 'react'
import { useSelector } from 'react-redux'

// Usuall Component
import NavBar from '@/components/NavBar.js'
import Textarea from '@/components/Textarea'
import Input from '@/components/Input'

// style
import styles from './index.module.scss'

export default function EditInput({ drawerClose, openObj, onCommit }) {
  const defaultValue = useSelector(
    (state) => state.profile.profile[openObj.title]
  )

  const [text, setText] = useState(defaultValue)

  return (
    <div className={styles.root}>
      <NavBar
        extra={
          <span
            className="commit-btn"
            onClick={() => {
              onCommit(openObj.title, text)
            }}
          >
            update
          </span>
        }
        onLeftClick={drawerClose}
      >
        Edit {openObj.title}
      </NavBar>
      <div className="content-box">
        <h3>{openObj.title}</h3>
        {openObj.title === 'name' ? (
          <Input
            className="input-wrap"
            value={text}
            onChange={(e) => {
              setText(e.target.value)
            }}
          ></Input>
        ) : (
          <Textarea
            maxLength={200}
            value={text}
            onChange={(e) => {
              setText(e.target.value)
            }}
          ></Textarea>
        )}
      </div>
    </div>
  )
}
