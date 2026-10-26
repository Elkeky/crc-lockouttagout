import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useData, getMachine, findLoadByBreaker } from '../DataContext'
import { useLang } from '../LanguageContext'
import Breadcrumb from '../components/Breadcrumb'
import SearchBox from '../components/SearchBox'
import GantryIcon from '../components/GantryIcon'

// System icons — non-gantry use emoji, gantry uses the SVG component
const SYSTEM_ICONS = {
  hoist:     { type: 'emoji', value: '🏗️' },
  skew:      { type: 'emoji', value: '↔️' },
  shift:     { type: 'emoji', value: '🔁' },
  hydraulic: { type: 'emoji', value: '⚙️' },
  gantry:    { type: 'svg',   value: GantryIcon },
  trolley:   { type: 'emoji', value: '🛤️' },
}

function SystemIcon({ systemId }) {
  const def = SYSTEM_ICONS[systemId] ?? { type: 'emoji', value: '⚡' }
  if (def.type === 'svg') {
    const Comp = def.value
    return <Comp size={44} />
  }
  return <span style={{ fontSize: '2rem', lineHeight: 1 }}>{def.value}</span>
}

export default function MachinePage() {
  const { machineId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { data, error } = useData()
  const { t } = useLang()

  const machine = data ? getMachine(data, machineId) : null

  // Hash jump: #q70 → navigate directly to that load
  useEffect(() => {
    if (!machine || !location.hash) return
    const tag = location.hash.replace('#', '')
    const found = findLoadByBreaker(machine, tag)
    if (found) {
      navigate(`/m/${machineId}/s/${found.system.id}/l/${found.load.id}`, { replace: true })
    }
  }, [machine, location.hash])

  if (error) return <StateCard icon="⚠️" title={t('state.error')} body={error} />
  if (!data)  return <StateCard icon="⏳" title={t('state.loading')} />
  if (!machine) return <StateCard icon="🔍" title={t('state.machineNotFound')} />

  return (
    <main className="page">
      <Breadcrumb crumbs={[{ label: machine.name }]} />
      <SearchBox machine={machine} />

      <p className="section-title">{t('section.chooseSystem')}</p>
      <div className="system-grid">
        {machine.systems.map(system => {
          const count = system.loads.length
          const isEmpty = count === 0
          return (
            <button
              key={system.id}
              className={`system-btn ${isEmpty ? 'empty' : ''}`}
              onClick={() => !isEmpty && navigate(`/m/${machineId}/s/${system.id}`)}
              disabled={isEmpty}
              id={`sys-${system.id}`}
              aria-label={`${system.name}, ${count} ${t('system.loads.suffix')}`}
            >
              <span className="system-icon">
                <SystemIcon systemId={system.id} />
              </span>
              <span>{system.name}</span>
              <span className="system-load-count">
                {isEmpty
                  ? t('system.empty.label')
                  : `${count} ${t('system.loads.suffix')}`
                }
              </span>
            </button>
          )
        })}
      </div>

      <PageFooter t={t} />
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

export function PageFooter({ t }) {
  return (
    <footer className="footer">{t('footer.warning')}</footer>
  )
}
