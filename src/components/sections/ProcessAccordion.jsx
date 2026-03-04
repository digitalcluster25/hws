import { motion } from 'framer-motion'

const STEPS = [
  {
    icon: '◫',
    title: 'Исследование и позиционирование',
    desc: 'Конкурентный анализ рынка, позиционирование wellness-объекта и обоснование ROI ещё до проектирования.',
  },
  {
    icon: '⊡',
    title: 'Дизайн-концепция и 3D',
    desc: 'Разрабатываем термальный маршрут, подбираем материалы и создаём 3D-визуализацию объекта.',
  },
  {
    icon: '↓',
    title: 'Поставка материалов',
    desc: 'Европейские материалы: природный камень, термодерево, турецкая мозаика — из проверенных источников.',
  },
  {
    icon: '◌',
    title: 'Строительство и монтаж',
    desc: 'Полное управление стройкой с нашими подрядчиками. Соблюдение сроков и европейских стандартов качества.',
  },
  {
    icon: '⊕',
    title: 'Инженерные системы',
    desc: 'Термальное оборудование, вентиляция, гидромассаж и автоматизация — интегрированы как единая система.',
  },
  {
    icon: '☆',
    title: 'Запуск и поддержка',
    desc: 'Открытие объекта, обучение команды и послепродажное сопровождение. Остаёмся на связи после старта.',
  },
]

const FADE = {
  hidden: { opacity: 0, y: 24 },
  show:   (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1], delay: i * 0.07 } }),
}

export default function ProcessAccordion() {
  return (
    <section id="process" className="proc-section">
      <div className="proc-wrap">

        {/* ── LEFT col ── */}
        <div className="proc-left">
          <p className="hws-label hws-label-muted proc-label">Процесс</p>
          <h2 className="proc-h2">
            От концепции<br/>до дня открытия.
          </h2>
          <p className="proc-lead">
            Одна команда — от маркетингового исследования до запуска. Без смены подрядчиков и потери качества.
          </p>
        </div>

        {/* ── RIGHT grid ── */}
        <div className="proc-grid">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              className="proc-card"
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
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
