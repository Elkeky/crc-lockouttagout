import { useData } from '../DataContext'
import { useLang } from '../LanguageContext'
import { QRCodeSVG } from 'qrcode.react'
import { SITE_URL } from '../config'

export default function QrPage() {
  const { data, error } = useData()
  const { t } = useLang()

  if (error) return <div className="state-card"><div className="state-icon">⚠️</div><h2>{error}</h2></div>
  if (!data)  return <div className="state-card"><div className="state-icon">⏳</div><h2>{t('state.loading')}</h2></div>

  const entries = []
  for (const machine of data.machines) {
    entries.push({
      label: machine.name,
      sublabel: t('qr.homePage'),
      url: `${SITE_URL}/#/m/${machine.id}`,
    })
    for (const system of machine.systems) {
      for (const load of system.loads) {
        entries.push({
          label: `${machine.name} — ${load.breaker}`,
          sublabel: `${load.name} / ${system.name}`,
          url: `${SITE_URL}/#/m/${machine.id}/s/${system.id}/l/${load.id}`,
        })
      }
    }
  }

  return (
    <main className="page qr-page">
      <h1 style={{ padding: '1rem 0 0.25rem' }}>{t('qr.title')}</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
        {t('qr.urlNote')} <code dir="ltr">{SITE_URL}</code>
      </p>
      <button
        onClick={() => window.print()}
        style={{
          padding: '0.6rem 1.5rem',
          background: 'var(--accent)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius)',
          cursor: 'pointer',
          fontFamily: 'var(--sans)',
          fontSize: '0.95rem',
          fontWeight: 600,
          marginBottom: '1rem',
        }}
      >
        {t('qr.print')}
      </button>

      <div className="qr-grid">
        {entries.map((e, i) => (
          <div className="qr-card" key={i}>
            <QRCodeSVG
              value={e.url}
              size={180}
              level="M"
              style={{ background: '#fff', padding: 8, borderRadius: 8 }}
            />
            <h3>{e.label}</h3>
            <p>{e.sublabel}</p>
            <p style={{ marginTop: '0.25rem', wordBreak: 'break-all', fontSize: '0.65rem', opacity: 0.6 }}>
              {e.url}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}
