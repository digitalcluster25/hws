import Button from '../components/ui/Button'
import ProjectsSlider from '../components/sections/ProjectsSlider'
import ProcessAccordion from '../components/sections/ProcessAccordion'
import TestimonialsSlider from '../components/sections/TestimonialsSlider'
import SectionHeader from '../components/ui/SectionHeader'

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
const segments = [
  { title: 'Luxury-отели и курорты', text: 'Создание wellness-направлений, которые повышают RevPAR и отличают ваш объект.' },
  { title: 'Частные резиденции', text: 'Частные хаммамы, сауны и wellness-пространства, созданные по вашим стандартам.' },
  { title: 'Wellness-центры', text: 'Оздоровительные центры, разработанные для максимальной терапевтической пользы.' },
  { title: 'Корпоративные объекты', text: 'Wellness-решения для корпоративных клиентов и hospitality-групп.' },
]
const clients = [
  { project: 'Emily Resort', city: 'Анталья', country: 'Турция', website: 'emilyresort.com' },
  { project: 'Taze Bay Historic Baths', city: 'Баку', country: 'Азербайджан', website: 'tazebay.az' },
  { project: 'Sadu Hotel & Radisson', city: 'Алматы', country: 'Казахстан', website: 'saduhotel.com' },
  { project: 'Private Residence', city: 'Дубай', country: 'ОАЭ', website: '—' },
  { project: 'Mountain Wellness Club', city: 'Тироль', country: 'Австрия', website: '—' },
  { project: 'Corporate Wellness Hub', city: 'Варшава', country: 'Польша', website: '—' },
]
const C = {
  dark: '#323625', mid: '#A2AC89', light: '#B5BD9A',
  terra: '#CB8268', muted: '#6b7057',
}
const wrap = { maxWidth: '1344px', margin: '0 auto' }
const px   = { paddingLeft: 'max(1.5vw, 16px)', paddingRight: 'max(1.5vw, 16px)' }

