import Button from '../components/ui/Button'

const wrap = { maxWidth: '1344px', margin: '0 auto' }
const px   = { paddingLeft: 'max(1.5vw, 16px)', paddingRight: 'max(1.5vw, 16px)' }

export default function Contact() {
  return (
    <main className="min-h-screen tc-dark">

      {/* ── HERO ── */}
      <section className="ct-hero">
        <div className="ct-hero-bg" aria-hidden="true" style={{ backgroundImage: 'url(/contactus.jpg)' }} />
        <div className="ct-hero-overlay" aria-hidden="true" />
        <div className="ct-hero-inner hws-px" style={wrap}>
          <h1 className="ct-hero-h1">Связаться с нами</h1>
          <p className="ct-hero-sub">Оставьте заявку — свяжемся в течение 24 часов и предложим предварительную концепцию бесплатно.</p>
          <Button href="mailto:homewoodspa@gmail.com" variant="filled">Написать нам</Button>
        </div>
      </section>

      {/* ── INFO ── */}
      <section className="ct-info hws-px">
        <div style={wrap}>
          <div className="ct-info-grid">

            {/* Колонка 1 */}
            <div className="ct-col">
              <h2 className="ct-col-h">Запросы</h2>
              <p className="ct-col-label">Телефон / WhatsApp</p>
              <p className="ct-col-val"><a href="tel:+16785209556" className="ct-val-link">+1 (678) 520-9556</a></p>
              <p className="ct-col-note">Пн–Пт, 9:00–18:00 EST</p>
              <p className="ct-col-label" style={{ marginTop: '1.75rem' }}>Email</p>
              <p className="ct-col-val"><a href="mailto:homewoodspa@gmail.com" className="ct-val-link">homewoodspa@gmail.com</a></p>
              <p className="ct-col-note">Для проектных запросов</p>
            </div>

            {/* Колонка 2 */}
            <div className="ct-col">
              <h2 className="ct-col-h">Офис</h2>
              <p className="ct-col-val">Atlanta, Georgia,<br />USA</p>
              <p className="ct-col-note" style={{ marginTop: '0.5rem' }}>
                Работаем по всему миру:<br />
                Европа · Кавказ · Центральная Азия
              </p>
              <a
                href="https://maps.google.com/?q=Atlanta,Georgia,USA"
                target="_blank"
                rel="noopener noreferrer"
                className="ct-dir-link"
              >
                Показать на карте
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8l4 4-4 4M8 12h8"/>
                </svg>
              </a>
            </div>

            {/* Колонка 3 */}
            <div className="ct-col">
              <h2 className="ct-col-h">Мессенджеры</h2>
              <div className="ct-links">
                <a href="https://wa.me/16785209556" target="_blank" rel="noopener noreferrer" className="ct-social-link">WhatsApp</a>
                <a href="mailto:homewoodspa@gmail.com" className="ct-social-link">Email</a>
                <a href="https://instagram.com/homewoodspa" target="_blank" rel="noopener noreferrer" className="ct-social-link">Instagram</a>
                <a href="https://linkedin.com/company/homewoodspa" target="_blank" rel="noopener noreferrer" className="ct-social-link">LinkedIn</a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}
