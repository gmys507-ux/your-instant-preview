import { useNavigate } from 'react-router-dom'
import { ArrowRight, Inbox, TrendingDown, Image } from 'lucide-react'
import { Section } from '../ui/Section'
import { Badge } from '../ui/Badge'

type Tone = 'warning' | 'danger' | 'indigo'

const actions: {
  icon: typeof Inbox
  eyebrow: string
  label: string
  detail: string
  count: { value: string; tone: Tone }
  path: string
}[] = [
  {
    icon: Inbox,
    eyebrow: 'PENDING REVIEW',
    label: '검수 대기 콘텐츠 처리',
    detail: '평균 가이드 일치도 71% — 1차 어시스턴트 검수 후 팀 리더 컨펌',
    count: { value: '3건', tone: 'warning' },
    path: '/assistant',
  },
  {
    icon: TrendingDown,
    eyebrow: 'SIGNAL · CATEGORY FATIGUE',
    label: 'ROAS 하락 신호 — 원인 분석',
    detail: '화장솜 카테고리 콘텐츠 피로도 +18% 누적 — 인과 분해 필요',
    count: { value: '-18%', tone: 'danger' },
    path: '/dashboard',
  },
  {
    icon: Image,
    eyebrow: 'NEW · COMPETITOR FEED',
    label: '경쟁사 새 광고 피드 확인',
    detail: '8건 추가 — Before/After 컨셉 트렌드 가속',
    count: { value: '8건', tone: 'indigo' },
    path: '/gallery',
  },
]

const toneRing: Record<Tone, string> = {
  warning: 'group-hover:ring-warning',
  danger: 'group-hover:ring-danger',
  indigo: 'group-hover:ring-indigo',
}

export function ActionStrip() {
  const navigate = useNavigate()

  return (
    <Section
      eyebrow="TODAY · ACTIONS"
      title="지금 해야 할 일"
      className="px-8 mt-12 pb-20"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((a, i) => {
          const Icon = a.icon
          return (
            <button
              key={a.label}
              onClick={() => navigate(a.path)}
              className={`group text-left bg-paper border border-rule rounded-card p-5 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 ring-1 ring-transparent ${toneRing[a.count.tone]} animate-fade-in-up`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-bg-2 border border-rule-light flex items-center justify-center text-ink-3 group-hover:bg-indigo-bg group-hover:text-indigo group-hover:border-indigo/30 transition-colors">
                  <Icon size={16} />
                </div>
                <Badge tone={a.count.tone}>{a.count.value}</Badge>
              </div>
              <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-ink-3 mb-1.5">
                {a.eyebrow}
              </p>
              <p className="text-[14.5px] font-semibold text-ink leading-snug mb-2">
                {a.label}
              </p>
              <p className="text-[12.5px] text-ink-3 leading-relaxed">
                {a.detail}
              </p>
              <div className="mt-4 pt-3 border-t border-rule-light flex items-center justify-end gap-1 text-[12px] font-medium text-ink-3 group-hover:text-indigo transition-colors">
                <span>처리하기</span>
                <ArrowRight
                  size={13}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </div>
            </button>
          )
        })}
      </div>
    </Section>
  )
}
