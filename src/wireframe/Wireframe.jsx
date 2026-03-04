import Button from '../components/ui/Button'
import ProjectsSlider from '../components/sections/ProjectsSlider'

// ── данные ────────────────────────────────────────────────────────
const expertise = [
  { title: 'Коммерческие СПА и Wellness', text: 'Полноценные термальные комплексы для отелей и курортов. Сауна, хаммам, ледяные купели — всё как единое wellness-путешествие.' },
  { title: 'Аутентичные хаммамы', text: 'Традиционное турецкое банное мастерство, адаптированное для современных luxury-объектов. Каждый хаммам строится с применением исторически точных материалов и методов.' },
  { title: 'Термальные зоны и бани', text: 'Скандинавские сауны, паровые комнаты, ледяные купели и бассейны для погружения, разработанные как целостные wellness-экосистемы.' },
]
const steps = [
  { num:'01', title:'Исследование рынка и позиционирование', items:['Конкурентный анализ','Позиционирование wellness','Обоснование ROI'] },
  { num:'02', title:'Дизайн и разработка концепции', items:['Дизайн-концепция','Термальный маршрут','3D-визуализация'] },
  { num:'03', title:'Строительство и монтаж', items:['Управление проектом','Европейские материалы','Соблюдение сроков'] },
  { num:'04', title:'Запуск и операционная поддержка', items:['Открытие объекта','Обучение команды','Послепродажная поддержка'] },
]
const materials = [
  { title: 'Природный камень и талькохлорид', text: 'Материалы для долговечной красоты с терапевтическими свойствами.', img: '[IMAGE: камень]' },
  { title: 'Термообработанная древесина', text: 'Скандинавский термодерево для саун — устойчиво к влаге и теплу.', img: '[IMAGE: дерево]' },
  { title: 'Традиционная мозаика', text: 'Аутентичные плитки хаммама, поставляемые от проверенных турецких мастеров.', img: '[IMAGE: мозаика]' },
]
const segments = [
  { title: 'Luxury-отели и курорты', text: 'Создание wellness-направлений, которые повышают RevPAR и отличают ваш объект.' },
  { title: 'Частные резиденции', text: 'Частные хаммамы, сауны и wellness-пространства, созданные по вашим стандартам.' },
  { title: 'Wellness-центры', text: 'Оздоровительные центры, разработанные для максимальной терапевтической пользы.' },
  { title: 'Корпоративные объекты', text: 'Wellness-решения для корпоративных клиентов и hospitality-групп.' },
]
const advantages = [
  '17+ лет специализированного опыта в wellness-строительстве',
  'Единственный поставщик от концепции до открытия',
  'Европейские строительные стандарты и материалы',
  'Работа в нескольких странах с местными командами',
  'Исследование рынка и ROI-аналитика включены',
  'Послепродажная поддержка и операционная помощь',
  'Аутентичное знание хаммама и скандинавских банных традиций',
  'Портфолио 5-звёздочных проектов в 4 странах',
]
const pins = [
  { label:'Турция',       sub:'Emily Resort',    x:'51%', y:'42%' },
  { label:'Азербайджан',  sub:'Taze Bay Baths',  x:'56%', y:'38%' },
  { label:'Казахстан',    sub:'Sadu Hotel',      x:'63%', y:'33%' },
  { label:'США',          sub:'Скоро',           x:'18%', y:'40%' },
]
const testimonials = [
  { quote:'СПА в Emily Resort стал нашей визитной карточкой. Гости специально бронируют у нас ради термальных впечатлений — 12 уникальных саун, аутентичный хаммам и wellness-путешествие, которое выделяет нас на рынке.', author:'Управление Emily Resort' },
  { quote:'От концепции до завершения Home Wood Spa превзошли ожидания. Их внимание к деталям, качество материалов и понимание аутентичного строительства хаммамов не имеют аналогов.', author:'Taze Bay Historic Baths, Баку' },
  { quote:'Они не просто построили СПА — они создали wellness-направление. Термальный контур, премиальная отделка и продуманный дизайн подняли всю нашу собственность на новый уровень.', author:'Sadu Hotel & Radisson Individuals' },
]

