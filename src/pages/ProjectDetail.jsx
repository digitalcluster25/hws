import { useParams, Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { projects } from '../data/projects'
import Button from '../components/ui/Button'
import ProjectGallery from '../components/sections/ProjectGallery'

const C = { dark: '#323625', mid: '#A2AC89', light: '#B5BD9A', terra: '#CB8268', muted: '#6b7057' }
const px = { paddingLeft: 'max(1.5vw,16px)', paddingRight: 'max(1.5vw,16px)' }
const wrap = { maxWidth: '1344px', margin: '0 auto' }

// Split an attraction string "Name — description" into parts
function splitAttraction(str) {
  const sep = str.indexOf(' — ')
  if (sep === -1) return { name: str, desc: '' }
  return { name: str.slice(0, sep), desc: str.slice(sep + 3) }
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const idx = projects.findIndex(p => p.slug === slug)
  const p = projects[idx]

  const ctaSentinelRef = useRef(null)
  const [cardHidden, setCardHidden] = useState(false)

  useEffect(() => {
    const el = ctaSentinelRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setCardHidden(entry.isIntersecting),
      { threshold: 0 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  if (!p) {
    return (
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Проект не найден. <Link to="/portfolio">← Все проекты</Link></p>
      </main>
    )
  }

  const prev = projects[idx - 1] || null
  const next = projects[idx + 1] || null

  const hasAttractions = p.attractions && p.attractions.length > 0
  const techCards = [
    p.materials    && { label: 'Материалы',              text: p.materials },
    p.buildingTech && { label: 'Строительные технологии', text: p.buildingTech },
    p.energy       && { label: 'Энергоэффективность',    text: p.energy },
    p.ecology      && { label: 'Экология',               text: p.ecology },
  ].filter(Boolean)
  const hasTech = techCards.length > 0

  return (
    <main className="tc-dark" style={{ background: '#fff' }}>

      {/* ── HERO fullscreen ── */}
      <section className="proj-hero-full">
        {p.cover && (
          <img
            src={p.cover}
            alt={p.title}
            className="proj-hero-bg"
          />
        )}
        <div className="proj-hero-overlay" aria-hidden="true" />
        <div className="proj-hero-top">
          <Link to="/" className="proj-back-arrow" aria-label="На главную">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </Link>
        </div>

        <div className="proj-hero-panel">
          <div className="proj-hero-panel-inner">
            {/* Теги одной строкой: "Хаммам, Сауна · 2022" */}
            {p.tags && p.tags.length > 0 && (
              <p className="proj-hero-tagline">
                {p.tags.join(', ')}{p.year ? ` · ${p.year}` : ''}
              </p>
            )}

            <h1 className="proj-hero-title">{p.title}</h1>

            <div className="proj-meta-grid">
              <div>
                <p className="proj-meta-label">КЛИЕНТ</p>
                <p className="proj-meta-val">{p.client || '—'}</p>
              </div>
              <div>
                <p className="proj-meta-label">ПЕРИОД</p>
                <p className="proj-meta-val">{p.period || p.duration || '—'}</p>
              </div>
              <div>
                <p className="proj-meta-label">ПЛОЩАДЬ</p>
                <p className="proj-meta-val">{p.area || '—'}</p>
              </div>
              <div>
                <p className="proj-meta-label">ЛОКАЦИЯ</p>
                <p className="proj-meta-val">{p.city && p.country ? `${p.city}, ${p.country}` : p.loc}</p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ── Плавающая карточка следующего проекта ── */}
      {(prev || next) && (
        <div className={`proj-next-card${cardHidden ? ' proj-next-card--hidden' : ''}`}>
          <div className="proj-next-card-top">
            <span className="proj-next-card-label">Следующий проект</span>
            <div className="proj-next-card-arrows">
              {prev ? (
                <Link to={`/portfolio/${prev.slug}`} className="proj-next-arr-btn" aria-label="Предыдущий проект">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                </Link>
              ) : (
                <span className="proj-next-arr-btn proj-next-arr-btn--off" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                </span>
              )}
              {next ? (
                <Link to={`/portfolio/${next.slug}`} className="proj-next-arr-btn proj-next-arr-btn--on" aria-label="Следующий проект">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              ) : (
                <span className="proj-next-arr-btn proj-next-arr-btn--off" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              )}
            </div>
          </div>
          {next && (
            <Link to={`/portfolio/${next.slug}`} className="proj-next-card-body">
              <p className="proj-next-card-title">{next.title}</p>
              <p className="proj-next-card-sub">{next.loc} · {next.year}</p>
            </Link>
          )}
        </div>
      )}

      {/* ── 01. КОНЦЕПЦИЯ ── */}
      <section style={{ background: '#eef0e8', ...px, paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div style={wrap}>
          <div className="proj-concept-grid">
            {/* Левая колонка: лейбл + большой заголовок */}
            <div className="proj-concept-left">
              <p className="proj-step-label">01. КОНЦЕПЦИЯ</p>
              {p.positioning && (
                <p className="proj-positioning-text">{p.positioning}</p>
              )}
            </div>
            {/* Правые колонки: description и p1 */}
            <div className="proj-concept-col">
              {p.description && (
                <p className="proj-description">{p.description}</p>
              )}
            </div>
            <div className="proj-concept-col">
              {p.p1 && (
                <p className="proj-description">{p.p1}</p>
              )}
            </div>
          </div>
          {/* Блок 2: p2 (лево, 2 подколонки) + quote (право, крупно) */}
          {(p.p2 || p.quote) && (
            <div className="proj-concept-block2">
              <div className="proj-concept-block2-left">
                {p.p2 && (
                  <div className="proj-concept-block2-text">
                    <p className="proj-description">{p.p2}</p>
                  </div>
                )}
                {p.p3 && (
                  <div className="proj-concept-block2-text">
                    <p className="proj-description">{p.p3}</p>
                  </div>
                )}
              </div>
              {p.quote && (
                <div className="proj-concept-block2-right">
                  <p className="proj-concept-statement">«{p.quote}»</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── 02. ТЕРМАЛЬНЫЕ ЗОНЫ (attractions) ── */}
      {hasAttractions && (
        <section style={{ background: '#fff', ...px, paddingTop: '5rem', paddingBottom: '5rem' }}>
          <div style={wrap}>
            <div className="proj-attr-header">
              <p className="proj-step-label" style={{ color: C.muted }}>02. ПРОСТРАНСТВА</p>
              <div className="proj-attr-heading-row">
                <h2 className="proj-section-h2">Термальные зоны</h2>
                <span className="proj-attr-count">{p.attractions.length}</span>
              </div>
            </div>
            <div className="proj-attr-grid">
              {p.attractions.map((item, i) => {
                const { name, desc } = splitAttraction(item)
                return (
                  <div key={i} className="proj-attr-card">
                    <span className="proj-attr-num">{String(i + 1).padStart(2, '0')}</span>
                    <p className="proj-attr-name">{name}</p>
                    {desc && <p className="proj-attr-desc">{desc}</p>}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── GALLERY ── */}
      <ProjectGallery photos={p.photos || []} title={p.title} />

      {/* ── 03. ТЕХНОЛОГИИ ── */}
      {hasTech && (
        <section style={{ background: C.dark, ...px, paddingTop: '5rem', paddingBottom: '5rem' }}>
          <div style={wrap}>
            <p className="proj-step-label" style={{ color: 'rgba(255,255,255,0.45)' }}>03. ТЕХНОЛОГИИ</p>
            <div className="proj-tech-grid">
              {techCards.map((card, i) => (
                <div key={i} className="proj-tech-card">
                  <p className="proj-tech-label">{card.label}</p>
                  <p className="proj-tech-text">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 04. РЕЗУЛЬТАТ ── */}
      <section style={{ background: '#eef0e8', ...px, paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div style={wrap}>
          <div className="proj-desc-top">
            <p className="proj-step-label">04. РЕЗУЛЬТАТ</p>
          </div>
          <div className="proj-desc-cols" style={{ marginTop: '2rem' }}>
            {p.p3 && <p className="proj-body-text">{p.p3}</p>}
            <div className="proj-spec-list">
              {[
                ['Тип объекта', p.type],
                ['Площадь',    p.area],
                ['Срок',       p.duration],
                ['Статус',     p.status],
                ['Город',      p.city],
                ['Страна',     p.country],
              ].filter(([, val]) => val).map(([label, val]) => (
                <div key={label} className="proj-spec-item">
                  <span className="proj-spec-label">{label}</span>
                  <span className="proj-spec-val">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sentinel: карточка скрывается когда CTA входит в viewport */}
      <div ref={ctaSentinelRef} aria-hidden="true" />

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
