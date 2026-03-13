import { Link } from 'react-router-dom'

// Ohio demo8 exact button
// bg: #4a4f49 | color: #f2efe4 | font: DM Sans 500 15.58px
// border-radius: 28px | height: 52px | padding: 0 24px | gap: 8px

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10"/>
      <path d="M8 16l8-8M8 8h8v8"/>
    </svg>
  )
}

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
  icon,
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

  const content = (
    <>
      {icon && iconPosition === 'left'  && <span className="ohio-btn__icon">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ohio-btn__icon">{icon}</span>}
    </>
  )

  const commonProps = { className: cls, style: styleProp, 'data-variant': variant }

  if (href) {
    // внутренние ссылки через Link, внешние через <a>
    if (href.startsWith('/')) {
      return <Link to={href} {...commonProps} {...props}>{content}</Link>
    }
    return <a href={href} {...commonProps} {...props}>{content}</a>
  }
  return (
    <button type={type || 'button'} onClick={onClick} disabled={disabled} {...commonProps} {...props}>
      {content}
    </button>
  )
}
