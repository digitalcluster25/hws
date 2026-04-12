import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, animate, useMotionValue } from 'framer-motion'

const C = { dark: '#323625', mid: '#A2AC89', muted: '#6b7057' }
const SIDE = '5.8rem'
const SIDE_MOBILE = 'max(1.5vw, 16px)'

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

export default function ProjectGallery({ photos = [], title = '' }) {
  const trackRef = useRef(null)
  const [trackW, setTrackW] = useState(0)
  const x = useMotionValue(0)
  const [slide, setSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => { setSlide(0); x.set(0) }, [isMobile]) // eslint-disable-line

  const perSlide = isMobile ? 1 : 3
  const side = isMobile ? SIDE_MOBILE : SIDE

  const groups = []
  for (let i = 0; i < photos.length; i += perSlide) {
    groups.push(photos.slice(i, i + perSlide))
  }
  const total = groups.length

  useEffect(() => {
    function measure() {
      if (trackRef.current) setTrackW(trackRef.current.offsetWidth)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    return () => ro.disconnect()
  }, [])

  const goTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(idx, total - 1))
    animate(x, -(clamped * trackW), {
      type: 'spring', stiffness: 280, damping: 34, mass: 0.8,
    })
    setSlide(clamped)
  }, [x, trackW, total])

  useEffect(() => {
    if (trackW > 0) x.set(-(slide * trackW))
  }, [trackW]) // eslint-disable-line

  if (!photos.length) return null

  return (
    <section style={{ background: '#fff' }}>

      {/* Лейбл — как в секции 03 */}
      <div style={{ paddingLeft: side, paddingRight: side, paddingTop: '5rem', paddingBottom: '2rem' }}>
        <p className="proj-step-label-concept" style={{ color: C.muted }}>04. Галерея</p>
      </div>

      {/* Фото-трек — с отступами как у секции */}
      <div ref={trackRef} style={{ overflow: 'hidden', width: '100%' }}>
        <motion.div style={{ display: 'flex', x }}>
          {groups.map((group, gi) => (
            <div
              key={gi}
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${group.length}, 1fr)`,
                gap: '0.75rem',
                flexShrink: 0,
                width: trackW || '100vw',
                paddingLeft: side,
                paddingRight: side,
                boxSizing: 'border-box',
              }}
            >
              {group.map((src, pi) => (
                <div
                  key={pi}
                  style={{ height: '56vh', minHeight: '320px', overflow: 'hidden', position: 'relative', borderRadius: '2px' }}
                >
                  <img
                    src={src}
                    alt={`${title} ${gi * perSlide + pi + 1}`}
                    loading="lazy"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Nav bar — те же отступы что и в секции 03 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: side,
        paddingRight: side,
        paddingTop: '1.2rem',
        paddingBottom: '3rem',
      }}>
        {/* Counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: C.dark, fontVariantNumeric: 'tabular-nums' }}>
            {String(slide + 1).padStart(2, '0')}
          </span>
          <span style={{
            display: 'block', width: '48px', height: '1px',
            background: '#d0d3c8', position: 'relative',
          }}>
            <span style={{
              position: 'absolute', left: 0, top: 0, height: '1px',
              background: C.dark,
              width: `${((slide + 1) / total) * 100}%`,
              transition: 'width 0.4s ease',
            }}/>
          </span>
          <span style={{ fontSize: '14px', color: '#a8ad9b', fontVariantNumeric: 'tabular-nums' }}>
            {String(total).padStart(2, '0')}
          </span>
        </div>

        {/* Arrows */}
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button
            onClick={() => goTo(slide - 1)}
            disabled={slide === 0}
            style={{
              background: 'none', border: 'none', padding: '4px',
              color: slide === 0 ? '#c0c4b8' : C.dark,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: slide === 0 ? 'default' : 'pointer',
              transition: 'color 0.2s',
            }}
            aria-label="Назад"
          >
            <ArrowLeft />
          </button>
          <button
            onClick={() => goTo(slide + 1)}
            disabled={slide === total - 1}
            style={{
              background: 'none', border: 'none', padding: '4px',
              color: slide === total - 1 ? '#c0c4b8' : C.dark,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: slide === total - 1 ? 'default' : 'pointer',
              transition: 'color 0.2s',
            }}
            aria-label="Вперёд"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  )
}
