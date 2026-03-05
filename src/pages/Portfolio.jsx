import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const C = { dark:'#323625', mid:'#A2AC89', light:'#B5BD9A', terra:'#CB8268', muted:'#6b7057' }
const wrap = { maxWidth:'1344px', margin:'0 auto' }
const px   = { paddingLeft:'max(1.5vw,16px)', paddingRight:'max(1.5vw,16px)' }

const projects = [
  { title:'Emily Resort',         loc:'Турция',            year:'2022', type:'Коммерческий СПА',   text:'12 уникальных термальных зон, аутентичный хаммам, 4 сауны, купели и полноценный wellness-маршрут для отеля 5★.', tags:['Хаммам','Сауна','Термальный контур'], featured:true },
  { title:'Taze Bay Historic Baths', loc:'Баку, Азербайджан', year:'2021', type:'Реставрация хаммама', text:'Исторические бани XIX века с полной реставрацией и интеграцией современного wellness-оборудования.', tags:['Реставрация','Хаммам'] },
  { title:'Sadu Hotel & Radisson', loc:'Казахстан',         year:'2023', type:'Отельный СПА',       text:'Luxury СПА как конкурентное преимущество курорта. Скандинавские сауны, инфракрасные кабины, купели.', tags:['Отель','Сауна','Luxury'] },
  { title:'Private Residence',    loc:'Дубай, ОАЭ',        year:'2023', type:'Частная резиденция', text:'Частный хаммам и wellness-зона для виллы. Мозаика ручной работы, мраморный нагрев пола.', tags:['Частный','Хаммам','Мозаика'] },
  { title:'Mountain Wellness Club', loc:'Австрия',          year:'2022', type:'Wellness-центр',     text:'Альпийский wellness-клуб с 6 зонами — финская сауна, солевая комната, инфракрасная кабина.', tags:['Клуб','Сауна','Альпы'] },
  { title:'Corporate Wellness Hub', loc:'Варшава, Польша',  year:'2024', type:'Корпоративный',     text:'Корпоративное wellness-пространство для штаб-квартиры. 3 зоны: сауна, паровая комната, релакс.', tags:['Корпоративный','Офис'] },
]

const cont = { hidden:{}, show:{ transition:{ staggerChildren:0.08 } } }
const item = { hidden:{ opacity:0, y:32 }, show:{ opacity:1, y:0, transition:{ duration:0.5, ease:[0.16,1,0.3,1] } } }

export default function Portfolio() {
  return (
    <main className="min-h-screen tc-dark">

      {/* HERO */}
      <section style={{ background: C.light, ...px, paddingTop:'10rem', paddingBottom:'6rem' }}>
        <div style={wrap}>
          <Link to="/" className="hws-back-link">← Главная</Link>
          <p className="hws-label hws-label-muted mb-6">Портфолио</p>
          <h1 className="hws-page-h1 mb-6">Наши проекты</h1>
          <p className="hws-body tc-muted" style={{ maxWidth:'520px' }}>17+ лет, 300+ проектов, 4 страны. Каждый wellness-объект — уникальный мир.</p>
        </div>
      </section>

      {/* STATS */}
      <section style={px}>
        <div style={wrap}>
          <dl className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-200 border border-gray-200">
            {[{num:'300+',lb:'Проектов'},{num:'17+',lb:'Лет опыта'},{num:'4',lb:'Страны'},{num:'5★',lb:'Только luxury'}].map(({num,lb}) => (
              <div key={num} className="flex flex-col items-center gap-1 py-10 px-4">
                <dd className="stat-num">{num}</dd>
                <dt className="stat-label">{lb}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* GRID */}
      <section className="py-24" style={{ background:'#fff', ...px }}>
        <div style={wrap}>
          <motion.ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0" variants={cont} initial="hidden" animate="show">
            {projects.map((p) => (
              <motion.li key={p.title} variants={item} className="flex flex-col">
                <article className="flex flex-col h-full" style={{ border:'1px solid #e5e7e0' }}>
                <div className="aspect-[4/3] w-full flex items-end p-4 relative"
                  style={{ background: p.featured ? C.dark : 'rgba(181,189,154,0.35)' }}>
                  {p.featured && <span className="featured-badge">Featured</span>}
                  <span className="img-note" style={{ color: p.featured ? 'rgba(255,255,255,0.3)' : C.muted }}>
                    [IMAGE: {p.title}]
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="portfolio-meta">{p.loc} · {p.year}</span>
                    <span className="portfolio-type">{p.type}</span>
                  </div>
                  <h3 className="hws-h3 tc-dark mb-2" style={{ fontSize:'1.125rem' }}>{p.title}</h3>
                  <p className="hws-small tc-subtle mb-4 flex-1">{p.text}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map(t => <span key={t} className="portfolio-tag">{t}</span>)}
                  </div>
                </div>
                </article>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 text-center" style={{ background: C.dark, ...px }}>
        <div style={wrap}>
          <p className="hws-label mb-6">Начать проект</p>
          <h2 className="hws-cta-h2 tc-white max-w-2xl mx-auto mb-8">Готовы создать своё wellness-направление?</h2>
          <a href="/#contact" className="portfolio-cta-btn ohio-btn" data-variant="filled-light">
            Записаться на консультацию
          </a>
        </div>
      </section>
    </main>
  )
}
