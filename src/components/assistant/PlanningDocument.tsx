import type { PlanningDocument as PD } from '../../lib/types'
import { Badge } from '../ui/Badge'

type Props = {
  doc: PD
}

/**
 * 좌측 sticky 패널 — 기획서 풀 본문.
 * 우측 검수 결과와 직접 비교 가능.
 */
export function PlanningDocument({ doc }: Props) {
  return (
    <aside className="w-[300px] shrink-0 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
      <div className="bg-bg-2/60 backdrop-blur-sm border border-rule-light rounded-card shadow-card p-5">
        <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-ink-3 mb-2">
          INPUT · 기획서 풀본문
        </p>
        <h2 className="text-[16px] font-bold text-ink leading-snug mb-5">
          {doc.title}
        </h2>

        <DocSection label="컨셉">
          <p className="text-[12.5px] text-ink-2 leading-[1.7]">{doc.concept}</p>
        </DocSection>

        <DocSection label="타겟">
          <p className="text-[12.5px] text-ink-2 leading-[1.7]">{doc.target}</p>
        </DocSection>

        <DocSection label="채널">
          <Badge tone="indigo">{doc.channel}</Badge>
        </DocSection>

        <DocSection label="소구점">
          <p className="text-[12.5px] text-ink-2 leading-[1.7]">{doc.appeal_point}</p>
        </DocSection>

        <DocSection label="콘티">
          <ul className="space-y-1.5">
            {doc.conti.map((c, i) => (
              <li key={i} className="text-[12px] text-ink-2 leading-[1.65]">
                <span className="font-inter font-semibold text-indigo tabular-nums">
                  {c.time}
                </span>{' '}
                {c.scene}
              </li>
            ))}
          </ul>
        </DocSection>

        <DocSection label="대본 전문">
          <ol className="space-y-2.5">
            {doc.script_full.map((s, i) => (
              <li
                key={i}
                className="border-l-2 border-rule pl-3 py-0.5 space-y-0.5"
              >
                <p className="font-inter text-[10.5px] font-semibold tabular-nums text-indigo">
                  {s.time}
                </p>
                <p className="text-[12px] text-ink-2 leading-[1.6]">{s.voice}</p>
                <p className="text-[11px] italic text-ink-3 leading-[1.55]">
                  {s.visual}
                </p>
              </li>
            ))}
          </ol>
        </DocSection>

        <DocSection label="이미지 배치">
          <ul className="space-y-1">
            {doc.image_placement_plan.map((p) => (
              <li key={p.scene} className="text-[12px] text-ink-2 leading-[1.6]">
                <span className="font-inter font-semibold text-ink-3 tabular-nums">
                  Scene {p.scene}.
                </span>{' '}
                {p.visual}
              </li>
            ))}
          </ul>
        </DocSection>

        <DocSection label="CTA 카피" last>
          <p className="text-[13px] font-semibold text-ink italic">
            "{doc.cta_copy}"
          </p>
        </DocSection>
      </div>
    </aside>
  )
}

function DocSection({
  label,
  children,
  last,
}: {
  label: string
  children: React.ReactNode
  last?: boolean
}) {
  return (
    <section className={`${last ? '' : 'mb-4 pb-4 border-b border-rule-light'}`}>
      <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.5px] text-ink-3 mb-1.5">
        {label}
      </p>
      {children}
    </section>
  )
}
