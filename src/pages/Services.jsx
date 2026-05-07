import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'

const wrap = { maxWidth: '1344px', margin: '0 auto' }

function chunk(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

function FormattedDesc({ text }) {
  const paragraphs = text.split(/(?<=\.)\s+(?=[А-ЯЁA-ZÄÖÜΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩα-ω])/u)
  return paragraphs.map((s, i) => (
    <p key={i} className="sv-desc" style={i > 0 ? { marginTop: '1em' } : {}}>{s}</p>
  ))
}

function ServiceGroup({ label, items, numOffset = 0 }) {
  const pairs = chunk(items, 2)
  return (
    <div className="sv-group hws-px">
      <div style={wrap}>
        <div className="sv-group-inner">
          <div className="sv-group-label">
            <span className="sv-label-txt">{label}</span>
          </div>
          <div className="sv-group-entries">
            {pairs.map((pair, rowIdx) => (
              <div className="sv-pair" key={rowIdx}>
                {pair.map((item, colIdx) => {
                  const n = numOffset + rowIdx * 2 + colIdx + 1
                  return (
                    <div className="sv-entry" key={n}>
                      <p className="sv-num">{String(n).padStart(2, '0')}.</p>
                      <h3 className="sv-title">{item.title}</h3>
                      <FormattedDesc text={item.desc} />
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  const { t } = useTranslation('labels')
  const { t: tc } = useTranslation('content')

  const mainServices = tc('mainServices', { returnObjects: true }) || []
  const mgmtServices = tc('mgmtServices', { returnObjects: true }) || []

  return (
    <main className="sv-page tc-dark">

      <section className="sv-statement-section hws-px">
        <div style={wrap}>
          <h1 className="sv-statement">{t('services.statement')}</h1>
        </div>
      </section>

      <ServiceGroup label={t('services.mainLabel')} items={mainServices} numOffset={0} />
      <ServiceGroup label={t('services.mgmtLabel')} items={mgmtServices} numOffset={mainServices.length} />

      <section className="sv-cta hws-px">
        <div style={wrap}>
          <p className="sv-cta-label">{t('services.ctaLabel')}</p>
          <h2 className="sv-cta-h2">{t('services.ctaH2')}</h2>
          <Button href="/contact" variant="filled">{t('services.ctaBtn')}</Button>
        </div>
      </section>

    </main>
  )
}
