import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, Image, Sparkles, BarChart3, BookOpen } from 'lucide-react'
import { Section } from '../ui/Section'
import { Badge } from '../ui/Badge'
import { Sparkline } from '../ui/Sparkline'

type Module = {
  icon: typeof Image
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
    icon: Image,
    eyebrow: 'GALLERY',
    title: '갤러리',
    preview: '경쟁사 광고를 한 화면에서 발견하고 분류합니다.',
    metric: { label: '어제 새 광고', value: '8', unit: '건' },
    delta: { value: '+33%', direction: 'up', tone: 'success' },
    sparkline: [3, 4, 5, 4, 6, 5, 7, 8],
    path: '/gallery',
    alertCount: 3,
  },
  {
    icon: Sparkles,
    eyebrow: 'ASSISTANT',
    title: '어시스턴트',
    preview: '사내 가이드 + 타율 데이터로 콘텐츠를 검수합니다.',
    metric: { label: '평균 일치도', value: '71', unit: '%' },
    delta: { value: '-4%', direction: 'down', tone: 'danger' },
    sparkline: [78, 76, 74, 75, 73, 72, 71, 71],
    path: '/assistant',
    alertCount: 3,
  },
  {
    icon: BarChart3,
    eyebrow: 'DASHBOARD',
    title: '대시보드',
    preview: '결과 ↔ 선행 지표 ↔ 유저 데이터의 인과를 추적합니다.',
    metric: { label: 'ROAS', value: '3.8', unit: 'x' },
    delta: { value: '+12%', direction: 'up', tone: 'success' },
    sparkline: [3.2, 3.3, 3.4, 3.6, 3.5, 3.7, 3.8, 3.8],
    path: '/dashboard',
  },
  {
    icon: BookOpen,
    eyebrow: 'GUIDE',
    title: '가이드',
    preview: '사내 콘텐츠 가이드와 타율 상위 패턴을 참조합니다.',
    metric: { label: '버전', value: '3.3' },
    delta: { value: 'NEW', direction: 'flat', tone: 'neutral' },
    sparkline: [1, 1, 2, 2, 3, 3, 3, 3],
    path: '/',
  },
]

export function ModuleCards() {
  const navigate = useNavigate()

  return (
    <Section
      eyebrow="WORKSPACES"
      title="한 화면에서 모두"
      className="px-8 mt-14"
    >
      <p className="text-[14.5px] text-ink-3 leading-relaxed -mt-4 mb-6 max-w-2xl">
        갤러리에서 발견하고, 어시스턴트로 검수하고, 대시보드로 측정합니다.
        분리된 도구 사이를 옮겨 다닐 필요가 없어요.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((m, i) => {
          const Icon = m.icon
          return (
            <div
              key={m.title}
              onClick={() => navigate(m.path)}
              className="group bg-paper/85 border border-white/60 backdrop-blur-md rounded-card p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 hover:bg-paper transition-all duration-200 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* TOP — icon box + eyebrow + alert */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shadow-card group-hover:shadow-card-hover transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #E8E5FB 0%, #DCD7FA 100%)',
                    }}
                  >
                    <Icon size={20} className="text-indigo" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-ink-3 leading-4">
                      {m.eyebrow}
                    </p>
                    <h3 className="mt-0.5 text-[20px] font-bold text-ink leading-tight">
                      {m.title}
                    </h3>
                  </div>
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
                      <Badge
                        tone={
                          m.delta.tone === 'neutral'
                            ? 'neutral'
                            : m.delta.tone === 'warning'
                            ? 'warning'
                            : m.delta.tone
                        }
                        className="ml-1"
                      >
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
          )
        })}
      </div>
    </Section>
  )
}
