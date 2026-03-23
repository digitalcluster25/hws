import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logoLight from '../../assets/logo-3.svg'

const NAV_LINKS = [
  { label: 'Компания', href: '/' },
  { label: 'Услуги',     href: '/services' },
  { label: 'Контакты',   href: '/contact' },
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

const LANGS = ['EN', 'DE', 'EL', 'RU']

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [activeLang, setActiveLang] = useState('EN')
  const langRef = useRef(null)
  const scrollTo = useScrollTo()
  const location = useLocation()

  useEffect(() => {
    const fn = (e) => { if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  return (
    <>
      <header className="nav-bar">
        {/* Логотип */}
        <Link to="/" className="nav-logo-link">
          <img src={logoLight} alt="Home Wood Spa" className="nav-logo-img" />
        </Link>

        {/* Десктопное меню — горизонтальный pill с ссылками */}
        <nav className="nav-desktop-pill" aria-label="Основная навигация">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              to={href}
              className={`nav-desktop-link${location.pathname === href ? ' nav-desktop-link--active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Правая часть: язык + бургер (только мобиль) */}
        <div className="nav-right">
          <div className="nav-lang-wrap" ref={langRef}>
            <button className="nav-lang" onClick={() => setLangOpen(v => !v)} aria-expanded={langOpen}>
              {activeLang}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginLeft: 4, transition: 'transform 0.2s', transform: langOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {langOpen && (
              <div className="nav-lang-dropdown">
                {LANGS.map(lang => (
                  <button
                    key={lang}
                    className={`nav-lang-option${lang === activeLang ? ' nav-lang-option--active' : ''}`}
                    onClick={() => { setActiveLang(lang); setLangOpen(false) }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Бургер — только на мобиле */}
          <button
            onClick={() => setMenuOpen(true)}
            className="nav-menu-pill nav-burger-mobile"
            aria-label="Открыть меню"
            aria-expanded={menuOpen}
          >
            <span className="nav-menu-label">МЕНЮ</span>
            <span className="nav-menu-lines" aria-hidden="true">
              <i /><i />
            </span>
          </button>
        </div>
      </header>

      <FullMenu open={menuOpen} onClose={() => setMenuOpen(false)} scrollTo={scrollTo} />
    </>
  )
}
