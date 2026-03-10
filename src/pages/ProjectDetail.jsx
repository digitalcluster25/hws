import { useParams, Link, useNavigate } from 'react-router-dom'
import { projects } from '../data/projects'
import Button from '../components/ui/Button'

const C = { dark: '#323625', mid: '#A2AC89', light: '#B5BD9A', terra: '#CB8268', muted: '#6b7057' }
const px = { paddingLeft: 'max(1.5vw,16px)', paddingRight: 'max(1.5vw,16px)' }
const wrap = { maxWidth: '1344px', margin: '0 auto' }

function ImgPlaceholder({ label, style = {} }) {
  return (
    <div style={{ background: C.mid, display: 'flex', alignItems: 'flex-end', padding: '1.5rem', ...style }}>
      <span style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.45)' }}>[IMAGE: {label}]</span>
    </div>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const idx = projects.findIndex(p => p.slug === slug)
  const p = projects[idx]

  if (!p) {
    return (
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="hws-body tc-subtle">Проект не найден. <Link to="/portfolio" style={{ color: C.dark }}>← Все проекты</Link></p>
      </main>
    )
  }

  const prev = projects[idx - 1] || null
  const next = projects[idx + 1] || null

  return (
    <main className="tc-dark" style={{ background: '#fff' }}>

      {/* ── HERO — split screen ── */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh', paddingTop: '5rem' }}>

        {/* Левая — тёмная */}
        <div style={{ background: C.dark, ...px, paddingTop: '5rem', paddingBottom: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <Link to="/portfolio" className="proj-back-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" style={{ transform: 'rotate(180deg)' }}><path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z"/></svg>
              Все проекты
            </Link>
            <div className="proj-tags-hero">
              {p.tags.map(t => <span key={t} className="proj-tag-hero">{t}</span>)}
              <span className="proj-tag-hero">{p.year}</span>
            </div>
            <h1 className="proj-hero-title">{p.title}</h1>
          </div>
          <div className="proj-meta-grid">
            <div><p className="proj-meta-label">КЛИЕНТ</p><p className="proj-meta-val">{p.client}</p></div>
            <div><p className="proj-meta-label">ПЕРИОД</p><p className="proj-meta-val">{p.period}</p></div>
            <div><p className="proj-meta-label">ПЛОЩАДЬ</p><p className="proj-meta-val">{p.area}</p></div>
            <div><p className="proj-meta-label">ЛОКАЦИЯ</p><p className="proj-meta-val">{p.loc}</p></div>
          </div>
        </div>

        {/* Правая — фото */}
        <ImgPlaceholder label={`${p.title} — главное фото`} style={{ minHeight: '100%' }} />
      </section>

      {/* ── DESCRIPTION SECTION ── */}
      <section style={{ background: '#eef0e8', ...px, paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div style={wrap}>
          {/* Верхняя строка: шаг + большая цитата */}
          <div className="proj-desc-top">
            <p className="proj-step-label">01. КОНЦЕПЦИЯ</p>
            <h2 className="proj-quote">«{p.quote}»</h2>
          </div>
          {/* Нижняя строка: два абзаца */}
          <div className="proj-desc-cols">
            <p className="proj-body-text">{p.p1}</p>
            <p className="proj-body-text">{p.p2}</p>
          </div>
        </div>
      </section>

      {/* ── FULL-WIDTH IMAGE ── */}
      <ImgPlaceholder label={`${p.title} — общий вид`} style={{ height: '65vh', width: '100%' }} />

      {/* ── 3-COLUMN IMAGE GRID ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
        <ImgPlaceholder label={`${p.title} — деталь 1`} style={{ aspectRatio: '3/4' }} />
        <ImgPlaceholder label={`${p.title} — деталь 2`} style={{ aspectRatio: '3/4', background: C.dark }} />
        <ImgPlaceholder label={`${p.title} — деталь 3`} style={{ aspectRatio: '3/4', background: '#a8b090' }} />
      </div>

      {/* ── RESULT SECTION ── */}
      <section style={{ background: '#eef0e8', ...px, paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div style={wrap}>
          <div className="proj-desc-top">
            <p className="proj-step-label">02. РЕЗУЛЬТАТ</p>
            <h2 className="proj-result-heading">Объект работает.<br/>Цифры говорят сами.</h2>
          </div>
          <div className="proj-desc-cols" style={{ marginTop: '3rem' }}>
            <p className="proj-body-text">{p.p3}</p>
            <div className="proj-spec-list">
              <div className="proj-spec-item">
                <span className="proj-spec-label">Тип объекта</span>
                <span className="proj-spec-val">{p.type}</span>
              </div>
              <div className="proj-spec-item">
                <span className="proj-spec-label">Площадь</span>
                <span className="proj-spec-val">{p.area}</span>
              </div>
              <div className="proj-spec-item">
                <span className="proj-spec-label">Период</span>
                <span className="proj-spec-val">{p.period}</span>
              </div>
              <div className="proj-spec-item">
                <span className="proj-spec-label">Локация</span>
                <span className="proj-spec-val">{p.loc}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2-COLUMN IMAGE ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <ImgPlaceholder label={`${p.title} — интерьер A`} style={{ aspectRatio: '4/3' }} />
        <ImgPlaceholder label={`${p.title} — интерьер B`} style={{ aspectRatio: '4/3', background: C.dark }} />
      </div>

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
