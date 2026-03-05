import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'

const C = { dark:'#323625', mid:'#A2AC89', light:'#B5BD9A', terra:'#CB8268', muted:'#6b7057' }
const wrap = { maxWidth:'1344px', margin:'0 auto' }
const px   = { paddingLeft:'max(1.5vw,16px)', paddingRight:'max(1.5vw,16px)' }

const services = [
  { category:'Коммерческие объекты',    title:'СПА-комплексы для отелей и курортов',     excerpt:'Полноценные термальные комплексы для 5-звёздочных отелей. Проектируем wellness-маршруты, которые повышают RevPAR и делают объект точкой притяжения гостей.', tags:['Отели','Курорты','Wellness'], bg: C.dark },
  { category:'Хаммам и восточные бани', title:'Аутентичные турецкие хаммамы',           excerpt:'Традиционное турецкое банное мастерство с применением исторически точных материалов — мозаика ручной укладки, мраморный göbektaşı, аутентичный нагрев пола.', tags:['Хаммам','Мозаика','Турция'], bg: C.light },
  { category:'Скандинавские бани',      title:'Финские сауны и термальные зоны',         excerpt:'Скандинавские сауны, паровые комнаты, ледяные купели и бассейны для погружения — разрабатываем как целостные wellness-экосистемы с маршрутом горячо-холодно.', tags:['Сауна','Купели','Скандинавия'], bg: '#e8ebe3' },
  { category:'Частные проекты',         title:'Wellness-зоны для частных резиденций',    excerpt:'Камерные хаммамы, домашние сауны и SPA-комнаты для частных вилл и резиденций. Каждый проект создаётся по индивидуальному заказу без компромиссов.', tags:['Частный','Villa','Bespoke'], bg: C.dark },
  { category:'Под ключ',                title:'Строительство и монтаж под ключ',          excerpt:'Единый подрядчик от маркетингового исследования до открытия объекта. Управление проектом, европейские материалы, соблюдение сроков и послепродажная поддержка.', tags:['Turnkey','Управление','Монтаж'], bg: C.light },
  { category:'Консалтинг',              title:'Дизайн, концепция и консалтинг',           excerpt:'Конкурентный анализ, позиционирование wellness-направления, обоснование ROI, 3D-визуализация и термальный маршрут — до начала строительства.', tags:['Концепция','ROI','3D'], bg: '#e8ebe3' },
]

const cont = { hidden:{}, show:{ transition:{ staggerChildren:0.09 } } }
const item = { hidden:{ opacity:0, y:40 }, show:{ opacity:1, y:0, transition:{ duration:0.55, ease:[0.16,1,0.3,1] } } }

export default function Services() {
  return (
    <main className="min-h-screen tc-dark">

      {/* HERO */}
      <section style={{ background: C.light, ...px, paddingTop:'10rem', paddingBottom:'5rem' }}>
        <div style={wrap}>
          <Link to="/" className="hws-back-link">← Главная</Link>
          <p className="hws-label hws-label-muted mb-6">Услуги</p>
          <h1 className="hws-page-h1 mb-6">Что мы строим</h1>
          <p className="hws-body tc-subtle" style={{ maxWidth:'560px' }}>
            17 лет специализации — от аутентичных хаммамов до масштабных термальных комплексов для luxury-отелей.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section style={{ background:'#f8f8f5', ...px, paddingTop:'5rem', paddingBottom:'5rem' }}>
        <div style={wrap}>
          <motion.div className="flex flex-col gap-8" variants={cont} initial="hidden" animate="show">
            {services.map((s, i) => (
              <motion.article
                key={s.title}
                variants={item}
                className="group flex flex-col md:flex-row bg-white cursor-pointer"
                style={{ boxShadow:'0 2px 0 0 #e5e7e0' }}
              >
                {/* Image */}
                <div className="relative overflow-hidden shrink-0" style={{ width:'100%', maxWidth:'460px', minHeight:'300px', background: s.bg }}>
                  <div className="absolute top-5 left-5">
                    <span className={`service-cat${i % 3 === 0 ? ' tc-mid' : ' tc-muted'}`}
                      style={{ background: i % 3 === 0 ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)' }}>
                      {s.category}
                    </span>
                  </div>
                  <span className="absolute bottom-4 left-5 img-note img-note-light"
                    style={{ color: i % 3 === 0 ? 'rgba(255,255,255,0.25)' : C.muted }}>
                    [IMAGE: {s.title}]
                  </span>
                  <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100" style={{ background:'rgba(50,54,37,0.12)' }}/>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-8 md:p-12 justify-center">
                  <div className="flex flex-wrap gap-3 mb-5">
                    {s.tags.map(t => <span key={t} className="service-tag">#{t}</span>)}
                  </div>
                  <h2 className="hws-card-title tc-dark mb-4">{s.title}</h2>
                  <p className="hws-small tc-subtle mb-8" style={{ maxWidth:'480px' }}>{s.excerpt}</p>
                  <div className="flex items-center gap-2 hws-small font-medium tc-dark transition-all duration-300 group-hover:gap-3">
                    <span>Подробнее</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center" style={{ background: C.dark, ...px }}>
        <div style={wrap}>
          <p className="hws-label mb-6">Начать проект</p>
          <h2 className="hws-cta-h2 tc-white max-w-2xl mx-auto mb-8">Обсудим ваш wellness-объект?</h2>
          <p className="hws-small tc-w50 max-w-lg mx-auto mb-10">
            Бесплатная консультация — анализ вашего проекта, предварительная концепция и оценка бюджета.
          </p>
          <Button href="/#contact" variant="filled-light" shadow={false}>Записаться на консультацию</Button>
        </div>
      </section>

    </main>
  )
}
