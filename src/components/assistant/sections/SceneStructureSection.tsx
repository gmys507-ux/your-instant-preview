import type { ReviewSection3 } from '../../../lib/types'
import { Badge } from '../../ui/Badge'

export function SceneStructureSection({ data, delay = 0 }: { data: ReviewSection3; delay?: number }) {
  return (
    <section
      className="bg-paper/85 backdrop-blur-md border border-white/60 rounded-card shadow-card p-6 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-indigo-deep mb-1.5">
            {data.label}
          </p>
          <h3 className="text-[18px] font-bold text-ink leading-tight">
            씬 구성 — 이미지·영상 배치
          </h3>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <Badge tone="indigo">
            <span className="font-inter tabular-nums">{data.total_duration}</span>
          </Badge>
          <p className="font-inter text-[11px] text-ink-3">
            최적 채널 · {data.channel_optimal}
          </p>
        </div>
      </div>

      {/* 타임라인 */}
      <div className="space-y-3">
        {data.scenes.map((scene, i) => (
          <div
            key={i}
            className="flex gap-4 p-4 bg-bg-2/40 border border-rule-light rounded-lg hover:bg-bg-2/70 transition-colors"
          >
            {/* 시간 컬럼 */}
            <div className="shrink-0 w-16">
              <p className="font-inter font-bold text-indigo tabular-nums text-[13px]">
                {scene.time}
              </p>
              <p className="font-inter text-[10px] uppercase tracking-wide text-ink-4 mt-0.5">
                Scene {i + 1}
              </p>
            </div>

            {/* 콘텐츠 */}
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-bold text-ink mb-2 leading-tight">
                {scene.title}
              </p>
              <p className="text-[12.5px] text-ink-2 leading-relaxed mb-1.5">
                <span className="font-inter font-semibold text-ink-3">VISUAL · </span>
                {scene.visual}
              </p>
              <p className="text-[12.5px] text-ink-2 leading-relaxed mb-3">
                <span className="font-inter font-semibold text-ink-3">VOICE · </span>
                {scene.voice}
              </p>

              {/* 변경점 */}
              {scene.key_change_from_original !== '유지' && (
                <div className="bg-indigo-bg/40 border border-indigo/15 rounded-md px-3 py-2 mb-2">
                  <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.5px] text-indigo-deep mb-0.5">
                    Change
                  </p>
                  <p className="text-[12px] text-ink-2 leading-relaxed">
                    {scene.key_change_from_original}
                  </p>
                </div>
              )}

              <p className="text-[11.5px] italic text-ink-3 leading-relaxed">
                ⓘ {scene.rationale}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
