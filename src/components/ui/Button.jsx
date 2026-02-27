// Ohio button — точные значения из CSS переменных ohio.clbthemes.com
// --clb-button-height: 2.75rem
// --clb-button-side-padding: 1.25rem
// --clb-button-border-radius: 0.5rem (= --clb-border-radius)
// box-shadow .-with-shadow: 0 3px 5px 0 rgb(0 0 0 / .06)
// font-weight: 600, transition: all cubic-bezier(.645,.045,.355,1)

export default function Button({
  children,
  href,
  onClick,
  variant = 'filled',   // 'filled' | 'outlined' | 'ghost'
  size = 'default',     // 'default' | 'small' | 'large'
  shadow = true,
  icon,
  iconPosition = 'right',
  className = '',
  style: styleProp = {},
  ...props
}) {
  const sizes = {
    small:   { minHeight: '2.25rem', padding: '0 1rem',    fontSize: '0.875em' },
    default: { minHeight: '2.75rem', padding: '0 1.25rem', fontSize: '0.95em'  },
    large:   { minHeight: '3.25rem', padding: '0 1.5rem',  fontSize: '1em'     },
  }

  const variants = {
    filled: {
      background: '#111013',
      color:      '#ffffff',
      border:     '1px solid #111013',
    },
    outlined: {
      background: 'transparent',
      color:      '#111013',
      border:     '1px solid rgba(150,144,162,0.25)',
    },
    ghost: {
      background: 'transparent',
      color:      '#111013',
      border:     'none',
    },
  }

  const s = sizes[size]
  const v = variants[variant]

  const baseStyle = {
    display:        'inline-flex',
    alignItems:     'center',
    justifyContent: 'center',
    gap:            '0.5em',
    minHeight:      s.minHeight,
    padding:        s.padding,
    fontSize:       s.fontSize,
    fontFamily:     'inherit',
    fontWeight:     600,
    letterSpacing:  '0.01em',
    borderRadius:   '0.5rem',   // --clb-border-radius: 0.5rem
    border:         v.border,
    background:     v.background,
    color:          v.color,
    cursor:         'pointer',
    textDecoration: 'none',
    whiteSpace:     'nowrap',
    transition:     'all 0.3s cubic-bezier(.645,.045,.355,1)',
    // ohio .-with-shadow: 0 3px 5px 0 rgb(0 0 0 / .06)
    boxShadow:      shadow ? '0 3px 5px 0 rgb(0 0 0 / .06)' : 'none',
    ...styleProp,
  }

  const hoverClass =
    variant === 'filled'   ? 'ohio-btn-filled'   :
    variant === 'outlined' ? 'ohio-btn-outlined' :
                             'ohio-btn-ghost'

  const content = (
    <>
      {icon && iconPosition === 'left'  && <span>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </>
  )

  if (href) {
    return (
      <a href={href} style={baseStyle} className={`ohio-btn ${hoverClass} ${className}`} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button onClick={onClick} style={baseStyle} className={`ohio-btn ${hoverClass} ${className}`} {...props}>
      {content}
    </button>
  )
}
