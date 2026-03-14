import { Link } from 'react-router-dom'

// Ohio demo8 exact:
// bg rgb(74,79,73) | color rgb(242,239,228) | DM Sans 500 15.58px
// border-radius 28px | height 52px | padding 0 24px | gap 8px
// icon: bi bi-arrow-up-right-circle, 25px, left

export default function Button({
  children,
  href,
  onClick,
  variant = 'filled',
  size    = 'default',
  className = '',
  style: styleProp = {},
  type,
  disabled,
  icon,           // кастомная иконка — переопределяет дефолтную
  noIcon = false, // убрать иконку совсем
  iconPosition = 'left',
  ...props
}) {
  const cls = [
    'ohio-btn',
    `ohio-btn--${variant}`,
    size === 'small' ? 'ohio-btn--small' : '',
    disabled ? 'ohio-btn--disabled' : '',
    className,
  ].filter(Boolean).join(' ')

  // Дефолтная иконка — как в Ohio demo8
  const defaultIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" style={{flexShrink:0}}>
      <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z"/>
    </svg>
  )

  const resolvedIcon = noIcon ? null : (icon ?? defaultIcon)

  const content = (
    <>
      {resolvedIcon && iconPosition === 'left'  && resolvedIcon}
      {children}
      {resolvedIcon && iconPosition === 'right' && resolvedIcon}
    </>
  )

  const commonProps = { className: cls, style: styleProp, 'data-variant': variant }

  if (href) {
    if (href.startsWith('/')) return <Link to={href} {...commonProps} {...props}>{content}</Link>
    return <a href={href} {...commonProps} {...props}>{content}</a>
  }
  return (
    <button type={type || 'button'} onClick={onClick} disabled={disabled} {...commonProps} {...props}>
      {content}
    </button>
  )
}
