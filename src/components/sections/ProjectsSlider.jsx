import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const EASE = [0.16, 1, 0.3, 1]
const DURATION = 0.65

const projects = [
  { title: 'Emily Resort',            loc: 'Анталья, Турция',       area: '3 200 м²', type: 'Термальный СПА-комплекс', bg: '#3d4435' },
  { title: 'Taze Bay Historic Baths', loc: 'Баку, Азербайджан',     area: '850 м²',   type: 'Реставрация хаммама',    bg: '#5c6350' },
  { title: 'Sadu Hotel & Radisson',   loc: 'Алматы, Казахстан',     area: '1 600 м²', type: 'Отельный СПА',           bg: '#7a8368' },
  { title: 'Private Residence',       loc: 'Дубай, ОАЭ',            area: '420 м²',   type: 'Частный хаммам',         bg: '#A2AC89' },
  { title: 'Mountain Wellness Club',  loc: 'Тироль, Австрия',       area: '2 100 м²', type: 'Wellness-клуб',          bg: '#6b7057' },
  { title: 'Corporate Wellness Hub',  loc: 'Варшава, Польша',       area: '680 м²',   type: 'Корпоративный СПА',      bg: '#8a9478' },
]

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
  const [page, setPage]   = useState(0)   // which "page" (big card index)
  const [dir, setDir]     = useState(1)
  const total  = projects.length
  const maxPage = total - 3               // can show 3 cards at a time

  const go = useCallback((delta) => {
    setDir(delta)
    setPage(p => Math.max(0, Math.min(maxPage, p + delta)))
  }, [maxPage])

  const visible = projects.slice(page, page + 3)

  return (
    <div className="ps-root">
      {/* ── SLIDES ───────────────────────────────── */}
      <div className="ps-track">
        <AnimatePresence mode="sync" initial={false}>
          {/* BIG card */}
          <motion.div
            key={`big-${page}`}
            className="ps-big"
            initial={{ opacity: 0, x: dir > 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir > 0 ? -60 : 60 }}
            transition={{ duration: DURATION, ease: EASE }}
          >
            <SlideCard p={visible[0]} />
          </motion.div>

          {/* SMALL cards column */}
          <div className="ps-smalls">
            {visible.slice(1).map((p, i) => (
              <motion.div
                key={`s-${page}-${i}`}
                className="ps-small"
                initial={{ opacity: 0, x: dir > 0 ? 48 : -48 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir > 0 ? -48 : 48 }}
                transition={{ duration: DURATION, ease: EASE, delay: 0.06 + i * 0.05 }}
              >
                <SlideCard p={p} />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>

      {/* ── NAVIGATION ───────────────────────────── */}
      <div className="ps-nav">
        <div className="ps-counter">
          <span className="ps-cur">{String(page + 1).padStart(2, '0')}</span>
          <span className="ps-line" aria-hidden="true"/>
          <span className="ps-tot">{String(total).padStart(2, '0')}</span>
        </div>

        <Link to="/portfolio" className="ps-all">Все проекты →</Link>

        <div className="ps-arrows">
          <button className="ps-arrow" onClick={() => go(-1)} disabled={page === 0} aria-label="Назад">
            <ArrowLeft />
          </button>
          <button className="ps-arrow" onClick={() => go(1)} disabled={page >= maxPage} aria-label="Вперёд">
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}

function SlideCard({ p }) {
  return (
    <div className="ps-card">
      <div className="ps-img" style={{ background: p.bg }}>
        <span className="ps-img-label">[IMAGE: {p.title}]</span>
      </div>
      <div className="ps-meta">
        <h3 className="ps-title">{p.title}</h3>
        <p className="ps-sub">
          <span className="ps-loc">{p.loc}</span>
          <span className="ps-dot">·</span>
          <span className="ps-area">{p.area}</span>
        </p>
      </div>
    </div>
  )
}
