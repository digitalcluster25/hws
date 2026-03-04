import SectionHeader from '../ui/SectionHeader'

const STEPS = [
  {
    num: 'Шаг 1.',
    title: 'Исследование рынка и позиционирование.',
    bold: 'Конкурентный анализ,',
    desc: ' позиционирование wellness-объекта и финансовое обоснование инвестиций ещё до проектирования.',
  },
  {
    num: 'Шаг 2.',
    title: 'Дизайн-концепция и разработка.',
    bold: 'Термальный маршрут,',
    desc: ' подбор материалов и 3D-визуализация — согласованные с вашим брендом и бюджетом.',
  },
  {
    num: 'Шаг 3.',
    title: 'Строительство и монтаж под ключ.',
    bold: 'Полное управление стройкой',
    desc: ' с нашими подрядчиками. Европейские стандарты, соблюдение сроков.',
  },
  {
    num: 'Шаг 4.',
    title: 'Запуск и операционная поддержка.',
    bold: 'Открытие объекта,',
    desc: ' обучение команды и послепродажное сопровождение. Остаёмся на связи после старта.',
  },
]

export default function ProcessAccordion() {
  return (
    <section id="process" className="proc-section">
      <div className="proc-wrap">

        {/* header */}
        <SectionHeader
          badge="Под ключ"
          light="От концепции"
          dark="до открытия объекта"
          className="proc-header-block"
        />

        {/* steps grid */}
        <div className="proc-steps">
          {STEPS.map((s) => (
            <div key={s.num} className="proc-step">
              <p className="proc-step-num">{s.num}</p>
              <h3 className="proc-step-title">{s.title}</h3>
              <p className="proc-step-desc">
                <strong>{s.bold}</strong>{s.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
