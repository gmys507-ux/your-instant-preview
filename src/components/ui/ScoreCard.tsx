import { Badge } from './Badge'
import { Sparkline } from './Sparkline'

type Props = {
  label: string // 영문 라벨 (예: 'YESTERDAY · NEW ADS')
  value: string // 표시 값 (예: '8' or '3.8' or '71%')
  unit?: string // 단위 (예: '건', 'x', '%')
  delta?: {
    value: string // '+12.4'
    direction: 'up' | 'down' | 'flat'
    tone: 'success' | 'danger' | 'warning' | 'neutral'
  }
  sparkline?: number[]
  delay?: number // ms — stagger animation
}

const arrow = { up: '↑', down: '↓', flat: '→' } as const

/**
 * Production-grade KPI scorecard.
 * GLOW:UP 기준 — label uppercase + 32px Inter tabular-nums + delta badge + sparkline
 */
export function ScoreCard({ label, value, unit, delta, sparkline, delay = 0 }: Props) {
  return (
    <div
      className="bg-paper border border-rule rounded-card p-5 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* label */}
      <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.5px] text-ink-3 leading-4 mb-2">
        {label}
      </p>

      {/* value */}
      <div className="flex items-baseline gap-1 mb-3">
        <span className="font-inter tabular-nums text-[32px] font-bold leading-[40px] text-ink">
          {value}
        </span>
        {unit && (
          <span className="font-inter tabular-nums text-base text-ink-3">
            {unit}
          </span>
        )}
      </div>

      {/* bottom row: badge + sparkline */}
      <div className="flex items-center justify-between gap-2">
        {delta ? (
          <Badge tone={delta.tone}>
            <span>{arrow[delta.direction]}</span>
            <span>{delta.value}</span>
            <span className="font-normal opacity-70">vs prev</span>
          </Badge>
        ) : (
          <span />
        )}
        {sparkline && sparkline.length > 0 && (
          <Sparkline
            data={sparkline}
            color={delta?.tone === 'danger' ? '#DC2626' : '#5B4FE5'}
            isAlert={delta?.tone === 'danger'}
          />
        )}
      </div>
    </div>
  )
}
