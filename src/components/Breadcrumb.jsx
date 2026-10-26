import { Link } from 'react-router-dom'
import { useLang } from '../LanguageContext'

/**
 * crumbs = [{ label, to? }]  — last item has no `to` (current page).
 */
export default function Breadcrumb({ crumbs }) {
  const { t } = useLang()
  return (
    <nav className="breadcrumb" aria-label={t('nav.aria')}>
      {crumbs.map((c, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {i > 0 && <span className="sep">›</span>}
          {c.to
            ? <Link to={c.to}>{c.label}</Link>
            : <span className="current">{c.label}</span>
          }
        </span>
      ))}
    </nav>
  )
}
