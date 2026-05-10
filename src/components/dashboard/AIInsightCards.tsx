import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import type { AIInsight } from '../../lib/types'
import { Badge } from '../ui/Badge'

type Props = {
  insights: AIInsight[]
}

const severityConfig: Record<
  AIInsight['severity'],
  { tone: 'warning' | 'success' | 'indigo'; bg: string; label: string }
> = {
  warning: {
    tone: 'warning',
    bg: 'linear-gradient(135deg, #FBEEDA 0%, #FEF3C7 100%)',
    label: 'ATTENTION',
  },
  success: {
    tone: 'success',
    bg: 'linear-gradient(135deg, #DEF5EB 0%, #C8F0DA 100%)',
    label: 'POSITIVE',
  },
  info: {
    tone: 'indigo',
    bg: 'linear-gradient(135deg, #E8E5FB 0%, #DCD7FA 100%)',
    label: 'OPPORTUNITY',
  },
}

export function AIInsightCards({ insights }: Props) {
  const navigate = useNavigate()

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-indigo-bg border border-indigo/15 flex items-center justify-center">
          <Sparkles size={13} className="text-indigo" />
        </div>
        <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-indigo-deep">
          AI INSIGHTS · 자동 분석
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {insights.map((insight, i) => {
          const cfg = severityConfig[insight.severity]
          return (
            <div
              key={insight.id}
              className="bg-paper/85 backdrop-blur-md border border-white/60 rounded-card shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* 상단 컬러 액센트 */}
              <div
                className="h-1.5"
                style={{ background: cfg.bg, borderBottom: '1px solid rgba(0,0,0,0.04)' }}
              />

              <div className="p-5">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-inter text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">
                    INSIGHT 0{i + 1}
                  </span>
                  <Badge tone={cfg.tone}>
                    <span className="text-[9.5px] uppercase">{cfg.label}</span>
                  </Badge>
                </div>

                <p className="text-[14px] font-bold text-ink leading-tight mb-2">
                  {insight.title}
                </p>
                <p className="text-[12.5px] text-ink-3 leading-relaxed mb-4">
                  {insight.body}
                </p>

                {/* 액션 버튼들 */}
                <div className="space-y-1.5 pt-3 border-t border-rule-light">
                  {insight.actions.map((a) => (
                    <button
                      key={a}
                      onClick={() => {
                        if (a.includes('갤러리')) navigate('/gallery')
                        else if (a.includes('기획')) navigate('/assistant')
                        else alert(`${a}\n\n시연용 placeholder`)
                      }}
                      className="w-full flex items-center justify-between gap-2 text-[12.5px] font-medium text-ink-2 hover:text-indigo px-2 py-1.5 rounded-md hover:bg-indigo-bg/40 transition-colors group/btn"
                    >
                      <span>{a}</span>
                      <ArrowRight
                        size={12}
                        className="opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
