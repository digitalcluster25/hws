import { useState, useRef, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TESTIMONIALS = [
  {
    tag: 'СПА и wellness',
    quote: 'СПА в Emily Resort стал нашей визитной карточкой. Гости специально бронируют у нас ради термальных впечатлений — 12 уникальных саун, аутентичный хаммам и wellness-путешествие, которое выделяет нас на рынке.',
    name: 'Управление Emily Resort',
    title: 'Анталья, Турция',
  },
  {
    tag: 'Качество и материалы',
    quote: 'От концепции до завершения Home Wood Spa превзошли ожидания. Их внимание к деталям, качество материалов и понимание аутентичного строительства хаммамов не имеют аналогов.',
    name: 'Taze Bay Historic Baths',
    title: 'Баку, Азербайджан',
  },
  {
    tag: 'Проектирование',
    quote: 'Они не просто построили СПА — они создали wellness-направление. Термальный контур, премиальная отделка и продуманный дизайн подняли всю нашу собственность на новый уровень.',
    name: 'Sadu Hotel & Radisson Individuals',
    title: 'Алматы, Казахстан',
  },
]

function TestimonialCard({ tag, quote, name, title }) {
  return (
    <div className="tsl-card">
      <span className="tsl-tag">{tag}</span>
      <p className="tsl-quote">"{quote}"</p>
      <p className="tsl-name">{name}</p>
      <p className="tsl-role">{title}</p>
    </div>
  )
}

function ArrowLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  )
}
function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export default function TestimonialsSlider() {
  const [idx, setIdx] = useState(0)
  const total = TESTIMONIALS.length
  const go = (d) => setIdx((p) => (p + d + total) % total)

  const wrapRef = useRef(null)
  const maxH = useRef(0)
  useLayoutEffect(() => {
    const el = wrapRef.current
    if (!el) return
    el.style.minHeight = ''
    const h = el.offsetHeight
    if (h > maxH.current) {
      maxH.current = h
    }
    el.style.minHeight = maxH.current + 'px'
  })

  return (
    <section className="tsl-section" style={{ background: '#323625', position: 'relative', overflow: 'hidden' }}>
      <ul aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        listStyle: 'none', margin: 0,
        padding: '0 max(1.5vw, 16px)',
        pointerEvents: 'none', boxSizing: 'border-box',
      }}>
        {[0,1,2,3].map(i => (
          <li key={i} style={{
            borderLeft: i === 0 ? '1px solid rgba(255,255,255,0.07)' : 'none',
            borderRight: '1px solid rgba(255,255,255,0.07)',
          }} />
        ))}
      </ul>
      <div className="tsl-inner" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── MAIN ROW: left heading + right (cards + bar) ── */}
        <div className="tsl-main">
          <div className="tsl-left">
            <p className="tsl-label">ОТЗЫВЫ</p>
            <h2 className="tsl-heading">Что говорят<br />клиенты.</h2>
          </div>

          <div className="tsl-right">
            <div className="tsl-cards-wrap" ref={wrapRef}>
              <AnimatePresence initial={false}>
                <motion.div
                  key={idx}
                  className="tsl-cards"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                >
                  <TestimonialCard {...TESTIMONIALS[idx]} />
                  <TestimonialCard {...TESTIMONIALS[(idx + 1) % total]} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── BAR: counter bottom-left of first card, arrows right ── */}
            <div className="tsl-bar">
              <div className="tsl-counter">
                <span className="tsl-cur">{idx + 1}</span>
                <span className="tsl-sep"> — </span>
                <span className="tsl-tot">{total}</span>
              </div>
              <div className="tsl-arrows">
                <button type="button" className="tsl-arrow" onClick={() => go(-1)} aria-label="Назад">
                  <ArrowLeft />
                </button>
                <button type="button" className="tsl-arrow" onClick={() => go(1)} aria-label="Вперёд">
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
