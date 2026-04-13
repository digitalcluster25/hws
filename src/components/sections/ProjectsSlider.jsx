import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects as allProjects } from '../../data/projects'

const PROJECTS = allProjects.filter(p => p.featured)

// Паттерн повторяется каждые 5 карточек:
// [wide, normal] — ряд 1 (2+1 колонки)
// [normal, normal, normal] — ряд 2 (по 1 колонке)
function getSpan(i) {
  return (i % 5 === 0) ? 2 : 1
}

function Card({ p, span }) {
  const [hovered, setHovered] = useState(false)

  const meta = [
    p.tags?.filter(Boolean).join(', '),
    p.loc && p.loc !== '—' ? p.loc : null,
  ].filter(Boolean).join(' · ')

  return (
    <Link
      to={`/portfolio/${p.slug}`}
      className="pg-card"
      style={{ gridColumn: `span ${span}` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {p.cover
        ? <img src={p.cover} alt={p.title} className={`pg-img${hovered ? ' pg-img--zoom' : ''}`} draggable={false} />
        : <div className="pg-img pg-img--placeholder" aria-hidden="true" />
      }
      <div className="pg-overlay" />
      <div className="pg-meta">
        <p className="pg-title">{p.title}</p>
        <p className="pg-sub">
          {hovered ? 'Показать проект ——' : (meta || 'Показать проект ——')}
        </p>
      </div>
    </Link>
  )
}

export default function ProjectsSlider() {
  return (
    <section id="portfolio" style={{ background: '#110101', paddingBottom: '5rem', paddingLeft: 'max(1.5vw,16px)', paddingRight: 'max(1.5vw,16px)' }}>
      <div className="pg-grid" style={{ maxWidth: '1344px', margin: '0 auto' }}>
        {PROJECTS.map((p, i) => (
          <Card key={p.slug} p={p} span={getSpan(i)} />
        ))}
      </div>
    </section>
  )
}
