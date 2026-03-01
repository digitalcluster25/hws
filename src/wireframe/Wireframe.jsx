import Button from '../components/ui/Button'

// ── цвета demo34 ──────────────────────────────────────────────────
const C = {
  dark:      '#323625',   // тёмные секции
  mid:       '#A2AC89',   // лейблы, акцент кнопок
  light:     '#B5BD9A',   // hero, светлые секции
  terra:     '#CB8268',   // терракота (акцент деталей)
  terraLt:   '#BE917A',   // терракота светлая
  text:      '#323625',
  muted:     '#6b7057',
  subtle:    'rgba(50,54,37,0.55)',
}

// ── helpers ───────────────────────────────────────────────────────
// Типографика H2 как в demo34: 3.75vw, tight
const h2Style = { fontSize: 'clamp(1.8rem, 3.75vw, 3.5rem)', lineHeight: '1.05em', letterSpacing: '-0.02em', color: 'inherit' }
// Лейблы секций: 13.4px uppercase #A2AC89
const labelStyle = { fontSize: '13.4px', fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.mid }

// Кнопки по фону секции
const btnDark = { style: { background: 'transparent', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.3)' }, shadow: false }
const btnLight = { style: { background: C.mid, color: C.dark, border: `1px solid ${C.mid}` }, shadow: false }
const btnDefault = {}

const wrap = { maxWidth: '1344px', margin: '0 auto' }
const section = (extra = {}) => ({ paddingLeft: 'max(1.5vw, 16px)', paddingRight: 'max(1.5vw, 16px)', ...extra })

// ── данные ────────────────────────────────────────────────────────
const expertise = [
  { title: 'Коммерческие СПА и Wellness', text: 'Полноценные термальные комплексы для отелей и курортов. Сауна, хаммам, ледяные купели — всё как единое wellness-путешествие.' },
  { title: 'Аутентичные хаммамы', text: 'Традиционное турецкое банное мастерство, адаптированное для современных luxury-объектов. Каждый хаммам строится с применением исторически точных материалов и методов.' },
  { title: 'Термальные зоны и бани', text: 'Скандинавские сауны, паровые комнаты, ледяные купели и бассейны для погружения, разработанные как целостные wellness-экосистемы.' },
]
const projects = [
  { title: 'Emily Resort', loc: 'Турция', text: '12 уникальных термальных зон, аутентичный хаммам' },
  { title: 'Taze Bay Historic Baths', loc: 'Баку', text: 'Исторические бани с современным wellness-оснащением' },
  { title: 'Sadu Hotel & Radisson', loc: 'Центральная Азия', text: 'Luxury СПА как конкурентное преимущество курорта' },
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

// ── КОМПОНЕНТ ─────────────────────────────────────────────────────
export default function Wireframe() {
  return (
    <div className="font-sans min-h-screen" style={{ color: C.dark }}>

      {/* ── 1. HERO · фон #B5BD9A ── */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center py-28 text-center"
        style={{ background: C.light, ...section() }}>
        <div style={wrap}>
          <p style={{ ...labelStyle, color: C.muted }} className="mb-6">Home Wood Spa</p>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8.8vw, 9rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: '0.9em',
            color: C.dark,
            marginBottom: '1.5rem',
          }}>
            Строительство<br />СПА и<br />Wellness
          </h1>
          <p className="text-lg max-w-xl mx-auto mb-10 leading-relaxed" style={{ color: C.muted }}>
            От аутентичных турецких хаммамов до скандинавских саун — 17 лет европейского мастерства в luxury-отелях и курортах по всему миру.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button href="#contact" {...btnLight}>
              Записаться на консультацию
            </Button>
            <Button href="#portfolio" variant="ghost" style={{ color: C.muted }} shadow={false}>
              Посмотреть проекты →
            </Button>
          </div>
          <p style={{ fontSize: '13px', color: C.muted, letterSpacing: '0.05em' }}>
            Нам доверяют 5-звёздочные курорты в Европе, Центральной Азии и за их пределами
          </p>
        </div>
      </section>

      {/* ── 2. SOCIAL PROOF · белый ── */}
      <section style={section()}>
        <div style={wrap}>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-200 border border-gray-200">
            {[{num:'17+',label:'лет опыта'},{num:'300+',label:'проектов'},{num:'4',label:'страны'},{num:'Под ключ',label:'доставка'}].map(({num,label}) => (
              <div key={num} className="flex flex-col items-center gap-1 py-10 px-4">
                <span style={{ fontSize: '2rem', fontWeight: 700, color: C.dark }}>{num}</span>
                <span style={{ fontSize: '13px', color: C.mid, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. КТО МЫ · #323625 тёмный ── */}
      <section id="about" className="py-24" style={{ background: C.dark, color: '#fff', ...section() }}>
        <div style={wrap}>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p style={{ ...labelStyle, color: C.mid }} className="mb-6">О компании</p>
              <h2 style={{ ...h2Style, color: '#fff' }} className="mb-8">
                Создаём wellness-пространства, которые трансформируют
              </h2>
              <p className="leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Почти два десятилетия Home Wood Spa проектирует и строит премиальные wellness-пространства. От масштабных курортных СПА до камерных частных хаммамов — мы соединяем древние банные традиции с современным дизайном и технической точностью.
              </p>
              <p className="leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Каждый проект начинается с вашего видения и заканчивается пространством, которое запомнят ваши гости.
              </p>
              <Button {...btnDark}>Узнать о нас →</Button>
            </div>
            <div className="aspect-[4/3] rounded flex items-end p-4" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>[IMAGE: Emily Resort главный СПА-зал]</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. ЭКСПЕРТИЗА · белый ── */}
      <section id="services" className="py-24" style={{ background: '#fff', ...section() }}>
        <div style={wrap}>
          <p style={labelStyle} className="mb-6">Экспертиза</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <h2 style={{ ...h2Style, maxWidth: '28rem' }}>
              Полноценные wellness-пространства
            </h2>
            <p className="max-w-sm text-sm leading-relaxed" style={{ color: C.subtle }}>
              Мы не строим отдельные сауны — мы создаём полные термальные путешествия.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-px" style={{ background: '#e5e7e0' }}>
            {expertise.map(({title,text}) => (
              <div key={title} className="p-8" style={{ background: '#fff' }}>
                <div className="h-10 w-10 rounded mb-6" style={{ background: C.light }} />
                <h3 className="font-semibold text-base mb-3">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.subtle }}>{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button href="#services" variant="outlined" shadow={false}>
              Все услуги →
            </Button>
          </div>
        </div>
      </section>

      {/* ── 5. ПРОЕКТЫ · #B5BD9A ── */}
      <section id="portfolio" className="py-24" style={{ background: C.light, ...section() }}>
        <div style={wrap}>
          <p style={{ ...labelStyle, color: C.muted }} className="mb-6">Портфолио</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <h2 style={{ ...h2Style, color: C.dark, maxWidth: '28rem' }}>
              Wellness-пространства, которые задают стандарт
            </h2>
            <Button href="#portfolio" {...btnLight}>Всё портфолио →</Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map(({title,loc,text}) => (
              <div key={title} style={{ background: 'rgba(255,255,255,0.6)', borderRadius: '2px' }}>
                <div className="aspect-[4/3] w-full flex items-end p-3" style={{ background: 'rgba(50,54,37,0.12)' }}>
                  <span style={{ color: C.muted, fontSize: '12px' }}>[IMAGE: {title}]</span>
                </div>
                <div className="p-6">
                  <p className="mb-2" style={{ fontSize: '12px', color: C.muted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{loc}</p>
                  <h3 className="font-semibold text-base mb-2">{title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: C.muted }}>{text}</p>
                  <span className="text-sm" style={{ color: C.dark, textDecoration: 'underline', cursor: 'pointer' }}>Посмотреть →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. ПОД КЛЮЧ · белый ── */}
      <section id="process" className="py-24" style={{ background: '#fff', ...section() }}>
        <div style={wrap}>
          <p style={labelStyle} className="mb-6">Процесс</p>
          <h2 style={{ ...h2Style, maxWidth: '32rem' }} className="mb-6">
            От видения до дня открытия
          </h2>
          <p className="mb-16 max-w-xl text-sm leading-relaxed" style={{ color: C.subtle }}>
            Наш подход под ключ — одна команда от маркетингового исследования до открытия.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map(({num,title,items}) => (
              <div key={num} className="p-6 border" style={{ borderColor: '#e5e7e0' }}>
                <div className="h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold mb-4"
                  style={{ background: C.dark, color: '#fff' }}>{num}</div>
                <h3 className="font-semibold text-sm mb-4">{title}</h3>
                <ul className="space-y-2">
                  {items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-xs" style={{ color: C.subtle }}>
                      <span className="mt-1 shrink-0" style={{ color: C.mid }}>—</span><span>{item}</span>
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

      {/* ── 7. МАТЕРИАЛЫ · #323625 тёмный ── */}
      <section className="py-24" style={{ background: C.dark, color: '#fff', ...section() }}>
        <div style={wrap}>
          <p style={{ ...labelStyle, color: C.mid }} className="mb-6">Материалы</p>
          <h2 style={{ ...h2Style, color: '#fff' }} className="mb-16">
            Построено на века, создано для вдохновения
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {materials.map(({title,text,img}) => (
              <div key={title}>
                <div className="aspect-square w-full flex items-end p-3 mb-4"
                  style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '2px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>{img}</span>
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. ДЛЯ КОГО · белый ── */}
      <section className="py-24" style={{ background: '#fff', ...section() }}>
        <div style={wrap}>
          <p style={labelStyle} className="mb-6">Клиенты</p>
          <h2 style={{ ...h2Style, maxWidth: '30rem' }} className="mb-16">
            Нам доверяют ведущие wellness-направления
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {segments.map(({title,text}) => (
              <div key={title} className="flex gap-6 items-start p-8 border" style={{ borderColor: '#e5e7e0' }}>
                <div className="h-12 w-12 rounded shrink-0" style={{ background: C.light }} />
                <div>
                  <h3 className="font-semibold text-base mb-2">{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.subtle }}>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. ПОЧЕМУ HWS · #B5BD9A ── */}
      <section className="py-24" style={{ background: C.light, ...section() }}>
        <div style={wrap}>
          <p style={{ ...labelStyle, color: C.muted }} className="mb-6">Преимущества</p>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <h2 style={{ ...h2Style, color: C.dark }}>
              Европейская экспертиза, мировые стандарты
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {advantages.map(item => (
                <div key={item} className="flex items-start gap-3">
                  <span style={{ color: C.terra, marginTop: '2px' }} className="shrink-0 font-bold">✓</span>
                  <p className="text-sm" style={{ color: C.dark }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. КАРТА · белый ── */}
      <section className="py-24" style={{ background: '#fff', ...section() }}>
        <div style={wrap}>
          <p style={labelStyle} className="mb-6">География</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <h2 style={{ ...h2Style, maxWidth: '30rem' }}>
              Создаём wellness-превосходство по всему миру
            </h2>
            <p className="max-w-xs text-sm leading-relaxed" style={{ color: C.subtle }}>
              Международное портфолио: Европа, Кавказ, Центральная Азия, выход на рынок США.
            </p>
          </div>
          <div className="w-full aspect-[16/7] relative flex items-center justify-center" style={{ background: '#f0f0eb', borderRadius: '2px' }}>
            <span style={{ color: C.mid, fontSize: '13px' }}>[MAP: интерактивная карта]</span>
            {pins.map(({label,sub,x,y}) => (
              <div key={label} className="absolute flex flex-col items-center" style={{left:x,top:y}}>
                <div className="h-3 w-3 rounded-full" style={{ background: C.terra }} />
                <span className="text-xs font-semibold whitespace-nowrap mt-1" style={{ color: C.dark }}>{label}</span>
                <span className="text-xs whitespace-nowrap" style={{ color: C.muted }}>{sub}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full" style={{ background: C.mid }} />
            <span className="text-xs" style={{ color: C.muted }}>Расширение: Соединённые Штаты</span>
          </div>
        </div>
      </section>

      {/* ── 11. ОТЗЫВЫ · #323625 тёмный ── */}
      <section className="py-24" style={{ background: C.dark, color: '#fff', ...section() }}>
        <div style={wrap}>
          <p style={{ ...labelStyle, color: C.mid }} className="mb-6">Отзывы</p>
          <h2 style={{ ...h2Style, color: '#fff' }} className="mb-16">
            Что говорят наши клиенты
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({quote,author}) => (
              <div key={author} className="p-8" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                <span style={{ color: C.mid, fontSize: '3rem', lineHeight: 1, display: 'block', marginBottom: '1rem', fontFamily: 'Georgia, serif' }}>"</span>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>{quote}</p>
                <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <span className="text-xs font-semibold" style={{ color: C.mid }}>— {author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. ФИНАЛЬНЫЙ CTA · #323625 ── */}
      <section id="contact" className="py-28" style={{ background: C.dark, ...section() }}>
        <div className="text-center" style={wrap}>
          <p style={{ ...labelStyle, color: C.mid }} className="mb-6">Начать проект</p>
          <h2 style={{ ...h2Style, color: '#fff', fontSize: 'clamp(2rem, 4vw, 3.75rem)' }} className="max-w-2xl mx-auto mb-8">
            Готовы создать своё wellness-направление?
          </h2>
          <p className="max-w-xl mx-auto mb-12 leading-relaxed text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Планируете ли вы luxury СПА для отеля, аутентичный хаммам или полноценный wellness-комплекс — мы привносим экспертизу, чтобы сделать его исключительным.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="#contact" style={{ background: '#fff', color: C.dark, border: '1px solid #fff' }} shadow={false}>
              Записаться на бесплатную консультацию
            </Button>
            <Button href="#portfolio" {...btnDark}>
              Скачать портфолио [PDF]
            </Button>
          </div>
        </div>
      </section>

      {/* ── ФУТЕР · белый ── */}
      <footer className="py-16 border-t" style={{ borderColor: '#e5e7e0', ...section() }}>
        <div style={wrap}>
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <span className="font-bold text-base block mb-4">Home Wood Spa</span>
              <p className="text-sm leading-relaxed mb-6" style={{ color: C.subtle }}>
                Более 17 лет специализируемся на проектировании, строительстве и управлении премиальными wellness-комплексами.
              </p>
              <div className="space-y-2 text-xs" style={{ color: C.mid }}>
                <p>Homewoodspa@gmail.com</p>
                <p>Homewoodspa.com</p>
                <p>+1 (678) 520-9556 — Igor Kostin</p>
                <p>+1 (470) 760-9323 — Eugene Voit</p>
              </div>
            </div>
            <div>
              <span style={{ ...labelStyle, color: C.dark, display: 'block', marginBottom: '1rem' }}>Услуги</span>
              <ul className="space-y-2 text-sm" style={{ color: C.subtle }}>
                {['Коммерческие СПА','Luxury хаммамы','Традиционные сауны','Термальные впечатления','Строительство под ключ','Дизайн и консалтинг'].map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>
            <div>
              <span style={{ ...labelStyle, color: C.dark, display: 'block', marginBottom: '1rem' }}>Проекты</span>
              <ul className="space-y-2 text-sm" style={{ color: C.subtle }}>
                {['Отели и курорты','Wellness-центры','Частные резиденции','Корпоративные объекты'].map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>
            <div>
              <span style={{ ...labelStyle, color: C.dark, display: 'block', marginBottom: '1rem' }}>Портфолио</span>
              <ul className="space-y-2 text-sm" style={{ color: C.subtle }}>
                {['Европа','Центральная Азия','Северная Америка (скоро)'].map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between gap-4 text-xs"
            style={{ borderColor: '#e5e7e0', color: C.mid }}>
            <span>© 2024 Home Wood Spa. Все права защищены.</span>
            <span>Политика конфиденциальности · Условия использования</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
