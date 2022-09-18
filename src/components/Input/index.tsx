import { useRef, useEffect, InputHTMLAttributes } from 'react'

// package
import classNames from 'classnames'

// styles
import style from './index.module.scss'

/** type */
// interface Props extends InputHTMLAttributes<HTMLInputElement> {
//   extra?: {
//     message: string
//     extraClik: () => void
//   }
//   autoFocus?: boolean
//   className?: string
// }
type Props = {
  extra?: {
    message: string
    extraClik: () => void
  }
  autoFocus?: boolean
  className?: string
} & InputHTMLAttributes<HTMLInputElement>

export default function Input({ extra, autoFocus, className, ...rest }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus) {
      inputRef.current!.focus()
    }
  }, [autoFocus])

  return (
    <div className={style.root}>
      <input
        ref={inputRef}
        className={classNames('input', className)}
        type="text"
        {...rest}
      />
      {/* Other */}
      {extra && (
        <div className="extra" onClick={extra.extraClik}>
          {extra.message}
        </div>
      )}
    </div>
  )
}
