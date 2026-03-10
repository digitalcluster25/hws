import { useParams, Link } from 'react-router-dom'
import { projects } from '../data/projects'
import Button from '../components/ui/Button'

const C = { dark: '#323625', mid: '#A2AC89', light: '#B5BD9A', terra: '#CB8268', muted: '#6b7057' }
const px = { paddingLeft: 'max(1.5vw,16px)', paddingRight: 'max(1.5vw,16px)' }
const wrap = { maxWidth: '1344px', margin: '0 auto' }

function Img({ src, alt, style = {} }) {
  if (!src) {
    return (
      <div style={{ background: C.mid, display: 'flex', alignItems: 'flex-end', padding: '1.5rem', ...style }}>
        <span style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.4)' }}>[IMAGE REQUIRED]</span>
      </div>
    )
  }
  return <img src={src} alt={alt || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }} />
}

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

  const photos = p.photos || []
  const prev = projects[idx - 1] || null
  const next = projects[idx + 1] || null

  return (
    <main className="tc-dark" style={{ background: '#fff' }}>

      {/* ── HERO split ── */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' }}>

        {/* Левая тёмная */}
        <div style={{ background: C.dark, ...px, paddingTop: '9rem', paddingBottom: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <Link to="/portfolio" className="proj-back-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" style={{ transform: 'rotate(180deg)' }}><path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z"/></svg>
              Все проекты
            </Link>
            {p.tags.length > 0 && (
              <div className="proj-tags-hero">
                {p.tags.map(t => <span key={t} className="proj-tag-hero">{t}</span>)}
                <span className="proj-tag-hero">{p.year}</span>
              </div>
            )}
            <h1 className="proj-hero-title">{p.title}</h1>
          </div>
          <div className="proj-meta-grid">
            <div><p className="proj-meta-label">КЛИЕНТ</p><p className="proj-meta-val">{p.client}</p></div>
            <div><p className="proj-meta-label">ПЕРИОД</p><p className="proj-meta-val">{p.period}</p></div>
            <div><p className="proj-meta-label">ПЛОЩАДЬ</p><p className="proj-meta-val">{p.area}</p></div>
            <div><p className="proj-meta-label">ЛОКАЦИЯ</p><p className="proj-meta-val">{p.loc}</p></div>
          </div>
        </div>

        {/* Правая — cover */}
        <div style={{ overflow: 'hidden', paddingTop: '5rem' }}>
          <Img src={p.cover} alt={`${p.title} — обложка`} style={{ height: '100%', minHeight: '500px' }} />
        </div>
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

      {/* ── ФОТО 1 — full-width ── */}
      {photos[0] && (
        <div style={{ height: '65vh', overflow: 'hidden' }}>
          <Img src={photos[0]} alt={`${p.title} 1`} />
        </div>
      )}

      {/* ── ФОТО 2,3,4 — 3 колонки ── */}
      {photos.slice(1, 4).length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(photos.slice(1,4).length, 3)}, 1fr)` }}>
          {photos.slice(1, 4).map((src, i) => (
            <div key={i} style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
              <Img src={src} alt={`${p.title} ${i+2}`} />
            </div>
          ))}
        </div>
      )}

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

      {/* ── ФОТО 5,6 — 2 колонки ── */}
      {photos.slice(4, 6).length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(photos.slice(4,6).length, 2)}, 1fr)` }}>
          {photos.slice(4, 6).map((src, i) => (
            <div key={i} style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
              <Img src={src} alt={`${p.title} ${i+6}`} />
            </div>
          ))}
        </div>
      )}

      {/* ── ФОТО 7+ — full-width по одному ── */}
      {photos.slice(6).map((src, i) => (
        <div key={i} style={{ height: '60vh', overflow: 'hidden' }}>
          <Img src={src} alt={`${p.title} ${i+8}`} />
        </div>
      ))}

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
