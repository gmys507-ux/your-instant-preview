import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { HomePage } from './pages/HomePage'
import { GalleryPage } from './pages/GalleryPage'
import { AssistantPage } from './pages/AssistantPage'
import { DashboardPage } from './pages/DashboardPage'
import { OnboardingTour, useFirstVisit } from './components/onboarding/OnboardingTour'

function HomeWithTour() {
  const location = useLocation()
  const tour = useFirstVisit()

  // 홈 라우트에서만 자동 시작
  const showTour = tour.active && location.pathname === '/'

  return (
    <>
      <HomePage />
      {showTour && <OnboardingTour onComplete={tour.close} />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomeWithTour />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  )
}

export default App
