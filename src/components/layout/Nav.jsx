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
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-5 pointer-events-none">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={[
            'pointer-events-auto w-full max-w-5xl flex items-center justify-between gap-4',
            'px-2 py-2 rounded-full transition-all duration-500 ease-expo',
            scrolled
              ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_32px_rgba(0,0,0,0.10)]'
              : 'bg-white/10 backdrop-blur-sm shadow-[0_4px_32px_rgba(0,0,0,0.08)]',
          ].join(' ')}
        >

          {/* Left: Hamburger circle */}
          <button
            onClick={menuOpen ? closeMenu : openMenu}
            aria-label="Меню"
            className={[
              'flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-all duration-300',
              scrolled
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                : 'bg-white/20 hover:bg-white/30 text-white',
            ].join(' ')}
          >
            <div className="flex flex-col gap-[5px] w-4">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block h-px w-full bg-current origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block h-px w-full bg-current"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block h-px w-full bg-current origin-center"
              />
            </div>
          </button>

          {/* Logo */}
          <a
            href="/"
            className={[
              'font-display text-xs tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-400 pl-1',
              scrolled ? 'text-gray-950' : 'text-white',
            ].join(' ')}
          >
            Home Wood Spa
          </a>

          {/* Desktop links — center */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={[
                  'font-sans text-sm font-medium px-4 py-2 rounded-full transition-all duration-300',
                  scrolled
                    ? 'text-gray-600 hover:text-gray-950 hover:bg-gray-100'
                    : 'text-white/80 hover:text-white hover:bg-white/15',
                ].join(' ')}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* CTA pill button */}
          <a
            href="#contact"
            className={[
              'shrink-0 font-sans text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 whitespace-nowrap',
              scrolled
                ? 'bg-gray-950 text-white hover:bg-gray-700'
                : 'bg-white text-gray-950 hover:bg-white/90',
            ].join(' ')}
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
            <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100">
              <span className="font-display text-xs tracking-widest uppercase text-gray-950">
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
                  className="font-sans text-xl font-medium text-gray-900 py-3 border-b border-gray-100 hover:text-gray-400 transition-colors"
                >
                  {label}
                </motion.a>
              ))}
            </nav>

            <div className="px-6 pb-8">
              <a
                href="#contact"
                onClick={closeMenu}
                className="block w-full text-center font-sans text-xs font-semibold tracking-widest uppercase px-6 py-4 rounded-full bg-gray-950 text-white hover:bg-gray-700 transition-colors duration-300"
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
