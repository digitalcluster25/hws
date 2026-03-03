import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const C = { dark:'#323625', mid:'#A2AC89', light:'#B5BD9A', terra:'#CB8268', muted:'#6b7057', subtle:'rgba(50,54,37,0.55)' }
const wrap = { maxWidth:'1344px', margin:'0 auto' }
const sec  = (x={}) => ({ paddingLeft:'max(1.5vw,16px)', paddingRight:'max(1.5vw,16px)', ...x })
const lbl  = { fontSize:'13.4px', fontWeight:400, letterSpacing:'0.12em', textTransform:'uppercase' }

const services = [
  {
    category: 'Коммерческие объекты',
    title: 'СПА-комплексы для отелей и курортов',
    excerpt: 'Полноценные термальные комплексы для 5-звёздочных отелей. Проектируем wellness-маршруты, которые повышают RevPAR и делают объект точкой притяжения гостей.',
    tags: ['Отели', 'Курорты', 'Wellness'],
    accent: C.dark,
  },
  {
    category: 'Хаммам и восточные бани',
    title: 'Аутентичные турецкие хаммамы',
    excerpt: 'Традиционное турецкое банное мастерство с применением исторически точных материалов — мозаика ручной укладки, мраморный göbektaşı, аутентичный нагрев пола.',
    tags: ['Хаммам', 'Мозаика', 'Турция'],
    accent: C.terra,
  },
  {
    category: 'Скандинавские бани',
    title: 'Финские сауны и термальные зоны',
    excerpt: 'Скандинавские сауны, паровые комнаты, ледяные купели и бассейны для погружения — разрабатываем как целостные wellness-экосистемы с маршрутом горячо-холодно.',
    tags: ['Сауна', 'Купели', 'Скандинавия'],
    accent: C.mid,
  },
  {
    category: 'Частные проекты',
    title: 'Wellness-зоны для частных резиденций',
    excerpt: 'Камерные хаммамы, домашние сауны и SPA-комнаты для частных вилл и резиденций. Каждый проект создаётся по индивидуальному заказу без компромиссов.',
    tags: ['Частный', 'Villa', 'Bespoke'],
    accent: C.muted,
  },
  {
    category: 'Под ключ',
    title: 'Строительство и монтаж под ключ',
    excerpt: 'Единый подрядчик от маркетингового исследования до открытия объекта. Управление проектом, европейские материалы, соблюдение сроков и послепродажная поддержка.',
    tags: ['Turnkey', 'Управление', 'Монтаж'],
    accent: C.dark,
  },
  {
    category: 'Консалтинг',
    title: 'Дизайн, концепция и консалтинг',
    excerpt: 'Конкурентный анализ, позиционирование wellness-направления, обоснование ROI, 3D-визуализация и термальный маршрут — до начала строительства.',
    tags: ['Концепция', 'ROI', '3D'],
    accent: C.terra,
  },
]

const cont = { hidden:{}, show:{ transition:{ staggerChildren:0.09 } } }
const item = { hidden:{ opacity:0, y:40 }, show:{ opacity:1, y:0, transition:{ duration:0.55, ease:[0.16,1,0.3,1] } } }

export default function Services() {
  return (
    <div className="font-sans min-h-screen" style={{ color:C.dark }}>

      {/* HERO */}
      <section className="pt-40 pb-20" style={{ background:C.dark, ...sec() }}>
        <div style={wrap}>
          <Link to="/" className="inline-flex items-center gap-2 mb-10 text-sm hover:opacity-60 transition-opacity" style={{ color:'rgba(255,255,255,0.45)', textDecoration:'none' }}>← Главная</Link>
          <p style={{ ...lbl, color:C.mid }} className="mb-6">Услуги</p>
          <h1 style={{ fontSize:'clamp(2.5rem,6vw,6rem)', fontWeight:900, letterSpacing:'-0.04em', lineHeight:'0.95em', color:'#fff' }}>
            Что мы строим
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed" style={{ color:'rgba(255,255,255,0.55)', fontSize:'1.05rem' }}>
            17 лет специализации — от аутентичных хаммамов до масштабных термальных комплексов для luxury-отелей.
          </p>
        </div>
      </section>

      {/* GRID — blog tile style */}
      <section className="py-20" style={{ background:'#f8f8f5', ...sec() }}>
        <div style={wrap}>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={cont} initial="hidden" animate="show"
          >
            {services.map((s, i) => (
              <motion.article
                key={s.title}
                variants={item}
                className="group flex flex-col bg-white cursor-pointer"
                style={{ boxShadow:'0 2px 0 0 #e5e7e0' }}
              >
                {/* Image area */}
                <div className="relative overflow-hidden" style={{ aspectRatio:'16/10', background: i % 3 === 0 ? C.dark : i % 3 === 1 ? C.light : '#e8ebe3' }}>
                  {/* Category badge */}
                  <div className="absolute top-5 left-5">
                    <span style={{ ...lbl, fontSize:'11px', color: i % 3 === 0 ? C.mid : C.muted, background: i % 3 === 0 ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)', padding:'4px 10px', letterSpacing:'0.1em' }}>
                      {s.category}
                    </span>
                  </div>
                  {/* Image placeholder */}
                  <span className="absolute bottom-4 left-5 text-xs" style={{ color: i % 3 === 0 ? 'rgba(255,255,255,0.25)' : C.muted }}>
                    [IMAGE: {s.title}]
                  </span>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100" style={{ background:'rgba(50,54,37,0.15)' }}/>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-7">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {s.tags.map(t => (
                      <span key={t} style={{ fontSize:'11px', color:C.muted, letterSpacing:'0.06em', textTransform:'uppercase' }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-semibold mb-3 leading-snug" style={{ fontSize:'1.2rem', color:C.dark }}>
                    {s.title}
                  </h2>
                  <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color:C.subtle }}>
                    {s.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium transition-all duration-300 group-hover:gap-3" style={{ color:C.dark }}>
                    <span>Подробнее</span>
                    <span style={{ transition:'transform 0.3s ease' }} className="group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center" style={{ background:C.dark, ...sec() }}>
        <div style={wrap}>
          <p style={{ ...lbl, color:C.mid }} className="mb-6">Начать проект</p>
          <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,3rem)', fontWeight:800, letterSpacing:'-0.02em', color:'#fff' }} className="max-w-2xl mx-auto mb-8">
            Обсудим ваш wellness-объект?
          </h2>
          <p className="max-w-lg mx-auto mb-10 text-sm leading-relaxed" style={{ color:'rgba(255,255,255,0.5)' }}>
            Бесплатная консультация — анализ вашего проекта, предварительная концепция и оценка бюджета.
          </p>
          <a href="/#contact"
            className="inline-flex items-center justify-center font-semibold hover:opacity-80 transition-opacity"
            style={{ height:'2.75rem', padding:'0 2rem', borderRadius:'24px', background:'#fff', color:C.dark, fontSize:'0.95rem', textDecoration:'none' }}>
            Записаться на консультацию
          </a>
        </div>
      </section>

    </div>
  )
}
