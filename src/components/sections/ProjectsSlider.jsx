import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects as allProjects } from '../../data/projects'

const PROJECTS = allProjects.filter(p => p.featured)

function Card({ p, wide }) {
  const [hovered, setHovered] = useState(false)

  const meta = [
    p.tags?.filter(Boolean).join(', '),
    p.loc && p.loc !== '—' ? p.loc : null,
  ].filter(Boolean).join(' · ')

  return (
    <Link
      to={`/portfolio/${p.slug}`}
      className={`pg-card${wide ? ' pg-card--wide' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={p.cover}
        alt={p.title}
        className={`pg-img${hovered ? ' pg-img--zoom' : ''}`}
        draggable={false}
      />
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
  const [a, b, c, d] = PROJECTS

  return (
    <section id="portfolio" style={{ background: '#323625', padding: '0 max(1.5vw,16px) 5rem' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>

        {/* Row 1: 3-колоночная сетка, карточка 1 занимает 2 кол, карточка 2 — 1 кол */}
        <div className="pg-row pg-row--top">
          {a && <Card p={a} wide />}
          {b && <Card p={b} />}
        </div>

        {/* Row 2: 2 равных по 1 колонке */}
        <div className="pg-row pg-row--bottom">
          {c && <Card p={c} />}
          {d && <Card p={d} />}
        </div>

      </div>
    </section>
  )
}
