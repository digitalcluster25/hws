import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { projects as allProjects } from '../../data/projects'

const PROJECTS = allProjects.filter(p => p.featured)

function getSpan(i) {
  return (i % 5 === 0) ? 2 : 1
}

function Card({ p, span }) {
  const { t } = useTranslation('labels')
  const { t: tc } = useTranslation('content')
  const [hovered, setHovered] = useState(false)

  const translated = tc(`projects.${p.slug}`, { returnObjects: true }) || {}
  const title = translated.title || p.title
  const tags  = translated.tags  || p.tags

  const meta = [
    tags?.filter(Boolean).join(', '),
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
        ? <img src={p.cover} alt={title} className={`pg-img${hovered ? ' pg-img--zoom' : ''}`} draggable={false} />
        : <div className="pg-img pg-img--placeholder" aria-hidden="true" />
      }
      <div className="pg-overlay" />
      <div className="pg-meta">
        <p className="pg-title">{title}</p>
        <p className="pg-sub">
          {hovered ? t('project.viewProject') : (meta || t('project.viewProject'))}
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
