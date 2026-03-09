import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader'

const C = { dark: '#323625', mid: '#A2AC89', light: '#B5BD9A', muted: '#6b7057', subtle: 'rgba(50,54,37,0.55)' }

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

  const go = (delta) => {
    setIdx((prev) => (prev + delta + total) % total)
  }

  return (
    <section className="py-24 ts-section--dark" style={{ background: C.dark, paddingLeft: 'max(1.5vw, 16px)', paddingRight: 'max(1.5vw, 16px)' }}>
      <div style={{ maxWidth: '1344px', margin: '0 auto' }}>
        <SectionHeader badge="Отзывы" light="Что говорят" dark="наши клиенты" className="sh-wrap--inverse mb-12" />

        <div style={{ maxWidth: '800px' }}>
          <div className="ts-card">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={idx}
              className="ts-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.645, 0.045, 0.355, 1] }}
            >
              <div className="ts-avatar-wrap" aria-hidden="true">
                <div
                  className="ts-avatar"
                  style={{
                    background: `linear-gradient(135deg, ${C.light} 0%, ${C.mid} 100%)`,
                    color: C.dark,
                    fontSize: '2rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {TESTIMONIALS[idx].name.charAt(0)}
                </div>
              </div>
              <blockquote className="ts-quote">"{TESTIMONIALS[idx].quote}"</blockquote>
              <p className="ts-name">{TESTIMONIALS[idx].name}</p>
              <p className="ts-title">{TESTIMONIALS[idx].title}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="ts-nav">
          <div className="ts-counter">
            <span className="ts-cur">{idx + 1}</span>
            <span className="ts-line" aria-hidden="true">—</span>
            <span className="ts-tot">{total}</span>
          </div>
          <div className="ts-arrows">
            <button type="button" className="ts-arrow" onClick={() => go(-1)} aria-label="Назад">
              <ArrowLeft />
            </button>
            <button type="button" className="ts-arrow" onClick={() => go(1)} aria-label="Вперёд">
              <ArrowRight />
            </button>
          </div>
        </div>   {/* ts-nav */}
        </div>   {/* 800px */}
      </div>     {/* 1344px */}
    </section>
  )
}
