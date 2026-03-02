import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const C = { dark:'#323625', mid:'#A2AC89', light:'#B5BD9A', terra:'#CB8268', muted:'#6b7057', subtle:'rgba(50,54,37,0.55)' }
const wrap = { maxWidth: '1344px', margin: '0 auto' }
const sec = (x={}) => ({ paddingLeft: 'max(1.5vw,16px)', paddingRight: 'max(1.5vw,16px)', ...x })
const label = { fontSize: '13.4px', fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.mid }

const projects = [
  { title:'Emily Resort', loc:'Турция', year:'2022', type:'Коммерческий СПА', text:'12 уникальных термальных зон, аутентичный хаммам, 4 сауны, купели и полноценный wellness-маршрут для отеля 5★.', tags:['Хаммам','Сауна','Термальный контур'], featured:true },
  { title:'Taze Bay Historic Baths', loc:'Баку, Азербайджан', year:'2021', type:'Реставрация хаммама', text:'Исторические бани XIX века с полной реставрацией и интеграцией современного wellness-оборудования.', tags:['Реставрация','Хаммам'] },
  { title:'Sadu Hotel & Radisson', loc:'Казахстан', year:'2023', type:'Отельный СПА', text:'Luxury СПА как конкурентное преимущество курорта. Скандинавские сауны, инфракрасные кабины, купели.', tags:['Отель','Сауна','Luxury'] },
  { title:'Private Residence', loc:'Дубай, ОАЭ', year:'2023', type:'Частная резиденция', text:'Частный хаммам и wellness-зона для виллы. Мозаика ручной работы, мраморный нагрев пола.', tags:['Частный','Хаммам','Мозаика'] },
  { title:'Mountain Wellness Club', loc:'Австрия', year:'2022', type:'Wellness-центр', text:'Альпийский wellness-клуб с 6 зонами — финская сауна, солевая комната, инфракрасная кабина.', tags:['Клуб','Сауна','Альпы'] },
  { title:'Corporate Wellness Hub', loc:'Варшава, Польша', year:'2024', type:'Корпоративный', text:'Корпоративное wellness-пространство для штаб-квартиры. 3 зоны: сауна, паровая комната, релакс.', tags:['Корпоративный','Офис'] },
]

const cont = { hidden:{}, show:{ transition:{ staggerChildren:0.08 } } }
const item = { hidden:{ opacity:0, y:32 }, show:{ opacity:1, y:0, transition:{ duration:0.5, ease:[0.16,1,0.3,1] } } }

export default function Portfolio() {
  return (
    <div className="font-sans min-h-screen" style={{ color: C.dark }}>
      <section className="pt-40 pb-24" style={{ background: C.light, ...sec() }}>
        <div style={wrap}>
          <Link to="/" className="inline-flex items-center gap-2 mb-12 text-sm hover:opacity-60 transition-opacity" style={{ color: C.muted }}>← Главная</Link>
          <p style={{ ...label, color: C.muted }} className="mb-6">Портфолио</p>
          <h1 style={{ fontSize:'clamp(2.5rem,6vw,6rem)', fontWeight:900, letterSpacing:'-0.04em', lineHeight:'0.95em', color:C.dark }}>Наши проекты</h1>
          <p className="mt-6 max-w-lg leading-relaxed" style={{ color:C.muted }}>17+ лет, 300+ проектов, 4 страны. Каждый wellness-объект — уникальный мир.</p>
        </div>
      </section>

      <section style={sec()}>
        <div style={wrap}>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-200 border border-gray-200">
            {[{num:'300+',lbl:'Проектов'},{num:'17+',lbl:'Лет опыта'},{num:'4',lbl:'Страны'},{num:'5★',lbl:'Только luxury'}].map(({num,lbl})=>(
              <div key={num} className="flex flex-col items-center gap-1 py-10 px-4">
                <span style={{ fontSize:'2rem', fontWeight:700, color:C.dark }}>{num}</span>
                <span style={{ fontSize:'13px', color:C.mid, letterSpacing:'0.08em', textTransform:'uppercase' }}>{lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background:'#fff', ...sec() }}>
        <div style={wrap}>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" variants={cont} initial="hidden" animate="show">
            {projects.map((p)=>(
              <motion.div key={p.title} variants={item} className="flex flex-col" style={{ border:'1px solid #e5e7e0' }}>
                <div className="aspect-[4/3] w-full flex items-end p-4 relative" style={{ background: p.featured ? C.dark : 'rgba(181,189,154,0.35)' }}>
                  {p.featured && <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold" style={{ background:C.terra, color:'#fff' }}>Featured</span>}
                  <span style={{ color: p.featured ? 'rgba(255,255,255,0.3)' : C.muted, fontSize:'12px' }}>[IMAGE: {p.title}]</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span style={{ fontSize:'11px', color:C.muted, letterSpacing:'0.1em', textTransform:'uppercase' }}>{p.loc} · {p.year}</span>
                    <span style={{ fontSize:'11px', color:C.mid, letterSpacing:'0.06em', textTransform:'uppercase' }}>{p.type}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{p.title}</h3>
                  <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color:C.subtle }}>{p.text}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tags.map(t=><span key={t} className="px-2 py-1 text-xs" style={{ background:'rgba(162,172,137,0.2)', color:C.muted }}>{t}</span>)}
                  </div>
                  <button className="text-sm font-medium text-left hover:opacity-60 transition-opacity" style={{ color:C.dark }}>Подробнее →</button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-28 text-center" style={{ background:C.dark, ...sec() }}>
        <div style={wrap}>
          <p style={{ ...label, color:C.mid }} className="mb-6">Начать проект</p>
          <h2 style={{ fontSize:'clamp(2rem,4vw,3.5rem)', fontWeight:800, letterSpacing:'-0.02em', color:'#fff' }} className="max-w-2xl mx-auto mb-8">Готовы создать своё wellness-направление?</h2>
          <a href="/#contact" className="inline-flex items-center justify-center font-semibold hover:opacity-80 transition-opacity"
            style={{ height:'2.75rem', padding:'0 2rem', borderRadius:'24px', background:'#fff', color:C.dark, fontSize:'0.95rem', textDecoration:'none' }}>
            Записаться на консультацию
          </a>
        </div>
      </section>
    </div>
  )
}
