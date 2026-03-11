import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, animate, useMotionValue } from 'framer-motion'

const C = { dark: '#323625', mid: '#A2AC89', muted: '#6b7057' }

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

const PER_SLIDE = 3

export default function ProjectGallery({ photos = [], title = '' }) {
  const trackRef = useRef(null)
  const [trackW, setTrackW] = useState(0)
  const x = useMotionValue(0)
  const [slide, setSlide] = useState(0)

  // Группируем фото по 3
  const groups = []
  for (let i = 0; i < photos.length; i += PER_SLIDE) {
    groups.push(photos.slice(i, i + PER_SLIDE))
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

  // при ресайзе — прыгаем без анимации
  useEffect(() => {
    if (trackW > 0) x.set(-(slide * trackW))
  }, [trackW]) // eslint-disable-line

  if (!photos.length) return null

  return (
    <section style={{ background: '#fff' }}>
      {/* Track */}
      <div ref={trackRef} style={{ overflow: 'hidden', width: '100%' }}>
        <motion.div
          style={{ display: 'flex', x }}
        >
          {groups.map((group, gi) => (
            <div
              key={gi}
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${group.length}, 1fr)`,
                gap: 0,
                flexShrink: 0,
                width: trackW || '100vw',
              }}
            >
              {group.map((src, pi) => (
                <div
                  key={pi}
                  style={{ height: '56vh', minHeight: '320px', overflow: 'hidden', position: 'relative' }}
                >
                  <img
                    src={src}
                    alt={`${title} ${gi * PER_SLIDE + pi + 1}`}
                    loading="lazy"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Nav bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.2rem max(1.5vw, 16px)',
        maxWidth: '1344px',
        margin: '0 auto',
      }}>
        {/* Counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <span style={{ fontSize: '1.4rem', fontWeight: 600, color: C.dark, fontVariantNumeric: 'tabular-nums' }}>
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
          <span style={{ fontSize: '1.4rem', color: '#a8ad9b', fontVariantNumeric: 'tabular-nums' }}>
            {String(total).padStart(2, '0')}
          </span>
        </div>

        {/* Arrows */}
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button
            onClick={() => goTo(slide - 1)}
            disabled={slide === 0}
            style={{
              width: '44px', height: '44px', borderRadius: '50%',
              border: `1px solid ${slide === 0 ? '#e0e3da' : C.dark}`,
              background: 'transparent',
              color: slide === 0 ? '#c0c4b8' : C.dark,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: slide === 0 ? 'default' : 'pointer',
              transition: 'all 0.2s',
            }}
            aria-label="Назад"
          >
            <ArrowLeft />
          </button>
          <button
            onClick={() => goTo(slide + 1)}
            disabled={slide === total - 1}
            style={{
              width: '44px', height: '44px', borderRadius: '50%',
              border: `1px solid ${slide === total - 1 ? '#e0e3da' : C.dark}`,
              background: slide === total - 1 ? 'transparent' : C.dark,
              color: slide === total - 1 ? '#c0c4b8' : '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: slide === total - 1 ? 'default' : 'pointer',
              transition: 'all 0.2s',
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
