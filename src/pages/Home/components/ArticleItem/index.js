// package
import classnames from 'classnames'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import Icon from '@/components/Icon'
import styles from './index.module.scss'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

const ArticleItem = ({ className, article }) => {
  // const images = ['http://geek.itheima.net/resources/images/3.jpg']

  const {
    cover: { type, images },
    title,
    aut_name,
    comm_count,
    pubdate,
  } = article

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
                <img src={item} alt="" />
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
          <Icon iconName="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  )
}

export default ArticleItem
