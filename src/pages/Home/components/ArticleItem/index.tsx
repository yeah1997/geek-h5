import { useSelector, useDispatch } from 'react-redux'

// usuall Component
import Icon from '@/components/Icon'
import Img from '@/components/Img'

// package
import classnames from 'classnames'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// store-action
import { setMoreAction } from '@/store/actions/home'

import styles from './index.module.scss'
import 'dayjs/locale/zh-cn'
import { RootState } from '@/store'
import { Article } from '@/store/reducers/home'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

type Props = {
  className?: unknown
  article: Article
  channelId: number
}

const ArticleItem = ({ article, channelId }: Props) => {
  // dispatch
  const dispatch = useDispatch()

  const hasLogin = useSelector((state: RootState) => state.login.token)

  const {
    cover: { type, images },
    title,
    aut_name,
    comm_count,
    pubdate,
  } = article

  const onClick = () => {
    dispatch(
      setMoreAction({
        visible: true,
        articleId: article.art_id,
        channelId,
      })
    )
  }

  return (
    <div className={styles.root}>
      <div
        className={classnames(
          'article-content',
          type === 3 ? 't3' : '',
          type === 0 ? 'none-mt' : ''
        )}
      >
        <h3>{title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
            {images.map((item, i) => (
              <div className="article-img-wrapper" key={i}>
                <Img src={item} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={classnames('article-info', type === 0 ? 'none-mt' : '')}>
        <span>{aut_name}</span>
        <span>{comm_count} 评论</span>
        <span>{dayjs(pubdate).fromNow(true)}前</span>

        {/*  */}
        <span className="close">
          {hasLogin && (
            <Icon iconName="iconbtn_essay_close" onClick={onClick} />
          )}
        </span>
      </div>
    </div>
  )
}

export default ArticleItem
