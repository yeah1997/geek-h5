import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  TextareaHTMLAttributes,
} from 'react'

// package
import classNames from 'classnames'

// style
import styles from './index.module.scss'

/** type */
type Props = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onChange' | 'maxLength'
> & {
  maxLength?: number
  className?: string
  value?: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export default function Textarea({
  maxLength = 100,
  className,
  value,
  onChange,
  ...rest
}: Props) {
  const [content, setContent] = useState(value || '')

  const textRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    textRef.current!.focus()
    textRef.current!.setSelectionRange(-1, -1)
  }, [])

  const textChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)

    onChange?.(e)
  }

  return (
    <div className={styles.root}>
      <textarea
        ref={textRef}
        {...rest}
        className={classNames('textarea', className)}
        maxLength={maxLength}
        value={content}
        onChange={textChange}
      />
      <textarea name="" id="" onChange={(e) => {}}></textarea>
      <div className="count">
        {content.length}/{maxLength}
      </div>
    </div>
  )
}
