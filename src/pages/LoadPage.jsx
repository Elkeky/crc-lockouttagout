import { useParams, useNavigate } from 'react-router-dom'
import { useData, getMachine, getSystem, getLoad } from '../DataContext'
import { useLang } from '../LanguageContext'
import Breadcrumb from '../components/Breadcrumb'
import SearchBox from '../components/SearchBox'
import Checklist from '../components/Checklist'

export default function LoadPage() {
  const { machineId, systemId, loadId } = useParams()
  const navigate = useNavigate()
  const { data, error } = useData()
  const { t } = useLang()

  if (error) return <StateCard icon="⚠️" title={t('state.error')} body={error} />
  if (!data)  return <StateCard icon="⏳" title={t('state.loading')} />

  const machine = getMachine(data, machineId)
  const system  = machine ? getSystem(machine, systemId) : null
  const load    = system  ? getLoad(system, loadId) : null

  if (!machine || !system || !load) {
    return <StateCard icon="🔍" title={t('state.loadNotFound.title')} body={t('state.loadNotFound.body')} />
  }

  function findRelatedLoad(breakerId) {
    for (const sys of machine.systems)
      for (const ld of sys.loads)
        if (ld.breaker === breakerId) return { system: sys, load: ld }
    return null
  }

  return (
    <main className="page">
      <Breadcrumb crumbs={[
        { label: machine.name, to: `/m/${machineId}` },
        { label: system.name,  to: `/m/${machineId}/s/${systemId}` },
        { label: load.name },
      ]} />
      <SearchBox machine={machine} />

      {/* ── Desktop two-column wrapper ── */}
      <div className="load-desktop-grid">

        {/* ── LEFT: danger tag + related + other sources ── */}
        <div className="load-col-left">

          {/* DANGER TAG */}
          <div className="danger-tag" role="region" aria-label="بطاقة الخطر / Danger Tag">
            <div className="danger-tag-header">{t('load.danger.header')}</div>
            <div className="danger-tag-icon">🔴</div>
            <div className="danger-tag-body">
              <div className="danger-tag-label">{t('load.open')}</div>
              <div className="danger-tag-breaker">{load.breaker}</div>
              <div className="danger-tag-panel-row">
                <span>{t('load.inPanel')}</span>
                <span className="danger-tag-panel-val">{load.panel}</span>
              </div>
              <div style={{ marginTop: '0.75rem', fontSize: '0.9rem', opacity: 0.85, fontWeight: 600 }}>
                {load.name}
              </div>
            </div>
          </div>

          {/* Safety Notes */}
          {load.notes?.length > 0 && (
            <div className="info-card">
              <div className="info-card-header"><span>⚠️</span>{t('load.safetyNotes')}</div>
              <div className="info-card-body">
                <ul className="notes-list">
                  {load.notes.map((n, i) => <li key={i}>{n}</li>)}
                </ul>
              </div>
            </div>
          )}

          {/* Related Breakers */}
          {load.relatedBreakers?.length > 0 && (
            <div className="info-card">
              <div className="info-card-header"><span>🔗</span>{t('load.relatedBreakers')}</div>
              <div className="info-card-body">
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  {t('load.relatedBreakers.hint')}
                </p>
                <div className="chip-row">
                  {load.relatedBreakers.map(br => {
                    const found = findRelatedLoad(br)
                    return found ? (
                      <button
                        key={br} className="chip"
                        onClick={() => navigate(`/m/${machineId}/s/${found.system.id}/l/${found.load.id}`)}
                        id={`chip-${br}`}
                        aria-label={`Go to ${br}`}
                      >{br}</button>
                    ) : (
                      <span key={br} className="chip" style={{ opacity: 0.6 }}>{br}</span>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Other Power Sources */}
          <div className="info-card">
            <div className="info-card-header"><span>🔌</span>{t('load.otherSources')}</div>
            <div className="info-card-body">
              {!load.otherSources || load.otherSources.length === 0 ? (
                <div className="other-sources-warning">
                  <span>⚠</span>
                  <span>{t('load.otherSources.warning')}</span>
                </div>
              ) : (
                load.otherSources.map((src, i) => (
                  <div key={i} className="other-sources-item">
                    <span className="other-sources-label">{src.label}</span>
                    <span>{src.description}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT: checklist ── */}
        <div className="load-col-right">
          <Checklist breaker={load.breaker} panel={load.panel} />
        </div>

      </div>{/* end desktop grid */}

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
