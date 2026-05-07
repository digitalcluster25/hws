import { useTranslation } from 'react-i18next'

const px   = { paddingLeft: 'max(1.5vw, 16px)', paddingRight: 'max(1.5vw, 16px)' }
const wrap = { maxWidth: '1344px', margin: '0 auto' }

export default function Footer() {
  const { t } = useTranslation('labels')
  return (
    <footer className="py-8 border-t" style={{ borderColor: '#e5e7e0', ...px }}>
      <div style={wrap}>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <span className="footer-copy">{t('footer.copy')}</span>
          <span className="footer-copy">{t('footer.offer')}</span>
        </div>
      </div>
    </footer>
  )
}
