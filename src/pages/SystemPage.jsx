import { useParams, useNavigate } from 'react-router-dom'
import { useData, getMachine, getSystem } from '../DataContext'
import { useLang } from '../LanguageContext'
import Breadcrumb from '../components/Breadcrumb'
import SearchBox from '../components/SearchBox'

export default function SystemPage() {
  const { machineId, systemId } = useParams()
  const navigate = useNavigate()
  const { data, error } = useData()
  const { t } = useLang()

  if (error) return <StateCard icon="⚠️" title={t('state.error')} body={error} />
  if (!data)  return <StateCard icon="⏳" title={t('state.loading')} />

  const machine = getMachine(data, machineId)
  if (!machine) return <StateCard icon="🔍" title={t('state.machineNotFound')} />

  const system = getSystem(machine, systemId)
  if (!system) return <StateCard icon="🔍" title="System not found" />

  const loads = system.loads

  return (
    <main className="page">
      <Breadcrumb crumbs={[
        { label: machine.name, to: `/m/${machineId}` },
        { label: system.name },
      ]} />
      <SearchBox machine={machine} />

      {system.notes?.length > 0 && (
        <div className="system-notes">
          <div className="notes-title">{t('system.notes.title')}</div>
          <ul style={{ paddingInlineStart: '0.5rem', listStyle: 'none' }}>
            {system.notes.map((n, i) => (
              <li key={i} style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.25rem' }}>
                <span>·</span><span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {loads.length === 0 ? (
        <div className="state-card">
          <div className="state-icon">🔧</div>
          <h2>{t('system.dataSoon.title')}</h2>
          <p>{t('system.dataSoon.body')}</p>
        </div>
      ) : (
        <>
          <p className="section-title">{t('section.chooseLoad')}</p>
          <div className="load-list">
            {loads.map(load => (
              <button
                key={load.id}
                className="load-item"
                id={`load-${load.id}`}
                onClick={() => navigate(`/m/${machineId}/s/${systemId}/l/${load.id}`)}
                aria-label={`${load.breaker} — ${load.name} in panel ${load.panel}`}
              >
                <span className="load-breaker">{load.breaker}</span>
                <span className="load-name">{load.name}</span>
                <span className="load-panel">{load.panel}</span>
                <span className="load-arrow">‹</span>
              </button>
            ))}
          </div>
        </>
      )}

      <footer className="footer">{t('footer.warning')}</footer>
    </main>
  )
}

function StateCard({ icon, title, body }) {
  return (
    <div className="state-card">
      <div className="state-icon">{icon}</div>
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  )
}
