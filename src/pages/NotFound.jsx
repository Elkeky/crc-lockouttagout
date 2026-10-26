import { Link } from 'react-router-dom'
import { useLang } from '../LanguageContext'

export default function NotFound() {
  const { t } = useLang()
  return (
    <main className="page">
      <div className="state-card">
        <div className="state-icon">🔍</div>
        <h2>{t('state.notFound.title')}</h2>
        <p>{t('state.notFound.body')}</p>
        <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-faint)' }}>
          <Link to="/qr" style={{ color: 'var(--accent-blue)' }}>{t('qr.link')}</Link>
        </p>
      </div>
    </main>
  )
}
