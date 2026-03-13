export default function Button({
  children,
  href,
  onClick,
  variant = 'filled',
  size    = 'default', // small | default
  className = '',
  style: styleProp = {},
  type,
  disabled,
  icon,
  iconPosition = 'left',
  ...props
}) {
  const tag = href ? 'a' : 'button'

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

  const commonProps = {
    className: cls,
    style: styleProp,
    'data-variant': variant,
  }

  if (href) return <a href={href} {...commonProps} {...props}>{content}</a>
  return (
    <button type={type || 'button'} onClick={onClick} disabled={disabled} {...commonProps} {...props}>
      {content}
    </button>
  )
}
