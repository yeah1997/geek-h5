import Icon from '@/components/Icon'
import NavBar from '@/components/NavBar'

import classnames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import styles from './index.module.scss'

import { Dialog } from 'antd-mobile-v5'

import {
  getSuggestedList,
  clearSuggestions,
  addSearchList,
  clearHistoryList,
} from '@/store/actions/search'

import { RootState } from '@/store'

const Search = () => {
  // history
  const history = useHistory()

  // dispatch
  const dispatch = useDispatch()

  // selector
  const suggestions = useSelector(
    (state: RootState) => state.search.suggestions
  )

  const { searchHistory } = useSelector((state: RootState) => state.search)

  // is Searching?
  const [isSearch, setIsSearch] = useState(false)

  const [keyWord, setKeyWord] = useState('')

  // time
  const timeRef = useRef(-1)
  // event
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.trim()

    setKeyWord(text)
    clearTimeout(timeRef.current)
    timeRef.current = window.setTimeout(() => {
      if (text) {
        setIsSearch(true)
        dispatch(getSuggestedList(text))
      } else {
        setIsSearch(false)
      }
    }, 500)
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeRef.current)
    }
  }, [])

  // event
  const highlight = (str: string, key: string) => {
    return str.replace(new RegExp(key, 'gi'), (match: string) => {
      return `<span style="{color: red}">${match}</span>`
    })
  }

  const onClear = () => {
    setKeyWord('')
    setIsSearch(false)
    dispatch(clearSuggestions())
  }

  const onSearch = (key: string) => {
    if (!key) return
    dispatch(addSearchList(key))
    history.push(`/search/result?key=${key}`)
  }

  const onClearHistory = () => {
    Dialog.confirm({
      title: 'Confirm',
      content: '确定要删除吗',
      onConfirm: () => {
        dispatch(clearHistoryList())
      },
    })
  }

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar
        className="navbar"
        onLeftClick={() => history.go(-1)}
        extra={
          <span className="search-text" onClick={() => onSearch(keyWord)}>
            搜索
          </span>
        }
      >
        <div className="navbar-search">
          <Icon iconName="iconbtn_search" className="icon-search" />

          <div className="input-wrapper">
            {/* 输入框 */}
            <input
              type="text"
              placeholder="请输入关键字搜索"
              value={keyWord}
              onChange={onChange}
            />

            {/* 清空输入框按钮 */}
            <Icon
              iconName="iconbtn_tag_close"
              className="icon-close"
              onClick={onClear}
            />
          </div>
        </div>
      </NavBar>

      {/* 搜索历史 */}
      <div className="history" style={{ display: isSearch ? 'none' : 'block' }}>
        <div className="history-header">
          <span>搜索历史</span>
          <span onClick={onClearHistory}>
            <Icon iconName="iconbtn_del" />
            清除全部
          </span>
        </div>

        <div className="history-list">
          {searchHistory.map((item, index) => (
            <span
              className="history-item"
              key={index}
              onClick={() => onSearch(item)}
            >
              {item}
              {index !== searchHistory.length - 1 && (
                <span className="divider"></span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* 搜素建议结果列表 */}
      <div className={classnames('search-result', { show: isSearch })}>
        {suggestions.map((item, id) => (
          <div className="result-item" key={id}>
            <Icon
              className="icon-search"
              iconName="iconbtn_search"
              onClick={() => onSearch(item)}
            />
            <div
              className="result-value"
              dangerouslySetInnerHTML={{
                __html: highlight(item, keyWord),
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search
