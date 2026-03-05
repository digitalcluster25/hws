import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import logoDark from '../../assets/logo-dark.svg'

const NAV_LINKS = [
  { label: 'Компания', href: '/' },
  { label: 'Услуги',   href: '/services' },
  { label: 'Кейсы',    href: '/portfolio' },
  { label: 'Контакты', href: '/contact' },
]
const leftLinks  = NAV_LINKS.slice(0, Math.ceil(NAV_LINKS.length / 2))
const rightLinks = NAV_LINKS.slice(Math.ceil(NAV_LINKS.length / 2))

function useScrollTo() {
  const navigate  = useNavigate()
  const location  = useLocation()
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <div className="nav-outer">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`nav-bar${scrolled ? ' nav-bar--scrolled' : ''}`}
        >
          {/* LEFT */}
          <div className="nav-col nav-col--left">
            <nav className="nav-desktop">
              {leftLinks.map(({ label, href }) => (
                href.startsWith('/') && !href.includes('#')
                  ? <Link key={label} to={href} className="nav-btn">{label}</Link>
                  : <button key={label} className="nav-btn" onClick={() => scrollTo(href)}>{label}</button>
              ))}
            </nav>
            <button onClick={() => setMenuOpen(true)} className="nav-hamburger" aria-label="Меню">
              <div className="nav-hamburger-lines">
                <span /><span /><span />
              </div>
            </button>
          </div>

          {/* CENTER */}
          <Link to="/" className="nav-logo-link">
            <img src={logoDark} alt="Home Wood Spa" className="nav-logo-img" />
          </Link>

          {/* RIGHT */}
          <div className="nav-col nav-col--right">
            <nav className="nav-desktop">
              {rightLinks.map(({ label, href }) => (
                href.startsWith('/') && !href.includes('#')
                  ? <Link key={label} to={href} className="nav-btn">{label}</Link>
                  : <button key={label} className="nav-btn" onClick={() => scrollTo(href)}>{label}</button>
              ))}
            </nav>
            <button onClick={() => scrollTo('#contact')} className="nav-cta ohio-btn" data-variant="filled">
              Консультация
            </button>
          </div>
        </motion.div>
      </div>

      <FullMenu open={menuOpen} onClose={() => setMenuOpen(false)} scrollTo={scrollTo} />
    </>
  )
}
