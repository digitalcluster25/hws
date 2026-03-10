import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const C = { dark:'#323625', mid:'#A2AC89', light:'#B5BD9A', terra:'#CB8268', muted:'#6b7057' }
const wrap = { maxWidth:'1344px', margin:'0 auto' }
const px   = { paddingLeft:'max(1.5vw,16px)', paddingRight:'max(1.5vw,16px)' }

const projects = [
  {
    title: 'Emily Resort',
    loc: 'Турция', year: '2022',
    type: 'Коммерческий СПА',
    tags: ['Хаммам', 'Сауна', 'Термальный контур'],
    desc: '12 уникальных термальных зон, аутентичный хаммам, 4 сауны, купели и полноценный wellness-маршрут для отеля 5★.',
    img: null,
  },
  {
    title: 'Taze Bay Historic Baths',
    loc: 'Баку, Азербайджан', year: '2021',
    type: 'Реставрация хаммама',
    tags: ['Реставрация', 'Хаммам'],
    desc: 'Исторические бани XIX века с полной реставрацией и интеграцией современного wellness-оборудования.',
    img: null,
  },
  {
    title: 'Sadu Hotel & Radisson',
    loc: 'Казахстан', year: '2023',
    type: 'Отельный СПА',
    tags: ['Отель', 'Сауна', 'Luxury'],
    desc: 'Luxury СПА как конкурентное преимущество курорта. Скандинавские сауны, инфракрасные кабины, купели.',
    img: null,
  },
  {
    title: 'Private Residence Dubai',
    loc: 'Дубай, ОАЭ', year: '2023',
    type: 'Частная резиденция',
    tags: ['Частный', 'Хаммам', 'Мозаика'],
    desc: 'Частный хаммам и wellness-зона для виллы. Мозаика ручной работы, мраморный нагрев пола.',
    img: null,
  },
  {
    title: 'Mountain Wellness Club',
    loc: 'Австрия', year: '2022',
    type: 'Wellness-центр',
    tags: ['Клуб', 'Сауна', 'Альпы'],
    desc: 'Альпийский wellness-клуб с 6 зонами — финская сауна, солевая комната, инфракрасная кабина.',
    img: null,
  },
  {
    title: 'Corporate Wellness Hub',
    loc: 'Варшава, Польша', year: '2024',
    type: 'Корпоративный',
    tags: ['Корпоративный', 'Офис'],
    desc: 'Корпоративное wellness-пространство для штаб-квартиры. 3 зоны: сауна, паровая комната, релакс.',
    img: null,
  },
]

function ProjectRow({ p, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <li
      className="port-row"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`port-row-inner ${hovered ? 'is-hovered' : ''}`}>

        {/* Фото — появляется при ховере */}
        <div className="port-img-col">
          <div className="port-img-wrap">
            <div className="port-img-inner">
              {p.img
                ? <img src={p.img} alt={p.title} className="port-img" />
                : <span className="port-img-label">[IMAGE: {p.title}]</span>
              }
            </div>
          </div>
        </div>

        {/* Контент */}
        <div className="port-content-col">
          <div className="port-meta-row">
            <span className="port-meta">{p.loc} · {p.year}</span>
            <a href="#" className="port-arrow" aria-label={`Открыть ${p.title}`}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"><path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z"></path></svg>
  </a>
          </div>

          <h3 className="port-title">{p.title}</h3>

          <div className="port-tags-row">
            {p.tags.map(t => (
              <span key={t} className="port-tag">{t}</span>
            ))}
          </div>
        </div>

      </div>
    </li>
  )
}

export default function Portfolio() {
  return (
    <main className="min-h-screen tc-dark" style={{ background: '#f9f9f6' }}>

      {/* HERO */}
      <section style={{ background: C.light, ...px, paddingTop: '10rem', paddingBottom: '6rem' }}>
        <div style={wrap}>
          <h1 className="hws-page-h1 mb-6">Наши проекты</h1>
          <p className="hws-body tc-muted" style={{ maxWidth: '520px' }}>
            17+ лет, 300+ проектов, 4 страны. Каждый wellness-объект — уникальный мир.
          </p>
        </div>
      </section>

      {/* LIST */}
      <section style={{ background: '#fff', ...px, paddingTop: '0', paddingBottom: '0' }}>
        <div style={wrap}>

          {/* Разделитель */}
          <div className="port-divider" />

          {/* Строки проектов */}
          <ul className="port-list">
            {projects.map((p, i) => (
              <ProjectRow key={p.title} p={p} index={i} />
            ))}
          </ul>

        </div>
      </section>

      {/* CTA */}
      <section className="py-28 text-center" style={{ background: C.dark, ...px }}>
        <div style={wrap}>
          <p className="hws-label mb-6">Начать проект</p>
          <h2 className="hws-cta-h2 tc-white max-w-2xl mx-auto mb-8">
            Готовы создать своё wellness-направление?
          </h2>
          <Button href="/#contact" variant="filled-light" shadow={false}>
            Записаться на консультацию
          </Button>
        </div>
      </section>

    </main>
  )
}
