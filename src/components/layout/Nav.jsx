import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import logoDark from '../../assets/logo-dark.svg'

const C = { dark: '#323625', mid: '#A2AC89', light: '#B5BD9A' }

/**
 * NAV_LINKS — добавляй пункты сюда.
 * Они автоматически делятся пополам: левые слева от лого, правые справа.
 * При нечётном кол-ве: слева ceil(n/2), справа floor(n/2).
 * page: true  → navigate(href)
 * page: false → плавный скролл к якорю #id
 */
const NAV_LINKS = [
  { label: 'Компания', href: '/',          page: true },
  { label: 'Услуги',   href: '/services',  page: true },
  { label: 'Кейсы',    href: '/portfolio', page: true },
  { label: 'Контакты', href: '/contact',   page: true },
]

// Авторасчёт разбивки: ceil слева, floor справа
const leftLinks  = NAV_LINKS.slice(0, Math.ceil(NAV_LINKS.length / 2))
const rightLinks = NAV_LINKS.slice(Math.ceil(NAV_LINKS.length / 2))

function useScrollTo() {
  const navigate = useNavigate()
  const location = useLocation()
  return useCallback((href) => {
    if (href.startsWith('/')) {
      navigate(href)
    } else if (href.startsWith('#')) {
      const id = href.slice(1)
      if (location.pathname === '/') {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        navigate('/')
        setTimeout(() => {
          const el = document.getElementById(id)
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 150)
      }
    }
  }, [location, navigate])
}

function NavBtn({ label, href, onClick }) {
  return (
    <button
      onClick={onClick}
      className="font-sans font-medium whitespace-nowrap transition-all duration-300 cursor-pointer bg-transparent hover:bg-black/10"
      style={{ height: '2.75rem', padding: '0 1.1rem', fontSize: '0.95rem', color: C.dark, border: 'none', borderRadius: '10px' }}
    >
      {label}
    </button>
  )
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

  const go = (href, page) => {
    onClose()
    setTimeout(() => scrollTo(href), page ? 300 : 420)
  }

  const overlay = (
    <div style={{ position:'fixed', inset:0, zIndex:99999, background:C.dark, display:'flex', flexDirection:'column', opacity:open?1:0, pointerEvents:open?'all':'none', transition:'opacity 0.3s ease' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-end', padding:'max(1.5vw,16px)', flexShrink:0 }}>
        <button onClick={onClose} style={{ width:'2.75rem', height:'2.75rem', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', background:'none', border:'none', cursor:'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <nav style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 max(4vw,24px)' }}>
        {NAV_LINKS.map(({ label, href, page }, i) => (
          <div key={label} style={{ overflow:'hidden', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
            <button onClick={() => go(href, page)}
              style={{ width:'100%', textAlign:'left', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'clamp(0.9rem,2.5vw,1.75rem) 0', background:'none', border:'none', cursor:'pointer', color:'#fff', transform:open?'translateY(0)':'translateY(110%)', opacity:open?1:0, transition:`transform 0.6s cubic-bezier(0.16,1,0.3,1) ${0.1+i*0.07}s, opacity 0.4s ease ${0.1+i*0.07}s` }}
              onMouseEnter={e => { e.currentTarget.querySelector('[data-label]').style.color=C.light; e.currentTarget.querySelector('[data-num]').style.opacity='1' }}
              onMouseLeave={e => { e.currentTarget.querySelector('[data-label]').style.color='#fff'; e.currentTarget.querySelector('[data-num]').style.opacity='0' }}>
              <span data-label="" style={{ fontSize:'clamp(2.2rem,6vw,5.5rem)', fontWeight:800, letterSpacing:'-0.03em', lineHeight:1, transition:'color 0.3s ease' }}>{label}</span>
              <span data-num="" style={{ fontSize:'0.85rem', fontWeight:500, letterSpacing:'0.1em', textTransform:'uppercase', color:C.mid, opacity:0, transition:'opacity 0.3s ease', flexShrink:0, marginLeft:'1rem' }}>{String(i+1).padStart(2,'0')}</span>
            </button>
          </div>
        ))}
      </nav>
    </div>
  )
  return createPortal(overlay, document.body)
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
      <div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        style={{ padding: '1.5vw max(1.5vw,16px) 0' }}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto w-full p-2 transition-all duration-500"
          style={{
            background: scrolled ? '#e0e3dc' : 'transparent',
            boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.10)' : 'none',
            borderRadius: '10px',
            maxWidth: '1344px',
            transitionTimingFunction: 'cubic-bezier(.645,.045,.355,1)',
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
          }}
        >
          {/* ── ЛЕВАЯ КОЛОНКА: hamburger + левые ссылки ── */}
          <div className="flex items-center justify-end">
            <nav className="hidden md:flex items-center">
              {leftLinks.map(({ label, href }) => (
                <NavBtn key={label} label={label} href={href} onClick={() => scrollTo(href)} />
              ))}
            </nav>
            {/* Hamburger — крайний левый */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Меню"
              className="flex items-center justify-center shrink-0 bg-transparent hover:bg-black/10 transition-colors duration-300 order-first"
              style={{ width: '2.75rem', height: '2.75rem', color: C.dark, border: 'none', cursor: 'pointer', marginRight: 'auto', borderRadius: '10px' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '16px' }}>
                <span style={{ display: 'block', height: '1px', background: 'currentColor' }} />
                <span style={{ display: 'block', height: '1px', background: 'currentColor' }} />
                <span style={{ display: 'block', height: '1px', background: 'currentColor' }} />
              </div>
            </button>
          </div>

          {/* ── ЦЕНТР: лого ── */}
          <Link
            to="/"
            className="flex items-center justify-center hover:opacity-70 transition-opacity"
            style={{ padding: '0 1rem', textDecoration: 'none' }}
          >
            <img src={logoDark} alt="Home Wood Spa" style={{ height: '28px', width: 'auto', display: 'block' }} />
          </Link>

          {/* ── ПРАВАЯ КОЛОНКА: правые ссылки + CTA ── */}
          <div className="flex items-center justify-start">
            {/* Правые ссылки (десктоп) */}
            <nav className="hidden md:flex items-center">
              {rightLinks.map(({ label, href }) => (
                <NavBtn key={label} label={label} href={href} onClick={() => scrollTo(href)} />
              ))}
            </nav>
            {/* CTA — крайний правый */}
            <button
              onClick={() => scrollTo('#contact')}
              data-variant="filled"
              className="ohio-btn shrink-0 font-sans font-semibold flex items-center whitespace-nowrap cursor-pointer ml-auto"
              style={{ height: '2.75rem', padding: '0 1.25rem', borderRadius: '16px', fontSize: '0.95rem', background: C.dark, color: '#fff', border: '1px solid ' + C.dark, boxShadow: '0 3px 5px 0 rgb(0 0 0 / .06)' }}
            >
              Консультация
            </button>
          </div>
        </motion.div>
      </div>

      <FullMenu open={menuOpen} onClose={() => setMenuOpen(false)} scrollTo={scrollTo} />
    </>
  )
}
