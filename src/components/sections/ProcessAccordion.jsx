import { motion } from 'framer-motion'

const STEPS = [
  {
    title: 'Исследование и позиционирование',
    desc: 'Анализ рынка, конкурентов и целевой аудитории. Финансовое обоснование инвестиций ещё до проектирования.',
  },
  {
    title: 'Дизайн-концепция и 3D',
    desc: 'Термальный маршрут, подбор материалов и 3D-визуализация — согласованные с вашим брендом и бюджетом.',
  },
  {
    title: 'Поставка материалов',
    desc: 'Природный камень, термодерево, турецкая мозаика — от проверенных европейских поставщиков.',
  },
  {
    title: 'Строительство и монтаж',
    desc: 'Полное управление стройкой с нашими подрядчиками. Европейские стандарты, соблюдение сроков.',
  },
  {
    title: 'Инженерные системы',
    desc: 'Термальное оборудование, вентиляция, гидромассаж — интегрированы как единая wellness-система.',
  },
  {
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
    <section id="process" className="proc-section" style={{ paddingLeft: 'max(1.5vw, 16px)', paddingRight: 'max(1.5vw, 16px)' }}>
      <div className="proc-wrap">

        {/* ── LEFT ── */}
        <div className="proc-left">
          <span className="proc-badge">Под ключ</span>
          <div className="proc-h2">
            <span className="proc-h2-light">От концепции</span>
            <span className="proc-h2-dark">до открытия объекта<span className="proc-dot">.</span></span>
          </div>
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
              <p className="proc-step-num">Шаг {i + 1}.</p>
              <h3 className="proc-card-title">{s.title}</h3>
              <p className="proc-card-desc">{s.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
