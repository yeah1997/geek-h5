// package
import classNames from 'classnames'

type Props = {
  iconName: string
  className?: string
  onClick?: () => void
}

function Icon({ iconName, className, ...rest }: Props) {
  return (
    <svg {...rest} className={classNames('icon', className)} aria-hidden="true">
      <use xlinkHref={`#${iconName}`}></use>
    </svg>
  )
}

export default Icon
