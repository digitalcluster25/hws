import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function GridLines() {
  return (
    <ul aria-hidden="true" className="grid-vlines" style={{
      position: 'absolute', inset: 0,
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
      listStyle: 'none', margin: 0,
      padding: '0 max(1.5vw, 16px)',
      pointerEvents: 'none', boxSizing: 'border-box',
    }}>
      {[0,1,2,3].map(i => (
        <li key={i} style={{
          borderLeft: i === 0 ? '1px solid rgba(136,135,137,0.14)' : 'none',
          borderRight: '1px solid rgba(136,135,137,0.14)',
        }} />
      ))}
    </ul>
  )
}

const FADE = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 },
  }),
}

export default function ProcessAccordion() {
  const { t } = useTranslation('labels')
  const { t: tc } = useTranslation('content')
  const steps = tc('steps', { returnObjects: true }) || []

  return (
    <section id="process" className="proc-section" style={{ paddingLeft: 'max(1.5vw, 16px)', paddingRight: 'max(1.5vw, 16px)', position: 'relative' }}>
      <GridLines />
      <div className="proc-wrap" style={{ position: 'relative', zIndex: 1 }}>

        <div className="proc-left">
          <span className="proc-badge">{t('process.badge')}</span>
          <div className="proc-h2">
            <span className="proc-h2-light">{t('process.h2light')}</span>
            <span className="proc-h2-dark">{t('process.h2dark')}<span className="proc-dot">.</span></span>
          </div>
          <p className="proc-lead">{t('process.lead')}</p>
        </div>

        <div className="proc-grid">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              className="proc-card"
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={FADE}
            >
              <p className="proc-step-num">{t('process.stepLabel')} {i + 1}.</p>
              <h3 className="proc-card-title">{s.title}</h3>
              <p className="proc-card-desc">{s.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
