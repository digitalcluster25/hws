import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { Link } from 'react-router-dom'

const C = { dark: '#323625', mid: '#A2AC89', light: '#B5BD9A', terra: '#CB8268', muted: '#6b7057' }

const PROJECTS = [
  { title: 'Emily Resort',            loc: 'Анталья, Турция',   area: '3 200 м²', type: 'Термальный СПА', bg: '#3d4435' },
  { title: 'Taze Bay Historic Baths', loc: 'Баку, Азербайджан', area: '850 м²',   type: 'Хаммам',         bg: '#5c6350' },
  { title: 'Sadu Hotel & Radisson',   loc: 'Алматы, Казахстан', area: '1 600 м²', type: 'Отельный СПА',   bg: '#7a8368' },
  { title: 'Private Residence',       loc: 'Дубай, ОАЭ',        area: '420 м²',   type: 'Частный хаммам', bg: '#A2AC89' },
  { title: 'Mountain Wellness Club',  loc: 'Тироль, Австрия',   area: '2 100 м²', type: 'Wellness-клуб',  bg: '#6b7057' },
  { title: 'Corporate Wellness Hub',  loc: 'Варшава, Польша',   area: '680 м²',   type: 'Корп. СПА',      bg: '#8a9478' },
]

// Трижды дублируем для бесшовного infinite loop
const ITEMS = [...PROJECTS, ...PROJECTS, ...PROJECTS]
const BASE  = PROJECTS.length // индекс середины (реального начала)

