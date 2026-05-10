import { TrendingUp } from 'lucide-react'
import type { ReviewSection5 } from '../../../lib/types'
import { Badge } from '../../ui/Badge'

export function InternalTopSection({ data, delay = 0 }: { data: ReviewSection5; delay?: number }) {
  const m = data.predicted_metrics
  return (
    <section
      className="bg-paper/85 backdrop-blur-md border border-white/60 rounded-card shadow-card p-6 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-indigo-deep mb-1.5">
        {data.label}
      </p>
      <h3 className="text-[18px] font-bold text-ink leading-tight mb-1">
        사내 타율 상위 비교
      </h3>
      <p className="text-[12.5px] text-ink-3 leading-relaxed mb-5">{data.subtitle}</p>

      {/* 핵심 차이 */}
      <div
        className="rounded-card p-4 mb-5"
        style={{
          background:
            'linear-gradient(135deg, #FBEEDA 0%, #FEF3C7 100%)',
          border: '1px solid rgba(217, 119, 6, 0.2)',
        }}
      >
        <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-warning-deep mb-2">
          KEY DIFFERENCE
        </p>
        <p className="text-[14px] font-bold text-ink mb-2 leading-snug">
          {data.key_difference}
        </p>
        <p className="text-[12px] text-ink-2 leading-relaxed">
          📊 {data.supporting_data}
        </p>
      </div>

      {/* ROAS 시뮬레이션 */}
      <div
        className="rounded-card p-5 mb-4"
        style={{
          background:
            'linear-gradient(135deg, #DEF5EB 0%, #E8E5FB 100%)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={14} className="text-success-deep" />
          <span className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-success-deep">
            예상 ROAS 시뮬레이션
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-inter text-[10px] uppercase tracking-wide text-ink-3 mb-1">
              CURRENT
            </p>
            <p className="font-inter tabular-nums text-[28px] font-bold text-ink-2 leading-none">
              {m.current_baseline_roas}
              <span className="text-[16px] text-ink-3 ml-1">x</span>
            </p>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-rule via-indigo to-success" />
          <div className="text-right">
            <p className="font-inter text-[10px] uppercase tracking-wide text-success-deep mb-1">
              IF APPLIED
            </p>
            <p className="font-inter tabular-nums text-[36px] font-bold text-success-deep leading-none">
              {m.if_improvements_applied_roas}
              <span className="text-[18px] ml-1">x</span>
            </p>
          </div>
          <Badge tone="success">
            <span className="font-inter tabular-nums">{m.uplift_percentage}</span>
          </Badge>
        </div>
      </div>

      {/* uplift breakdown */}
      <div>
        <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-ink-3 mb-3">
          UPLIFT BREAKDOWN
        </p>
        <div className="space-y-1.5">
          {m.uplift_breakdown.map((u, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-3 p-3 bg-bg-2/50 border border-rule-light rounded-lg"
            >
              <span className="text-[13px] font-medium text-ink">{u.factor}</span>
              <span className="font-inter tabular-nums text-[12.5px] font-bold text-success-deep">
                {u.uplift}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[11.5px] italic text-ink-3 mt-4 leading-relaxed">
        ⓘ Confidence · {data.confidence}
      </p>
    </section>
  )
}
