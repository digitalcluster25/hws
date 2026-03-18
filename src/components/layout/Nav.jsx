import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logoLight from '../../assets/logo-light.png'

const NAV_LINKS_LEFT = [
  { label: 'Компания', href: '/' },
  { label: 'Услуги',   href: '/services' },
]
const NAV_LINKS_RIGHT = [
  { label: 'Контакты', href: '/contact' },
]
const NAV_LINKS = [...NAV_LINKS_LEFT, ...NAV_LINKS_RIGHT]

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
      <div className="fullmenu-header">
        <button onClick={onClose} className="fullmenu-close" aria-label="Закрыть">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
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
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const scrollTo = useScrollTo()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <header className="nav-bar">
        <div className={`nav-inner${scrolled ? ' nav-inner--scrolled' : ''}`}>

          {/* LEFT: burger only */}
          <div className="nav-left">
            <button onClick={() => setMenuOpen(true)} className="nav-hamburger" aria-label="Меню">
              <i className="nav-hamburger-icon"></i>
            </button>
          </div>

          {/* CENTER: left links + logo + right links — single absolute group */}
          <div className="nav-center-group">
            <nav className="nav-links">
              {NAV_LINKS_LEFT.map(({ label, href }) =>
                href.startsWith('/') && !href.includes('#')
                  ? <Link key={label} to={href} className="nav-btn">{label}</Link>
                  : <button key={label} className="nav-btn" onClick={() => scrollTo(href)}>{label}</button>
              )}
            </nav>
            <Link to="/" className="nav-logo-link">
              <img src={logoLight} alt="Home Wood Spa" className="nav-logo-img" />
            </Link>
            <nav className="nav-links">
              {NAV_LINKS_RIGHT.map(({ label, href }) =>
                href.startsWith('/') && !href.includes('#')
                  ? <Link key={label} to={href} className="nav-btn">{label}</Link>
                  : <button key={label} className="nav-btn" onClick={() => scrollTo(href)}>{label}</button>
              )}
            </nav>
          </div>

          {/* RIGHT: CTA only */}
          <div className="nav-right">
            <button onClick={() => scrollTo('#contact')} className="nav-cta">
            Обсудить проект
            </button>
          </div>

        </div>
      </header>

      <FullMenu open={menuOpen} onClose={() => setMenuOpen(false)} scrollTo={scrollTo} />
    </>
  )
}
