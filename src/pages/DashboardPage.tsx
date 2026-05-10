import { Eyebrow } from '../components/ui/Eyebrow'

export function DashboardPage() {
  return (
    <div className="px-8 py-32 text-center max-w-2xl mx-auto">
      <Eyebrow>DASHBOARD · ROUND 3</Eyebrow>
      <h1 className="font-serif italic text-display mt-6 text-ink">
        대시보드
      </h1>
      <p className="mt-6 text-body-lg text-ink-3 leading-relaxed">
        Round 3에서 KPI 6 + 인과 분해 4탭 (Sankey · 노드 · Funnel · 멀티-레이어) +
        유저 데이터 3차트 + 연결점 인사이트 + AI 인사이트 카드 3으로 구현됩니다.
      </p>
      <p className="mt-3 text-body-sm text-ink-4">
        결과 지표 ↔ 선행 지표 ↔ 유저 행동 데이터의 인과 사슬을 한 화면에서
      </p>
    </div>
  )
}
