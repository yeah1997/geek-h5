// package
import classNames from 'classnames'

import PropTypes from 'prop-types'

function Icon({ iconName, className, ...rest }) {
  return (
    <svg {...rest} className={classNames('icon', className)} aria-hidden="true">
      <use xlinkHref={`#${iconName}`}></use>
    </svg>
  )
}

Icon.propTypes = {
  iconName: PropTypes.string.isRequired,
}

export default Icon
