import { AnimatePresence, motion } from 'framer-motion'
import { X, Sparkles, Send } from 'lucide-react'
import type { Ad } from '../../lib/types'
import { Badge } from '../ui/Badge'

type Props = {
  open: boolean
  ads: Ad[]
  onClose: () => void
  onSendToAssistant: () => void
}

/**
 * 다중 선택된 광고들의 AI 패턴 분석 모달.
 * 시연용 — 선택된 광고 metadata에서 빈도 계산하여 "공통 패턴" 표시.
 */
export function PatternAnalysisModal({ open, ads, onClose, onSendToAssistant }: Props) {
  if (ads.length === 0 && open) return null

  // 공통 후크 / 소구점 / CTA 패턴 추출 (시연용 단순 빈도)
  const allConcepts = ads.map((a) => a.concept)
  const allAppeals = ads.flatMap((a) => a.appeal_points)
  const allTags = ads.flatMap((a) => a.tags)

  const topAppeals = topByFreq(allAppeals, 4)
  const topTags = topByFreq(allTags, 5)
  const dominantPlatforms = topByFreq(
    ads.map((a) => a.platform),
    3,
  )
  const avgScore = Math.round(
    ads.reduce((s, a) => s + a.alignment_score, 0) / ads.length,
  )

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(720px,calc(100vw-2rem))] max-h-[88vh] bg-paper rounded-card border border-white/60 shadow-card-hover z-50 flex flex-col overflow-hidden"
          >
            {/* 헤더 */}
            <header
              className="px-6 py-5 border-b border-rule-light flex items-center justify-between shrink-0"
              style={{
                background:
                  'linear-gradient(135deg, #F0F0FF 0%, #E8E5FB 50%, #F4ECFF 100%)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shadow-card"
                  style={{
                    background:
                      'linear-gradient(135deg, #5B4FE5 0%, #2E2580 100%)',
                  }}
                >
                  <Sparkles size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-indigo-deep">
                    AI Pattern Analysis
                  </p>
                  <h2 className="text-[18px] font-bold text-ink leading-tight">
                    선택된 {ads.length}개 광고의 공통 패턴
                  </h2>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-ink-3 hover:text-ink p-1.5 rounded-md hover:bg-white/50 transition-colors"
                aria-label="닫기"
              >
                <X size={18} />
              </button>
            </header>

            {/* 본문 */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* 핵심 요약 */}
              <div
                className="rounded-card p-5"
                style={{
                  background:
                    'linear-gradient(135deg, #F0F0FF 0%, #FAFAFF 100%)',
                  border: '1px solid rgba(91, 79, 229, 0.15)',
                }}
              >
                <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-indigo-deep mb-2">
                  Synthesis · 종합
                </p>
                <p className="text-[15px] text-ink leading-relaxed">
                  선택하신 {ads.length}개 광고는{' '}
                  <span className="font-bold text-indigo">
                    {dominantPlatforms[0]?.value}
                  </span>
                  중심으로 운영됐고, 평균 가이드 일치도{' '}
                  <span className="font-inter font-bold tabular-nums">
                    {avgScore}점
                  </span>
                  . 공통 후크 패턴은{' '}
                  <span className="font-bold text-indigo">
                    {topAppeals[0]?.value}
                  </span>{' '}
                  중심.
                </p>
              </div>

              {/* 공통 소구점 */}
              <Section label="공통 소구점" count={topAppeals.length}>
                <div className="grid grid-cols-2 gap-2">
                  {topAppeals.map((a, i) => (
                    <div
                      key={i}
                      className="bg-bg-2/60 rounded-lg p-3 border border-rule-light flex items-center justify-between gap-2"
                    >
                      <span className="text-[13px] font-medium text-ink">
                        {a.value}
                      </span>
                      <Badge tone="indigo">
                        <span className="tabular-nums">
                          {a.count}/{ads.length}
                        </span>
                      </Badge>
                    </div>
                  ))}
                </div>
              </Section>

              {/* 컨셉 흐름 */}
              <Section label="컨셉 흐름">
                <ul className="space-y-1.5">
                  {allConcepts.slice(0, 5).map((c, i) => (
                    <li
                      key={i}
                      className="text-[13px] text-ink-2 italic font-serif leading-snug"
                    >
                      · {c}
                    </li>
                  ))}
                </ul>
              </Section>

              {/* 카테고리 분포 */}
              <Section label="카테고리 분포">
                <div className="flex flex-wrap gap-1.5">
                  {topTags.map((t, i) => (
                    <Badge key={i} tone="neutral">
                      {t.value} ({t.count})
                    </Badge>
                  ))}
                </div>
              </Section>

              {/* 추천 적용 방향 */}
              <Section label="추천 적용 방향" eyebrowTone="warning">
                <ul className="space-y-2 text-[13.5px] text-ink-2 leading-relaxed">
                  <li className="flex gap-2">
                    <span className="text-indigo font-bold shrink-0">▸</span>
                    <span>
                      공통 후크{' '}
                      <span className="font-semibold text-ink">
                        "{topAppeals[0]?.value}"
                      </span>
                      를 우리 콘텐츠 첫 3초에 배치 — 사내 가이드 4.2 충족.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo font-bold shrink-0">▸</span>
                    <span>
                      <span className="font-semibold text-ink">
                        {dominantPlatforms[0]?.value}
                      </span>{' '}
                      포맷에 맞춘 세로 비율 + 자막 강조 권장.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo font-bold shrink-0">▸</span>
                    <span>
                      평균 score {avgScore}점 — 사용자 검증 후크{' '}
                      <span className="font-semibold text-ink">(GUIDE-2.3)</span>{' '}
                      추가 시 +5~8점 기대.
                    </span>
                  </li>
                </ul>
              </Section>
            </div>

            {/* 하단 CTA */}
            <footer className="border-t border-rule-light p-4 shrink-0">
              <button
                onClick={onSendToAssistant}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-button bg-indigo text-paper font-medium text-[14px] hover:bg-indigo-deep transition-colors duration-200 shadow-card"
              >
                <Send size={14} />
                <span>이 패턴으로 어시스턴트에서 기획 시작</span>
              </button>
            </footer>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function Section({
  label,
  count,
  eyebrowTone,
  children,
}: {
  label: string
  count?: number
  eyebrowTone?: 'warning'
  children: React.ReactNode
}) {
  const toneClass = eyebrowTone === 'warning' ? 'text-warning-deep' : 'text-ink-3'
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <p className={`font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] ${toneClass}`}>
          {label}
        </p>
        {typeof count === 'number' && (
          <span className="font-inter text-[11px] tabular-nums text-ink-4">
            top {count}
          </span>
        )}
      </div>
      {children}
    </section>
  )
}

function topByFreq<T extends string>(arr: T[], n: number): { value: T; count: number }[] {
  const map = new Map<T, number>()
  arr.forEach((v) => map.set(v, (map.get(v) ?? 0) + 1))
  return [...map.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, n)
}
