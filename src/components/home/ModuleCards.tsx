import { useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Section } from '../ui/Section'
import { Badge } from '../ui/Badge'
import { Sparkline } from '../ui/Sparkline'

type Module = {
  eyebrow: string
  title: string
  preview: string
  metric: { label: string; value: string; unit?: string }
  delta?: { value: string; direction: 'up' | 'down' | 'flat'; tone: 'success' | 'danger' | 'neutral' | 'warning' }
  sparkline: number[]
  path: string
  alertCount?: number
}

const arrow = { up: '↑', down: '↓', flat: '→' } as const

const modules: Module[] = [
  {
    eyebrow: 'GALLERY · COMPETITOR FEED',
    title: '갤러리',
    preview: '어제 새 광고 8건. 활발한 트렌드 — Before/After 컨셉.',
    metric: { label: 'NEW ADS', value: '8', unit: '건' },
    delta: { value: '+33%', direction: 'up', tone: 'success' },
    sparkline: [3, 4, 5, 4, 6, 5, 7, 8],
    path: '/gallery',
    alertCount: 3,
  },
  {
    eyebrow: 'ASSISTANT · REVIEW',
    title: '어시스턴트',
    preview: '검수 대기 3건. 평균 가이드 일치도 71% — 누적 하향세 감지.',
    metric: { label: 'AVG ALIGNMENT', value: '71', unit: '%' },
    delta: { value: '-4%', direction: 'down', tone: 'danger' },
    sparkline: [78, 76, 74, 75, 73, 72, 71, 71],
    path: '/assistant',
    alertCount: 3,
  },
  {
    eyebrow: 'DASHBOARD · METRICS',
    title: '대시보드',
    preview: 'ROAS 3.8 (+12%). 신규 가입 코호트 D7 retention +12%p.',
    metric: { label: 'ROAS', value: '3.8', unit: 'x' },
    delta: { value: '+12%', direction: 'up', tone: 'success' },
    sparkline: [3.2, 3.3, 3.4, 3.6, 3.5, 3.7, 3.8, 3.8],
    path: '/dashboard',
  },
  {
    eyebrow: 'GUIDE · CONTENT RULES',
    title: '가이드',
    preview: '콘텐츠 가이드 v3.3 업데이트 — 사용자 검증 패턴 보강.',
    metric: { label: 'VERSION', value: '3.3' },
    delta: { value: 'NEW', direction: 'flat', tone: 'neutral' },
    sparkline: [1, 1, 2, 2, 3, 3, 3, 3],
    path: '/',
  },
]

export function ModuleCards() {
  const navigate = useNavigate()

  return (
    <Section
      eyebrow="NOW · MARKETING"
      title="지금의 마케팅"
      className="px-8 mt-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((m, i) => (
          <div
            key={m.title}
            onClick={() => navigate(m.path)}
            className="group bg-paper border border-rule rounded-card p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 cursor-pointer animate-fade-in-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {/* TOP — eyebrow + metric */}
            <div className="flex items-start justify-between gap-3 mb-5">
              <div>
                <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.5px] text-ink-3 leading-4">
                  {m.eyebrow}
                </p>
                <h3 className="mt-2 font-serif italic text-[26px] text-ink leading-tight">
                  {m.title}
                </h3>
              </div>
              {m.alertCount && m.alertCount > 0 && (
                <Badge tone="warning">{m.alertCount} 건 대기</Badge>
              )}
            </div>

            {/* MIDDLE — preview */}
            <p className="text-[14px] text-ink-2 leading-relaxed min-h-[44px]">
              {m.preview}
            </p>

            {/* BOTTOM — KPI strip */}
            <div className="mt-5 pt-4 border-t border-rule-light flex items-end justify-between gap-3">
              <div>
                <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.5px] text-ink-3 leading-4">
                  {m.metric.label}
                </p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-inter tabular-nums text-[22px] font-bold text-ink leading-7">
                    {m.metric.value}
                  </span>
                  {m.metric.unit && (
                    <span className="font-inter text-[12px] text-ink-3">
                      {m.metric.unit}
                    </span>
                  )}
                  {m.delta && (
                    <Badge tone={m.delta.tone === 'neutral' ? 'neutral' : m.delta.tone === 'warning' ? 'warning' : m.delta.tone} className="ml-1">
                      <span>{arrow[m.delta.direction]}</span>
                      <span>{m.delta.value}</span>
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Sparkline
                  data={m.sparkline}
                  width={72}
                  height={22}
                  color={m.delta?.tone === 'danger' ? '#DC2626' : '#5B4FE5'}
                  isAlert={m.delta?.tone === 'danger'}
                />
                <ArrowUpRight
                  size={18}
                  className="text-ink-4 group-hover:text-indigo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
