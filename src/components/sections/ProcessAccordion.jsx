import { motion } from 'framer-motion'

const STEPS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <path d="M14 17.5h7M17.5 14v7"/>
      </svg>
    ),
    title: 'Исследование и позиционирование',
    desc: 'Анализ рынка, конкурентов и целевой аудитории. Финансовое обоснование инвестиций ещё до проектирования.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    title: 'Дизайн-концепция и 3D',
    desc: 'Термальный маршрут, подбор материалов и 3D-визуализация — согласованные с вашим брендом и бюджетом.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 7v5l3 3"/>
      </svg>
    ),
    title: 'Поставка материалов',
    desc: 'Природный камень, термодерево, турецкая мозаика — от проверенных европейских поставщиков.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Строительство и монтаж',
    desc: 'Полное управление стройкой с нашими подрядчиками. Европейские стандарты, соблюдение сроков.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    title: 'Инженерные системы',
    desc: 'Термальное оборудование, вентиляция, гидромассаж — интегрированы как единая wellness-система.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    title: 'Запуск и поддержка',
    desc: 'Открытие объекта, обучение команды и послепродажное сопровождение. Остаёмся на связи после старта.',
  },
]

const FADE = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 },
  }),
}

export default function ProcessAccordion() {
  return (
    <section id="process" className="proc-section">
      <div className="proc-wrap">

        {/* ── LEFT ── */}
        <div className="proc-left">
          <span className="proc-badge">Под ключ</span>
          <h2 className="proc-h2">
            От концепции<br />до открытия<br />объекта.
          </h2>
          <p className="proc-lead">
            Одна команда на каждом этапе — от маркетингового исследования до запуска.
            Без смены подрядчиков и потери качества.
          </p>
        </div>

        {/* ── RIGHT GRID ── */}
        <div className="proc-grid">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              className="proc-card"
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={FADE}
            >
              <div className="proc-icon">{s.icon}</div>
              <h3 className="proc-card-title">{s.title}</h3>
              <p className="proc-card-desc">{s.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
