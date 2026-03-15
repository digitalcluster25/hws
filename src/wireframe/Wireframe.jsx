import Button from '../components/ui/Button'
import ProjectsSlider from '../components/sections/ProjectsSlider'
import ProcessAccordion from '../components/sections/ProcessAccordion'
import TestimonialsSlider from '../components/sections/TestimonialsSlider'
import SectionHeader from '../components/ui/SectionHeader'

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
const C = { dark: '#323625', mid: '#A2AC89', light: '#B5BD9A', terra: '#CB8268', muted: '#6b7057' }
const wrap = { maxWidth: '1344px', margin: '0 auto' }
const px   = { paddingLeft: 'max(1.5vw, 16px)', paddingRight: 'max(1.5vw, 16px)' }

export default function Wireframe() {
  return (
    <main className="min-h-screen tc-dark">

      {/* ── 1. HERO ── */}
      <section id="home" className="hero-section" style={{ background: '#111013' }}>
        <div className="hws-wrap hws-px">
          <h1 className="hws-h1 tc-white">От аутентичных хаммамов<br />до скандинавских саун.<br />Европейское мастерство<br />в luxury-отелях и курортах по всему миру.</h1>
        </div>
      </section>

      {/* ── 2. ПРОЕКТЫ ── */}
      <ProjectsSlider />

      {/* ── 3. О НАС ── */}
      <section id="about" className="about-section" style={{ background: '#111013' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', ...px }}>
          <h2 className="about-statement">
            <span className="about-statement__bright">Почти два десятилетия мы проектируем и строим премиальные wellness-пространства — </span>
            <span className="about-statement__muted">от масштабных курортных СПА до камерных частных хаммамов, соединяя древние банные традиции с современным дизайном и технической точностью.</span>
          </h2>
          <div style={{ marginTop: '2.5rem' }}>
            <Button href="/portfolio" variant="filled">Смотреть проекты</Button>
          </div>
        </div>
      </section>

      {/* ── 4. КАК МЫ РАБОТАЕМ (Ohio How we work) ── */}
      <section className="why-section hws-px" style={{ background: '#111013' }}>
        <div style={wrap}>

          {/* Верх: 3 колонки 50/25/25 */}
          <div className="why-top">
            <div className="why-top-left">
              <p className="why-label">Как мы работаем</p>
              <div className="why-divider" />
              <h2 className="why-h2">
                <span className="why-h2-bright">Европейское мастерство, </span>
                <span className="why-h2-muted">которое создаёт wellness-объекты мирового уровня.</span>
              </h2>
            </div>
            <div className="why-top-col">
              <p className="why-text">Каждый объект начинается с задачи, у которой нет готового ответа. Локация, аудитория, бюджет, ощущение которое должно остаться у гостя — мы работаем со всем этим одновременно.</p>
            </div>
            <div className="why-top-col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p className="why-text">Emily Resort, Taze Bay, SOP Spa в Sadu Hotel — каждый из этих объектов мог быть просто хорошим. Мы сделали их такими, о которых говорят.</p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <Button href="/services" variant="filled">Посмотреть все услуги</Button>
              </div>
            </div>
          </div>

          {/* Низ: 4 карточки */}
          <div className="why-cards">
            {[
              { cat: 'ХАММАМЫ',          title: 'Турецкие бани, аутентичные хаммамы',  desc: 'Традиционное банное мастерство с применением исторически точных материалов. Каждый хаммам — культурный и термальный опыт.' },
              { cat: 'САУНЫ',            title: 'Финские сауны, термальные бани',       desc: 'Скандинавские сауны и паровые комнаты, разработанные как целостные wellness-экосистемы для отелей и резиденций.' },
              { cat: 'СПА-КОМПЛЕКСЫ',   title: 'Термальные зоны, wellness-маршруты',   desc: 'Полноценные термальные комплексы: ледяные купели, бассейны для погружения, паровые комнаты — как единое путешествие.' },
              { cat: 'ЧАСТНЫЕ ОБЪЕКТЫ', title: 'Резиденции, корпоративные СПА',        desc: 'Частные хаммамы и wellness-пространства, созданные по индивидуальным стандартам и эстетике заказчика.' },
            ].map(({ cat, title, desc }, i) => (
              <div key={cat} className={`why-card${i === 3 ? ' why-card--active' : ''}`}>
                <div>
                  <p className="why-card-cat">{cat}</p>
                  <h3 className="why-card-title">{title}</h3>
                </div>
                <div>
                  <p className="why-card-desc">{desc}</p>
                  <button className="why-card-btn" aria-label="Подробнее">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. ПРОЦЕСС ── */}
      <ProcessAccordion />

      {/* ── 7. ДЛЯ КОГО ── */}
      <section className="clients-who-section" style={{ background: '#323625', ...px }}>
        <div style={wrap}>
          <div className="clients-who-inner">
            <div className="clients-who-left">
              <SectionHeader badge="Клиенты" light="Нам доверяют" dark="ведущие wellness-бренды" className="sh-wrap--inverse" />
            </div>
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
        <img src="/shape1.png" alt="" aria-hidden="true" className="clients-who-shape" />
      </section>

      {/* ── 8. ГЕОГРАФИЯ ── */}
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
                  {website !== '—' ? <a href={`https://${website}`} target="_blank" rel="noopener noreferrer">www.{website}</a> : <span>—</span>}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 9. ОТЗЫВЫ ── */}
      <TestimonialsSlider />

      {/* ── 10. CTA ── */}
      <section id="contact" className="cta-section">
        <div className="cta-bg" aria-hidden="true" style={{ backgroundImage: 'url(/contactus.jpg)' }} />
        <div className="cta-overlay" aria-hidden="true" />
        <div className="cta-inner" style={wrap}>
          <div className="cta-top"><p className="cta-label">ЗАПРОСЫ НА ПРОЕКТ</p></div>
          <div className="cta-bottom">
            <div className="cta-left">
              <h2 className="cta-h2">Создадим ваш wellness-объект с нуля до открытия.</h2>
              <Button href="/contact" variant="filled">Забронировать встречу</Button>
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
