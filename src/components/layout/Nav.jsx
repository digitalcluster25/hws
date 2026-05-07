import { useState, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18n/index.js'
import logoLight from '../../assets/logo-3.svg'

const LANG_CODES = ['ru', 'en', 'de', 'el']
const LANG_LABELS = { ru: 'RU', en: 'EN', de: 'DE', el: 'EL' }

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
  const { t } = useTranslation('labels')

  const NAV_LINKS = [
    { labelKey: 'nav.company', href: '/' },
    { labelKey: 'nav.services', href: '/services' },
    { labelKey: 'nav.contact',  href: '/contact' },
  ]

  useCallback(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const go = (href) => { onClose(); setTimeout(() => scrollTo(href), 350) }

  return createPortal(
    <div className="fullmenu" style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none' }}>
      <button onClick={onClose} className="fullmenu-close-pill" aria-label={t('nav.close')}>
        <span className="nav-menu-label">{t('nav.close')}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
      <nav className="fullmenu-nav">
        {NAV_LINKS.map(({ labelKey, href }, i) => (
          <div key={href} className="fullmenu-row">
            <button
              onClick={() => go(href)}
              className="fullmenu-btn"
              style={{
                transform: open ? 'translateY(0)' : 'translateY(110%)',
                opacity: open ? 1 : 0,
                transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.07}s, opacity 0.4s ease ${0.1 + i * 0.07}s`,
              }}
            >
              <span className="fullmenu-label">{t(labelKey)}</span>
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
  const { t } = useTranslation('labels')
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef(null)
  const scrollTo = useScrollTo()
  const location = useLocation()

  const activeLang = i18n.language?.slice(0, 2) || 'ru'

  const NAV_LINKS = [
    { label: t('nav.company'),  href: '/' },
    { label: t('nav.services'), href: '/services' },
    { label: t('nav.contact'),  href: '/contact' },
  ]

  const handleLangSwitch = (code) => {
    const scrollY = window.scrollY
    i18n.changeLanguage(code).then(() => {
      window.scrollTo(0, scrollY)
    })
    setLangOpen(false)
  }

  return (
    <>
      <header className="nav-bar">
        <Link to="/" className="nav-logo-link">
          <img src={logoLight} alt="Home Wood Spa" className="nav-logo-img" />
        </Link>

        <nav className="nav-desktop-pill" aria-label={t('nav.company')}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              to={href}
              className={`nav-desktop-link${location.pathname === href ? ' nav-desktop-link--active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="nav-right">
          <div className="nav-lang-wrap" ref={langRef}>
            <button className="nav-lang" onClick={() => setLangOpen(v => !v)} aria-expanded={langOpen}>
              {LANG_LABELS[activeLang] || activeLang.toUpperCase()}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginLeft: 4, transition: 'transform 0.2s', transform: langOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {langOpen && (
              <div className="nav-lang-dropdown">
                {LANG_CODES.map(code => (
                  <button
                    key={code}
                    className={`nav-lang-option${code === activeLang ? ' nav-lang-option--active' : ''}`}
                    onClick={() => handleLangSwitch(code)}
                  >
                    {LANG_LABELS[code]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="nav-menu-pill nav-burger-mobile"
            aria-label={t('nav.menu')}
            aria-expanded={menuOpen}
          >
            <span className="nav-menu-label">{t('nav.menu')}</span>
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
