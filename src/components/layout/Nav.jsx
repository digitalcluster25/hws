import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Услуги',    href: '#services'   },
  { label: 'Проекты',   href: '#projects'   },
  { label: 'Процесс',   href: '#process'    },
  { label: 'О нас',     href: '#about'      },
  { label: 'Контакты',  href: '#contact'    },
]

export default function Nav() {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const openMenu  = () => { setMenuVisible(true);  setTimeout(() => setMenuOpen(true),  10)  }
  const closeMenu = () => { setMenuOpen(false); setTimeout(() => setMenuVisible(false), 500) }

  return (
    <>
      {/* ── HEADER ── */}
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-expo',
          scrolled
            ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200'
            : 'bg-transparent border-b border-white/10',
        ].join(' ')}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between gap-8">

          {/* Logo */}
          <a
            href="/"
            className={[
              'font-display text-sm tracking-widest uppercase transition-colors duration-400',
              scrolled ? 'text-gray-950' : 'text-white',
            ].join(' ')}
          >
            Home Wood Spa
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={[
                  'font-sans text-sm font-medium tracking-wide relative group transition-colors duration-300',
                  scrolled ? 'text-gray-600 hover:text-gray-950' : 'text-white/80 hover:text-white',
                ].join(' ')}
              >
                {label}
                {/* underline */}
                <span
                  className={[
                    'absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300 ease-expo',
                    scrolled ? 'bg-gray-950' : 'bg-white',
                  ].join(' ')}
                />
              </a>
            ))}
          </nav>

          {/* Right side: CTA + Hamburger */}
          <div className="flex items-center gap-4">
            {/* CTA — desktop only */}
            <a
              href="#contact"
              className={[
                'hidden md:inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-widest uppercase px-5 py-2.5 border transition-all duration-300',
                scrolled
                  ? 'border-gray-950 text-gray-950 hover:bg-gray-950 hover:text-white'
                  : 'border-white text-white hover:bg-white hover:text-gray-950',
              ].join(' ')}
            >
              Консультация
            </a>

            {/* Hamburger — mobile */}
            <button
              onClick={menuOpen ? closeMenu : openMenu}
              className={[
                'md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 transition-colors duration-300',
                scrolled ? 'text-gray-950' : 'text-white',
              ].join(' ')}
              aria-label="Меню"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block w-5 h-px bg-current origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-px bg-current origin-center"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block w-5 h-px bg-current origin-center"
              />
            </button>
          </div>

        </div>
      </header>

      {/* ── MOBILE OVERLAY ── */}
      {menuVisible && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: menuOpen ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeMenu}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          />

          {/* Slide-in panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: menuOpen ? '0%' : '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 right-0 bottom-0 w-full max-w-xs bg-white flex flex-col"
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-8 h-16 border-b border-gray-100">
              <span className="font-display text-xs tracking-widest uppercase text-gray-950">
                Home Wood Spa
              </span>
              <button onClick={closeMenu} className="text-gray-400 hover:text-gray-950 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col flex-1 px-8 py-10 gap-1">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : 20 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="font-sans text-2xl font-medium text-gray-900 py-3 border-b border-gray-100 hover:text-gray-500 transition-colors"
                >
                  {label}
                </motion.a>
              ))}
            </nav>

            {/* Bottom CTA */}
            <div className="px-8 pb-10">
              <a
                href="#contact"
                onClick={closeMenu}
                className="block w-full text-center font-sans text-xs font-semibold tracking-widest uppercase px-6 py-4 bg-gray-950 text-white hover:bg-gray-800 transition-colors duration-300"
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
