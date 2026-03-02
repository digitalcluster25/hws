import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const C = { dark: '#323625', mid: '#A2AC89', light: '#B5BD9A' }
const NAV_LINKS = [
  { label: 'Услуги',   href: '#services'  },
  { label: 'Проекты',  href: '#portfolio' },
  { label: 'Процесс',  href: '#process'   },
  { label: 'О нас',    href: '#about'     },
  { label: 'Контакты', href: '#contact'   },
]

function useScrollTo() {
  const navigate = useNavigate()
  const location = useLocation()
  return useCallback((href) => {
    if (href.startsWith('#')) {
      const id = href.slice(1)
      if (location.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        navigate('/')
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150)
      }
    } else { navigate(href) }
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
  const go = (href) => { onClose(); setTimeout(() => scrollTo(href), 420) }
  const overlay = (
    <div style={{ position:'fixed', inset:0, zIndex:99999, background:C.dark, display:'flex', flexDirection:'column', opacity:open?1:0, pointerEvents:open?'all':'none', transition:'opacity 0.3s ease' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'max(1.5vw,16px)', flexShrink:0 }}>
        <Link to="/" onClick={onClose} style={{ fontSize:'0.8rem', letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(255,255,255,0.7)', textDecoration:'none' }}>Home Wood Spa</Link>
        <button onClick={onClose} style={{ width:'2.75rem', height:'2.75rem', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', background:'none', border:'none', cursor:'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <nav style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 max(4vw,24px)' }}>
        {NAV_LINKS.map(({ label, href }, i) => (
          <div key={label} style={{ overflow:'hidden', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
            <button onClick={() => go(href)} style={{ width:'100%', textAlign:'left', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'clamp(0.9rem,2.5vw,1.75rem) 0', background:'none', border:'none', cursor:'pointer', color:'#fff', transform:open?'translateY(0)':'translateY(110%)', opacity:open?1:0, transition:`transform 0.6s cubic-bezier(0.16,1,0.3,1) ${0.1+i*0.07}s, opacity 0.4s ease ${0.1+i*0.07}s` }}
              onMouseEnter={e => { e.currentTarget.querySelector('[data-label]').style.color=C.light; e.currentTarget.querySelector('[data-num]').style.opacity='1' }}
              onMouseLeave={e => { e.currentTarget.querySelector('[data-label]').style.color='#fff'; e.currentTarget.querySelector('[data-num]').style.opacity='0' }}>
              <span data-label="" style={{ fontSize:'clamp(2.2rem,6vw,5.5rem)', fontWeight:800, letterSpacing:'-0.03em', lineHeight:1, transition:'color 0.3s ease' }}>{label}</span>
              <span data-num="" style={{ fontSize:'0.85rem', fontWeight:500, letterSpacing:'0.1em', textTransform:'uppercase', color:C.mid, opacity:0, transition:'opacity 0.3s ease', flexShrink:0, marginLeft:'1rem' }}>{String(i+1).padStart(2,'0')}</span>
            </button>
          </div>
        ))}
      </nav>
      <div style={{ flexShrink:0, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem', padding:'0 max(1.5vw,16px) max(2vw,24px)', opacity:open?1:0, transform:open?'translateY(0)':'translateY(16px)', transition:'opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s' }}>
        <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap' }}>
          <a href="mailto:homewoodspa@gmail.com" style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.4)', letterSpacing:'0.06em', textDecoration:'none' }}>homewoodspa@gmail.com</a>
          <a href="tel:+16785209556" style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.4)', letterSpacing:'0.06em', textDecoration:'none' }}>+1 (678) 520-9556</a>
        </div>
        <button onClick={() => go('#contact')} style={{ background:C.mid, color:'#fff', border:'none', cursor:'pointer', padding:'0.6rem 1.5rem', borderRadius:'24px', fontSize:'0.875rem', fontWeight:600 }}>Консультация</button>
      </div>
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
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none" style={{ padding:'1.5vw max(1.5vw,16px) 0' }}>
        <motion.div initial={{ y:-20, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:0.6, ease:[0.16,1,0.3,1] }}
          className="pointer-events-auto w-full flex items-center gap-2 p-2 transition-all duration-500"
          style={{ background:scrolled?'#e0e3dc':'transparent', boxShadow:scrolled?'0 4px 24px rgba(0,0,0,0.10)':'none', maxWidth:'1344px', transitionTimingFunction:'cubic-bezier(.645,.045,.355,1)' }}>
          <button onClick={() => setMenuOpen(true)} aria-label="Меню" className="flex items-center justify-center shrink-0 hover:bg-black/10 transition-colors duration-300"
            style={{ width:'2.75rem', height:'2.75rem', color:C.dark, background:'none', border:'none', cursor:'pointer' }}>
            <div style={{ display:'flex', flexDirection:'column', gap:'5px', width:'16px' }}>
              <span style={{ display:'block', height:'1px', background:'currentColor' }}/>
              <span style={{ display:'block', height:'1px', background:'currentColor' }}/>
              <span style={{ display:'block', height:'1px', background:'currentColor' }}/>
            </div>
          </button>
          <Link to="/" className="font-display whitespace-nowrap hover:opacity-60 transition-opacity shrink-0"
            style={{ fontSize:'0.8rem', letterSpacing:'0.18em', textTransform:'uppercase', color:C.dark, textDecoration:'none' }}>Home Wood Spa</Link>
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {NAV_LINKS.map(({ label, href }) => (
              <button key={label} onClick={() => scrollTo(href)} className="font-sans font-medium flex items-center transition-all duration-300 whitespace-nowrap cursor-pointer hover:bg-black/10"
                style={{ height:'2.75rem', padding:'0 1.25rem', fontSize:'1rem', color:C.dark, background:'none', border:'none' }}>{label}</button>
            ))}
          </nav>
          <div className="flex-1 md:hidden"/>
          <button onClick={() => scrollTo('#contact')} className="shrink-0 font-sans font-semibold flex items-center transition-all duration-300 whitespace-nowrap hover:opacity-80 cursor-pointer"
            style={{ height:'2.75rem', padding:'0 1.25rem', borderRadius:'24px', fontSize:'0.95rem', background:C.dark, color:'#fff', border:'none' }}>Консультация</button>
        </motion.div>
      </div>
      <FullMenu open={menuOpen} onClose={() => setMenuOpen(false)} scrollTo={scrollTo}/>
    </>
  )
}
