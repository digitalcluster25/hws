import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'
import linesUrl from '../../assets/lines.svg'
import ProjectsSlider from '../components/sections/ProjectsSlider'
import ProcessAccordion from '../components/sections/ProcessAccordion'
import TestimonialsSlider from '../components/sections/TestimonialsSlider'

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

const wrap = { maxWidth: '1344px', margin: '0 auto' }
const px   = { paddingLeft: 'max(1.5vw, 16px)', paddingRight: 'max(1.5vw, 16px)' }

export default function Wireframe() {
  const { t } = useTranslation('labels')
  const { t: tc } = useTranslation('content')

  const whyCards   = tc('whyCards',   { returnObjects: true }) || []
  const segments   = tc('segments',   { returnObjects: true }) || []
  const geoclients = tc('geoclients', { returnObjects: true }) || []

  return (
    <main className="min-h-screen tc-dark">

      {/* ── 1. HERO ── */}
      <section id="home" className="hero-section" style={{ background: '#110101', position: 'relative', overflow: 'hidden' }}>
        <div className="hws-wrap hws-px" style={{ position: 'relative', zIndex: 1, marginBottom: '100px' }}>
          <p className="hero-subtitle">{tc('hero.subtitle')}</p>
          <h1 className="hws-h1">{tc('hero.h1')}</h1>
        </div>
        <img
          src={linesUrl}
          aria-hidden="true"
          style={{
            position: 'absolute', bottom: 0, left: 0,
            width: '100%', height: '55%',
            objectFit: 'cover', objectPosition: 'top center',
            opacity: 0.55, pointerEvents: 'none',
          }}
        />
      </section>

      {/* ── 2. ПРОЕКТЫ ── */}
      <ProjectsSlider />

      {/* ── 3. О НАС ── */}
      <section id="about" className="about-section hws-px" style={{ background: '#110101' }}>
        <div style={{ maxWidth: '1344px', margin: '0 auto' }}>
          <h2 className="about-statement">
            <span className="about-statement__bright">{tc('about.bright')}</span>
            <span className="about-statement__muted">{tc('about.muted')}</span>
          </h2>
        </div>
      </section>

      {/* ── 4. КАК МЫ РАБОТАЕМ ── */}
      <section className="why-section hws-px" style={{ background: '#110101' }}>
        <div style={wrap}>
          <div className="why-top">
            <div className="why-top-left">
              <p className="why-label">{t('why.label')}</p>
              <div className="why-divider" />
              <h2 className="why-h2">
                <span className="why-h2-bright">{t('why.h2bright')}</span>
                <span className="why-h2-muted">{t('why.h2muted')}</span>
              </h2>
            </div>
            <div className="why-top-col">
              <p className="why-text">{t('why.text1')}</p>
            </div>
            <div className="why-top-col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p className="why-text">{t('why.text2')}</p>
              <div style={{ marginTop: '1.5rem' }}>
                <Button href="/services" variant="filled">{t('why.ctaBtn')}</Button>
              </div>
            </div>
          </div>

          <div className="why-cards">
            {whyCards.map(({ cat, title, desc }, i) => (
              <div key={i} className={`why-card${i === 3 ? ' why-card--active' : ''}`}>
                <div>
                  <p className="why-card-cat">{cat}</p>
                  <h3 className="why-card-title">{title}</h3>
                </div>
                <div>
                  <p className="why-card-desc">{desc}</p>
                  <button className="why-card-btn" aria-label={title}>
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. ПРОЦЕСС ── */}
      <ProcessAccordion />

      {/* ── 6. ДЛЯ КОГО ── */}
      <section className="clients-who-section" style={{ background: '#323625', ...px }}>
        <div style={wrap}>
          <div className="clients-who-inner">
            <div className="clients-who-left sh-wrap--inverse">
              <span className="sh-badge">{t('clients.badge')}</span>
              <div className="sh-h2">
                <span className="sh-light">{t('clients.h2light')}</span>
                <span className="sh-dark">{t('clients.h2dark1')}</span>
                <span className="sh-dark">{t('clients.h2dark2')}</span>
              </div>
            </div>
            <div className="clients-who-grid">
              {segments.map(({ title, text }, i) => (
                <div key={i} className="clients-who-card">
                  <h3 className="clients-who-title">{title}</h3>
                  <p className="clients-who-text">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <img src="/shape1.png" alt="" aria-hidden="true" className="clients-who-shape" />
      </section>

      {/* ── 7. ГЕОГРАФИЯ ── */}
      <section className="py-24 clients-section" style={{ background: '#B5BD9A', ...px, position: 'relative', overflow: 'hidden' }}>
        <GridLines />
        <div style={{ ...wrap, position: 'relative', zIndex: 1, borderTop: '1px solid rgba(50,54,37,0.25)', paddingTop: '4rem' }}>
          <p className="clients-label">{t('geography.label')}</p>
          <h2 className="clients-h2">{t('geography.h2line1')} <br />{t('geography.h2line2')}</h2>
          <p className="hws-small max-w-md mt-4 mb-12" style={{ color: 'var(--c-dark)' }}>{t('geography.sub')}</p>
          <ul className="clients-grid list-none p-0 m-0">
            {geoclients.map(({ project, city, country, website }, i) => (
              <li key={i} className="clients-entry">
                <p className="clients-name">{project}</p>
                <p className="clients-city">{city}, {country}</p>
                <p className="clients-website">
                  {website !== '—'
                    ? <a href={`https://${website}`} target="_blank" rel="noopener noreferrer">www.{website}</a>
                    : <span>—</span>
                  }
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 8. ОТЗЫВЫ ── */}
      <TestimonialsSlider />

      {/* ── 9. CTA ── */}
      <section id="contact" className="cta-section">
        <div className="cta-bg" aria-hidden="true" style={{ backgroundImage: 'url(/contactus.jpg)' }} />
        <div className="cta-overlay" aria-hidden="true" />
        <div className="cta-inner" style={wrap}>
          <div className="cta-top"><p className="cta-label">{t('cta.label')}</p></div>
          <div className="cta-bottom">
            <div className="cta-left">
              <h2 className="cta-h2">{t('cta.h2')}</h2>
              <Button href="https://calendly.com/wellness-hws" target="_blank" rel="noopener noreferrer" variant="filled">{t('cta.btn')}</Button>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
