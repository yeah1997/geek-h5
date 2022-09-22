import Icon from '@/components/Icon'
import NavBar from '@/components/NavBar'
import { useEffect } from 'react'
// import ContentLoader from 'react-content-loader'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import styles from './index.module.scss'

import { getArticleDetail } from '@/store/actions/article'

const Article = () => {
  // history
  const history = useHistory()

  // dispatch
  const dispatch = useDispatch()

  const { id } = useParams<{ id: string }>()

  // params
  useEffect(() => {
    dispatch(getArticleDetail(id))
  }, [dispatch, id])

  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        {/* 顶部导航栏 */}
        <NavBar
          onLeftClick={() => history.go(-1)}
          extra={
            <span>
              <Icon iconName="icongengduo" />
            </span>
          }
        >
          div
        </NavBar>
      </div>
    </div>
  )
}

export default Article