const CARD_GAP    = 20   // px между карточками
const PEEK        = 0.18 // доля ширины контейнера — сколько видно по краям
const CARDS_SHOWN = 2    // полностью видимых карточек

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
  const trackRef    = useRef(null)
  const [cardW, setCardW] = useState(0)

  // текущий индекс (в ITEMS), начинаем с середины
  const [idx, setIdx]     = useState(BASE)
  const x = useMotionValue(0)

  // drag state
  const isDragging  = useRef(false)
  const dragStartX  = useRef(0)
  const dragStartXMV = useRef(0)

  // вычислить ширину карточки из ширины контейнера
  useEffect(() => {
    function calc() {
      if (!trackRef.current) return
      const W = trackRef.current.offsetWidth
      // ширина одной карточки = (W без peek-частей - gap*cards_shown) / cards_shown
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

  // получить x для заданного индекса
  const xForIdx = useCallback((i) => {
    if (!trackRef.current) return 0
    const W   = trackRef.current.offsetWidth
    const peek = W * PEEK
    return -(i * step) + peek
  }, [step])

  // прыгнуть на индекс без анимации (для infinite loop)
  const jumpTo = useCallback((i) => {
    x.set(xForIdx(i))
  }, [x, xForIdx])

  // анимировать к индексу
  const goTo = useCallback((i, instant = false) => {
    const target = xForIdx(i)
    if (instant) {
      x.set(target)
    } else {
      animate(x, target, { type: 'spring', stiffness: 260, damping: 32, mass: 0.8 })
    }
  }, [x, xForIdx])

  // начальная позиция
  useEffect(() => {
    if (cardW > 0) goTo(idx, true)
  }, [cardW]) // eslint-disable-line

  // функция навигации
  const navigate = useCallback((delta) => {
    setIdx(prev => {
      const next = prev + delta
      goTo(next)

      // бесшовный перескок: когда вышли за границы среднего блока
      const TOTAL = ITEMS.length
      const limit = BASE + PROJECTS.length

      if (next >= limit) {
        // прыгнуть на эквивалент в среднем блоке, потом снова анимировать
        setTimeout(() => {
          const corrected = next - PROJECTS.length
          jumpTo(corrected)
          setIdx(corrected)
        }, 0)
      } else if (next < BASE) {
        setTimeout(() => {
          const corrected = next + PROJECTS.length
          jumpTo(corrected)
          setIdx(corrected)
        }, 0)
      }

      return next
    })
  }, [goTo, jumpTo])

  // ── MOUSE DRAG ──────────────────────────────────────────
  const onMouseDown = useCallback((e) => {
    isDragging.current = true
    dragStartX.current   = e.clientX
    dragStartXMV.current = x.get()
    document.body.style.userSelect = 'none'
    document.body.style.cursor     = 'grabbing'
  }, [x])

  const onMouseMove = useCallback((e) => {
    if (!isDragging.current) return
    const dx = e.clientX - dragStartX.current
    x.set(dragStartXMV.current + dx)
  }, [x])

  const onMouseUp = useCallback((e) => {
    if (!isDragging.current) return
    isDragging.current = false
    document.body.style.userSelect = ''
    document.body.style.cursor     = ''

    const dx = e.clientX - dragStartX.current
    if (Math.abs(dx) < 5) return // click

    const cards = Math.round(-dx / step)
    const snapped = cards !== 0 ? cards : 0
    if (snapped !== 0) {
      navigate(snapped)
    } else {
      goTo(idx)
    }
  }, [step, navigate, goTo, idx])

  // touch drag
  const touchStartX = useRef(0)
  const touchStartXMV = useRef(0)

  const onTouchStart = useCallback((e) => {
    touchStartX.current   = e.touches[0].clientX
    touchStartXMV.current = x.get()
  }, [x])

  const onTouchMove = useCallback((e) => {
    const dx = e.touches[0].clientX - touchStartX.current
    x.set(touchStartXMV.current + dx)
  }, [x])

  const onTouchEnd = useCallback((e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) < 5) return
    const cards = Math.round(-dx / step)
    if (cards !== 0) navigate(cards)
    else goTo(idx)
  }, [step, navigate, goTo, idx])

  // реальный индекс в PROJECTS для счётчика
  const displayIdx = ((idx - BASE) % PROJECTS.length + PROJECTS.length) % PROJECTS.length

  return (
    <section id="portfolio" className="py-24" style={{ background: C.light }}>
      {/* Header */}
      <div className="hws-px mb-12" style={{ maxWidth: '1344px', margin: '0 auto 3rem' }}>
        <p className="hws-label hws-label-muted mb-5">Портфолио</p>
        <h2 className="hws-h2 tc-dark" style={{ maxWidth: '30rem' }}>
          Wellness-пространства,<br/>которые задают стандарт
        </h2>
      </div>

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
        <motion.div
          className="ps-inner"
          style={{ x }}
        >
          {ITEMS.map((p, i) => (
            <div
              key={i}
              className="ps-card"
              style={{ width: cardW > 0 ? cardW : '40vw', flexShrink: 0 }}
            >
              {/* Image */}
              <div className="ps-img" style={{ background: p.bg }}>
                <span className="ps-img-label">[IMAGE: {p.title}]</span>
              </div>
              {/* Meta */}
              <div className="ps-meta">
                <h3 className="ps-title">{p.title}</h3>
                <p className="ps-sub">
                  <span>{p.loc}</span>
                  <span className="ps-dot">·</span>
                  <span>{p.area}</span>
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Nav */}
      <div className="ps-nav hws-px" style={{ maxWidth: '1344px', margin: '1.75rem auto 0' }}>
        <div className="ps-counter">
          <span className="ps-cur">{String(displayIdx + 1).padStart(2, '0')}</span>
          <span className="ps-line" aria-hidden="true"/>
          <span className="ps-tot">{String(PROJECTS.length).padStart(2, '0')}</span>
        </div>
        <Link to="/portfolio" className="ps-all">Все проекты →</Link>
        <div className="ps-arrows">
          <button className="ps-arrow" onClick={() => navigate(-1)} aria-label="Назад"><ArrowLeft /></button>
          <button className="ps-arrow" onClick={() => navigate(1)}  aria-label="Вперёд"><ArrowRight /></button>
        </div>
      </div>
    </section>
  )
}
