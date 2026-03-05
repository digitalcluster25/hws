const px   = { paddingLeft: 'max(1.5vw, 16px)', paddingRight: 'max(1.5vw, 16px)' }
const wrap = { maxWidth: '1344px', margin: '0 auto' }

export default function Footer() {
  return (
    <footer className="py-8 border-t" style={{ borderColor: '#e5e7e0', ...px }}>
      <div style={wrap}>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <span className="footer-copy">© 2026 Home Wood Spa. Все права защищены.</span>
          <span className="footer-copy">Политика конфиденциальности · Условия использования</span>
        </div>
      </div>
    </footer>
  )
}
