import { useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { AISidePanel } from './AISidePanel'
import { Pill } from '../ui/Pill'

const tabs = [
  { path: '/', label: '홈' },
  { path: '/gallery', label: '갤러리' },
  { path: '/assistant', label: '어시스턴트' },
  { path: '/dashboard', label: '대시보드' },
]

export function AppShell({ children }: { children: ReactNode }) {
  const [panelOpen, setPanelOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-bg text-ink">
      {/* 톱 네비게이션 */}
      <nav className="h-14 border-b border-rule bg-white/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="h-full max-w-[1280px] mx-auto px-6 flex items-center justify-between gap-6">
          <Link to="/" className="font-serif italic text-h2 text-indigo shrink-0">
            Prism
          </Link>

          <div className="flex items-center gap-1">
            {tabs.map((tab) => {
              const isActive = location.pathname === tab.path
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`px-4 py-2 rounded-lg text-body-sm transition-colors ${
                    isActive
                      ? 'text-indigo bg-indigo-bg font-medium'
                      : 'text-ink-3 hover:text-ink hover:bg-bg-2'
                  }`}
                >
                  {tab.label}
                </Link>
              )
            })}
          </div>

          <Pill variant="success" className="shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-success" />
            <span className="font-mono text-tiny tracking-wider uppercase">
              Connected to Amplitude
            </span>
          </Pill>
        </div>
      </nav>

      {/* 메인 컨텐츠 */}
      <main className="max-w-[1280px] mx-auto">{children}</main>

      {/* 좌하단 floating ✦ 버튼 — 모든 페이지에 노출 */}
      <button
        onClick={() => setPanelOpen(true)}
        aria-label="AI 어시스턴트 열기"
        className="fixed bottom-6 left-6 w-11 h-11 rounded-full bg-ink text-paper flex items-center justify-center shadow-card hover:scale-105 transition-transform duration-200 z-40"
      >
        <Sparkles size={18} />
      </button>

      <AISidePanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        currentPath={location.pathname}
      />
    </div>
  )
}
