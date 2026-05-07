import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'

const wrap = { maxWidth: '1344px', margin: '0 auto' }

export default function Contact() {
  const { t } = useTranslation('labels')

  return (
    <main className="min-h-screen tc-dark">

      <section className="ct-hero">
        <div className="ct-hero-bg" aria-hidden="true" style={{ backgroundImage: 'url(/contactus.jpg)' }} />
        <div className="ct-hero-overlay" aria-hidden="true" />
        <div className="ct-hero-inner hws-px" style={wrap}>
          <h1 className="ct-hero-h1">{t('contact.heroH1')}</h1>
          <p className="ct-hero-sub">{t('contact.heroSub')}</p>
        </div>
      </section>

      <section className="ct-info hws-px">
        <div style={wrap}>
          <div className="ct-info-grid">

            <div className="ct-col">
              <h2 className="ct-col-h">{t('contact.col1H')}</h2>
              <p className="ct-col-label">{t('contact.col1label1')}</p>
              <p className="ct-col-val"><a href="tel:+16785209556" className="ct-val-link">+1 (678) 520-9556</a></p>
              <p className="ct-col-note">{t('contact.col1note1')}</p>
              <p className="ct-col-label" style={{ marginTop: '1.75rem' }}>{t('contact.col1label2')}</p>
              <p className="ct-col-val"><a href="mailto:homewoodspa@gmail.com" className="ct-val-link">homewoodspa@gmail.com</a></p>
              <p className="ct-col-note">{t('contact.col1note2')}</p>
            </div>

            <div className="ct-col">
              <h2 className="ct-col-h">{t('contact.col2H')}</h2>
              <p className="ct-col-val">1170 Temple Dr<br />Sugar Hill, GA 30518</p>
              <p className="ct-col-note" style={{ marginTop: '0.5rem' }}>
                {t('contact.col2note').split('\n').map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </p>
            </div>

            <div className="ct-col">
              <h2 className="ct-col-h">{t('contact.col3H')}</h2>
              <div className="ct-links">
                <a href="https://wa.me/16785209556" target="_blank" rel="noopener noreferrer" className="ct-social-link">WhatsApp</a>
                <a href="mailto:homewoodspa@gmail.com" className="ct-social-link">Email</a>
                <a href="https://instagram.com/homewoodspa" target="_blank" rel="noopener noreferrer" className="ct-social-link">Instagram</a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}
