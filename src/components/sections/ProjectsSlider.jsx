import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useMotionValue, animate, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import SectionHeader from '../ui/SectionHeader'
import { projects as allProjects } from '../../data/projects'

const C = { dark: '#323625', mid: '#A2AC89', light: '#B5BD9A', terra: '#CB8268', muted: '#6b7057' }

// Только featured-кейсы для слайдера
const PROJECTS = allProjects.filter(p => p.featured)
// Трижды дублируем для бесшовного infinite loop
const ITEMS = [...PROJECTS, ...PROJECTS, ...PROJECTS]
const BASE  = PROJECTS.length

const CARD_GAP    = 20
const PEEK        = 0.09
const CARDS_SHOWN = 2

function ArrowLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 5l-7 7 7 7"/>
    </svg>
  )
}
function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  )
}

export default function ProjectsSlider() {
  const trackRef  = useRef(null)
  const [cardW, setCardW] = useState(0)

  const [idx, setIdx]               = useState(BASE)
  const [settledIdx, setSettledIdx] = useState(BASE)
  const x = useMotionValue(0)

  const isDragging    = useRef(false)
  const dragStartX    = useRef(0)
  const dragStartXMV  = useRef(0)

  useEffect(() => {
    function calc() {
      if (!trackRef.current) return
      const W = trackRef.current.offsetWidth
      const peekPx = W * PEEK
      const w = (W - peekPx * 2 - CARD_GAP * (CARDS_SHOWN - 1)) / CARDS_SHOWN
      setCardW(w)
    }
    calc()
    const ro = new ResizeObserver(calc)
    if (trackRef.current) ro.observe(trackRef.current)
    return () => ro.disconnect()
  }, [])

  const step = cardW + CARD_GAP

  const xForIdx = useCallback((i) => {
    if (!trackRef.current) return 0
    const W = trackRef.current.offsetWidth
    const peek = W * PEEK
    return -(i * step) + peek
  }, [step])

  const jumpTo = useCallback((i) => { x.set(xForIdx(i)) }, [x, xForIdx])

  const goTo = useCallback((i, instant = false) => {
    const target = xForIdx(i)
    setSettledIdx(-1)
    if (instant) {
      x.set(target)
      setSettledIdx(i)
    } else {
      animate(x, target, {
        type: 'spring', stiffness: 260, damping: 32, mass: 0.8,
        onComplete: () => setSettledIdx(i),
      })
    }
  }, [x, xForIdx])

  useEffect(() => { if (cardW > 0) goTo(idx, true) }, [cardW]) // eslint-disable-line

  const navigate = useCallback((delta) => {
    setIdx(prev => {
      const next = prev + delta
      goTo(next)
      const limit = BASE + PROJECTS.length
      if (next >= limit) {
        setTimeout(() => { const c = next - PROJECTS.length; jumpTo(c); setIdx(c) }, 0)
      } else if (next < BASE) {
        setTimeout(() => { const c = next + PROJECTS.length; jumpTo(c); setIdx(c) }, 0)
      }
      return next
    })
  }, [goTo, jumpTo])

  const onMouseDown = useCallback((e) => {
    isDragging.current = true
    dragStartX.current   = e.clientX
    dragStartXMV.current = x.get()
    document.body.style.userSelect = 'none'
    document.body.style.cursor     = 'grabbing'
  }, [x])

  const onMouseMove = useCallback((e) => {
    if (!isDragging.current) return
    x.set(dragStartXMV.current + (e.clientX - dragStartX.current))
  }, [x])

  const onMouseUp = useCallback((e) => {
    if (!isDragging.current) return
    isDragging.current = false
    document.body.style.userSelect = ''
    document.body.style.cursor     = ''
    const dx = e.clientX - dragStartX.current
    if (Math.abs(dx) < 5) return
    const cards = Math.round(-dx / step)
    if (cards !== 0) navigate(cards)
    else goTo(idx)
  }, [step, navigate, goTo, idx])

  const touchStartX   = useRef(0)
  const touchStartXMV = useRef(0)

  const onTouchStart = useCallback((e) => {
    touchStartX.current   = e.touches[0].clientX
    touchStartXMV.current = x.get()
  }, [x])

  const onTouchMove = useCallback((e) => {
    x.set(touchStartXMV.current + (e.touches[0].clientX - touchStartX.current))
  }, [x])

  const onTouchEnd = useCallback((e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) < 5) return
    const cards = Math.round(-dx / step)
    if (cards !== 0) navigate(cards)
    else goTo(idx)
  }, [step, navigate, goTo, idx])

  const displayIdx = ((idx - BASE) % PROJECTS.length + PROJECTS.length) % PROJECTS.length

  return (
    <section id="portfolio" className="pb-24 pt-0" style={{ background: C.light }}>
      {/* Track */}
      <div
        ref={trackRef}
        className="ps-outer"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <motion.div className="ps-inner" style={{ x }}>
          {ITEMS.map((p, i) => {
            const isVisible = i === settledIdx || i === settledIdx + 1
            return (
              <Link
                key={i}
                to={`/portfolio/${p.slug}`}
                className="ps-card"
                style={{ width: cardW > 0 ? cardW : '40vw', flexShrink: 0, textDecoration: 'none', display: 'block' }}
                draggable={false}
                onClick={(e) => { if (isDragging.current) e.preventDefault() }}
              >
                <div className="ps-img">
                  <img
                    src={p.cover}
                    alt={p.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', userSelect: 'none', pointerEvents: 'none' }}
                    draggable={false}
                  />
                </div>
                <AnimatePresence>
                  {isVisible && (
                    <motion.div
                      className="ps-meta"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <h3 className="ps-title">{p.title}</h3>
                      <p className="ps-sub">
                        <span>{p.loc}</span>
                        <span className="ps-dot">·</span>
                        <span>{p.area || p.type}</span>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            )
          })}
        </motion.div>
      </div>

      {/* Nav */}
      <div className="ps-nav hws-px" style={{ maxWidth: '1344px', margin: '1.75rem auto 0' }}>
        <div className="ps-counter">
          <span className="ps-cur">{String(displayIdx + 1).padStart(2, '0')}</span>
          <span className="ps-line" aria-hidden="true"/>
          <span className="ps-tot">{String(PROJECTS.length).padStart(2, '0')}</span>
        </div>
        <div className="ps-arrows">
          <button className="ps-arrow" onClick={() => navigate(-1)} aria-label="Назад"><ArrowLeft /></button>
          <button className="ps-arrow" onClick={() => navigate(1)}  aria-label="Вперёд"><ArrowRight /></button>
        </div>
      </div>
    </section>
  )
}
