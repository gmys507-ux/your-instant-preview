import type { ReviewSection2 } from '../../../lib/types'
import { Badge } from '../../ui/Badge'

export function ImprovedCopySection({ data, delay = 0 }: { data: ReviewSection2; delay?: number }) {
  return (
    <section
      className="bg-paper/85 backdrop-blur-md border border-white/60 rounded-card shadow-card p-6 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-indigo-deep mb-1.5">
        {data.label}
      </p>
      <h3 className="text-[18px] font-bold text-ink leading-tight mb-5">
        개선 카피 + 근거
      </h3>

      <div className="space-y-4">
        {data.items.map((item, i) => (
          <div key={i} className="border border-rule-light rounded-lg overflow-hidden">
            {/* 헤더 */}
            <div className="bg-bg-2/60 px-4 py-2.5 flex items-center justify-between gap-2 border-b border-rule-light">
              <p className="text-[13px] font-bold text-ink">{item.label}</p>
              <Badge tone="success">
                <span className="font-inter tabular-nums">{item.expected_uplift}</span>
              </Badge>
            </div>

            {/* 비교 */}
            <div className="grid md:grid-cols-2 divide-x divide-rule-light">
              <div className="p-4">
                <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.5px] text-ink-3 mb-2">
                  Original · 기존
                </p>
                <p className="text-[13.5px] text-ink-2 leading-relaxed line-through decoration-ink-4 decoration-1">
                  {item.original}
                </p>
              </div>
              <div className="p-4 bg-indigo-bg/30">
                <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.5px] text-indigo-deep mb-2">
                  Improved · 개선안
                </p>
                <p className="text-[13.5px] text-ink font-semibold leading-relaxed">
                  "{item.improved}"
                </p>
              </div>
            </div>

            {/* 근거 */}
            <div className="px-4 py-3 bg-bg-2/30 border-t border-rule-light">
              <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.5px] text-ink-3 mb-1">
                Reasoning
              </p>
              <p className="text-[12px] text-ink-2 leading-relaxed">
                {item.reasoning}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
