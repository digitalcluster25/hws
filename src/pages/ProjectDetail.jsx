import { useParams, Link } from 'react-router-dom'
import { projects } from '../data/projects'
import Button from '../components/ui/Button'
import ProjectGallery from '../components/sections/ProjectGallery'

const C = { dark: '#323625', mid: '#A2AC89', light: '#B5BD9A', terra: '#CB8268', muted: '#6b7057' }
const px = { paddingLeft: 'max(1.5vw,16px)', paddingRight: 'max(1.5vw,16px)' }
const wrap = { maxWidth: '1344px', margin: '0 auto' }

export default function ProjectDetail() {
  const { slug } = useParams()
  const idx = projects.findIndex(p => p.slug === slug)
  const p = projects[idx]

  if (!p) {
    return (
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Проект не найден. <Link to="/portfolio">← Все проекты</Link></p>
      </main>
    )
  }

  const prev = projects[idx - 1] || null
  const next = projects[idx + 1] || null

  return (
    <main className="tc-dark" style={{ background: '#fff' }}>

      {/* ── HERO fullscreen ── */}
      <section className="proj-hero-full">
        {/* Фоновое фото */}
        {p.cover && (
          <img
            src={p.cover}
            alt={p.title}
            className="proj-hero-bg"
          />
        )}
        {/* Кнопка назад — поверх фото, верхний левый */}
        <div className="proj-hero-top">
          <Link to="/portfolio" className="proj-back-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{ transform: 'rotate(180deg)', flexShrink: 0 }}><path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z"/></svg>
            Все проекты
          </Link>
        </div>

        {/* Зелёная полупрозрачная плашка — нижняя часть */}
        <div className="proj-hero-panel">
          <div className="proj-hero-panel-inner">
            {p.tags && p.tags.length > 0 && (
              <div className="proj-tags-hero">
                {p.tags.map(t => <span key={t} className="proj-tag-hero">{t}</span>)}
                <span className="proj-tag-hero">{p.year}</span>
              </div>
            )}
            <h1 className="proj-hero-title">{p.title}</h1>
            <div className="proj-meta-grid">
              <div><p className="proj-meta-label">КЛИЕНТ</p><p className="proj-meta-val">{p.client}</p></div>
              <div><p className="proj-meta-label">ПЕРИОД</p><p className="proj-meta-val">{p.period}</p></div>
              <div><p className="proj-meta-label">ПЛОЩАДЬ</p><p className="proj-meta-val">{p.area}</p></div>
              <div><p className="proj-meta-label">ЛОКАЦИЯ</p><p className="proj-meta-val">{p.loc}</p></div>
            </div>
          </div>
        </div>

        {/* Плашка "Следующий проект" — правый нижний угол */}
        {next && (
          <Link to={`/portfolio/${next.slug}`} className="proj-next-card">
            <div className="proj-next-card-top">
              <span className="proj-next-card-label">Следующий проект</span>
              <div className="proj-next-card-arrows">
                <span className="proj-next-card-arr">←</span>
                <span className="proj-next-card-arr proj-next-card-arr--active">→</span>
              </div>
            </div>
            <p className="proj-next-card-title">{next.title}</p>
            <p className="proj-next-card-sub">{next.loc} · {next.year}</p>
          </Link>
        )}
      </section>

      {/* ── DESCRIPTION ── */}
      <section style={{ background: '#eef0e8', ...px, paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div style={wrap}>
          <div className="proj-desc-top">
            <p className="proj-step-label">01. КОНЦЕПЦИЯ</p>
            <h2 className="proj-quote">«{p.quote}»</h2>
          </div>
          <div className="proj-desc-cols">
            <p className="proj-body-text">{p.p1}</p>
            <p className="proj-body-text">{p.p2}</p>
          </div>
        </div>
      </section>

      {/* ── GALLERY SLIDER ── */}
      <ProjectGallery photos={p.photos || []} title={p.title} />

      {/* ── RESULT ── */}
      <section style={{ background: '#eef0e8', ...px, paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div style={wrap}>
          <div className="proj-desc-top">
            <p className="proj-step-label">02. РЕЗУЛЬТАТ</p>
            <h2 className="proj-result-heading">Объект работает.<br/>Цифры говорят сами.</h2>
          </div>
          <div className="proj-desc-cols" style={{ marginTop: '3rem' }}>
            <p className="proj-body-text">{p.p3}</p>
            <div className="proj-spec-list">
              {[['Тип объекта', p.type], ['Площадь', p.area], ['Период', p.period], ['Локация', p.loc]].map(([label, val]) => (
                <div key={label} className="proj-spec-item">
                  <span className="proj-spec-label">{label}</span>
                  <span className="proj-spec-val">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PREV / NEXT ── */}
      <section style={{ ...px, paddingTop: '5rem', paddingBottom: '5rem', background: '#fff' }}>
        <div style={{ ...wrap, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {prev ? (
            <Link to={`/portfolio/${prev.slug}`} className="proj-nav-link proj-nav-link--prev">
              <span className="proj-nav-dir">← Предыдущий</span>
              <span className="proj-nav-name">{prev.title}</span>
              <span className="proj-nav-sub">{prev.loc} · {prev.year}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link to={`/portfolio/${next.slug}`} className="proj-nav-link proj-nav-link--next">
              <span className="proj-nav-dir">Следующий →</span>
              <span className="proj-nav-name">{next.title}</span>
              <span className="proj-nav-sub">{next.loc} · {next.year}</span>
            </Link>
          ) : <div />}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 text-center" style={{ background: C.dark, ...px }}>
        <div style={wrap}>
          <h2 className="hws-cta-h2 tc-white max-w-2xl mx-auto mb-8">Обсудим ваш wellness-объект?</h2>
          <Button href="/contact" variant="filled-light" shadow={false}>Записаться на консультацию</Button>
        </div>
      </section>

    </main>
  )
}
