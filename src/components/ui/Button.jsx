// Ohio demo34 button — точные значения из CSS
// border-radius: 16px (--clb-border-radius: 16px → --clb-button-border-radius)
// height: 2.75rem | padding-x: 1.25rem | font-weight: 600
// shadow: 0 3px 5px 0 rgb(0 0 0 / .06)
// filled bg: #323625 (HWS dark, адаптация от #111013)

export default function Button({
  children,
  href,
  onClick,
  variant = 'filled',  // 'filled' | 'outlined' | 'ghost'
  size    = 'default', // 'small' | 'default' | 'large'
  shadow  = true,
  icon,
  iconPosition = 'right',
  className = '',
  style: styleProp = {},
  type,
  disabled,
  ...props
}) {
  const sizes = {
    small:   { minHeight: '2.25rem', padding: '0 1rem',    fontSize: '0.875rem' },
    default: { minHeight: '2.75rem', padding: '0 1.25rem', fontSize: '0.95rem'  },
    large:   { minHeight: '3.25rem', padding: '0 1.5rem',  fontSize: '1rem'     },
  }
  const variants = {
    filled:   { background: '#323625', color: '#ffffff', border: '1px solid #323625' },
    outlined: { background: 'transparent', color: '#323625', border: '1px solid rgba(50,54,37,0.25)' },
    ghost:    { background: 'transparent', color: '#323625', border: 'none' },
    // для тёмных секций
    'filled-light':    { background: '#ffffff', color: '#323625', border: '1px solid #ffffff' },
    'outlined-light':  { background: 'transparent', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.3)' },
    'ghost-light':     { background: 'transparent', color: 'rgba(255,255,255,0.7)', border: 'none' },
  }

  const s = sizes[size] || sizes.default
  const v = variants[variant] || variants.filled

  const baseStyle = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: '0.5em',
    minHeight: s.minHeight,
    padding: s.padding,
    fontSize: s.fontSize,
    fontFamily: '"Inter", sans-serif',
    fontWeight: 600,
    letterSpacing: '0.01em',
    borderRadius: '16px',
    border: v.border,
    background: v.background,
    color: v.color,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.65 : 1,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'opacity 0.25s ease, box-shadow 0.25s ease',
    boxShadow: shadow ? '0 3px 5px 0 rgb(0 0 0 / .06)' : 'none',
    ...styleProp,
  }

  const content = (
    <>
      {icon && iconPosition === 'left'  && <span>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </>
  )

  if (href) {
    return (
      <a href={href} style={baseStyle} className={`ohio-btn ${className}`} {...props}>
        {content}
      </a>
    )
  }
  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      disabled={disabled}
      style={baseStyle}
      className={`ohio-btn ${className}`}
      {...props}
    >
      {content}
    </button>
  )
}
