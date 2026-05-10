import { Sparkles, ArrowRight } from 'lucide-react'

/**
 * 홈 Hero — Compact light lavender briefing.
 * 핵심 메시지: PRD §07 시연 클로징 — "마케터가 직접 만들고, 직접 측정한다"
 */
export function Hero() {
  return (
    <section
      className="relative overflow-hidden rounded-card mt-6 mx-8 border border-white/40"
      style={{
        background: `
          linear-gradient(135deg, #F0F0FF 0%, #E8E5FB 35%, #F4ECFF 65%, #FFEAF5 100%)
        `,
      }}
    >
      {/* Soft accent glows */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 60% at 12% 18%, rgba(91, 79, 229, 0.16) 0%, transparent 65%),
            radial-gradient(ellipse 45% 55% at 88% 80%, rgba(236, 72, 153, 0.12) 0%, transparent 70%)
          `,
        }}
      />

      <div className="relative px-8 md:px-10 py-7 md:py-9">
        <div className="grid md:grid-cols-[1.5fr_1fr] gap-8 items-center">
          {/* LEFT — 핵심 메시지 + 메트릭 */}
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-badge bg-paper/70 border border-white/60 backdrop-blur-sm mb-4 shadow-card">
              <span className="relative flex w-1 h-1">
                <span className="absolute inset-0 rounded-full bg-indigo animate-ping opacity-50" />
                <span className="relative w-1 h-1 rounded-full bg-indigo" />
              </span>
              <span className="font-inter text-[10px] font-semibold uppercase tracking-[0.16em] text-indigo-deep tabular-nums">
                MORNING BRIEFING · 2026.05.10
              </span>
            </div>

            <h1 className="font-sans text-[28px] md:text-[38px] leading-[1.18] tracking-[-0.02em] text-ink font-bold">
              <span className="text-indigo">#광고 최적화</span>, <span className="text-indigo">100배</span> 빠르게.
              <br />
              <span className="text-indigo">#가설 검증</span>을 <span className="text-indigo">4배</span> 빠르게.
            </h1>

            <p className="mt-4 text-[14px] md:text-[15px] text-ink-2 leading-[1.7]">
              경쟁사 리서치 · 콘텐츠 검수 · 인과 분해 분석을 한 화면에서.
              <br />
              <span className="font-inter font-semibold tabular-nums">8개</span> 새 광고 ·
              ROAS <span className="font-inter font-semibold tabular-nums">3.8x</span>{' '}
              <span className="font-inter font-semibold text-success-deep tabular-nums">(+12%)</span> ·
              검수 <span className="font-inter font-semibold tabular-nums">3건</span> 대기 중.
            </p>
          </div>

          {/* RIGHT — 컴팩트 AI 카드 */}
          <div className="bg-paper/85 backdrop-blur-md rounded-card border border-white/60 shadow-card-hover p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-indigo-bg flex items-center justify-center">
                <Sparkles size={12} className="text-indigo" />
              </div>
              <span className="font-inter text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-3">
                AI Insight · Today
              </span>
            </div>

            <p className="font-sans text-[15px] font-bold text-ink leading-[1.4] mb-2">
              ROAS 3.8을 만든 핵심,{' '}
              <span className="text-indigo">30대 여성 화장솜 콘텐츠</span>
            </p>

            <p className="text-[12px] text-ink-3 leading-[1.6] mb-3">
              같은 카테고리 피로도{' '}
              <span className="font-inter font-semibold text-warning-deep tabular-nums">+18%</span> 누적.
              사용자 검증 후크{' '}
              <span className="font-inter font-medium text-ink-2">(GUIDE-2.3)</span> 변형이 시급해요.
            </p>

            <button className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-button bg-indigo text-paper font-medium text-[13px] hover:bg-indigo-deep transition-colors duration-200">
              <span>인사이트 자세히 분석</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
