import { AnimatePresence, motion } from 'framer-motion'
import { X, Send } from 'lucide-react'
import type { Ad } from '../../lib/types'
import { Badge } from '../ui/Badge'
import { PlatformIcon } from './PlatformIcon'

type Props = {
  ad: Ad | null
  onClose: () => void
  onSendToAssistant: (ad: Ad) => void
}

function gradientFor(adId: string): string {
  const palettes = [
    ['#E8E5FB', '#FBE4EF'],
    ['#DCD7FA', '#F4ECFF'],
    ['#FBE4EF', '#FEF3C7'],
    ['#DEF5EB', '#E8E5FB'],
    ['#F4ECFF', '#FBE4E4'],
    ['#FBEEDA', '#FBE4EF'],
    ['#E8E5FB', '#DEF5EB'],
    ['#DCD7FA', '#FEF3C7'],
  ]
  const hash = adId.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const [c1, c2] = palettes[hash % palettes.length]
  const angle = (hash * 47) % 360
  return `linear-gradient(${angle}deg, ${c1} 0%, ${c2} 100%)`
}

export function DetailPanel({ ad, onClose, onSendToAssistant }: Props) {
  return (
    <AnimatePresence>
      {ad && (
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
            className="fixed top-0 right-0 h-screen w-full md:w-[520px] bg-paper/95 backdrop-blur-md border-l border-white/60 z-50 flex flex-col shadow-card-hover"
          >
            {/* 헤더 */}
            <header className="h-14 border-b border-rule-light px-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <PlatformIcon platform={ad.platform} size={14} className="text-indigo" />
                <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-3">
                  {ad.platform} · {ad.channel}
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="닫기"
                className="text-ink-3 hover:text-ink p-1.5 rounded-md hover:bg-bg-2 transition-colors"
              >
                <X size={16} />
              </button>
            </header>

            {/* 스크롤 콘텐츠 */}
            <div className="flex-1 overflow-y-auto">
              {/* 큰 썸네일 */}
              <div
                className="relative w-full h-72"
                style={{ background: gradientFor(ad.id) }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/40 backdrop-blur-md border border-white/60 flex items-center justify-center text-ink-2">
                    <PlatformIcon platform={ad.platform} size={32} />
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* 브랜드 + 제품 + 점수 */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-inter text-[10.5px] font-bold uppercase tracking-[0.5px] text-ink-3">
                      {ad.brand}
                    </p>
                    <h2 className="text-[22px] font-bold text-ink mt-1 leading-tight">
                      {ad.product}
                    </h2>
                    <p className="text-[12px] text-ink-3 mt-1 font-inter">
                      {ad.country} · 운영 {ad.metrics.running_days}일째
                    </p>
                  </div>
                  {/* alignment_score 큰 ring */}
                  <div className="relative shrink-0">
                    <ScoreRing score={ad.alignment_score} />
                  </div>
                </div>

                {/* copy hook */}
                <section>
                  <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-ink-3 mb-2">
                    카피 후크
                  </p>
                  <p className="text-[16px] text-ink font-semibold leading-snug">
                    "{ad.copy_hook}"
                  </p>
                </section>

                {/* concept */}
                <section>
                  <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-ink-3 mb-2">
                    컨셉
                  </p>
                  <p className="text-[14px] text-ink-2 italic font-serif">
                    {ad.concept}
                  </p>
                </section>

                {/* 콘티 */}
                <section>
                  <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-ink-3 mb-3">
                    씬별 콘티
                  </p>
                  <ol className="space-y-2">
                    {ad.conti.map((scene, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-[13px] text-ink-2 leading-relaxed"
                      >
                        <span className="font-inter font-bold text-indigo tabular-nums shrink-0 w-6">
                          {i + 1}
                        </span>
                        <span>{scene}</span>
                      </li>
                    ))}
                  </ol>
                </section>

                {/* 소구점 */}
                <section>
                  <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-ink-3 mb-3">
                    소구점
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {ad.appeal_points.map((p, i) => (
                      <Badge key={i} tone="indigo">
                        {p}
                      </Badge>
                    ))}
                  </div>
                </section>

                {/* 태그 */}
                <section>
                  <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-ink-3 mb-3">
                    카테고리
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {ad.tags.map((t, i) => (
                      <Badge key={i} tone="neutral">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </section>

                {/* 메트릭 4셀 */}
                <section>
                  <p className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.5px] text-ink-3 mb-3">
                    메트릭
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <MetricCell label="추정 노출" value={ad.metrics.estimated_impressions} />
                    <MetricCell label="추정 광고비" value={ad.metrics.estimated_spend} />
                    <MetricCell label="운영 일수" value={`${ad.metrics.running_days}일`} />
                    <MetricCell label="참여율" value={ad.metrics.engagement_rate} />
                  </div>
                </section>
              </div>
            </div>

            {/* 하단 CTA */}
            <footer className="border-t border-rule-light p-4 shrink-0">
              <button
                onClick={() => onSendToAssistant(ad)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-button bg-indigo text-paper font-medium text-[14px] hover:bg-indigo-deep transition-colors duration-200 shadow-card"
              >
                <Send size={14} />
                <span>이 광고로 우리 콘텐츠 만들기</span>
              </button>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function MetricCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-bg-2/60 rounded-lg p-3 border border-rule-light">
      <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.5px] text-ink-3 mb-1">
        {label}
      </p>
      <p className="font-inter tabular-nums text-[14px] font-bold text-ink">
        {value}
      </p>
    </div>
  )
}

function ScoreRing({ score }: { score: number }) {
  const tone =
    score >= 80
      ? { stroke: '#10B981', text: 'text-success-deep', bg: 'bg-success-bg' }
      : score >= 60
      ? { stroke: '#D97706', text: 'text-warning-deep', bg: 'bg-warning-bg' }
      : { stroke: '#DC2626', text: 'text-danger-deep', bg: 'bg-danger-bg' }
  const r = 28
  const c = 2 * Math.PI * r
  const offset = c - (score / 100) * c
  return (
    <div className={`relative w-20 h-20 ${tone.bg} rounded-full flex items-center justify-center`}>
      <svg className="absolute inset-0 -rotate-90" width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="4" />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke={tone.stroke}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div className="text-center">
        <p className={`font-inter tabular-nums text-[20px] font-bold ${tone.text} leading-none`}>
          {score}
        </p>
        <p className="font-inter text-[8.5px] uppercase tracking-wide text-ink-3 mt-0.5">
          score
        </p>
      </div>
    </div>
  )
}
