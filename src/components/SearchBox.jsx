import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { searchLoads } from '../DataContext'
import { useLang } from '../LanguageContext'

export default function SearchBox({ machine }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { machineId } = useParams()
  const { t } = useLang()

  const results = query.trim().length >= 1 ? searchLoads(machine, query) : []

  return (
    <div className="search-wrap">
      <input
        className="search-input"
        type="search"
        placeholder={t('search.placeholder')}
        value={query}
        onChange={e => setQuery(e.target.value)}
        aria-label={t('search.placeholder')}
        id="loto-search"
      />
      {results.length > 0 && (
        <div className="search-results" style={{ marginTop: '0.5rem' }}>
          {results.map(({ system, load }) => (
            <button
              key={load.id}
              className="search-result-item"
              onClick={() => {
                setQuery('')
                navigate(`/m/${machineId}/s/${system.id}/l/${load.id}`)
              }}
            >
              <div className="sri-top">
                <span className="load-breaker mono">{load.breaker}</span>
                <span className="load-name">{load.name}</span>
                <span className="load-panel mono" style={{ marginInlineStart: 'auto' }}>{load.panel}</span>
              </div>
              <div className="sri-path">{machine.name} › {system.name}</div>
            </button>
          ))}
        </div>
      )}
      {query.trim().length >= 1 && results.length === 0 && (
        <div style={{ padding: '0.75rem 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {t('search.noResults')} «{query}»
        </div>
      )}
    </div>
  )
}
