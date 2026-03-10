import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { projects } from '../data/projects'
import Button from '../components/ui/Button'

const C = { dark: '#323625', mid: '#A2AC89', light: '#B5BD9A', terra: '#CB8268', muted: '#6b7057' }
const px = { paddingLeft: 'max(1.5vw,16px)', paddingRight: 'max(1.5vw,16px)' }
const wrap = { maxWidth: '1344px', margin: '0 auto' }

/* ── Пробует загрузить файл, возвращает URL или null ── */
function probeImage(src) {
  return new Promise(resolve => {
    const img = new Image()
    img.onload  = () => resolve(src)
    img.onerror = () => resolve(null)
    img.src = src
  })
}

/* ── Находит файл с любым из расширений ── */
async function findFile(basePath) {
  const exts = ['jpg', 'JPG', 'jpeg', 'JPEG', 'webp', 'WEBP', 'png', 'PNG']
  for (const ext of exts) {
    const result = await probeImage(`${basePath}.${ext}`)
    if (result) return result
  }
  return null
}

/* ── Хук: загружает cover + 1,2,3... для папки ── */
function useProjectImages(folder) {
  const [cover,   setCover]   = useState(null)
  const [gallery, setGallery] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!folder) return
    setLoading(true)
    setCover(null)
    setGallery([])

    const base = `/cases/${folder}`

    async function load() {
      const coverPath = await findFile(`${base}/cover`)
      setCover(coverPath)

      const imgs = []
      for (let i = 1; i <= 40; i++) {
        const p = await findFile(`${base}/${i}`)
        if (!p) break
        imgs.push(p)
      }
      setGallery(imgs)
      setLoading(false)
    }

    load()
  }, [folder])

  return { cover, gallery, loading }
}

/* ── Серый блок-заглушка ── */
function Placeholder({ label, style = {} }) {
  return (
    <div style={{
      background: '#c8ccb8', display: 'flex', alignItems: 'flex-end',
      padding: '1.5rem', ...style
    }}>
      <span style={{ fontSize: '1.1rem', color: 'rgba(50,54,37,0.35)' }}>[{label}]</span>
    </div>
  )
}

/* ── Отдельная фотография ── */
function Img({ src, alt, style = {}, className = '' }) {
  if (!src) return <Placeholder label={alt} style={style} />
  return (
    <img
      src={src} alt={alt}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }}
      className={className}
      loading="lazy"
    />
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const idx = projects.findIndex(p => p.slug === slug)
  const p   = projects[idx]

  const { cover, gallery, loading } = useProjectImages(p?.folder)

  if (!p) return (
    <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p className="hws-body tc-subtle">Проект не найден. <Link to="/portfolio" style={{ color: C.dark }}>← Все проекты</Link></p>
    </main>
  )

  const prev = projects[idx - 1] || null
  const next = projects[idx + 1] || null

  /* Раскладка галереи:
     gallery[0]       → hero (правая половина)
     gallery[1..3]    → full-width блок
     gallery[4..6]    → 3-col grid
     gallery[7..8]    → 2-col grid
     gallery[9..]     → full-width по одному  */
  const g = gallery

  return (
    <main className="tc-dark" style={{ background: '#fff' }}>

      {/* ── HERO ── */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh', paddingTop: '5rem' }}>

        {/* Левая — тёмная, метаданные */}
        <div style={{ background: C.dark, ...px, paddingTop: '5rem', paddingBottom: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <Link to="/portfolio" className="proj-back-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" style={{ transform: 'rotate(180deg)' }}>
                <path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z"/>
              </svg>
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

        {/* Правая — cover фото */}
        <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100%' }}>
          <Img src={cover} alt={`${p.title} — обложка`} style={{ position: 'absolute', inset: 0 }} />
        </div>
      </section>

      {/* ── КОНЦЕПЦИЯ ── */}
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

      {/* ── ФОТО: первое на весь экран ── */}
      {g[0] && (
        <div style={{ height: '70vh', overflow: 'hidden' }}>
          <Img src={g[0]} alt={`${p.title} — фото 1`} style={{ height: '70vh', objectPosition: 'center' }} />
        </div>
      )}

      {/* ── 3 ФОТО ── */}
      {(g[1] || g[2] || g[3]) && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
          {[g[1], g[2], g[3]].map((src, i) => (
            <div key={i} style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
              <Img src={src} alt={`${p.title} — фото ${i + 2}`} style={{ height: '100%' }} />
            </div>
          ))}
        </div>
      )}

      {/* ── РЕЗУЛЬТАТ ── */}
      <section style={{ background: '#eef0e8', ...px, paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div style={wrap}>
          <div className="proj-desc-top">
            <p className="proj-step-label">02. РЕЗУЛЬТАТ</p>
            <h2 className="proj-result-heading">Объект работает.<br/>Цифры говорят сами.</h2>
          </div>
          <div className="proj-desc-cols" style={{ marginTop: '3rem' }}>
            <p className="proj-body-text">{p.p3}</p>
            <div className="proj-spec-list">
              {[
                ['Тип объекта', p.type],
                ['Площадь',     p.area],
                ['Период',      p.period],
                ['Локация',     p.loc],
              ].map(([label, val]) => (
                <div key={label} className="proj-spec-item">
                  <span className="proj-spec-label">{label}</span>
                  <span className="proj-spec-val">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2 ФОТО ── */}
      {(g[4] || g[5]) && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
          {[g[4], g[5]].map((src, i) => (
            <div key={i} style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
              <Img src={src} alt={`${p.title} — фото ${i + 5}`} style={{ height: '100%' }} />
            </div>
          ))}
        </div>
      )}

      {/* ── ОСТАВШИЕСЯ ФОТО (6+): чередуем full-width и пары ── */}
      {g.length > 6 && (
        <div>
          {g.slice(6).map((src, i) => {
            if (i % 3 === 0) {
              return (
                <div key={i} style={{ height: '60vh', overflow: 'hidden' }}>
                  <Img src={src} alt={`${p.title} — фото ${i + 7}`} style={{ height: '60vh' }} />
                </div>
              )
            }
            if (i % 3 === 1 && g[i + 7]) {
              return (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                  <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                    <Img src={src} alt={`${p.title} — фото ${i + 7}`} style={{ height: '100%' }} />
                  </div>
                  <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                    <Img src={g[i + 7]} alt={`${p.title} — фото ${i + 8}`} style={{ height: '100%' }} />
                  </div>
                </div>
              )
            }
            if (i % 3 === 2) return null
            return (
              <div key={i} style={{ height: '60vh', overflow: 'hidden' }}>
                <Img src={src} alt={`${p.title} — фото ${i + 7}`} style={{ height: '60vh' }} />
              </div>
            )
          })}
        </div>
      )}

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
