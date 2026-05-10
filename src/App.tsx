import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { HomePage } from './pages/HomePage'
import { GalleryPage } from './pages/GalleryPage'
import { AssistantPage } from './pages/AssistantPage'
import { DashboardPage } from './pages/DashboardPage'

function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  )
}

export default App