const C = {
  dark: '#323625', mid: '#A2AC89', light: '#B5BD9A',
  terra: '#CB8268', muted: '#6b7057',
}
const wrap = { maxWidth: '1344px', margin: '0 auto' }
const px   = { paddingLeft: 'max(1.5vw, 16px)', paddingRight: 'max(1.5vw, 16px)' }

export default function Wireframe() {
  return (
    <div className="min-h-screen tc-dark">

      {/* ── 1. HERO ── */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center py-28 text-center"
        style={{ background: C.light, ...px }}>
        <div style={wrap}>
          <p className="hws-label hws-label-muted mb-6">Home Wood Spa</p>
          <h1 className="hws-h1 mb-6">Строительство<br />СПА и<br />Wellness</h1>
          <p className="hws-body tc-muted max-w-xl mx-auto mb-10">
            От аутентичных турецких хаммамов до скандинавских саун — 17 лет европейского мастерства в luxury-отелях и курортах по всему миру.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button href="#contact" variant="filled" shadow={false}>Записаться на консультацию</Button>
            <Button href="#portfolio" variant="ghost" shadow={false}>Посмотреть проекты →</Button>
          </div>
          <p className="hws-small tc-muted" style={{ letterSpacing: '0.05em' }}>
            Нам доверяют 5-звёздочные курорты в Европе, Центральной Азии и за их пределами
          </p>
        </div>
      </section>

      {/* ── 2. SOCIAL PROOF ── */}
      <section style={px}>
        <div style={wrap}>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-200 border border-gray-200">
            {[{num:'17+',label:'лет опыта'},{num:'300+',label:'проектов'},{num:'4',label:'страны'},{num:'Под ключ',label:'доставка'}].map(({num,label}) => (
              <div key={num} className="flex flex-col items-center gap-1 py-10 px-4">
                <span className="stat-num">{num}</span>
                <span className="stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. КТО МЫ ── */}
      <section id="about" className="py-24" style={{ background: C.dark, ...px }}>
        <div style={wrap}>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="hws-label mb-6">О компании</p>
              <h2 className="hws-h2 tc-white mb-8">Создаём wellness-пространства, которые трансформируют</h2>
              <p className="hws-body tc-w65 mb-4">
                Почти два десятилетия Home Wood Spa проектирует и строит премиальные wellness-пространства. От масштабных курортных СПА до камерных частных хаммамов — мы соединяем древние банные традиции с современным дизайном и технической точностью.
              </p>
              <p className="hws-body tc-w65 mb-8">
                Каждый проект начинается с вашего видения и заканчивается пространством, которое запомнят ваши гости.
              </p>
              <Button variant="outlined-light" shadow={false}>Узнать о нас →</Button>
            </div>
            <div className="aspect-[4/3] rounded flex items-end p-4" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <span className="img-note img-note-dark">[IMAGE: Emily Resort главный СПА-зал]</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. ЭКСПЕРТИЗА ── */}
      <section id="services" className="py-24" style={{ background: '#fff', ...px }}>
        <div style={wrap}>
          <p className="hws-label mb-6">Экспертиза</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <h2 className="hws-h2" style={{ maxWidth: '28rem' }}>Полноценные wellness-пространства</h2>
            <p className="hws-small tc-subtle max-w-sm">Мы не строим отдельные сауны — мы создаём полные термальные путешествия.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-px" style={{ background: '#e5e7e0' }}>
            {expertise.map(({title,text}) => (
              <div key={title} className="p-8" style={{ background: '#fff' }}>
                <div className="h-10 w-10 rounded mb-6" style={{ background: C.light }} />
                <h3 className="hws-h3 tc-dark mb-3">{title}</h3>
                <p className="hws-small tc-subtle">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button href="#services" variant="outlined" shadow={false}>Все услуги →</Button>
          </div>
        </div>
      </section>

      {/* ── 5. ПРОЕКТЫ — slider ── */}
      <section id="portfolio" className="py-24" style={{ background: C.light }}>
        <div style={wrap} className="hws-px">
          <p className="hws-label hws-label-muted mb-6">Портфолио</p>
          <h2 className="hws-h2 tc-dark mb-16" style={{ maxWidth: '30rem' }}>
            Wellness-пространства,<br/>которые задают стандарт
          </h2>
        </div>
        <ProjectsSlider />
      </section>

      {/* ── 6. ПОД КЛЮЧ ── */}
      <section id="process" className="py-24" style={{ background: '#fff', ...px }}>
        <div style={wrap}>
          <p className="hws-label mb-6">Процесс</p>
          <h2 className="hws-h2 mb-6" style={{ maxWidth: '32rem' }}>От видения до дня открытия</h2>
          <p className="hws-small tc-subtle mb-16 max-w-xl">Наш подход под ключ — одна команда от маркетингового исследования до открытия.</p>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map(({num,title,items}) => (
              <div key={num} className="p-6 border" style={{ borderColor: '#e5e7e0' }}>
                <div className="process-num">{num}</div>
                <h3 className="hws-small font-semibold tc-dark mb-4">{title}</h3>
                <ul className="space-y-2">
                  {items.map(item => (
                    <li key={item} className="flex items-start gap-2 hws-small tc-subtle">
                      <span style={{ color: C.mid }}>—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button href="#process" variant="outlined" shadow={false}>Наш процесс →</Button>
          </div>
        </div>
      </section>

      {/* ── 7. МАТЕРИАЛЫ ── */}
      <section className="py-24" style={{ background: C.dark, ...px }}>
        <div style={wrap}>
          <p className="hws-label mb-6">Материалы</p>
          <h2 className="hws-h2 tc-white mb-16">Построено на века, создано для вдохновения</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {materials.map(({title,text,img}) => (
              <div key={title}>
                <div className="aspect-square w-full flex items-end p-3 mb-4" style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '2px' }}>
                  <span className="img-note img-note-dark">{img}</span>
                </div>
                <h3 className="hws-h3 tc-white mb-2">{title}</h3>
                <p className="hws-small tc-w55">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. ДЛЯ КОГО ── */}
      <section className="py-24" style={{ background: '#fff', ...px }}>
        <div style={wrap}>
          <p className="hws-label mb-6">Клиенты</p>
          <h2 className="hws-h2 mb-16" style={{ maxWidth: '30rem' }}>Нам доверяют ведущие wellness-направления</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {segments.map(({title,text}) => (
              <div key={title} className="flex gap-6 items-start p-8 border" style={{ borderColor: '#e5e7e0' }}>
                <div className="h-12 w-12 rounded shrink-0" style={{ background: C.light }} />
                <div>
                  <h3 className="hws-h3 tc-dark mb-2">{title}</h3>
                  <p className="hws-small tc-subtle">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. ПОЧЕМУ HWS ── */}
      <section className="py-24" style={{ background: C.light, ...px }}>
        <div style={wrap}>
          <p className="hws-label hws-label-muted mb-6">Преимущества</p>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <h2 className="hws-h2 tc-dark">Европейская экспертиза, мировые стандарты</h2>
            <div className="grid grid-cols-1 gap-4">
              {advantages.map(item => (
                <div key={item} className="flex items-start gap-3">
                  <span className="hws-advantage-check">✓</span>
                  <p className="hws-small tc-dark">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. КАРТА ── */}
      <section className="py-24" style={{ background: '#fff', ...px }}>
        <div style={wrap}>
          <p className="hws-label mb-6">География</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <h2 className="hws-h2" style={{ maxWidth: '30rem' }}>Создаём wellness-превосходство по всему миру</h2>
            <p className="hws-small tc-subtle max-w-xs">Международное портфолио: Европа, Кавказ, Центральная Азия, выход на рынок США.</p>
          </div>
          <div className="w-full aspect-[16/7] relative flex items-center justify-center" style={{ background: '#f0f0eb', borderRadius: '2px' }}>
            <span className="img-note img-note-light">[MAP: интерактивная карта]</span>
            {pins.map(({label,sub,x,y}) => (
              <div key={label} className="absolute flex flex-col items-center" style={{ left: x, top: y }}>
                <div className="h-3 w-3 rounded-full" style={{ background: C.terra }} />
                <span className="map-pin-label">{label}</span>
                <span className="map-pin-sub">{sub}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full" style={{ background: C.mid }} />
            <span className="hws-small tc-muted">Расширение: Соединённые Штаты</span>
          </div>
        </div>
      </section>

      {/* ── 11. ОТЗЫВЫ ── */}
      <section className="py-24" style={{ background: C.dark, ...px }}>
        <div style={wrap}>
          <p className="hws-label mb-6">Отзывы</p>
          <h2 className="hws-h2 tc-white mb-16">Что говорят наши клиенты</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({quote,author}) => (
              <div key={author} className="p-8" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                <span className="hws-quote-mark">"</span>
                <p className="hws-small tc-w65 mb-6">{quote}</p>
                <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <span className="hws-small font-semibold tc-mid">— {author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. ФИНАЛЬНЫЙ CTA ── */}
      <section id="contact" className="py-28" style={{ background: C.dark, ...px }}>
        <div className="text-center" style={wrap}>
          <p className="hws-label mb-6">Начать проект</p>
          <h2 className="hws-cta-h2 tc-white max-w-2xl mx-auto mb-8">Готовы создать своё wellness-направление?</h2>
          <p className="hws-small tc-w55 max-w-xl mx-auto mb-12">
            Планируете ли вы luxury СПА для отеля, аутентичный хаммам или полноценный wellness-комплекс — мы привносим экспертизу, чтобы сделать его исключительным.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="#contact" variant="filled-light" shadow={false}>Записаться на бесплатную консультацию</Button>
            <Button href="#portfolio" variant="outlined-light" shadow={false}>Скачать портфолио [PDF]</Button>
          </div>
        </div>
      </section>

      {/* ── ФУТЕР ── */}
      <footer className="py-16 border-t" style={{ borderColor: '#e5e7e0', ...px }}>
        <div style={wrap}>
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <span className="footer-brand tc-dark">Home Wood Spa</span>
              <p className="hws-small tc-subtle mb-6">
                Более 17 лет специализируемся на проектировании, строительстве и управлении премиальными wellness-комплексами.
              </p>
              <div className="space-y-1">
                {['Homewoodspa@gmail.com','Homewoodspa.com','+1 (678) 520-9556 — Igor Kostin','+1 (470) 760-9323 — Eugene Voit'].map(t => (
                  <p key={t} className="footer-contact-line">{t}</p>
                ))}
              </div>
            </div>
            <div>
              <span className="footer-section-title">Услуги</span>
              <ul className="space-y-1">
                {['Коммерческие СПА','Luxury хаммамы','Традиционные сауны','Термальные впечатления','Строительство под ключ','Дизайн и консалтинг'].map(i => (
                  <li key={i} className="footer-nav-item">{i}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="footer-section-title">Проекты</span>
              <ul className="space-y-1">
                {['Отели и курорты','Wellness-центры','Частные резиденции','Корпоративные объекты'].map(i => (
                  <li key={i} className="footer-nav-item">{i}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="footer-section-title">Портфолио</span>
              <ul className="space-y-1">
                {['Европа','Центральная Азия','Северная Америка (скоро)'].map(i => (
                  <li key={i} className="footer-nav-item">{i}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between gap-4" style={{ borderColor: '#e5e7e0' }}>
            <span className="footer-copy">© 2024 Home Wood Spa. Все права защищены.</span>
            <span className="footer-copy">Политика конфиденциальности · Условия использования</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
