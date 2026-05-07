import { useState, useRef, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation('labels')
  const { t: tc } = useTranslation('content')
  const TESTIMONIALS = tc('testimonials', { returnObjects: true }) || []

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
    if (h > maxH.current) maxH.current = h
    el.style.minHeight = maxH.current + 'px'
  })

  if (!total) return null

  return (
    <section className="tsl-section" style={{ background: '#323625', position: 'relative', overflow: 'hidden' }}>
      <ul aria-hidden="true" className="grid-vlines" style={{
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
        <div className="tsl-main">
          <div className="tsl-left">
            <p className="tsl-label">{t('testimonials.label')}</p>
            <h2 className="tsl-heading">{t('testimonials.h2line1')} <br />{t('testimonials.h2line2')}</h2>
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

            <div className="tsl-bar">
              <div className="tsl-counter">
                <span className="tsl-cur">{idx + 1}</span>
                <span className="tsl-sep"> — </span>
                <span className="tsl-tot">{total}</span>
              </div>
              <div className="tsl-arrows">
                <button type="button" className="tsl-arrow" onClick={() => go(-1)} aria-label={t('testimonials.ariaBack')}>
                  <ArrowLeft />
                </button>
                <button type="button" className="tsl-arrow" onClick={() => go(1)} aria-label={t('testimonials.ariaNext')}>
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
