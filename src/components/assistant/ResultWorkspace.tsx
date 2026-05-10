import type { ReviewResult } from '../../lib/types'
import { PlanningDocument } from './PlanningDocument'
import { ScoreSection } from './sections/ScoreSection'
import { ImprovedCopySection } from './sections/ImprovedCopySection'
import { SceneStructureSection } from './sections/SceneStructureSection'
import { CompetitorComparisonSection } from './sections/CompetitorComparisonSection'
import { InternalTopSection } from './sections/InternalTopSection'
import { ActionChipsSection } from './sections/ActionChipsSection'

type Props = {
  data: ReviewResult
  onReset: () => void
}

export function ResultWorkspace({ data, onReset }: Props) {
  const r = data.review_result

  return (
    <div className="px-8 mt-8 pb-20">
      {/* 헤더 */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-indigo-deep mb-1">
            ASSISTANT · REVIEW WORKSPACE
          </p>
          <h1 className="text-[24px] font-bold text-ink leading-tight">
            기획서 검수 결과
          </h1>
        </div>
        <button
          onClick={onReset}
          className="text-[12.5px] font-medium text-ink-3 hover:text-ink transition-colors px-3 py-1.5 rounded-button border border-rule-light hover:bg-paper"
        >
          새 검수 시작
        </button>
      </div>

      {/* 좌우 패널 */}
      <div className="flex gap-6 items-start">
        <PlanningDocument doc={data.input_planning_document} />

        <div className="flex-1 min-w-0 space-y-4">
          <ScoreSection data={r.section_1_score} delay={0} />
          <ImprovedCopySection data={r.section_2_improved_copy} delay={150} />
          <SceneStructureSection data={r.section_3_scene_structure} delay={300} />
          <CompetitorComparisonSection data={r.section_4_competitor_comparison} delay={450} />
          <InternalTopSection data={r.section_5_internal_top_comparison} delay={600} />
          <ActionChipsSection data={r.section_6_module_actions} delay={750} />
        </div>
      </div>
    </div>
  )
}
