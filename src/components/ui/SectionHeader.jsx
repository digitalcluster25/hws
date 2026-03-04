// SectionHeader — pill badge + two-tone heading
// badge: короткий лейбл | light: первая строка серая | dark: вторая строка тёмная
export default function SectionHeader({ badge, light, dark, className = '' }) {
  return (
    <div className={`sh-wrap ${className}`}>
      {badge && <span className="sh-badge">{badge}</span>}
      <div className="sh-h2">
        {light && <span className="sh-light">{light}</span>}
        {dark  && <span className="sh-dark">{dark}<span className="sh-dot">.</span></span>}
      </div>
    </div>
  )
}
