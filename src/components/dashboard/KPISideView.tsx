import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'
import type { KPI } from '../../lib/types'
import { Badge } from '../ui/Badge'

type Props = {
  kpi: KPI | null
  onClose: () => void
}

const arrow = { up: '↑', down: '↓', flat: '→' } as const

// 30일 시계열 시뮬레이션 (각 KPI별)
function timeSeriesFor(key: string): { day: number; value: number }[] {
  const base: Record<string, [number, number]> = {
    revenue: [180, 245],
    roas: [3.0, 3.9],
    ad_spend: [70, 62],
    ctr: [2.5, 2.0],
    cvr: [3.4, 4.4],
    new_signups: [950, 1300],
  }
  const [start, end] = base[key] ?? [10, 100]
  return Array.from({ length: 30 }, (_, i) => {
    const t = i / 29
    const noise = (Math.sin(i * 1.7) + Math.cos(i * 0.9)) * (Math.abs(end - start) * 0.04)
    return { day: i + 1, value: +(start + (end - start) * t + noise).toFixed(2) }
  })
}

const segments = [
  { label: '30대 여성', value: 38 },
  { label: '20대 여성', value: 27 },
  { label: '40대 여성', value: 18 },
  { label: '20-40 남성', value: 17 },
]

const linkedMetrics: Record<string, { label: string; value: string; tone: 'success' | 'danger' | 'neutral' }[]> = {
  revenue: [
    { label: '평균 객단가', value: '₩45,200', tone: 'success' },
    { label: '재구매율', value: '14.2%', tone: 'success' },
    { label: '환불률', value: '2.1%', tone: 'neutral' },
  ],
  roas: [
    { label: '광고비', value: '₩63M', tone: 'success' },
    { label: '매출', value: '₩2.4억', tone: 'success' },
    { label: 'CAC', value: '₩4,920', tone: 'neutral' },
  ],
  ctr: [
    { label: '노출', value: '10.5M', tone: 'neutral' },
    { label: '클릭', value: '220K', tone: 'danger' },
    { label: '평균 시청 완료율', value: '68%', tone: 'neutral' },
  ],
}

export function KPISideView({ kpi, onClose }: Props) {
  return (
    <AnimatePresence>
      {kpi && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 h-screen w-full md:w-[480px] bg-paper/95 backdrop-blur-md border-l border-white/60 z-50 flex flex-col shadow-card-hover"
          >
            <header className="h-14 border-b border-rule-light px-5 flex items-center justify-between shrink-0">
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-3">
                KPI Detail · {kpi.key}
              </p>
              <button
                onClick={onClose}
                aria-label="닫기"
                className="text-ink-3 hover:text-ink p-1.5 rounded-md hover:bg-bg-2 transition-colors"
              >
                <X size={16} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-ink-3 mb-2">
                  {kpi.label}
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="font-inter tabular-nums text-[40px] font-bold text-ink leading-none">
                    {kpi.value}
                  </span>
                  <Badge tone={kpi.delta_direction === 'up' ? 'success' : kpi.delta_direction === 'down' ? 'danger' : 'neutral'}>
                    <span>{arrow[kpi.delta_direction]}</span>
                    <span className="tabular-nums">{kpi.delta}</span>
                    <span className="font-normal opacity-70">{kpi.period}</span>
                  </Badge>
                </div>
              </div>

              {/* 시계열 */}
              <section>
                <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-ink-3 mb-3">
                  최근 30일 추이
                </p>
                <div className="bg-bg-2/50 border border-rule-light rounded-card p-4 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timeSeriesFor(kpi.key)}>
                      <CartesianGrid stroke="#E8E3D5" strokeDasharray="2 4" />
                      <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#8E8B7E' }} stroke="#D8D2C2" />
                      <YAxis tick={{ fontSize: 10, fill: '#8E8B7E' }} stroke="#D8D2C2" />
                      <Tooltip
                        contentStyle={{ background: '#FFF', border: '1px solid #E8E3D5', borderRadius: 8, fontSize: 12 }}
                        labelFormatter={(d) => `Day ${d}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#5B4FE5"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </section>

              {/* 연결된 지표 */}
              {linkedMetrics[kpi.key] && (
                <section>
                  <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-ink-3 mb-3">
                    연결된 지표
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {linkedMetrics[kpi.key].map((m) => (
                      <div
                        key={m.label}
                        className="bg-bg-2/50 border border-rule-light rounded-lg p-3"
                      >
                        <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.5px] text-ink-3 mb-1">
                          {m.label}
                        </p>
                        <p className="font-inter tabular-nums text-[15px] font-bold text-ink">
                          {m.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 세그먼트 분해 (horizontal bars) */}
              <section>
                <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-ink-3 mb-3">
                  세그먼트 분해 · 기여도
                </p>
                <div className="space-y-2">
                  {segments.map((s, i) => (
                    <div key={s.label} className="flex items-center gap-3">
                      <span className="text-[12.5px] text-ink-2 w-24 shrink-0">{s.label}</span>
                      <div className="flex-1 h-2 bg-bg-2 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${s.value}%`,
                            background: i === 0 ? '#5B4FE5' : '#93C5FD',
                            transition: 'width 0.8s ease',
                          }}
                        />
                      </div>
                      <span className="font-inter tabular-nums text-[12px] text-ink-3 w-10 text-right">
                        {s.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
