import { Routes, Route, Navigate } from 'react-router-dom'
import { DataProvider } from './DataContext'
import { LanguageProvider } from './LanguageContext'
import Header from './components/Header'
import MachinePage from './pages/MachinePage'
import SystemPage from './pages/SystemPage'
import LoadPage from './pages/LoadPage'
import QrPage from './pages/QrPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <LanguageProvider>
      <DataProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/m/rtg-crc" replace />} />
          <Route path="/m" element={<Navigate to="/m/rtg-crc" replace />} />
          <Route path="/m/:machineId" element={<MachinePage />} />
          <Route path="/m/:machineId/s/:systemId" element={<SystemPage />} />
          <Route path="/m/:machineId/s/:systemId/l/:loadId" element={<LoadPage />} />
          <Route path="/qr" element={<QrPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DataProvider>
    </LanguageProvider>
  )
}
