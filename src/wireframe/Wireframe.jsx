import Button from '../components/ui/Button'

export default function Wireframe() {
  const expertise = [
    { title: 'Коммерческие СПА-комплексы', text: 'Luxury СПА для отелей с множественными термальными зонами, зонами релаксации и пространствами для процедур. От бутик-отелей до 5-звездочных курортов.' },
    { title: 'Традиционные хаммамы', text: 'Аутентичные турецкие хаммамы с традиционным мастерством, премиальной мраморной отделкой и современными техническими системами — от камерных частных бань до коммерческих объектов.' },
    { title: 'Термальные впечатления', text: 'Финские сауны, инфракрасные кабины, русские бани, японские офуро, снежные комнаты, соляные терапевтические камеры — мы привносим мировые wellness-традиции в ваше пространство.' },
  ]
  const projects = [
    { title: 'Emily Resort & Spa', loc: 'Львов, Украина | 5-звездочный luxury-курорт', text: '12 уникальных саун и парных, 5 бассейнов включая спортивный 25x16м, профессиональный хаммам, открытые джакузи и подогреваемый инфинити-бассейн — полноценное wellness-направление, построенное вокруг 7-гектарового эко-озера.' },
    { title: 'Sadu Hotel & SOP Spa', loc: 'Алматы, Казахстан | Radisson Individuals', text: 'Премиальный этно-СПА для бутик-отеля на 108 номеров, сочетающий традиционные дизайнерские элементы с современными термальными впечатлениями и wellness-удобствами.' },
    { title: 'Taze Bay', loc: 'Баку, Азербайджан | Реконструкция исторических бань', text: 'Полная реконструкция исторического хаммама с турецкой баней в традиционном стиле, русской сауной с гималайской солью, VIP парными, снежной комнатой и современными системами освещения.' },
  ]
  const steps = [
    { num: '1', title: 'Исследование и планирование', items: ['Анализ рынка', 'Исследование конкурентов', 'Оценка спроса', 'Технико-экономическое обоснование'] },
    { num: '2', title: 'Концепция и дизайн', items: ['Разработка уникальной концепции', 'Архитектурный дизайн', '3D визуализация', 'Подбор материалов'] },
    { num: '3', title: 'Строительство и установка', items: ['Поставка премиальных материалов', 'Экспертное мастерство', 'Технические системы', 'Контроль качества'] },
    { num: '4', title: 'Запуск и поддержка', items: ['Подбор и обучение персонала', 'Операционное руководство', 'Поддержка перед открытием', 'Консалтинг по управлению'] },
  ]
  const materials = [
    { title: 'Канадский кедр', text: 'Премиальная скандинавская древесина для аутентичного строительства саун с натуральными ароматерапевтическими свойствами и исключительной долговечностью.', img: '[IMAGE: кедровые доски / вагонка]' },
    { title: 'Гималайская соль', text: 'Блоки и плитка из натуральной розовой соли для терапевтических соляных комнат, обеспечивающие очистку воздуха и уникальную атмосферу.', img: '[IMAGE: соляные блоки розовые]' },
    { title: 'Мрамор Calacatta', text: 'Итальянский мрамор для luxury-хаммамов — вневременная элегантность с исключительной теплоотдачей и влагостойкостью.', img: '[IMAGE: мраморные плиты Calacatta]' },
  ]
  const segments = [
    { title: 'Отели и курорты', text: 'Поднимите свою собственность на новый уровень с СПА мирового класса, который сам становится направлением. От бутик-отелей до luxury-курортов.' },
    { title: 'Wellness-центры', text: 'Создавайте терапевтические пространства с аутентичными термальными впечатлениями — от традиционных лечебных практик до современных wellness-концепций.' },
    { title: 'Luxury резиденции', text: 'Частные СПА-комплексы, домашние сауны и персональные хаммамы, спроектированные для самых взыскательных домовладельцев.' },
    { title: 'Корпоративные объекты', text: 'Wellness-удобства для руководителей, которые улучшают корпоративную культуру и предоставляют премиальные льготы для высокоэффективных команд.' },
  ]
  const advantages = [
    '17+ лет международного опыта',
    '300+ завершенных проектов в 4 странах',
    'Полная доставка под ключ от концепции до запуска',
    'Премиальные материалы от проверенных европейских поставщиков',
    'Внутренняя экспертиза: дизайн, инжиниринг, строительство, управление',
    'Доказанный послужной список с 5-звездочными отелями и курортами',
    'Кастомные решения, адаптированные под ваше видение и пространство',
    'Соответствие международным wellness-стандартам',
    'Постоянная поддержка и операционное руководство',
    'Один надежный партнер от планирования до открытия',
  ]
  const pins = [
    { label: 'Украина', sub: 'Одесса, Киев, Днепр, Львов', x: '38%', y: '28%' },
    { label: 'Азербайджан', sub: 'Баку', x: '56%', y: '38%' },
    { label: 'Казахстан', sub: 'Астана, Алматы', x: '68%', y: '28%' },
    { label: 'Португалия', sub: 'Коимбра', x: '17%', y: '34%' },
  ]
  const testimonials = [
    { quote: 'СПА в Emily Resort стал нашей визитной карточкой. Гости специально бронируют у нас ради термальных впечатлений — 12 уникальных саун, аутентичный хаммам и wellness-путешествие, которое выделяет нас на рынке.', author: 'Управление Emily Resort' },
    { quote: 'От концепции до завершения Home Wood Spa превзошли ожидания. Их внимание к деталям, качество материалов и понимание аутентичного строительства хаммамов не имеют аналогов.', author: 'Taze Bay Historic Baths, Баку' },
    { quote: 'Они не просто построили СПА — они создали wellness-направление. Термальный контур, премиальная отделка и продуманный дизайн подняли всю нашу собственность на новый уровень.', author: 'Sadu Hotel & Radisson Individuals' },
  ]

  return (
    <div className="bg-white font-mono min-h-screen" style={{ color: '#323625' }}>

      {/* HERO — сплошной фон #B5BD9A, всё по центру */}
      <section className="min-h-screen flex flex-col items-center justify-center px-8 md:px-16 py-24 border-b border-gray-300 text-center" style={{ background: '#B5BD9A' }}>
        <p className="text-xs uppercase tracking-widest mb-6" style={{ color: '#6b7057' }}>Home Wood Spa</p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-3xl" style={{ color: '#1a1c14' }}>
          Строительство СПА и Wellness-комплексов мирового класса
        </h1>
        <p className="text-lg max-w-2xl mb-10 leading-relaxed" style={{ color: '#4a4e3a' }}>
          От аутентичных турецких хаммамов до скандинавских саун и полноценных wellness-комплексов — мы привносим 17 лет европейского мастерства в luxury-отели, курорты и частные резиденции по всему миру.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Button href="#contact" shadow={true}>
            Записаться на бесплатную консультацию
          </Button>
        </div>
        <p className="text-sm" style={{ color: '#6b7057' }}>Нам доверяют 5-звездочные курорты в Европе, Центральной Азии и за их пределами</p>
      </section>

      {/* SOCIAL PROOF BAR */}
      <section className="border-b border-gray-300 px-8 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200">
          {[{num:'17+',label:'лет опыта'},{num:'300+',label:'проектов'},{num:'4',label:'страны'},{num:'Под ключ',label:'доставка'}].map(({num,label}) => (
            <div key={num} className="bg-white flex flex-col items-center gap-1 py-8 px-4">
              <span className="text-2xl font-bold">{num}</span>
              <span className="text-sm" style={{ color: '#888' }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* КТО МЫ */}
      <section className="border-b border-gray-300 px-8 md:px-16 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#888' }}>О компании</p>
            <h2 className="text-3xl font-bold mb-6">Создаем wellness-пространства, которые трансформируют</h2>
            <p className="leading-relaxed mb-4" style={{ color: '#555' }}>
              Почти два десятилетия Home Wood Spa проектирует и строит премиальные wellness-пространства, которые превосходят самые высокие ожидания. От масштабных курортных СПА-комплексов с дюжиной уникальных термальных зон до камерных частных хаммамов — мы соединяем древние банные традиции с современным дизайном, премиальными материалами и технической точностью.
            </p>
            <p className="leading-relaxed" style={{ color: '#555' }}>
              Каждый проект начинается с вашего видения и заканчивается wellness-пространством, которое запомнят ваши гости.
            </p>
          </div>
          <div className="bg-gray-200 aspect-[4/3] rounded flex items-end p-4">
            <span className="text-gray-400 text-xs">[IMAGE: Emily Resort главный СПА-зал]</span>
          </div>
        </div>
      </section>

      {/* ЭКСПЕРТИЗА */}
      <section className="border-b border-gray-300 px-8 md:px-16 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#888' }}>Экспертиза</p>
          <h2 className="text-3xl font-bold mb-4">Полноценные wellness-пространства, а не просто комнаты</h2>
          <p className="mb-12" style={{ color: '#555' }}>Мы не строим отдельные сауны — мы создаем полные термальные путешествия.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {expertise.map(({title,text}) => (
              <div key={title} className="border border-gray-300 p-8 bg-white">
                <div className="bg-gray-300 h-10 w-10 rounded mb-6" />
                <h3 className="font-semibold text-lg mb-3">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#555' }}>{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button href="#services" variant="outlined" shadow={false}>
              Изучить наши услуги →
            </Button>
          </div>
        </div>
      </section>

      {/* ПРОЕКТЫ */}
      <section className="border-b border-gray-300 px-8 md:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#888' }}>Портфолио</p>
          <h2 className="text-3xl font-bold mb-4">Wellness-пространства, которые задают стандарт</h2>
          <p className="mb-12 max-w-xl" style={{ color: '#555' }}>Каждый проект отражает нашу приверженность мастерству, вниманию к деталям и созданию пространств, где wellness становится опытом.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map(({title,loc,text}) => (
              <div key={title} className="border border-gray-200">
                <div className="bg-gray-300 aspect-[4/3] w-full flex items-end p-3">
                  <span className="text-gray-400 text-xs">[IMAGE: {title}]</span>
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-wide mb-2" style={{ color: '#888' }}>{loc}</p>
                  <h3 className="font-semibold text-lg mb-3">{title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#555' }}>{text}</p>
                  <span className="text-sm underline cursor-pointer">Посмотреть проект →</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button href="#portfolio">Посмотреть полное портфолио →</Button>
          </div>
        </div>
      </section>

      {/* ПОД КЛЮЧ */}
      <section className="border-b border-gray-300 px-8 md:px-16 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#888' }}>Процесс</p>
          <h2 className="text-3xl font-bold mb-4">От видения до дня открытия — мы управляем всем</h2>
          <p className="mb-12 max-w-2xl" style={{ color: '#555' }}>Строительство СПА мирового класса требует больше, чем просто строительства. Наш подход под ключ означает, что вы работаете с одной командой от маркетингового исследования до дня открытия.</p>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map(({num,title,items}) => (
              <div key={num} className="bg-white border border-gray-200 p-6">
                <div className="bg-gray-800 text-white h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold mb-4">{num}</div>
                <h3 className="font-semibold text-sm mb-4">{title}</h3>
                <ul className="space-y-2">
                  {items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-xs" style={{ color: '#555' }}>
                      <span className="mt-1 shrink-0">—</span><span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 border border-gray-300 p-8 max-w-2xl mx-auto text-center">
            <p className="text-sm mb-6" style={{ color: '#555' }}>Добавляете ли вы СПА в свой отель, создаете wellness-центр или строите частную резиденцию — мы привносим экспертизу, чтобы сделать это исключительным.</p>
            <Button href="#process" variant="outlined" shadow={false}>Узнать о нашем процессе</Button>
          </div>
        </div>
      </section>

      {/* МАТЕРИАЛЫ */}
      <section className="border-b border-gray-300 px-8 md:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#888' }}>Материалы</p>
          <h2 className="text-3xl font-bold mb-12">Построено на века, создано для вдохновения</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {materials.map(({title,text,img}) => (
              <div key={title} className="border border-gray-200">
                <div className="bg-gray-300 aspect-square w-full flex items-end p-3">
                  <span className="text-gray-400 text-xs">{img}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-3">{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#555' }}>{text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm max-w-2xl leading-relaxed" style={{ color: '#555' }}>
            Каждый материал выбирается как за его терапевтические свойства, так и за долговечную красоту. От талькохлоридных плиток до натурального камня — мы поставляем только лучшие элементы для вашего wellness-пространства.
          </p>
        </div>
      </section>

      {/* ДЛЯ КОГО */}
      <section className="border-b border-gray-300 px-8 md:px-16 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#888' }}>Клиенты</p>
          <h2 className="text-3xl font-bold mb-12">Нам доверяют ведущие wellness-направления</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {segments.map(({title,text}) => (
              <div key={title} className="border border-gray-200 p-8 bg-white flex gap-6 items-start">
                <div className="bg-gray-300 h-12 w-12 rounded shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#555' }}>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПОЧЕМУ HWS */}
      <section className="border-b border-gray-300 px-8 md:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#888' }}>Преимущества</p>
          <h2 className="text-3xl font-bold mb-12">Европейская экспертиза, мировые стандарты</h2>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-4">
            {advantages.map(item => (
              <div key={item} className="flex items-start gap-3">
                <span style={{ color: '#888' }} className="shrink-0">✓</span>
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* КАРТА */}
      <section className="border-b border-gray-300 px-8 md:px-16 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#888' }}>География</p>
          <h2 className="text-3xl font-bold mb-4">Создаем wellness-превосходство по всему миру</h2>
          <p className="mb-12 max-w-lg" style={{ color: '#555' }}>От реконструкций исторических бань до современных курортных СПА — наше международное портфолио демонстрирует универсальность, культурную чуткость и непоколебимую приверженность совершенству.</p>
          <div className="bg-gray-200 w-full aspect-[16/7] rounded relative overflow-hidden flex items-center justify-center">
            <span className="text-gray-400 text-sm z-0">[MAP: интерактивная карта]</span>
            {pins.map(({label,sub,x,y}) => (
              <div key={label} className="absolute flex flex-col items-center" style={{left:x,top:y}}>
                <div className="bg-gray-600 h-3 w-3 rounded-full" />
                <span className="text-xs font-semibold whitespace-nowrap mt-1">{label}</span>
                <span className="text-xs whitespace-nowrap" style={{ color: '#555' }}>{sub}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="bg-gray-300 h-2 w-2 rounded-full" />
            <span className="text-xs" style={{ color: '#888' }}>Расширение: Соединённые Штаты</span>
          </div>
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section className="border-b border-gray-300 px-8 md:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#888' }}>Отзывы</p>
          <h2 className="text-3xl font-bold mb-12">Что говорят наши клиенты</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({quote,author}) => (
              <div key={author} className="border border-gray-200 p-8">
                <span className="text-gray-300 text-4xl font-serif leading-none block mb-4">"</span>
                <p className="text-sm leading-relaxed mb-6" style={{ color: '#555' }}>{quote}</p>
                <div className="border-t border-gray-200 pt-4">
                  <span className="text-xs font-semibold" style={{ color: '#888' }}>— {author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ФИНАЛЬНЫЙ CTA */}
      <section className="border-b border-gray-300 px-8 md:px-16 py-24 bg-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest mb-6 text-gray-500">Начать проект</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-6">Готовы создать своё wellness-направление?</h2>
          <p className="text-gray-400 mb-10 leading-relaxed">
            Планируете ли вы luxury СПА для отеля, аутентичный хаммам или полноценный wellness-комплекс — мы привносим экспертизу, чтобы сделать его исключительным. Запишитесь на бесплатную консультацию, чтобы обсудить ваше видение.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="#contact" style={{ background: '#fff', color: '#111013', border: '1px solid #fff' }}>
              Записаться на бесплатную консультацию
            </Button>
            <Button href="#portfolio" variant="outlined" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }} shadow={false}>
              Скачать портфолио [PDF]
            </Button>
          </div>
        </div>
      </section>

      {/* ФУТЕР */}
      <footer className="px-8 md:px-16 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
          <div>
            <span className="font-bold text-base block mb-4">Home Wood Spa</span>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#555' }}>Более 17 лет специализируемся на проектировании, строительстве и управлении премиальными wellness-комплексами.</p>
            <div className="space-y-2 text-xs" style={{ color: '#888' }}>
              <p>Homewoodspa@gmail.com</p>
              <p>Homewoodspa.com</p>
              <p>+1 (678) 520-9556 — Igor Kostin</p>
              <p>+1 (470) 760-9323 — Eugene Voit</p>
            </div>
          </div>
          <div>
            <span className="font-semibold text-sm block mb-4">Услуги</span>
            <ul className="space-y-2 text-sm" style={{ color: '#555' }}>
              {['Коммерческие СПА-комплексы','Luxury хаммамы','Традиционные сауны','Термальные впечатления','Строительство под ключ','Дизайн и консалтинг'].map(i => <li key={i}>{i}</li>)}
            </ul>
          </div>
          <div>
            <span className="font-semibold text-sm block mb-4">Проекты</span>
            <ul className="space-y-2 text-sm" style={{ color: '#555' }}>
              {['Отели и курорты','Wellness-центры','Частные резиденции','Корпоративные объекты'].map(i => <li key={i}>{i}</li>)}
            </ul>
          </div>
          <div>
            <span className="font-semibold text-sm block mb-4">Портфолио</span>
            <ul className="space-y-2 text-sm" style={{ color: '#555' }}>
              {['Европа','Центральная Азия','Северная Америка (скоро)'].map(i => <li key={i}>{i}</li>)}
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between gap-4 text-xs" style={{ color: '#888' }}>
          <span>© 2024 Home Wood Spa. Все права защищены.</span>
          <span>Политика конфиденциальности · Условия использования</span>
        </div>
      </footer>

    </div>
  )
}
