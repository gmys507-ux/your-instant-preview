import { useState } from 'react'
import dashboardData from '../data/dashboard.json'
import type { DashboardData, KPI } from '../lib/types'
import { Section } from '../components/ui/Section'
import { Badge } from '../components/ui/Badge'
import { KPIRow } from '../components/dashboard/KPIRow'
import { KPISideView } from '../components/dashboard/KPISideView'
import { CausalDecomposition } from '../components/dashboard/CausalDecomposition'
import { UserDataSection } from '../components/dashboard/UserDataSection'
import { BridgeInsight } from '../components/dashboard/BridgeInsight'
import { AIInsightCards } from '../components/dashboard/AIInsightCards'

const data = dashboardData as DashboardData

export function DashboardPage() {
  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null)

  return (
    <div className="px-8 mt-8 pb-20">
      {/* 헤더 */}
      <Section
        eyebrow="DASHBOARD · MARKETING INTELLIGENCE"
        title="인과 분해 + 유저 데이터 워크스페이스"
        rightSlot={
          <Badge tone="indigo">
            <span className="font-inter">via AMPLITUDE · LIVE</span>
          </Badge>
        }
      >
        <p className="text-[14px] text-ink-3 leading-relaxed -mt-3 mb-6 max-w-3xl">
          결과 지표 ↔ 선행 지표 ↔ 유저 행동 데이터의 인과 사슬을 한 화면에서.
          KPI 카드를 클릭해 자세히 보거나, 자연어로 AI에게 직접 물어보세요.
        </p>
      </Section>

      {/* KPI Row */}
      <Section eyebrow="KPI · TOP METRICS" title="결과 지표 6개" className="mt-8">
        <KPIRow kpis={data.kpis} onSelect={setSelectedKPI} />
      </Section>

      {/* 인과 분해 4탭 */}
      <Section eyebrow="CAUSAL · ANALYSIS" title="인과 분해 4가지 시각화" className="mt-12">
        <CausalDecomposition data={data.causal_decomposition} />
      </Section>

      {/* 유저 데이터 */}
      <div className="mt-12">
        <UserDataSection data={data.user_data} />
      </div>

      {/* Bridge insight */}
      <div className="mt-6">
        <BridgeInsight text={data.bridge_insight} />
      </div>

      {/* AI Insights */}
      <div className="mt-12">
        <AIInsightCards insights={data.ai_insights} />
      </div>

      {/* KPI 사이드뷰 */}
      <KPISideView kpi={selectedKPI} onClose={() => setSelectedKPI(null)} />
    </div>
  )
}
