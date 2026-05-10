import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
  Cell,
} from 'recharts'
import type { DashboardData } from '../../lib/types'
import { Badge } from '../ui/Badge'

type Props = {
  data: DashboardData['user_data']
}

const COHORT_COLORS = ['#5B4FE5', '#10B981', '#EC4899']
const SEGMENT_COLORS = ['#5B4FE5', '#7B66FF', '#9B8AFF', '#C7BFFF']

export function UserDataSection({ data }: Props) {
  return (
    <div className="bg-paper/85 backdrop-blur-md border border-white/60 rounded-card shadow-card p-6">
      <div className="flex items-center justify-between gap-4 mb-5">
        <div>
          <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-indigo-deep mb-1.5">
            USER DATA
          </p>
          <h2 className="text-[18px] font-bold text-ink leading-tight">
            유저 행동 데이터
          </h2>
        </div>
        <Badge tone="indigo">
          <span className="font-inter">via AMPLITUDE</span>
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 1. Funnel */}
        <ChartBox label="유저 행동 Funnel" sub="방문 → 회원가입 → 첫 구매 → 재구매">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.funnel.stages} layout="vertical" margin={{ top: 5, right: 16, left: 8, bottom: 5 }}>
                <CartesianGrid stroke="#E8E3D5" strokeDasharray="2 4" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#8E8B7E' }} stroke="#D8D2C2" />
                <YAxis
                  dataKey="label"
                  type="category"
                  tick={{ fontSize: 11, fill: '#5C5A52' }}
                  stroke="#D8D2C2"
                  width={70}
                />
                <Tooltip
                  contentStyle={{ background: '#FFF', border: '1px solid #E8E3D5', borderRadius: 8, fontSize: 12 }}
                  formatter={(v) => [Number(v).toLocaleString(), '유저수']}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {data.funnel.stages.map((_, i) => (
                    <Cell key={i} fill={`rgba(91, 79, 229, ${1 - i * 0.18})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartBox>

        {/* 2. Retention */}
        <ChartBox label="코호트 리텐션" sub="D1 / D7 / D30">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[
                  { day: 'D1', ...Object.fromEntries(data.retention.cohorts.map((c) => [c.name, c.d1])) },
                  { day: 'D7', ...Object.fromEntries(data.retention.cohorts.map((c) => [c.name, c.d7])) },
                  { day: 'D30', ...Object.fromEntries(data.retention.cohorts.map((c) => [c.name, c.d30])) },
                ]}
              >
                <CartesianGrid stroke="#E8E3D5" strokeDasharray="2 4" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#8E8B7E' }} stroke="#D8D2C2" />
                <YAxis
                  tick={{ fontSize: 10, fill: '#8E8B7E' }}
                  stroke="#D8D2C2"
                  unit="%"
                />
                <Tooltip
                  contentStyle={{ background: '#FFF', border: '1px solid #E8E3D5', borderRadius: 8, fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} iconType="line" />
                {data.retention.cohorts.map((c, i) => (
                  <Line
                    key={c.name}
                    type="monotone"
                    dataKey={c.name}
                    stroke={COHORT_COLORS[i]}
                    strokeWidth={2}
                    dot={{ r: 3, fill: COHORT_COLORS[i] }}
                    activeDot={{ r: 5 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartBox>

        {/* 3. Segments */}
        <ChartBox label="세그먼트 전환율" sub="페르소나별 CVR">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.segments} margin={{ top: 5, right: 16, left: 0, bottom: 5 }}>
                <CartesianGrid stroke="#E8E3D5" strokeDasharray="2 4" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#8E8B7E' }} stroke="#D8D2C2" />
                <YAxis
                  tick={{ fontSize: 10, fill: '#8E8B7E' }}
                  stroke="#D8D2C2"
                  unit="%"
                />
                <Tooltip
                  contentStyle={{ background: '#FFF', border: '1px solid #E8E3D5', borderRadius: 8, fontSize: 12 }}
                  formatter={(v) => [`${v}%`, 'CVR']}
                />
                <Bar dataKey="conversion_rate" radius={[4, 4, 0, 0]}>
                  {data.segments.map((_, i) => (
                    <Cell key={i} fill={SEGMENT_COLORS[i % SEGMENT_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartBox>
      </div>
    </div>
  )
}

function ChartBox({
  label,
  sub,
  children,
}: {
  label: string
  sub: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-bg-2/50 border border-rule-light rounded-card p-4">
      <p className="text-[13px] font-semibold text-ink leading-tight mb-0.5">{label}</p>
      <p className="text-[11px] text-ink-3 mb-3">{sub}</p>
      {children}
    </div>
  )
}
