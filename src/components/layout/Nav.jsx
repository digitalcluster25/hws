import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Услуги',   href: '#services' },
  { label: 'Проекты',  href: '#projects' },
  { label: 'Процесс',  href: '#process'  },
  { label: 'О нас',    href: '#about'    },
  { label: 'Контакты', href: '#contact'  },
]

export default function Nav() {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const openMenu  = () => { setMenuVisible(true); setTimeout(() => setMenuOpen(true), 10) }
  const closeMenu = () => { setMenuOpen(false); setTimeout(() => setMenuVisible(false), 500) }

  return (
    <>
      {/* FLOATING PILL NAV */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        style={{ padding: '1.5vw max(1.5vw, 16px) 0' }}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto w-full flex items-center gap-2 p-2 transition-all duration-500"
          style={{
            background: '#e0e3dc',
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none',
            boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.10)' : 'none',
          }}
          style={{ maxWidth: '1344px', transitionTimingFunction: 'cubic-bezier(.645,.045,.355,1)' }}
        >

          {/* Hamburger — 2.75rem circle */}
          <button
            onClick={menuOpen ? closeMenu : openMenu}
            aria-label="Меню"
            className="flex items-center justify-center shrink-0 transition-colors duration-300 hover:bg-black/10"
            style={{ width: '2.75rem', height: '2.75rem', color: '#323625' }}
          >
            <div className="flex flex-col gap-[5px]" style={{ width: '16px' }}>
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block bg-current origin-center"
                style={{ height: '1px' }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block bg-current"
                style={{ height: '1px' }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block bg-current origin-center"
                style={{ height: '1px' }}
              />
            </div>
          </button>

          {/* Logo */}
          <a
            href="/"
            className="font-display whitespace-nowrap transition-colors duration-300 shrink-0"
            style={{
              fontSize: '0.8rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#323625',
            }}
          >
            Home Wood Spa
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="font-sans font-medium flex items-center transition-all duration-300 whitespace-nowrap hover:bg-black/08"
                style={{
                  height: '2.75rem',
                  paddingLeft: '1.25rem',
                  paddingRight: '1.25rem',
                  fontSize: '1rem',
                  fontFamily: '"Inter", sans-serif',
                  color: '#323625',
                }}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex-1 md:hidden" />

          {/* CTA */}
          <a
            href="#contact"
            className="shrink-0 font-sans font-semibold flex items-center transition-all duration-300 whitespace-nowrap"
            style={{
              height: '2.75rem',
              paddingLeft: '1.25rem',
              paddingRight: '1.25rem',
              borderRadius: '24px',
              fontSize: '0.95rem',
              fontFamily: '"Inter", sans-serif',
              background: '#323625',
              color: '#ffffff',
            }}
          >
            Консультация
          </a>

        </motion.div>
      </div>

      {/* MOBILE SLIDE-IN */}
      {menuVisible && (
        <div className="fixed inset-0 z-40 md:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: menuOpen ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeMenu}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: menuOpen ? '0%' : '-100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 bottom-0 w-72 bg-white flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 border-b border-gray-100" style={{ height: '4.5rem' }}>
              <span className="font-display" style={{ fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#222222' }}>
                Home Wood Spa
              </span>
              <button onClick={closeMenu} className="transition-colors p-1" style={{ color: '#aaa' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col flex-1 px-6 py-8 gap-1">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : -16 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="font-sans font-medium py-3 border-b border-gray-100 transition-colors"
                  style={{ fontSize: '1.2rem', color: '#222222' }}
                >
                  {label}
                </motion.a>
              ))}
            </nav>

            <div className="px-6 pb-8">
              <a
                href="#contact"
                onClick={closeMenu}
                className="flex items-center justify-center w-full font-sans font-semibold transition-colors duration-300"
                style={{ height: '2.75rem', borderRadius: '24px', fontSize: '0.9rem', fontFamily: '"Inter", sans-serif', background: '#222222', color: '#ffffff' }}
              >
                Записаться на консультацию
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}
