import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Eyebrow } from '../ui/Eyebrow'

type Tone = 'amber' | 'red' | 'indigo'

const actions: { label: string; tone: Tone; path: string }[] = [
  { label: '3건 검수 대기 — 지금 처리하기', tone: 'amber', path: '/assistant' },
  { label: 'ROAS 하락 신호 — 원인 분석하기', tone: 'red', path: '/dashboard' },
  { label: '새 경쟁사 광고 8건 — 갤러리에서 보기', tone: 'indigo', path: '/gallery' },
]

const toneClass: Record<Tone, string> = {
  amber: 'border-rule text-warning-deep bg-warning-bg',
  red: 'border-rule text-danger-deep bg-danger-bg',
  indigo: 'border-rule text-indigo-deep bg-indigo-bg',
}

export function ActionStrip() {
  const navigate = useNavigate()

  return (
    <section className="px-8 pb-24">
      <Eyebrow className="mb-3">TODAY · ACTIONS</Eyebrow>
      <h2 className="font-serif italic text-h1 text-ink mb-8">
        지금 해야 할 일
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((a) => (
          <button
            key={a.label}
            onClick={() => navigate(a.path)}
            className={`group text-left p-5 rounded-card border ${toneClass[a.tone]} hover:-translate-y-0.5 hover:shadow-card transition-all duration-200`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-body-sm leading-snug font-medium">
                {a.label}
              </span>
              <ArrowRight
                size={16}
                className="shrink-0 group-hover:translate-x-0.5 transition-transform"
              />
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
