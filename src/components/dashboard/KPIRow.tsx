import type { KPI } from '../../lib/types'
import { Sparkline } from '../ui/Sparkline'
import { Badge } from '../ui/Badge'

type Props = {
  kpis: KPI[]
  onSelect: (kpi: KPI) => void
}

const arrow = { up: '↑', down: '↓', flat: '→' } as const

// 시연용 sparkline 데이터 — KPI별 임의 패턴
const sparklineByKey: Record<string, number[]> = {
  revenue: [185, 192, 200, 198, 215, 220, 232, 240],
  roas: [3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.7, 3.8],
  ad_spend: [68, 67, 66, 65, 64, 64, 63, 63],
  ctr: [2.4, 2.3, 2.3, 2.2, 2.2, 2.1, 2.1, 2.1],
  cvr: [3.5, 3.7, 3.8, 4.0, 4.1, 4.2, 4.2, 4.3],
  new_signups: [980, 1020, 1080, 1110, 1180, 1200, 1240, 1284],
}

export function KPIRow({ kpis, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {kpis.map((k, i) => {
        const tone =
          k.delta_direction === 'up' ? 'success' : k.delta_direction === 'down' ? 'danger' : 'neutral'
        return (
          <button
            key={k.key}
            onClick={() => onSelect(k)}
            className="text-left bg-paper/85 backdrop-blur-md border border-white/60 rounded-card p-4 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 hover:bg-paper transition-all duration-200 cursor-pointer animate-fade-in-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.5px] text-ink-3 leading-4 mb-2">
              {k.label}
            </p>
            <p className="font-inter tabular-nums text-[22px] font-bold text-ink leading-7 mb-2">
              {k.value}
            </p>
            <div className="flex items-center justify-between gap-2">
              <Badge tone={tone}>
                <span>{arrow[k.delta_direction]}</span>
                <span className="tabular-nums">{k.delta}</span>
              </Badge>
              <Sparkline
                data={sparklineByKey[k.key] ?? [1, 2, 3, 4, 5]}
                width={56}
                height={18}
                color={k.delta_direction === 'down' ? '#DC2626' : '#5B4FE5'}
                isAlert={k.delta_direction === 'down'}
              />
            </div>
          </button>
        )
      })}
    </div>
  )
}
