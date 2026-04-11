import { useState, useRef, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TESTIMONIALS = [
  {
    tag: 'Общественный банный комплекс',
    quote: 'Задача была сложной — создать комплекс который одновременно работает для 100 гостей и при этом сохраняет ощущение приватности. Home Wood Spa спроектировали раздельные зоны для мужчин и женщин, VIP-коттеджи с индивидуальными банями и общую инфраструктуру так, что всё это работает как единый организм. Снежная комната и соляная комната стали зонами которые гости отмечают отдельно.',
    name: 'Hammam Bath',
    title: 'Шихов, Азербайджан',
  },
  {
    tag: 'Отельный СПА / Radisson Individuals',
    quote: 'Технические условия были непростые — подвальное помещение, низкие потолки, большое количество инженерных коммуникаций. Home Wood Spa не только решили все технические задачи, но и создали аутентичное пространство в казахском стиле с глиняными парными, которое стало отдельной точкой притяжения отеля. Гости Radisson отмечают SOP Spa как нечто чего они не видели в других отелях сети.',
    name: 'Sadu SPA by Radisson Individuals',
    title: 'Алматы, Казахстан',
  },
  {
    tag: 'Многофункциональный wellness-комплекс',
    quote: 'Emily Resort изначально задумывался как место которое даст гостям полный wellness-опыт под одной крышей. Home Wood Spa реализовали 12 уникальных саун и паровых комнат — каждая со своей концепцией, от флоатариума до сауны-театра. СПА-зона стала тем что отличает нас на рынке: гости бронируют резорт именно ради термального опыта, а не только ради проживания.',
    name: 'Emily Resort',
    title: 'Львов, Украина',
  },
  {
    tag: 'Реконструкция исторического хаммама',
    quote: 'Taze Bay — исторический объект, и главная сложность была в том, чтобы сохранить аутентичность и при этом создать современный СПА-комплекс с полным набором процедур. Home Wood Spa разработали решение которое уважает историю здания и одновременно добавляет русскую сауну, соляную комнату, снежную комнату и VIP-парные. Внимание к материалам и деталям — на уровне который сложно найти у других подрядчиков.',
    name: 'Taze Bay Historic Baths',
    title: 'Баку, Азербайджан',
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

        {/* ── MAIN ROW: left heading + right (cards + bar) ── */}
        <div className="tsl-main">
          <div className="tsl-left">
            <p className="tsl-label">ОТЗЫВЫ</p>
            <h2 className="tsl-heading">Что говорят <br />клиенты.</h2>
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
