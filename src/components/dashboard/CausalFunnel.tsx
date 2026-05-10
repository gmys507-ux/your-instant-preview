import type { FunnelStage } from '../../lib/types'

type Props = {
  stages: FunnelStage[]
  channels?: string[]
}

const channels = ['Meta', 'YouTube', 'TikTok']

export function CausalFunnel({ stages }: Props) {
  const max = stages[0]?.value || 1

  return (
    <div className="w-full h-full flex flex-col">
      {/* 채널 분기 라벨 */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="font-inter text-[10.5px] uppercase tracking-[0.5px] text-ink-3">
          분기 채널 ·
        </span>
        {channels.map((c) => (
          <span
            key={c}
            className="font-inter text-[11px] font-semibold text-ink-2 px-2 py-0.5 rounded-full bg-paper border border-rule-light"
          >
            {c}
          </span>
        ))}
      </div>

      {/* Funnel 단계 */}
      <div className="flex-1 flex flex-col gap-2 px-4">
        {stages.map((s, i) => {
          const widthPercent = (s.value / max) * 100
          const colorOpacity = 1 - i * 0.15
          return (
            <div key={s.label} className="flex items-center gap-3">
              <span className="text-[12.5px] font-medium text-ink-2 w-16 shrink-0 text-right">
                {s.label}
              </span>
              <div className="flex-1 relative h-10">
                <div
                  className="h-full rounded-md flex items-center justify-end pr-3 transition-all duration-700"
                  style={{
                    width: `${Math.max(widthPercent, 8)}%`,
                    background: `linear-gradient(90deg, rgba(91, 79, 229, ${colorOpacity}) 0%, rgba(91, 79, 229, ${colorOpacity * 0.7}) 100%)`,
                  }}
                >
                  <span className="font-inter tabular-nums text-[11.5px] font-bold text-white drop-shadow-sm">
                    {s.value.toLocaleString()}
                  </span>
                </div>
              </div>
              <span className="font-inter tabular-nums text-[11px] font-semibold text-ink-3 w-14 shrink-0">
                {i === 0 ? '100%' : `${s.rate.toFixed(1)}%`}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
