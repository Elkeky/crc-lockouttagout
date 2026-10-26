import { useState, useEffect, createContext, useContext } from 'react'

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/machines.json`)
      .then(r => {
        if (!r.ok) throw new Error('فشل تحميل بيانات الأجهزة')
        return r.json()
      })
      .then(setData)
      .catch(e => setError(e.message))
  }, [])

  return (
    <DataContext.Provider value={{ data, error }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext)
}

// ─── Helper functions ──────────────────────────────────────────────────────

export function getMachine(data, machineId) {
  return data?.machines?.find(m => m.id === machineId) ?? null
}

export function getSystem(machine, systemId) {
  return machine?.systems?.find(s => s.id === systemId) ?? null
}

export function getLoad(system, loadId) {
  return system?.loads?.find(l => l.id === loadId) ?? null
}

/**
 * Find a load by breaker id (case-insensitive) within a machine.
 * Returns { system, load } or null.
 */
export function findLoadByBreaker(machine, breakerId) {
  if (!machine) return null
  const q = breakerId.toLowerCase()
  for (const system of machine.systems) {
    for (const load of system.loads) {
      if (load.breaker.toLowerCase() === q || load.id.toLowerCase() === q) {
        return { system, load }
      }
    }
  }
  return null
}

/**
 * Search loads across all systems in a machine.
 * Matches on breaker id or name (case-insensitive).
 */
export function searchLoads(machine, query) {
  if (!machine || !query.trim()) return []
  const q = query.toLowerCase()
  const results = []
  for (const system of machine.systems) {
    for (const load of system.loads) {
      if (
        load.breaker.toLowerCase().includes(q) ||
        load.name.toLowerCase().includes(q)
      ) {
        results.push({ system, load })
      }
    }
  }
  return results
}
