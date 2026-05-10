import { useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sparkles, LogIn } from 'lucide-react'
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
    <div className="min-h-screen text-ink">
      {/* Glass header — sticky, backdrop-blur, lavender 톤과 융합 */}
      <header
        className="sticky top-0 z-30 border-b border-white/40"
        style={{
          background: 'rgba(250, 250, 255, 0.7)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-8 h-16 flex items-center justify-between gap-6">
          {/* LEFT — AI 로고 박스만 */}
          <Link
            to="/"
            className="shrink-0 group"
            aria-label="홈으로"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-card group-hover:shadow-card-hover transition-all duration-200 group-hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #5B4FE5 0%, #7B66FF 50%, #2E2580 100%)',
              }}
            >
              <Sparkles size={18} className="text-white" />
            </div>
          </Link>

          {/* CENTER — tabs */}
          <nav id="tour-nav" className="flex items-center gap-0.5">
            {tabs.map((tab) => {
              const isActive = location.pathname === tab.path
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`px-4 py-2 rounded-lg text-[13.5px] transition-colors duration-150 ${
                    isActive
                      ? 'text-indigo bg-white/80 backdrop-blur-sm font-semibold shadow-card'
                      : 'text-ink-3 hover:text-ink hover:bg-white/40 font-medium'
                  }`}
                >
                  {tab.label}
                </Link>
              )
            })}
          </nav>

          {/* RIGHT — Connected mini + Login button */}
          <div className="flex items-center gap-3 shrink-0">
            <span
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-badge bg-white/60 backdrop-blur-sm border border-white/50"
              title="Amplitude 연동 활성"
            >
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-success animate-ping opacity-50" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-success" />
              </span>
              <span className="font-inter text-[10.5px] font-semibold text-success-deep tracking-wide uppercase">
                Connected
              </span>
            </span>

            <button
              onClick={() => alert('로그인 흐름은 추후 연결 예정입니다 (시연용 placeholder).')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-button bg-ink text-paper text-[13px] font-medium hover:bg-ink-2 transition-colors duration-200 shadow-card"
            >
              <LogIn size={14} />
              <span>로그인</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-[1440px] mx-auto">{children}</main>

      {/* Floating ✦ button (우하단) */}
      <button
        id="tour-ai-button"
        onClick={() => setPanelOpen(true)}
        aria-label="AI 어시스턴트 열기"
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center shadow-card-hover hover:scale-105 hover:shadow-lg transition-all duration-200 z-40 group"
        style={{
          background: 'linear-gradient(135deg, #5B4FE5 0%, #2E2580 100%)',
        }}
      >
        <Sparkles
          size={18}
          className="text-white group-hover:rotate-12 transition-transform duration-300"
        />
      </button>

      <AISidePanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        currentPath={location.pathname}
      />
    </div>
  )
}
