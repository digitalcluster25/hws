import { useParams, Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { projects } from '../data/projects'
import Button from '../components/ui/Button'
import ProjectGallery from '../components/sections/ProjectGallery'

const C = { dark: '#323625', mid: '#A2AC89', light: '#B5BD9A', terra: '#CB8268', muted: '#6b7057' }
const px = { paddingLeft: 'max(1.5vw,16px)', paddingRight: 'max(1.5vw,16px)' }
const wrap = { maxWidth: '1344px', margin: '0 auto' }

const conceptSectionStyle = { background: '#B5BD9A', ...px, paddingTop: '5rem', paddingBottom: '5rem', position: 'relative' }
const conceptContentStyle = { position: 'relative', zIndex: 1 }

function GridLines() {
  return (
    <ul aria-hidden="true" className="grid-vlines" style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', listStyle: 'none', margin: 0, padding: 0, pointerEvents: 'none' }}>
      {[0,1,2,3].map(i => (
        <li key={i} style={{ borderLeft: i === 0 ? '1px solid rgba(136,135,137,0.14)' : 'none', borderRight: '1px solid rgba(136,135,137,0.14)' }} />
      ))}
    </ul>
  )
}

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

  const prev = projects[(idx - 1 + projects.length) % projects.length]
  const next = projects[(idx + 1) % projects.length]

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
            <span className="proj-next-card-label"><span className="proj-next-card-label--full">Следующий проект</span><span className="proj-next-card-label--short">след. проект</span></span>
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
      <section className="proj-section" style={conceptSectionStyle}>
        <GridLines />
          <div className="proj-concept-grid" style={conceptContentStyle}>
            {/* Левая колонка: лейбл + большой заголовок */}
            <div className="proj-concept-left">
              <p className="proj-step-label-concept">01. КОНЦЕПЦИЯ</p>
              {p.positioning && (
                <p className="proj-positioning-text proj-result-heading">{p.positioning}</p>
              )}
              {p.positioningSub && (
                <p className="proj-description">{p.positioningSub}</p>
              )}
            </div>
            {/* Пустой разделитель (Ohio: 1/12) */}
            <div aria-hidden="true" />
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
      </section>

      {/* ── 02. ПОЗИЦИОНИРОВАНИЕ ── */}
      {(p.p2 || p.p3 || p.quote) && (
        <section className="proj-section" style={{ ...conceptSectionStyle, background: '#eef0e8' }}>
          <GridLines />
          <div className="proj-concept-grid" style={conceptContentStyle}>
            <div className="proj-concept-left">
              <p className="proj-step-label-concept">02. ПОЗИЦИОНИРОВАНИЕ</p>
              {p.quote && (
                <p className="proj-positioning-text proj-result-heading">«{p.quote}»</p>
              )}
            </div>
            <div aria-hidden="true" />
            <div className="proj-concept-col">
              {p.p2 && <p className="proj-description">{p.p2}</p>}
            </div>
            <div className="proj-concept-col">
              {p.p3 && <p className="proj-description">{p.p3}</p>}
            </div>
          </div>
        </section>
      )}

      {/* ── 03. АТРАКЦИИ ── */}
      {hasAttractions && (
        <section className="proj-section" style={{ background: '#fff', ...px, paddingTop: '5rem', paddingBottom: '5rem', position: 'relative' }}>
          <GridLines />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p className="proj-step-label-concept" style={{ marginBottom: '2rem' }}>03. Атракции</p>
            <div className="proj-credits-layout">
            <h2 className="proj-positioning-text" style={{ margin: 0 }}>Термальные зоны</h2>
            <div className="proj-credits-cols">
              {p.attractions.map((item, i) => {
                const { name, desc } = splitAttraction(item)
                return (
                  <div key={i} className="proj-attr-item">
                    <p className="proj-attr-name">{name}</p>
                    {desc && <p className="proj-attr-desc">{desc}</p>}
                  </div>
                )
              })}
            </div>
            </div>
          </div>
        </section>
      )}

      {/* ── GALLERY ── */}
      <ProjectGallery photos={p.photos || []} title={p.title} />

      {/* ── 05. ТЕХНОЛОГИИ ── */}
      {hasTech && (
        <section className="proj-section" style={{ background: '#fff', ...px, paddingTop: '5rem', paddingBottom: '5rem' }}>
          <p className="proj-step-label-concept" style={{ color: C.muted, marginBottom: '2rem' }}>05. ТЕХНОЛОГИИ</p>
          <div className="proj-tech-cards-grid">
            {techCards.map((card, i) => {
              const bgs = ['rgba(85,100,65,0.18)', 'rgb(181,189,154)', 'rgba(203,130,104,0.8)', 'rgb(50,54,37)']
              const dark = i === 3
              const bg = bgs[i % bgs.length]
              const tc = dark ? 'rgb(255,255,255)' : 'rgb(50,54,37)'
              const mutedTc = dark ? 'rgba(255,255,255,0.7)' : 'rgba(50,54,37,0.7)'
              return (
                <div key={i} className="proj-tech-card-new" style={{ background: bg }}>
                  <div className="proj-tech-card-top">
                    <span className="proj-tech-card-num" style={{ color: mutedTc }}>0{i + 1}.</span>
                    <p className="proj-tech-card-title" style={{ color: tc }}>{card.label}</p>
                  </div>
                  <p className="proj-tech-card-desc" style={{ color: mutedTc }}>{card.text}</p>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ── 05. РЕЗУЛЬТАТ ── */}
      <section className="proj-section" style={{ background: 'rgba(203,130,104,0.8)', ...px, paddingTop: '6rem', paddingBottom: '6rem' }}>
        <p className="proj-step-label-concept" style={{ marginBottom: '2rem' }}>05. РЕЗУЛЬТАТ</p>
        <div className="proj-concept-grid">
          {/* Левая колонка: заголовок */}
          <div className="proj-concept-left" style={{ padding: 0 }}>
            {p.p3 && <p className="proj-positioning-text proj-result-heading">{p.p3}</p>}
            {p.p3Sub && <p className="proj-description">{p.p3Sub}</p>}
          </div>
          <div aria-hidden="true" />
          {/* Правая часть: инфографика или spec list */}
          <div className="proj-concept-right" style={{ gridColumn: '3 / -1', display: 'flex', alignItems: 'flex-start' }}>
            {p.stats ? (
              <div className="proj-stats-grid" style={{ width: '100%' }}>
                {p.stats.map((s, i) => (
                  <div key={i} className="proj-stat-item">
                    <p className="proj-stat-value">{s.value}</p>
                    <p className="proj-stat-label">{s.label}</p>
                    <p className="proj-stat-desc">{s.desc}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="proj-spec-list" style={{ width: '100%' }}>
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
            )}
          </div>
        </div>
      </section>

      {/* Sentinel: карточка скрывается когда достигает конца страницы */}
      <div ref={ctaSentinelRef} aria-hidden="true" />

    </main>
  )
}
