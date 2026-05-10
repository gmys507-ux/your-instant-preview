import { useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { AISidePanel } from './AISidePanel'

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
      {/* Production-grade header — sticky, backdrop-blur, soft shadow */}
      <header
        className="sticky top-0 z-30 border-b border-rule shadow-header"
        style={{
          background: 'rgba(250, 250, 247, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-8 h-14 flex items-center justify-between gap-6">
          {/* LEFT — logo */}
          <Link to="/" className="flex items-baseline gap-2 shrink-0">
            <span className="font-serif italic text-[20px] font-medium text-indigo leading-none">
              Prism
            </span>
            <span className="font-inter text-[12px] font-medium text-ink-3">
              Marketing Content OS
            </span>
          </Link>

          {/* CENTER — tabs */}
          <nav className="flex items-center gap-0.5">
            {tabs.map((tab) => {
              const isActive = location.pathname === tab.path
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`px-3.5 py-1.5 rounded-md text-[13.5px] transition-colors duration-150 ${
                    isActive
                      ? 'text-indigo bg-indigo-bg font-semibold'
                      : 'text-ink-3 hover:text-ink hover:bg-bg-2 font-medium'
                  }`}
                >
                  {tab.label}
                </Link>
              )
            })}
          </nav>

          {/* RIGHT — connected pill */}
          <div className="flex items-center gap-2 shrink-0">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-badge bg-success-bg"
              title="Amplitude 연동 활성"
            >
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-success animate-ping opacity-60" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-success" />
              </span>
              <span className="font-inter text-[11px] font-semibold text-success-deep tracking-wide uppercase">
                Connected · Amplitude
              </span>
            </span>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-[1440px] mx-auto">{children}</main>

      {/* Floating ✦ button */}
      <button
        onClick={() => setPanelOpen(true)}
        aria-label="AI 어시스턴트 열기"
        className="fixed bottom-6 left-6 w-12 h-12 rounded-full bg-ink text-paper flex items-center justify-center shadow-card-hover hover:scale-105 hover:shadow-lg transition-all duration-200 z-40 group"
      >
        <Sparkles size={18} className="group-hover:rotate-12 transition-transform duration-300" />
      </button>

      <AISidePanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        currentPath={location.pathname}
      />
    </div>
  )
}
