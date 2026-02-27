import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

  const openMenu  = () => { setMenuVisible(true);  setTimeout(() => setMenuOpen(true), 10) }
  const closeMenu = () => { setMenuOpen(false); setTimeout(() => setMenuVisible(false), 500) }

  return (
    <>
      {/* ── FLOATING PILL NAV ── */}
      {/* Top offset: 1.5vw ≈ 24px on 1440. Side margin matches. */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        style={{ padding: '1.5vw max(1.5vw, 16px) 0' }}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={[
            // pill wrapper — inner padding 0.5rem (8px) all sides
            'pointer-events-auto w-full flex items-center gap-2',
            'p-2 rounded-full transition-all duration-500',
            scrolled
              ? 'bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]'
              : 'bg-white/10 backdrop-blur-sm',
          ].join(' ')}
          style={{ maxWidth: '1344px', transitionTimingFunction: 'cubic-bezier(.645,.045,.355,1)' }}
        >

          {/* Hamburger circle — 2.75rem × 2.75rem (44px) */}
          <button
            onClick={menuOpen ? closeMenu : openMenu}
            aria-label="Меню"
            className={[
              'flex items-center justify-center rounded-full shrink-0 transition-colors duration-300',
              scrolled
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                : 'bg-white/20 hover:bg-white/30 text-white',
            ].join(' ')}
            style={{ width: '2.75rem', height: '2.75rem' }}
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
            className={[
              'font-display whitespace-nowrap transition-colors duration-300 shrink-0',
              scrolled ? 'text-gray-950' : 'text-white',
            ].join(' ')}
            style={{ fontSize: '0.8rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}
          >
            Home Wood Spa
          </a>

          {/* Desktop nav links — height 2.75rem, padding-x 1.25rem, font-size 1rem */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={[
                  'font-sans font-medium rounded-full flex items-center transition-all duration-300 whitespace-nowrap',
                  scrolled
                    ? 'text-gray-600 hover:text-gray-950 hover:bg-gray-100'
                    : 'text-white/80 hover:text-white hover:bg-white/15',
                ].join(' ')}
                style={{ height: '2.75rem', paddingLeft: '1.25rem', paddingRight: '1.25rem', fontSize: '1rem' }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Spacer on mobile so CTA stays right */}
          <div className="flex-1 md:hidden" />

          {/* CTA pill button — height 2.75rem, padding-x 1.25rem, border-radius 24px */}
          <a
            href="#contact"
            className={[
              'shrink-0 font-sans font-semibold flex items-center transition-all duration-300 whitespace-nowrap',
              scrolled
                ? 'bg-gray-950 text-white hover:bg-gray-700'
                : 'bg-white text-gray-950 hover:bg-white/90',
            ].join(' ')}
            style={{
              height: '2.75rem',
              paddingLeft: '1.25rem',
              paddingRight: '1.25rem',
              borderRadius: '24px',
              fontSize: '0.95rem',
            }}
          >
            Консультация
          </a>

        </motion.div>
      </div>

      {/* ── MOBILE SLIDE-IN ── */}
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
              <span className="font-display text-gray-950" style={{ fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                Home Wood Spa
              </span>
              <button onClick={closeMenu} className="text-gray-400 hover:text-gray-950 transition-colors p-1">
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
                  className="font-sans font-medium text-gray-900 py-3 border-b border-gray-100 hover:text-gray-400 transition-colors"
                  style={{ fontSize: '1.2rem' }}
                >
                  {label}
                </motion.a>
              ))}
            </nav>

            <div className="px-6 pb-8">
              <a
                href="#contact"
                onClick={closeMenu}
                className="flex items-center justify-center w-full font-sans font-semibold bg-gray-950 text-white hover:bg-gray-700 transition-colors duration-300"
                style={{ height: '2.75rem', borderRadius: '24px', fontSize: '0.9rem', letterSpacing: '0.08em' }}
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