export default function Wireframe() {
  return (
    <main className="min-h-screen tc-dark">

      {/* ── 1. HERO ── */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center py-28 text-center"
        style={{ background: C.light, ...px }}>
        <div style={wrap}>
          <h1 className="hws-h1 mb-6">Строительство<br />СПА и<br />Wellness</h1>
          <p className="hws-body tc-muted max-w-xl mx-auto mb-10">
            От аутентичных турецких хаммамов до скандинавских саун — 17 лет европейского мастерства в luxury-отелях и курортах по всему миру.
          </p>
          <div className="flex justify-center mb-10">
            <Button href="/portfolio" variant="filled" shadow={false}>Посмотреть проекты →</Button>
          </div>
        </div>
      </section>

      {/* ── 3. КТО МЫ ── */}
      <section id="about" className="py-24" style={{ background: C.dark, ...px }}>
        <div style={wrap}>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader badge="О нас" light="Создаём wellness-пространства," dark="которые трансформируют" className="sh-wrap--inverse" />
              <p className="hws-body tc-w65 mb-4">
                Почти два десятилетия Home Wood Spa проектирует и строит премиальные wellness-пространства. От масштабных курортных СПА до камерных частных хаммамов — мы соединяем древние банные традиции с современным дизайном и технической точностью.
              </p>
              <p className="hws-body tc-w65 mb-8">
                Каждый проект начинается с вашего видения и заканчивается пространством, которое запомнят ваши гости.
              </p>
            </div>
            <div className="aspect-[4/3] rounded flex items-end p-4" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <span className="img-note img-note-dark">[IMAGE: Emily Resort главный СПА-зал]</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. ЭКСПЕРТИЗА ── */}
      <section id="services" className="exp-section" style={{ ...px }}>
        <div style={wrap}>
          <div className="exp-wrap">

            {/* левая колонка */}
            <div className="exp-left">
              <p className="exp-label">ЭКСПЕРТИЗА</p>
              <h2 className="exp-h2">Создаём wellness-пространства, которые задают стандарт.</h2>
            </div>

            {/* правая сетка 2×2 */}
            <div className="exp-grid">
              {[
                { cat: 'ХАММАМЫ', title: 'Турецкие бани,\nаутентичные хаммамы', desc: 'Традиционное банное мастерство с применением исторически точных материалов. Каждый хаммам — культурный и термальный опыт.' },
                { cat: 'САУНЫ', title: 'Финские сауны,\nтермальные бани', desc: 'Скандинавские сауны и паровые комнаты, разработанные как целостные wellness-экосистемы для отелей и резиденций.' },
                { cat: 'СПА-КОМПЛЕКСЫ', title: 'Термальные зоны,\nwellness-маршруты', desc: 'Полноценные термальные комплексы: ледяные купели, бассейны для погружения, паровые комнаты — как единое путешествие.' },
                { cat: 'ЧАСТНЫЕ ОБЪЕКТЫ', title: 'Резиденции,\nкорпоративные СПА', desc: 'Частные хаммамы и wellness-пространства, созданные по индивидуальным стандартам и эстетике заказчика.' },
              ].map(({ cat, title, desc }) => (
                <div key={cat} className="exp-card">
                  <p className="exp-cat">{cat}</p>
                  <div className="exp-divider" />
                  <h3 className="exp-card-title">{title}</h3>
                  <p className="exp-card-desc">{desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <ProjectsSlider />

      <ProcessAccordion />


      {/* ── 8. ДЛЯ КОГО ── */}
      <section className="clients-who-section" style={{ background: C.dark, ...px }}>
        <div style={wrap}>
          <div className="clients-who-inner">

            {/* левая колонка: заголовок + изображение */}
            <div className="clients-who-left">
              <SectionHeader badge="Клиенты" light="Нам доверяют" dark="ведущие wellness-бренды" className="sh-wrap--inverse" />
              <img src="/shape1.png" alt="" aria-hidden="true" className="clients-who-shape" />
            </div>

            {/* правая колонка: 2×2 сетка */}
            <div className="clients-who-grid">
              {segments.map(({ title, text }) => (
                <div key={title} className="clients-who-card">
                  <h3 className="clients-who-title">{title}</h3>
                  <p className="clients-who-text">{text}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── 9. ПОЧЕМУ HWS ── */}
      <section className="py-24" style={{ background: C.light, ...px }}>
        <div style={wrap}>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <SectionHeader badge="Почему мы" light="Европейская экспертиза," dark="мировые стандарты" />
            <div className="flex flex-col gap-6">
              <p className="hws-body tc-dark">Каждый объект начинается с задачи, у которой нет готового ответа. Локация, аудитория, бюджет, ощущение которое должно остаться у гостя — мы работаем со всем этим одновременно.</p>
              <p className="hws-body tc-dark">Emily Resort, Taze Bay, SOP Spa в Sadu Hotel — каждый из этих объектов мог быть просто хорошим. Мы сделали их такими, о которых говорят.</p>
              <p className="hws-body tc-dark">Именно этот подход мы передаём партнёрам Home Wood Spa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. КЛИЕНТЫ ПО ГЕОГРАФИИ (Ohio Our clients style) ── */}
      <section className="py-24 clients-section" style={{ background: '#f8f8f5', ...px }}>
        <div style={wrap}>
          <p className="clients-label">ГЕОГРАФИЯ</p>
          <h2 className="clients-h2">Wellness-объекты<br />по всему миру.</h2>
          <p className="hws-small tc-subtle max-w-md mt-4 mb-12">Международное портфолио: Европа, Кавказ, Центральная Азия.</p>
          <ul className="clients-grid list-none p-0 m-0">
            {clients.map(({ project, city, country, website }) => (
              <li key={project} className="clients-entry">
                <p className="clients-name">{project}, {city}, {country}</p>
                <p className="clients-website">
                  {website !== '—' ? (
                    <a href={`https://${website}`} target="_blank" rel="noopener noreferrer">www.{website}</a>
                  ) : (
                    <span aria-label="нет сайта">—</span>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 11. ОТЗЫВЫ ── */}
      <TestimonialsSlider />

      {/* ── 12. ФИНАЛЬНЫЙ CTA ── */}
      <section id="contact" className="cta-section">
        <div className="cta-bg" aria-hidden="true" style={{ backgroundImage: 'url(/contactus.jpg)' }} />
        <div className="cta-overlay" aria-hidden="true" />

        <div className="cta-inner" style={wrap}>
          {/* лейбл — над обеими колонками */}
          <div className="cta-top">
            <p className="cta-label">ЗАПРОСЫ НА ПРОЕКТ</p>
          </div>
          {/* нижняя строка: заголовок + контакты */}
          <div className="cta-bottom">
            <div className="cta-left">
              <h2 className="cta-h2">Создадим ваш wellness-объект с нуля до открытия.</h2>
              <Button href="/contact" variant="filled-light" shadow={false}>Забронировать встречу</Button>
            </div>
            <div className="cta-right">
              <div className="cta-contact">
                <p className="cta-contact-city">США / Европа / Центральная Азия</p>
                <p className="cta-contact-name">Igor Kostin</p>
                <p className="cta-contact-line">Homewoodspa@gmail.com</p>
                <p className="cta-contact-line">+1 (678) 520-9556</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
