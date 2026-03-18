import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logoLight from '../../assets/logo-light.png'

const NAV_LINKS = [
  { label: 'Компания', href: '/' },
  { label: 'Услуги',   href: '/services' },
  { label: 'Контакты', href: '/contact' },
]

function useScrollTo() {
  const navigate = useNavigate()
  const location = useLocation()
  return useCallback((href) => {
    if (href.startsWith('/')) { navigate(href); return }
    const id = href.slice(1)
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150)
    }
  }, [location, navigate])
}

function FullMenu({ open, onClose, scrollTo }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [open, onClose])

  const go = (href) => { onClose(); setTimeout(() => scrollTo(href), 350) }

  return createPortal(
    <div className="fullmenu" style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none' }}>

      {/* Крестик — точно на месте pill «МЕНЮ» */}
      <button onClick={onClose} className="fullmenu-close-pill" aria-label="Закрыть">
        <span className="nav-menu-label">ЗАКРЫТЬ</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>

      <nav className="fullmenu-nav">
        {NAV_LINKS.map(({ label, href }, i) => (
          <div key={label} className="fullmenu-row">
            <button
              onClick={() => go(href)}
              className="fullmenu-btn"
              style={{
                transform: open ? 'translateY(0)' : 'translateY(110%)',
                opacity: open ? 1 : 0,
                transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.07}s, opacity 0.4s ease ${0.1 + i * 0.07}s`,
              }}
            >
              <span className="fullmenu-label">{label}</span>
              <span className="fullmenu-num">{String(i + 1).padStart(2, '0')}</span>
            </button>
          </div>
        ))}
      </nav>
    </div>,
    document.body
  )
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrollTo = useScrollTo()

  return (
    <>
      <header className="nav-bar">
        <Link to="/" className="nav-logo-link">
          <img src={logoLight} alt="Home Wood Spa" className="nav-logo-img" />
        </Link>

        <button
          onClick={() => setMenuOpen(true)}
          className="nav-menu-pill"
          aria-label="Открыть меню"
          aria-expanded={menuOpen}
        >
          <span className="nav-menu-label">МЕНЮ</span>
          <span className="nav-menu-lines" aria-hidden="true">
            <i /><i />
          </span>
        </button>
      </header>

      <FullMenu open={menuOpen} onClose={() => setMenuOpen(false)} scrollTo={scrollTo} />
    </>
  )
}
