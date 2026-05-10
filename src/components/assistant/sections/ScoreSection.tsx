import { Check, AlertTriangle, X } from 'lucide-react'
import type { ReviewSection1, ScoreItemStatus } from '../../../lib/types'
import { Badge } from '../../ui/Badge'

const StatusIcon: Record<ScoreItemStatus, { icon: React.ComponentType<{ size?: number; className?: string }>; tone: 'success' | 'warning' | 'danger' }> = {
  good: { icon: Check, tone: 'success' },
  warning: { icon: AlertTriangle, tone: 'warning' },
  critical: { icon: X, tone: 'danger' },
}

export function ScoreSection({ data, delay = 0 }: { data: ReviewSection1; delay?: number }) {
  const { alignment_score, score_max, summary, item_comments } = data
  const tone = alignment_score >= 80 ? 'success' : alignment_score >= 60 ? 'warning' : 'danger'
  const ringColor =
    alignment_score >= 80 ? '#10B981' : alignment_score >= 60 ? '#D97706' : '#DC2626'

  const r = 38
  const c = 2 * Math.PI * r
  const offset = c - (alignment_score / 100) * c

  return (
    <section
      className="bg-paper/85 backdrop-blur-md border border-white/60 rounded-card shadow-card p-6 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-indigo-deep mb-1.5">
            {data.label}
          </p>
          <h3 className="text-[18px] font-bold text-ink leading-tight mb-2">
            가이드 일치도 점수
          </h3>
          <p className="text-[13px] text-ink-3 leading-relaxed max-w-md">
            {summary}
          </p>
        </div>

        {/* Score ring */}
        <div className="relative w-[100px] h-[100px] shrink-0">
          <svg className="absolute inset-0 -rotate-90" width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="6" />
            <circle
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke={ringColor}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 1.2s ease-out 0.3s' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-inter tabular-nums text-[28px] font-bold text-ink leading-none">
              {alignment_score}
            </span>
            <span className="font-inter text-[10px] text-ink-3 mt-1 uppercase tracking-wide">
              / {score_max}
            </span>
          </div>
        </div>
      </div>

      {/* 항목별 코멘트 */}
      <div className="space-y-2 pt-4 border-t border-rule-light">
        {item_comments.map((c, i) => {
          const cfg = StatusIcon[c.status]
          const Icon = cfg.icon
          return (
            <div
              key={i}
              className="flex items-start gap-3 p-3 bg-bg-2/50 rounded-lg border border-rule-light"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  cfg.tone === 'success'
                    ? 'bg-success-bg text-success-deep'
                    : cfg.tone === 'warning'
                    ? 'bg-warning-bg text-warning-deep'
                    : 'bg-danger-bg text-danger-deep'
                }`}
              >
                <Icon size={12} className="stroke-[3]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[13px] font-bold text-ink">{c.item}</span>
                  <Badge tone="neutral">
                    <span className="font-inter">{c.guide_ref}</span>
                  </Badge>
                </div>
                <p className="text-[12.5px] text-ink-2 leading-relaxed">{c.text}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* 상단 토널 액센트 (작은 표시) */}
      <div className="hidden">
        <Badge tone={tone}>{tone}</Badge>
      </div>
    </section>
  )
}
