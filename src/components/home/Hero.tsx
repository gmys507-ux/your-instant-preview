import { Sparkles, ArrowRight } from 'lucide-react'

/**
 * 홈 Hero — Light lavender 그라데이션 + 거대 한글 헤딩 + 흰 floating 카드.
 * 참고: Lovable × Amplitude 해커톤 페이지 톤.
 */
export function Hero() {
  return (
    <section
      className="relative overflow-hidden rounded-card mt-6 mx-8 border border-rule-light"
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
            radial-gradient(ellipse 50% 60% at 12% 18%, rgba(91, 79, 229, 0.18) 0%, transparent 65%),
            radial-gradient(ellipse 45% 55% at 88% 80%, rgba(236, 72, 153, 0.14) 0%, transparent 70%)
          `,
        }}
      />

      <div className="relative px-10 md:px-12 py-14 md:py-20">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-12 items-center">
          {/* LEFT — 임팩트 헤딩 + 브리핑 */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-badge bg-paper/70 border border-rule-light backdrop-blur-sm mb-7 shadow-card"
            >
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-indigo animate-ping opacity-50" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-indigo" />
              </span>
              <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-deep tabular-nums">
                MORNING BRIEFING · 2026.05.10
              </span>
            </div>

            <h1 className="font-sans text-[44px] md:text-[68px] leading-[1.05] tracking-[-0.02em] text-ink font-bold">
              <span className="text-indigo">한 컨텍스트</span>,
              <br />
              <span className="text-indigo">세 활동</span>으로
              <br />
              <span className="text-ink/80">마케팅이 흐른다.</span>
            </h1>

            <p className="mt-8 text-[16px] md:text-[17px] text-ink-2 leading-[1.85] max-w-2xl">
              갤러리에서 발견하고, 어시스턴트로 검수하고, 대시보드로 측정합니다.
              <br />
              <span className="font-inter font-semibold tabular-nums">8개</span> 새 광고 ·
              ROAS <span className="font-inter font-semibold tabular-nums">3.8x</span>{' '}
              <span className="font-inter font-semibold text-success-deep tabular-nums">(+12%)</span> ·
              검수 <span className="font-inter font-semibold tabular-nums">3건</span> 대기 중.
            </p>
          </div>

          {/* RIGHT — 흰 floating AI 카드 */}
          <div className="bg-paper rounded-card border border-rule-light shadow-card-hover p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-indigo-bg flex items-center justify-center">
                <Sparkles size={14} className="text-indigo" />
              </div>
              <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-3">
                AI Insight · Today
              </span>
            </div>

            <p className="font-sans text-[20px] font-bold text-ink leading-[1.35] mb-3">
              ROAS 3.8을 만든 핵심,<br />
              <span className="text-indigo">30대 여성 화장솜 콘텐츠</span>
            </p>

            <p className="text-[13.5px] text-ink-3 leading-[1.7] mb-5">
              같은 카테고리 피로도{' '}
              <span className="font-inter font-semibold text-warning-deep tabular-nums">+18%</span> 누적.
              사용자 검증 후크{' '}
              <span className="font-inter font-medium text-ink-2">(GUIDE-2.3)</span> 변형이 시급해요.
            </p>

            <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-button bg-indigo text-paper font-medium text-[14px] hover:bg-indigo-deep transition-colors duration-200 shadow-card">
              <span>인사이트 자세히 분석</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
